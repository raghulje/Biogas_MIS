import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Logout as LogoutIcon, AccountCircle } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import refexLogo from '../assets/refex-logo.png';
import { sceneForPath } from '../scenes';

const REFEXONE_URL = import.meta.env.VITE_REFEXONE_URL || 'https://refexone.com';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loginAt, hasPermission } = useAuth();
  const dummyUser = user || { name: 'Demo User', role: 'Admin' };
  const scene = sceneForPath(location.pathname);

  const [elapsed, setElapsed] = useState<number>(0);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (loginAt) {
      const start = new Date(loginAt).getTime();
      const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000)));
      update();
      timer = setInterval(update, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [loginAt]);

  const formatElapsed = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const hasAdminAccess = (() => {
    try {
      if (!user) return false;
      const roleName = typeof user.role === 'string' ? user.role : (user.role?.name || '');
      return Boolean(roleName && String(roleName).toLowerCase() === 'admin');
    } catch {
      return false;
    }
  })();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', visible: hasPermission('dashboard', 'read'), end: true },
    { text: 'MIS Entry', path: '/mis-entry', visible: hasPermission('mis_entry', 'read'), end: false },
    { text: 'Final MIS Report', path: '/final-mis', visible: hasPermission('mis_entry', 'read'), end: true },
    { text: 'Customer Master', path: '/customers', visible: hasPermission('customer', 'read'), end: true },
    ...(hasAdminAccess ? [
      { text: 'Admin Panel', path: '/admin', visible: true, end: true },
      { text: 'Notifications', path: '/admin/notifications', visible: true, end: true },
    ] : []),
  ].filter(item => item.visible);

  const roleLabel = typeof dummyUser.role === 'string' ? dummyUser.role : (dummyUser.role?.name || 'User');

  return (
    <Box
      className="gradient-bg app-shell"
      style={{ ['--page-scene' as string]: `url("${scene}")` }}
      sx={{ minHeight: '100vh' }}
    >
      <header className="app-topbar">
        <button type="button" className="app-logo" onClick={() => { window.location.replace(REFEXONE_URL); }} title="Back to RefexOne" aria-label="Back to RefexOne">
          <img src={refexLogo} alt="Refex" />
        </button>
        <Typography className="app-title" component="div">
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Industrial Biogas Plant MIS</Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Biogas MIS</Box>
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {loginAt && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.75, color: '#64748b' }}>
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
                Session {formatElapsed(elapsed)}
              </Typography>
            </Box>
          )}
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ p: 0.25 }} aria-label="Account">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 0.5 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#17a2b4' }}>
                <AccountCircle />
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>{dummyUser.name}</Typography>
                <Typography sx={{ fontSize: 11, color: '#64748b', lineHeight: 1.2 }}>{roleLabel}</Typography>
              </Box>
            </Box>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { borderRadius: '12px', mt: 1, minWidth: 180 } }}
          >
            <MenuItem disabled sx={{ opacity: '1 !important', fontSize: 12, color: '#64748b' }}>
              {roleLabel}
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/logout'); }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </header>

      <nav className="app-nav" aria-label="Sections">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.end}>
            {item.text}
          </NavLink>
        ))}
      </nav>

      <Box component="main" className="app-main">
        <div className="page-scene-wash" aria-hidden="true" />
        <Box key={location.pathname} className="page-stage" sx={{ position: 'relative', zIndex: 1, minWidth: 0 }}>
          {children}
        </Box>
        <Box component="footer" sx={{ position: 'relative', zIndex: 1, mt: 4, py: 2, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="caption">
            Built & Maintained by Refex AI Team © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
