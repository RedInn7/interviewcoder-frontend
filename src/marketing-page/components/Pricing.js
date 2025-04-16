import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { supabase } from '../../config/supabase';

const tiers = [
  {
    title: 'Crack With Code',
    highlight: 'Free',
    subtitle: 'Try it and see',
    price: '0',
    period: '/ month',
    description: [
      'Evaluate features',
      'Normal agent models',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'contained',
    plan: 'free',
  },
  {
    title: 'Crack With Code',
    highlight: 'Pro',
    subtitle: 'Most popular',
    price: '25',
    period: '/ month',
    yearlyPrice: '$300 billed annually',
    description: [
      'Unlimited yearly usage',
      'Solving and debugging',
      'Most powerful agent models',
      '24/7 customer support',
    ],
    buttonText: 'Subscribe',
    buttonVariant: 'contained',
    featured: true,
    plan: 'annual',
  },
  {
    title: 'Crack With Code',
    highlight: 'Pro',
    subtitle: 'Monthly subscription',
    price: '60',
    period: '/ month',
    description: [
      'Unlimited monthly usage',
      'Solving and debugging',
      'Most powerful agent models',
      '24/7 customer support',
    ],
    buttonText: 'Subscribe',
    buttonVariant: 'contained',
    plan: 'monthly',
  },
];

export default function Pricing() {
  const [loadingIndex, setLoadingIndex] = React.useState(null);

  const handleSubscribe = async (plan, idx) => {
    // Check login status
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (plan === 'free') {
      window.location.href = '/signup';
      return;
    }
    setLoadingIndex(idx);
    try {
      const res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, customerEmail: user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to get payment link');
      }
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <Container
      id="pricing"
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
          Pricing
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Simple and transparent pricing for everyone.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {tiers.map((tier, index) => (
          <Grid
            item
            xs={12}
            sm={10}
            md={4}
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: tier.featured ? '2px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {tier.featured && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '2px solid #FFD700',
                  }}
                >
                  <CheckCircleRoundedIcon sx={{ color: '#FFD700' }} />
                </Box>
              )}
              <Box>
                <Typography variant="h5" component="div">
                  {tier.title}{' '}
                  <Typography
                    component="span"
                    variant="h5"
                    sx={{ color: '#FFD700' }}
                  >
                    {tier.highlight}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', mt: 1 }}>
                  {tier.subtitle}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h2" component="div">
                  ${tier.price}
                  <Typography
                    component="span"
                    variant="h6"
                    sx={{ color: 'grey.400', ml: 1 }}
                  >
                    {tier.period}
                  </Typography>
                </Typography>
                {tier.yearlyPrice && (
                  <Typography variant="body2" sx={{ color: 'grey.400', mt: 1 }}>
                    {tier.yearlyPrice}
                  </Typography>
                )}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                {tier.description.map((line, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <CheckCircleRoundedIcon sx={{ color: 'grey.400' }} />
                    <Typography variant="body2" sx={{ color: 'grey.100' }}>
                      {line}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                fullWidth
                variant={tier.buttonVariant}
                sx={{
                  bgcolor: '#FFD700',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#FFE44D',
                  },
                  py: 1.5,
                }}
                onClick={() => handleSubscribe(tier.plan, index)}
                disabled={loadingIndex === index}
              >
                {loadingIndex === index
                  ? 'Redirecting...'
                  : `${tier.buttonText}${tier.buttonText === 'Subscribe' ? ' →' : ''}`}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
