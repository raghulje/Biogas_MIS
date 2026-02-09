import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const tokenInQuery = new URLSearchParams(search).get('token') || '';
  const [token, setToken] = useState(tokenInQuery);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!token) return setMessage({ type: 'error', text: 'Token is required' });
    if (password.length < 6) return setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
    if (password !== confirm) return setMessage({ type: 'error', text: 'Passwords do not match' });
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setMessage({ type: 'success', text: 'Password reset successful. Redirecting to login...' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'Failed to reset password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 6, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reset password
      </Typography>
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Token" value={token} onChange={(e) => setToken(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" disabled={loading}>
          Reset password
        </Button>
      </form>
    </Box>
  );
}

