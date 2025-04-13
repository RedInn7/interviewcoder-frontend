import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const commands = [
  {
    title: 'Hide/Show Window',
    description: 'Hide or show Interview Coder',
    shortcut: ['⌘', 'B'],
  },
  {
    title: 'Take Screenshot',
    description: 'Capture screenshots of the interview question',
    shortcut: ['⌘', 'H'],
  },
  {
    title: 'Move Window',
    description: 'Move the window around your screen without touching the mouse',
    shortcut: ['⌘', '↑', '↓', '←', '→'],
  },
  {
    title: 'Generate Solution',
    description: 'Generate an initial solution with explanations',
    shortcut: ['⌘', '↺'],
  },
  {
    title: 'Reset Context',
    description: 'Reset everything to start fresh with a new problem',
    shortcut: ['⌘', 'G'],
  },
  {
    title: 'Quit Application',
    description: 'Quit the application',
    shortcut: ['⌘', 'Q'],
  },
];

export default function Commands() {
  return (
    <Container
      id="commands"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        bgcolor: 'black',
        color: 'white',
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h2" sx={{ mb: 1 }}>
          Commands we love
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.400' }}>
          These commands are designed to be natural and easy to remember.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {commands.map((command, index) => (
          <Grid 
            item 
            xs={12} 
            md={4} 
            key={index}
            sx={{
              display: 'flex',
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '220px',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'rgba(25, 25, 28, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                '&:hover': {
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  bgcolor: 'rgba(35, 35, 38, 0.8)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '44px',
                }}
              >
                {command.shortcut.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        px: 1.5,
                        py: 0.75,
                        minWidth: key.length > 1 ? 'auto' : '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {key}
                      </Typography>
                    </Box>
                    {keyIndex < command.shortcut.length - 1 && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'grey.500',
                          fontSize: '14px',
                        }}
                      >
                        +
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </Box>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  mb: 1,
                  fontSize: '18px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {command.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: 'grey.400',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                {command.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 