import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(22, 28, 36, 0.94)',
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))',
  boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
  border: '1px solid rgba(145, 158, 171, 0.08)',
  color: '#fff',
  width: '100%',
  height: '100%',
  borderRadius: 16,
  padding: theme.spacing(3),
}));

const MetricCard = ({ title, value, change, color }) => (
  <Card
    sx={{
      p: 2,
      bgcolor: 'rgba(22, 28, 36, 0.94)',
      border: '1px solid rgba(145, 158, 171, 0.08)',
      color: '#fff',
    }}
  >
    <Stack spacing={1}>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        {title}
      </Typography>
      <Typography variant="h4">
        {value}
        <Typography
          component="span"
          variant="body2"
          sx={{ ml: 1, color }}
        >
          {change}
        </Typography>
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        Last 30 days
      </Typography>
    </Stack>
  </Card>
);

const SidebarItem = ({ icon, text, selected }) => (
  <ListItem
    button
    sx={{
      borderRadius: 1,
      mb: 0.5,
      bgcolor: selected ? 'rgba(145, 158, 171, 0.16)' : 'transparent',
      '&:hover': {
        bgcolor: 'rgba(145, 158, 171, 0.08)',
      },
    }}
  >
    {React.cloneElement(icon, { sx: { mr: 2, opacity: 0.7 } })}
    <ListItemText primary={text} sx={{ color: '#fff' }} />
  </ListItem>
);

export default function DashboardPreview() {
  return (
    <StyledCard>
      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, borderRight: '1px solid rgba(145, 158, 171, 0.08)', pr: 2 }}>
          <Box sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
              Sitemark-web
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Web app
            </Typography>
          </Box>
          <List component="nav">
            <SidebarItem icon={<HomeIcon />} text="Home" selected />
            <SidebarItem icon={<AnalyticsIcon />} text="Analytics" />
            <SidebarItem icon={<PeopleIcon />} text="Clients" />
            <SidebarItem icon={<TaskIcon />} text="Tasks" />
          </List>
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <List>
              <SidebarItem icon={<SettingsIcon />} text="Settings" />
              <SidebarItem icon={<InfoIcon />} text="About" />
              <SidebarItem icon={<FeedbackIcon />} text="Feedback" />
            </List>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Overview
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'rgba(145, 158, 171, 0.08)',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <SearchIcon sx={{ opacity: 0.7, mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Search...
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Metrics Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 4 }}>
            <MetricCard title="Users" value="14k" change="+25%" color="#00AB55" />
            <MetricCard title="Conversions" value="325" change="-25%" color="#FF4842" />
            <MetricCard title="Event count" value="200k" change="+5%" color="#00AB55" />
          </Box>

          {/* Charts */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3 }}>
            <Card sx={{ p: 3, bgcolor: 'rgba(22, 28, 36, 0.94)', border: '1px solid rgba(145, 158, 171, 0.08)', color: '#fff' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sessions
              </Typography>
              <Typography variant="h4" sx={{ mb: 1 }}>
                13,277
                <Typography component="span" variant="body2" sx={{ ml: 1, color: '#00AB55' }}>
                  +35%
                </Typography>
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
                Sessions per day for the last 30 days
              </Typography>
              <Box sx={{ height: 200, bgcolor: 'rgba(145, 158, 171, 0.08)', borderRadius: 1 }} />
            </Card>
            <Card sx={{ p: 3, bgcolor: 'rgba(22, 28, 36, 0.94)', border: '1px solid rgba(145, 158, 171, 0.08)', color: '#fff' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Page views and downloads
              </Typography>
              <Typography variant="h4" sx={{ mb: 1 }}>
                1.3M
                <Typography component="span" variant="body2" sx={{ ml: 1, color: '#FF4842' }}>
                  -8%
                </Typography>
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
                Page views and downloads for the last 6 months
              </Typography>
              <Box sx={{ height: 200, bgcolor: 'rgba(145, 158, 171, 0.08)', borderRadius: 1 }} />
            </Card>
          </Box>
        </Box>
      </Box>
    </StyledCard>
  );
} 