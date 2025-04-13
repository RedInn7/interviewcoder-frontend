import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const offers = [
  {
    company: 'Meta',
    image: '/metaoffer.png',
  },
  {
    company: 'Google',
    image: '/googleoffer2.png',
  },
  {
    company: 'Amazon',
    image: '/amazonoffer.png',
  },
  {
    company: 'Meta',
    image: '/metaoffer3.png',
  },
  {
    company: 'LinkedIn',
    image: '/linkedinoffer.png',
  },
  {
    company: 'TikTok',
    image: '/tiktokoffer.png',
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
            Our users have landed offers at top tech companies worldwide.
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={3}
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {offers.map((offer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: 0,
                  paddingTop: '75%', // 4:3 Aspect Ratio
                  position: 'relative',
                  bgcolor: 'rgba(25, 25, 28, 0.8)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={offer.image}
                  alt={`${offer.company} offer`}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
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