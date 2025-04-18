import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { supabase } from '../../config/supabase';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    handleMenuClose();
  };

  const getInitials = (user) => {
    if (!user || !user.email) return '';
    return user.email.substring(0, 2).toUpperCase();
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
    setOpen(false);
  };

  React.useEffect(() => {
    // Check if we have a section to scroll to from navigation
    if (location.state?.scrollTo) {
      scrollToSection(location.state.scrollTo);
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src="/offer.png"
                alt="Interview Coder"
                sx={{
                  height: 32,
                  width: 32,
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button 
                variant="text" 
                color="info" 
                size="small"
                onClick={() => handleNavClick('successful-stories')}
              >
                Successful Stories
              </Button>
              <Button 
                variant="text" 
                color="info" 
                size="small"
                onClick={() => handleNavClick('highlights')}
              >
                Highlights
              </Button>
              <Button 
                variant="text" 
                color="info" 
                size="small"
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </Button>
              <Button 
                variant="text" 
                color="info" 
                size="small" 
                sx={{ minWidth: 0 }}
                onClick={() => handleNavClick('faq')}
              >
                FAQ
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <IconButton onClick={handleAvatarClick} size="small" sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{getInitials(user)}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 180,
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      boxShadow: 3,
                    },
                  }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Help</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Typography color="error.main">Log out</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem onClick={() => handleNavClick('successful-stories')}>Successful Stories</MenuItem>
                <MenuItem onClick={() => handleNavClick('highlights')}>Highlights</MenuItem>
                <MenuItem onClick={() => handleNavClick('pricing')}>Pricing</MenuItem>
                <MenuItem onClick={() => handleNavClick('faq')}>FAQ</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button
                    component={Link}
                    to="/signup"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    component={Link}
                    to="/login"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={toggleDrawer(false)}
                  >
                    Login
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
