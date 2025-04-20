import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppleIcon from '@mui/icons-material/Apple';
import WindowIcon from '@mui/icons-material/Window';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Hero() {
  const [macAnchorEl, setMacAnchorEl] = React.useState(null);
  const openMac = Boolean(macAnchorEl);
  
  const handleMacClick = (event) => {
    setMacAnchorEl(event.currentTarget);
  };
  
  const handleMacClose = () => {
    setMacAnchorEl(null);
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Land&nbsp;your &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              FAANG Offer
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            You can use our most advanced AI to pass the SWE interview and land your FAANG dream.
          </Typography>
          
          {/* Download Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AppleIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleMacClick}
                sx={{
                  bgcolor: '#fae20a',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#fae20a',
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 8,
                  fontSize: '1.1rem',
                  boxShadow: '0 0 20px rgba(250, 226, 10, 0.5)',
                  border: 'none',
                }}
              >
                Download for Mac
              </Button>
              <Menu
                anchorEl={macAnchorEl}
                open={openMac}
                onClose={handleMacClose}
                sx={{
                  '& .MuiPaper-root': {
                    bgcolor: 'rgb(18, 18, 18)',
                    color: 'white',
                    borderRadius: 2,
                    mt: 1,
                  }
                }}
              >
                <MenuItem onClick={handleMacClose} sx={{ py: 1.5, px: 3 }}>
                  Download for Mac (Apple Silicon)
                </MenuItem>
                <MenuItem onClick={handleMacClose} sx={{ py: 1.5, px: 3 }}>
                  Download for Mac (Intel)
                </MenuItem>
              </Menu>
            </Box>
            <Button
              variant="outlined"
              size="large"
              startIcon={<WindowIcon />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1.1rem',
              }}
            >
              Download for Windows
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
