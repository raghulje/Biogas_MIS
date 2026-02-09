import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  AdminPanelSettings as AdminIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  AccountCircle,
  Assessment as AssessmentIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  NotificationsActive as NotificationsIcon,
} from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import refexLogo from '../assets/refex-logo.png';
const SREL_LOGO = refexLogo;
const SREL_LOGO_SHORT = refexLogo;


const drawerWidth = 280;
const drawerCollapsedWidth = 72;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const dummyUser = user || { name: 'Demo User', role: 'Admin' };
  const { loginAt } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Session timer
  const [elapsed, setElapsed] = useState<number>(0);
  useEffect(() => {
    let timer: any = null;
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

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapsedToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only users with role name 'Admin' should see admin menus.
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
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'MIS Entry', icon: <AssignmentIcon />, path: '/mis-entry' },
    // Consolidated MIS View & v2 hidden for now – routes still work at /consolidated-mis-view, /consolidated-mis-v2
    { text: 'Final MIS Report', icon: <AssessmentIcon />, path: '/final-mis' },
    ...(hasAdminAccess ? [
      { text: 'Admin Panel', icon: <AdminIcon />, path: '/admin' },
      { text: 'Email Notifications', icon: <NotificationsIcon />, path: '/admin/notifications' },
    ] : []),
    // Audit Logs hidden for now – route still works at /audit-logs
  ];

  const renderDrawerContent = (isCollapsed: boolean) => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        className="glass-header"
        sx={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: isCollapsed ? 1 : 2,
          transition: 'all 0.3s ease',
        }}
      >
          {!isCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <img
              src={SREL_LOGO}
              alt="Logo"
              style={{ height: '48px', width: 'auto' }}
            />
          </Box>
        )}
        {isCollapsed && (
          <img
            src={SREL_LOGO_SHORT}
            alt="Logo"
            style={{ height: '36px', width: 'auto' }}
          />
        )}
      </Box>
      <Divider />
      <List sx={{ px: isCollapsed ? 0.5 : 1.5, pt: 2, flex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ mb: 1 }}
            className={`aos-fade-right aos-delay-${(index + 1) * 100}`}
          >
            <Tooltip title={isCollapsed ? item.text : ''} placement="right" arrow>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: isCollapsed ? 1.5 : 2,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background:
                      'linear-gradient(135deg, rgba(40, 121, 182, 0.15) 0%, rgba(125, 194, 68, 0.15) 100%)',
                    color: '#2879b6',
                    '& .MuiListItemIcon-root': {
                      color: '#2879b6',
                    },
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, rgba(40, 121, 182, 0.2) 0%, rgba(125, 194, 68, 0.2) 100%)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(40, 121, 182, 0.08)',
                    transform: isCollapsed ? 'scale(1.05)' : 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : 44, justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 600 : 500,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mx: isCollapsed ? 0.5 : 2 }} />
      <List sx={{ px: isCollapsed ? 0.5 : 1.5, py: 1.5 }}>
        <ListItem disablePadding>
          <Tooltip title={isCollapsed ? 'Logout' : ''} placement="right" arrow>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                px: isCollapsed ? 1.5 : 2,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(238, 106, 49, 0.1)',
                  color: '#ee6a31',
                  transform: isCollapsed ? 'scale(1.05)' : 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    color: '#ee6a31',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : 44, justifyContent: 'center' }}>
                <LogoutIcon />
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }} />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
      <Box sx={{ p: 1, display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-end' }}>
        <IconButton
          onClick={handleCollapsedToggle}
          sx={{
            color: '#2879b6',
            display: { xs: 'none', md: 'flex' },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Box>
  );

  const currentDrawerWidth = collapsed ? drawerCollapsedWidth : drawerWidth;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }} className="gradient-bg">
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { md: `${currentDrawerWidth}px` },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          color: '#333842',
          borderBottom: '1px solid rgba(40, 121, 182, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, color: '#2879b6' }}
          >
            Industrial Biogas Plant MIS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333842' }}>
                {dummyUser.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#58595B' }}>
                {typeof dummyUser.role === 'string' ? dummyUser.role : (dummyUser.role?.name || 'User')}
              </Typography>
            </Box>
            {loginAt && (
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, mr: 1 }}>
                <AccessTimeIcon sx={{ color: '#64748b', fontSize: 18 }} />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ color: '#58595B', display: 'block' }}>
                    Logged in: {new Date(loginAt).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Session: {formatElapsed(elapsed)}
                  </Typography>
                </Box>
              </Box>
            )}
            <IconButton
              onClick={handleMenu}
              sx={{
                p: 0.5,
                background: 'linear-gradient(135deg, #2879b6 0%, #7dc244 100%)',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Avatar sx={{ bgcolor: 'transparent', width: 38, height: 38 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  mt: 1,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <MenuItem onClick={handleLogout} sx={{ borderRadius: '8px', mx: 1 }}>
                <LogoutIcon sx={{ mr: 1.5, fontSize: 20, color: '#ee6a31' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: currentDrawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
            },
          }}
        >
          {renderDrawerContent(false)}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: currentDrawerWidth,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(40, 121, 182, 0.1)',
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {renderDrawerContent(collapsed)}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 3 },
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          minHeight: 'calc(100vh - 64px)',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
        {/* Global footer */ }
        <Box component="footer" sx={{ mt: 4, py: 2, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="caption">
            Built & Maintained by Refex AI Team @ {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};