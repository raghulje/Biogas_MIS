
import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (!err.response) {
        setError('Cannot connect to server. Check that the backend is running and VITE_API_URL (e.g. http://localhost:5001/api) matches the server port.');
        return;
      }
      const msg = err.response?.data?.message || err.response?.data?.error;
      setError(msg || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'operator' | 'viewer') => {
    const credentials = {
      admin: { email: 'admin@biogas.com', password: 'Admin@123' },
      operator: { email: 'operator@biogas.com', password: 'User@123' },
      viewer: { email: 'manager@biogas.com', password: 'User@123' },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2879b6 0%, #7dc244 50%, #ee6a31 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img
                src="https://static.readdy.ai/image/d0ead66ce635a168f1e83b108be94826/0130f7c80037ff4a20e559ac6865fbbd.png"
                alt="Logo"
                style={{ height: '60px', width: 'auto', marginBottom: '16px' }}
              />
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2879b6 0%, #7dc244 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <LockOutlined sx={{ fontSize: 28, color: '#ffffff' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2879b6', mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: '#58595B' }}>
                Industrial Biogas Plant MIS
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 3,
                backgroundColor: 'rgba(40, 121, 182, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(40, 121, 182, 0.2)'
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: '#2879b6',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Demo Credentials
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => fillDemoCredentials('admin')}
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    borderColor: '#2879b6',
                    color: '#2879b6',
                    '&:hover': {
                      borderColor: '#235EAC',
                      backgroundColor: 'rgba(40, 121, 182, 0.04)',
                    },
                  }}
                >
                  <Box sx={{ textAlign: 'left', width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Admin
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#58595B' }}>
                      admin@biogas.com / Admin@123
                    </Typography>
                  </Box>
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => fillDemoCredentials('operator')}
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    borderColor: '#7dc244',
                    color: '#7dc244',
                    '&:hover': {
                      borderColor: '#139B49',
                      backgroundColor: 'rgba(125, 194, 68, 0.04)',
                    },
                  }}
                >
                  <Box sx={{ textAlign: 'left', width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Operator
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#58595B' }}>
                      operator@biogas.com / User@123
                    </Typography>
                  </Box>
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => fillDemoCredentials('viewer')}
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    borderColor: '#ee6a31',
                    color: '#ee6a31',
                    '&:hover': {
                      borderColor: '#F59E21',
                      backgroundColor: 'rgba(238, 106, 49, 0.04)',
                    },
                  }}
                >
                  <Box sx={{ textAlign: 'left', width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Viewer
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#58595B' }}>
                      manager@biogas.com / User@123
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Paper>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2.5 }}
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
                autoComplete="current-password"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #2879b6 0%, #1D9AD4 100%)',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(40, 121, 182, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #235EAC 0%, #2879b6 100%)',
                    boxShadow: '0 6px 16px rgba(40, 121, 182, 0.4)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
