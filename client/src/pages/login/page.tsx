import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// use public asset - put refex-logo.png into client/public/assets/
import refexLogo from '../../assets/refex-logo.png';
import { useSnackbar } from 'notistack';
const SREL_LOGO = refexLogo;

export default function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
      return;
    }

    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate]);

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
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
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  const email = prompt('Enter your account email for password reset:');
                  if (!email) return;
                  try {
                    await (await import('../../services/authService')).authService.forgotPassword(email);
                    enqueueSnackbar('If the email exists, a reset link has been sent.', { variant: 'info' });
                  } catch (err) {
                    enqueueSnackbar('Failed to send reset email. Please try again later.', { variant: 'error' });
                  }
                }}
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
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
                  <i className="ri-mail-line text-gray-400 text-lg"></i>
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
                  <i className="ri-lock-line text-gray-400 text-lg"></i>
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
                  <i className={`text-lg ${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}`}></i>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-600 text-lg mt-0.5"></i>
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
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="ri-arrow-right-line text-lg"></i>
                </>
              )}
            </button>
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
