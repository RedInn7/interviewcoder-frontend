import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const offers = [
  {
    company: 'Offer Collection 1',
    image: '/offercollection1.png',
  },
  {
    company: 'Offer Collection 2',
    image: '/offercollection2.png',
  },
];

export default function SuccessfulStories() {
  return (
    <Box
      sx={{
        bgcolor: 'black',
        py: { xs: 8, md: 12 },
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            component="h2"
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Successful Stories
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'grey.400',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Watch me use Crack With Code to get 6  SWE intern offer from Google, Meta, Amazon, and other top companies.
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={4}
          justifyContent="center"
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {offers.map((offer, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  width: '100%',
                  height: 'auto',
                  position: 'relative',
                  bgcolor: 'transparent',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 'none',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={offer.image}
                  alt={`${offer.company} offer`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 