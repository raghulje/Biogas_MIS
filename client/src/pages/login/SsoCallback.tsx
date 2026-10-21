import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function SsoCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { establishSession } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setError('Missing SSO token.');
      return;
    }
    establishSession(token);
    const next = params.get('next');
    const dest = next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
    navigate(dest, { replace: true });
  }, [params, navigate, establishSession]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      {error ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">SSO sign-in failed</Typography>
          <Typography sx={{ mt: 1, mb: 2, color: 'text.secondary' }}>{error}</Typography>
          <Button variant="contained" onClick={() => navigate('/login', { replace: true })}>Back to login</Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#2879b6' }} />
          <Typography sx={{ mt: 2 }}>Signing you in…</Typography>
        </Box>
      )}
    </Box>
  );
}
