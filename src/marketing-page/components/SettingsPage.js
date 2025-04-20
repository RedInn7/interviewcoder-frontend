import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import AppAppBar from './AppAppBar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const PasswordChangeDialog = React.memo(({
  open,
  onClose,
  onSubmit,
  error,
  success,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword
}) => (
  <Dialog 
    open={open} 
    onClose={onClose}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>Change Password</DialogTitle>
    <DialogContent>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Password updated successfully!
        </Alert>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          New Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Typography variant="h6" sx={{ mb: 1 }}>
          Confirm New Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>
    </DialogContent>
    <DialogActions sx={{ p: 3 }}>
      <Button 
        onClick={onClose}
        variant="outlined"
        color="primary"
      >
        Cancel
      </Button>
      <Button 
        onClick={onSubmit}
        variant="contained"
        color="primary"
        disabled={success}
      >
        Change Password
      </Button>
    </DialogActions>
  </Dialog>
));

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('account'); // 'account' or 'billing'
  const [openPasswordDialog, setOpenPasswordDialog] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    // Check if user is authenticated
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePasswordChange = async () => {
    try {
      setError('');
      setSuccess(false);

      // Validate passwords
      if (!newPassword || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Update password using Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      
      // Close dialog after 2 seconds on success
      setTimeout(() => {
        setOpenPasswordDialog(false);
        setSuccess(false);
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setError('');
    setSuccess(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user) {
    return null;
  }

  const AccountContent = () => (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Account Details
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Email
          </Typography>
          <Typography
            variant="body1"
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {user?.email}
          </Typography>
        </Box>
        
        <Stack spacing={2}>
          <Button
            startIcon={<LockIcon />}
            variant="text"
            onClick={() => setOpenPasswordDialog(true)}
            sx={{
              justifyContent: 'flex-start',
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            Change Password
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="text"
            sx={{
              justifyContent: 'flex-start',
              color: '#f44336',
              '&:hover': {
                color: '#d32f2f',
              },
            }}
          >
            Delete Account
          </Button>
        </Stack>
      </Stack>
    </Box>
  );

  const BillingContent = () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Subscription Plan
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Choose a plan to access all features.
      </Typography>
      
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          No Active Subscription
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Subscribe now to get access to all features
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/?scrollTo=pricing');
          }}
          sx={{
            bgcolor: '#fae20a',
            color: 'black',
            '&:hover': {
              bgcolor: '#fae20a',
            },
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppAppBar />
      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Left Sidebar */}
          <Stack spacing={1} sx={{ minWidth: 200 }}>
            <Typography
              variant="button"
              component="div"
              onClick={() => setActiveTab('account')}
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: activeTab === 'account' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'account' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: activeTab === 'account' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Account
            </Typography>
            <Typography
              variant="button"
              component="div"
              onClick={() => setActiveTab('billing')}
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: activeTab === 'billing' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'billing' ? 'white' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: activeTab === 'billing' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Billing
            </Typography>
          </Stack>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {activeTab === 'account' ? <AccountContent /> : <BillingContent />}
          </Box>
        </Box>
      </Container>
      <PasswordChangeDialog 
        open={openPasswordDialog}
        onClose={handleClosePasswordDialog}
        onSubmit={handlePasswordChange}
        error={error}
        success={success}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </>
  );
} 