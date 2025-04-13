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
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                {command.shortcut.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        minWidth: key.length > 1 ? 'auto' : '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2">{key}</Typography>
                    </Box>
                    {keyIndex < command.shortcut.length - 1 && (
                      <Typography variant="body2" sx={{ color: 'grey.500' }}>
                        +
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </Box>
              <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                {command.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'grey.400', flexGrow: 1 }}
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