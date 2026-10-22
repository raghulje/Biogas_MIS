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
  Storefront as StoreIcon,
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
  const { user } = useAuth();
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
    navigate('/logout');
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

  const { hasPermission } = useAuth();
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', visible: hasPermission('dashboard', 'read') },
    { text: 'MIS Entry', icon: <AssignmentIcon />, path: '/mis-entry', visible: hasPermission('mis_entry', 'read') },
    { text: 'Final MIS Report', icon: <AssessmentIcon />, path: '/final-mis', visible: hasPermission('mis_entry', 'read') },
    { text: 'Customer Master', icon: <StoreIcon />, path: '/customers', visible: hasPermission('customer', 'read') },
    ...(hasAdminAccess ? [
      { text: 'Admin Panel', icon: <AdminIcon />, path: '/admin', visible: true },
      { text: 'In-App Notifications', icon: <NotificationsIcon />, path: '/admin/notifications', visible: true },
    ] : []),
  ].filter(item => item.visible);

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
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ mb: 1 }}
          >
            <Tooltip title={isCollapsed ? item.text : ''} placement="right" arrow>
              <ListItemButton
                className="side-nav-item"
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
                  transition: 'background-color 0.16s ease, color 0.16s ease',
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
      {/* Footer: divider, logout, collapse — same horizontal padding as menu for alignment */}
      <Box sx={{ flexShrink: 0, px: isCollapsed ? 0.5 : 1.5 }}>
        <Divider sx={{ my: 0 }} />
        <List sx={{ py: 0.5 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <Tooltip title={isCollapsed ? 'Logout' : ''} placement="right" arrow>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: isCollapsed ? 1.5 : 2,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  transition: 'background-color 0.16s ease, color 0.16s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(238, 106, 49, 0.1)',
                    color: '#ee6a31',
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
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right" arrow>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: isCollapsed ? 'center' : 'flex-end',
              alignItems: 'center',
              py: 0.75,
              pb: 1,
            }}
          >
            <IconButton
              onClick={handleCollapsedToggle}
              size="small"
              sx={{
                color: '#2879b6',
                backgroundColor: 'rgba(40, 121, 182, 0.08)',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: 'rgba(40, 121, 182, 0.15)',
                  color: '#1d5a8a',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
            </IconButton>
          </Box>
        </Tooltip>
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
          WebkitBackdropFilter: 'blur(20px)',
          color: '#333842',
          borderBottom: '1px solid rgba(40, 121, 182, 0.1)',
          transition: 'all 0.3s ease',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <Toolbar sx={{ py: 0.5, px: { xs: 1, sm: 2 }, gap: 0.5, minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            color="inherit"
            aria-label="Open menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, width: 44, height: 44 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, minWidth: 0, fontWeight: 700, color: '#2879b6', fontSize: { xs: '1.05rem', sm: '1.25rem' } }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Industrial Biogas Plant MIS</Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Biogas MIS</Box>
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
              <MenuItem disabled sx={{ opacity: '1 !important', display: { sm: 'none' }, flexDirection: 'column', alignItems: 'flex-start', whiteSpace: 'normal' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#333842' }}>{dummyUser.name}</Typography>
                <Typography variant="caption" sx={{ color: '#58595B' }}>
                  {typeof dummyUser.role === 'string' ? dummyUser.role : (dummyUser.role?.name || 'User')}
                </Typography>
                {loginAt && (
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Session {formatElapsed(elapsed)}</Typography>
                )}
              </MenuItem>
              <Divider sx={{ display: { sm: 'none' }, my: 0.5 }} />
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
              width: 'min(280px, 88vw)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              paddingTop: 'env(safe-area-inset-top, 0px)',
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
          minWidth: 0,
          maxWidth: '100%',
          overflowX: 'clip',
          p: { xs: 1.5, sm: 2, md: 3 },
          width: { xs: '100%', md: `calc(100% - ${currentDrawerWidth}px)` },
            mt: { xs: 'calc(56px + env(safe-area-inset-top, 0px))', sm: 'calc(64px + env(safe-area-inset-top, 0px))' },
            minHeight: 'calc(100vh - 64px)',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
          transition: 'all 0.3s ease',
        }}
      >
        <Box key={location.pathname} className="page-stage" sx={{ minWidth: 0 }}>
          {children}
        </Box>
        {/* Global footer */}
        <Box component="footer" sx={{ mt: 4, py: 2, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="caption">
            Built & Maintained by Refex AI Team © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};