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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';

// Styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
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
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
      opacity: 1,
    },
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
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '8px',
  padding: '12px',
  width: '100%',
  fontSize: '1rem',
  textTransform: 'none',
  ...(variant === 'contained' && {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : theme.palette.primary.main,
    color: theme.palette.mode === 'dark' ? 'black' : 'white',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.dark,
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .gsi-material-button-content-wrapper': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    gap: 12,
  },
  '& .gsi-material-button-icon': {
    height: '20px',
    minWidth: '20px',
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
  },
  '& .gsi-material-button-contents': {
    flexGrow: 0,
    fontFamily: '"Roboto", arial, sans-serif',
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'top',
    textAlign: 'center',
    fontSize: '16px',
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

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      setError(error.message);
      console.error('Error signing up with Google:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 先尝试直接登录，如果账号不存在则创建新账号
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError && signInError.message.includes('Invalid login credentials')) {
        // 账号不存在，创建新账号
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}`,
            data: {
              email_confirmed: true
            }
          }
        });

        if (signUpError) throw signUpError;
        
        // 注册成功后，再次尝试登录
        const { error: finalSignInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (finalSignInError) throw finalSignInError;
      } else if (signInError) {
        // 其他登录错误
        throw signInError;
      }

      // 登录成功，重定向到首页
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Error in signup process:', error.message);
    } finally {
      setLoading(false);
    }
  };

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
            py: 4,
            bgcolor: 'rgb(18, 18, 18)',
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
                Create your account
              </Typography>
            </Box>

            {error && (
              <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {/* Google Sign Up Button */}
            <GoogleButton 
              className="gsi-material-button"
              onClick={handleGoogleSignUp}
              disabled={loading}
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
                <span className="gsi-material-button-contents">
                  {loading ? 'Signing up with Google...' : 'Sign up with Google'}
                </span>
              </div>
            </GoogleButton>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Divider sx={{ flex: 1, borderColor: 'divider' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR CONTINUE WITH EMAIL
              </Typography>
              <Divider sx={{ flex: 1, borderColor: 'divider' }} />
            </Box>

            {/* Email & Password Fields */}
            <form onSubmit={handleEmailSignUp} style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <StyledTextField
                  fullWidth
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <StyledTextField
                  fullWidth
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <StyledTextField
                  fullWidth
                  placeholder="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                />

                {/* Sign Up Button */}
                <StyledButton 
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </StyledButton>
              </Box>
            </form>

            {/* Login Link */}
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              Already have an account?{' '}
              <Box
                component="a"
                href="/login"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in →
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </AppTheme>
  );
} 