import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
});

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '8px',
  padding: '12px',
  width: '100%',
  fontSize: '1rem',
  textTransform: 'none',
  ...(variant === 'contained' && {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'white',
    },
  }),
}));

const GoogleButton = styled('button')({
  WebkitUserSelect: 'none',
  WebkitAppearance: 'none',
  backgroundColor: 'WHITE',
  backgroundImage: 'none',
  border: '1px solid #747775',
  borderRadius: '4px',
  boxSizing: 'border-box',
  color: '#1f1f1f',
  cursor: 'pointer',
  fontFamily: '"Roboto", arial, sans-serif',
  fontSize: '14px',
  height: '40px',
  letterSpacing: '0.25px',
  outline: 'none',
  overflow: 'hidden',
  padding: '0 12px',
  position: 'relative',
  textAlign: 'center',
  transition: 'background-color .218s, border-color .218s, box-shadow .218s',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  width: '100%',
  maxWidth: '400px',
  minWidth: 'min-content',
  '& .gsi-material-button-icon': {
    height: '20px',
    marginRight: '12px',
    minWidth: '20px',
    width: '20px',
  },
  '& .gsi-material-button-content-wrapper': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  '& .gsi-material-button-contents': {
    flexGrow: 1,
    fontFamily: '"Roboto", arial, sans-serif',
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
  },
  '& .gsi-material-button-state': {
    transition: 'opacity .218s',
    bottom: 0,
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  '&:disabled': {
    cursor: 'default',
    backgroundColor: '#ffffff61',
    borderColor: '#1f1f1f1f',
    '& .gsi-material-button-contents': {
      opacity: '38%',
    },
    '& .gsi-material-button-icon': {
      opacity: '38%',
    },
  },
  '&:not(:disabled):active .gsi-material-button-state, &:not(:disabled):focus .gsi-material-button-state': {
    backgroundColor: '#303030',
    opacity: '12%',
  },
  '&:not(:disabled):hover': {
    boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
    '& .gsi-material-button-state': {
      backgroundColor: '#303030',
      opacity: '8%',
    },
  },
});

export default function Login() {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login success:', tokenResponse);
      // Here you would typically:
      // 1. Send the access token to your backend
      // 2. Get user info from Google
      // 3. Create or update user in your database
      // 4. Navigate to the dashboard or home page
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await userInfoResponse.json();
        console.log('User info:', userInfo);
        // TODO: Send user info to your backend
        // navigate('/dashboard');
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login failed:', errorResponse);
    },
  });

  return (
    <AppTheme>
      <CssBaseline />
      <AppAppBar />
      <Box sx={{ mt: 8 }}>
        <Container
          maxWidth="sm"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'black',
            color: 'white',
            py: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Logo and Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img
                src="/offer.png"
                alt="Interview Coder"
                style={{ width: 64, height: 64, marginBottom: 16 }}
              />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Log in
              </Typography>
            </Box>

            {/* Google Sign In Button */}
            <GoogleButton
              className="gsi-material-button"
              onClick={() => googleLogin()}
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">使用 Google 账号登录</span>
                <span style={{ display: 'none' }}>使用 Google 账号登录</span>
              </div>
            </GoogleButton>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                OR CONTINUE WITH EMAIL
              </Typography>
              <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            </Box>

            {/* Email & Password Fields */}
            <StyledTextField
              fullWidth
              placeholder="Email address"
              type="email"
            />
            <StyledTextField
              fullWidth
              placeholder="Password"
              type="password"
            />

            {/* Sign In Button */}
            <StyledButton variant="contained">
              Sign in
            </StyledButton>

            {/* Sign Up Link */}
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Don't have an account?{' '}
              <Box
                component="a"
                href="/signup"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign up →
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </AppTheme>
  );
} 