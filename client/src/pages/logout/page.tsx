import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const REFEXONE_URL = import.meta.env.VITE_REFEXONE_URL || 'https://refexone.com';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    void logout().finally(() => {
      window.location.replace(REFEXONE_URL);
    });
  }, [logout]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#2879b6' }} />
        <Typography sx={{ mt: 2, fontWeight: 700 }}>Signing out…</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Redirecting to RefexOne</Typography>
      </Box>
    </Box>
  );
}
