
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string | { name: string };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginAt?: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loginAt, setLoginAt] = useState<string | null>(localStorage.getItem('loginAt'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
          const stored = localStorage.getItem('loginAt');
          if (stored) setLoginAt(stored);
        } catch (error) {
          console.error('Auth sync failed', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('token', data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
    const at = new Date().toISOString();
    localStorage.setItem('loginAt', at);
    setLoginAt(at);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error('Logout error', e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('loginAt');
    setToken(null);
    setUser(null);
  };

  // Auto-logout after session duration (default: 1 hour)
  useEffect(() => {
    const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour
    let to: ReturnType<typeof setTimeout> | null = null;
    if (loginAt) {
      const start = new Date(loginAt).getTime();
      const expireAt = start + SESSION_TIMEOUT_MS;
      const remaining = expireAt - Date.now();
      if (remaining <= 0) {
        logout();
      } else {
        to = setTimeout(() => {
          // automatic logout when session expires
          logout();
        }, remaining);
      }
    }
    return () => {
      if (to) clearTimeout(to);
    };
  }, [loginAt]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginAt,
        login,
        logout,
        isAuthenticated: !!token,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
