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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import srelIcon from '../assets/srel.png';
import srelShortIcon from '../assets/srelshort.png';


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
  const dummyUser = { name: 'Demo User', role: 'Admin' };

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
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'MIS Entry', icon: <AssignmentIcon />, path: '/mis-entry' },
    { text: 'Consolidated MIS View', icon: <AssessmentIcon />, path: '/consolidated-mis-view' },
    { text: 'Consolidated MIS v2', icon: <AssessmentIcon />, path: '/consolidated-mis-v2' },
    { text: 'Admin Panel', icon: <AdminIcon />, path: '/admin' },
    { text: 'Audit Logs', icon: <HistoryIcon />, path: '/audit-logs' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        className="glass-header"
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          justifyContent: collapsed ? 'center' : 'space-between',
          transition: 'all 0.3s ease',
        }}
      >
        {!collapsed && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <img
                src={srelIcon}
                alt="Logo"
                style={{ height: '60px', width: 'auto' }}
              />
            </Box>
          </>
        )}
        {collapsed && (
          <img
            src={srelShortIcon}
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        )}

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
      <Divider />
      <List sx={{ px: collapsed ? 0.5 : 1.5, pt: 2, flex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ mb: 1 }}
            className={`aos-fade-right aos-delay-${(index + 1) * 100}`}
          >
            <Tooltip title={collapsed ? item.text : ''} placement="right" arrow>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
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
                    transform: collapsed ? 'scale(1.05)' : 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 44, justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
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
      <Divider sx={{ mx: collapsed ? 0.5 : 2 }} />
      <List sx={{ px: collapsed ? 0.5 : 1.5, py: 1.5 }}>
        <ListItem disablePadding>
          <Tooltip title={collapsed ? 'Logout' : ''} placement="right" arrow>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                px: collapsed ? 1.5 : 2,
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(238, 106, 49, 0.1)',
                  color: '#ee6a31',
                  transform: collapsed ? 'scale(1.05)' : 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    color: '#ee6a31',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 44, justifyContent: 'center' }}>
                <LogoutIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 500 }} />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
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
                {dummyUser.role}
              </Typography>
            </Box>
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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${currentDrawerWidth}px)` },
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};