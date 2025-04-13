import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: 'text.secondary' }}
      >
        Invisible by all softwares, Don't worry about your interviewer finding out.
      </Typography>
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 1 }}>
        <img
          src="/invisiblecompanies.png"
          alt="Invisible companies"
          style={{ maxWidth: '50%', height: 'auto' }}
        />
      </Grid>
    </Box>
  );
}
