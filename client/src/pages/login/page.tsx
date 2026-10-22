import { useState, useEffect } from 'react';
import { useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// use public asset - put refex-logo.png into client/public/assets/
import refexLogo from '../../assets/refex-logo.png';
import { useSnackbar } from 'notistack';
import MESSAGES from '../../utils/messages';
const SREL_LOGO = refexLogo;

export default function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const preferLocal = searchParams.get('local') === '1';
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [ssoHref, setSsoHref] = useState('');
  const [ssoLabel, setSsoLabel] = useState('Continue with RefexOne');
  const [ssoPhase, setSsoPhase] = useState<'checking' | 'redirecting' | 'form'>(preferLocal ? 'form' : 'checking');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
      return;
    }

    window.scrollTo(0, 0);
    let cancelled = false;
    const apiBase = import.meta.env.DEV
      ? '/api'
      : (import.meta.env.VITE_API_URL || `${window.location.origin}/api`);
    fetch(`${apiBase}/auth/saml/status`)
      .then((response) => response.json())
      .then((status: { enabled?: boolean; idp_configured?: boolean; label?: string; login_path?: string }) => {
        if (cancelled) return;
        if (!status.enabled || !status.idp_configured) {
          setSsoPhase('form');
          return;
        }
        const path = status.login_path || '/api/auth/saml/login';
        const href = `${path}?returnTo=${encodeURIComponent('/dashboard')}`;
        setSsoHref(href);
        if (status.label) setSsoLabel(status.label);
        if (preferLocal) {
          setSsoPhase('form');
          return;
        }
        setSsoPhase('redirecting');
        window.location.replace(href);
      })
      .catch(() => {
        if (!cancelled) setSsoPhase('form');
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, navigate, preferLocal]);

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!preferLocal && ssoPhase !== 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center max-w-md w-full">
          <img src={SREL_LOGO} alt="Refex Logo" className="h-16 w-auto object-contain mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Signing you in</h1>
          <p className="text-sm text-gray-600">Continuing to RefexOne…</p>
          <a href="/login?local=1" className="inline-block mt-6 text-sm text-[#2879b6] hover:underline">
            Sign in with email instead
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      if (!err.response) {
        setError('Cannot connect to server. Check that the backend is running and VITE_API_URL matches the server port.');
        return;
      }
      const msg = err.response?.data?.message || err.response?.data?.error;
      setError(msg || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
          {/* Logo and Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={SREL_LOGO}
                  alt="Refex Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600">Industrial Biogas Plant MIS</p>
            <div className="mt-3 text-sm">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setForgotEmail('');
                  setForgotError('');
                  setForgotOpen(true);
                }}
                className="text-blue-600 hover:underline bg-transparent border-0 p-0"
              >
                Forgot password?
              </button>
            </div>
            <Dialog
              open={forgotOpen}
              fullWidth
              maxWidth="xs"
              onClose={() => { if (!forgotLoading) setForgotOpen(false); }}
              PaperProps={{
                sx: {
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: 3,
                  p: 2,
                  width: { xs: '100%', sm: 420 },
                  minWidth: 0,
                  maxWidth: '100%',
                }
              }}
            >
              <DialogTitle>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Reset password</Typography>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 0.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    Enter your account email and we'll send a password reset link.
                  </Typography>
                  <TextField
                    label="Email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => { setForgotEmail(e.target.value); setForgotError(''); }}
                    fullWidth
                    autoFocus
                    size="small"
                  />
                  {forgotError && <Typography color="error" variant="caption">{forgotError}</Typography>}
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                  onClick={() => setForgotOpen(false)}
                  disabled={forgotLoading}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={async () => {
                    if (!forgotEmail) {
                      setForgotError('Please enter your email');
                      return;
                    }
                    try {
                      setForgotLoading(true);
                      await (await import('../../services/authService')).authService.forgotPassword(forgotEmail);
                      setForgotLoading(false);
                      setForgotOpen(false);
                      enqueueSnackbar(MESSAGES.RESET_LINK_SENT, { variant: 'info' });
                    } catch (err: any) {
                      setForgotLoading(false);
                      setForgotError(err?.response?.data?.message || 'Failed to send reset link');
                      enqueueSnackbar(MESSAGES.RESET_LINK_FAILED, { variant: 'error' });
                    }
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  {forgotLoading ? <CircularProgress size={20} color="inherit" /> : 'Send reset link'}
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailOutlineIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all text-sm shadow-sm"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockOutlinedIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all text-sm shadow-sm"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <ErrorOutlineIcon sx={{ color: '#dc2626', fontSize: 20, mt: 0.25 }} />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={18} sx={{ color: '#fff' }} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </>
              )}
            </button>
            {ssoHref ? (
              <a
                href={ssoHref}
                className="w-full mt-3 border border-[#2879b6] text-[#2879b6] py-3.5 rounded-lg font-semibold hover:bg-[#2879b6] hover:text-white transition-all duration-200 flex items-center justify-center text-sm"
              >
                {ssoLabel}
              </a>
            ) : null}
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Built and Maintained by Refex AI Team
              </p>
              <p className="text-xs text-gray-400 mt-1">Secure Admin Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
