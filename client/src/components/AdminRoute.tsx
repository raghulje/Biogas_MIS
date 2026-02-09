import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#2879b6' }} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roleName = typeof user?.role === 'string' ? user.role : (user?.role?.name || '');
  const hasPerm = (user?.permissions || []).some((p: any) => (p.resource === 'config' || p.resource === 'admin') && (p.action === 'read' || p.action === 'update'));

  if (roleName.toLowerCase() === 'admin' || hasPerm) {
    return <>{children}</>;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;

