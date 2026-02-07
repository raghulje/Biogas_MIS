const { User, Role, UserActivityLog } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const generateTokens = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role_id: user.role_id,
        role: user.role ? user.role.name : null
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: process.env.JWT_EXPIRY || '1h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key', { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' });

    return { accessToken, refreshToken };
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        console.log('Login attempt for:', email);

        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, as: 'role' }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            try {
            await UserActivityLog.create({
                user_id: user.id,
                activity_type: 'LOGIN_FAILED',
                description: 'Invalid password',
                ip_address: req.ip
            });
            } catch (logErr) {
                console.warn('Activity log failed:', logErr.message);
            }
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.is_active) {
            return res.status(403).json({ message: 'Account is inactive' });
        }

        const tokens = generateTokens(user);

        try {
        await UserActivityLog.create({
            user_id: user.id,
            activity_type: 'LOGIN',
            description: 'User logged in successfully',
            ip_address: req.ip
        });
        } catch (logErr) {
            console.warn('Activity log failed:', logErr.message);
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        // We need to fetch the user again to ensure role/permissions are up to date logic if needed
        // For now, re-sign based on payload
        // Ideally fetch user from DB
        User.findByPk(user.id, { include: ['role'] }).then(dbUser => {
            if (!dbUser) return res.sendStatus(403);
            const tokens = generateTokens(dbUser);
            res.json(tokens);
        });
    });
};

exports.logout = async (req, res) => {
    // In stateless JWT, logout is client-side (delete token). 
    // Server-side we can log the activity.
    if (req.user) {
        await UserActivityLog.create({
            user_id: req.user.id,
            activity_type: 'LOGOUT',
            description: 'User logged out',
            ip_address: req.ip
        });
    }
    res.json({ message: 'Logged out successfully' });
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{ model: Role, as: 'role' }],
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createUser = async (req, res) => {
    // Basic user creation for Admin
    try {
        const { name, email, password, role_id } = req.body;
        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const newUser = await User.create({ name, email, password, role_id });
        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
