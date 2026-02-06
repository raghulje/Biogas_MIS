import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/admin',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const adminService = {
    // Users
    getUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },
    createUser: async (user: any) => {
        const response = await api.post('/users', user);
        return response.data;
    },
    updateUser: async (id: number, user: any) => {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    },
    deleteUser: async (id: number) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },

    // Roles
    getRoles: async () => {
        const response = await api.get('/roles');
        return response.data;
    },
    assignPermissions: async (data: any) => {
        const response = await api.post('/roles/assign-permissions', data);
        return response.data;
    },

    // Audit Logs
    getAuditLogs: async (params?: any) => {
        const response = await api.get('/audit-logs', { params });
        return response.data;
    },

    // Email Templates
    getTemplates: async () => {
        const response = await api.get('/email-templates');
        return response.data;
    },
    createTemplate: async (template: any) => {
        const response = await api.post('/email-templates', template);
        return response.data;
    },
    updateTemplate: async (id: number, template: any) => {
        const response = await api.put(`/email-templates/${id}`, template);
        return response.data;
    },
    deleteTemplate: async (id: number) => {
        const response = await api.delete(`/email-templates/${id}`);
        return response.data;
    },

    // Schedulers
    getSchedulers: async () => {
        const response = await api.get('/schedulers');
        return response.data;
    },
    createScheduler: async (scheduler: any) => {
        const response = await api.post('/schedulers', scheduler);
        return response.data;
    }
};
