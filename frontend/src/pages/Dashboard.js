import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  EventBusy as AbsentIcon,
  WorkOff as LeaveIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: '50%',
              padding: 2,
              display: 'flex',
            }}
          >
            {icon}
          </Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" component="div">
            {value}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

function Dashboard() {
  const stats = [
    {
      title: 'Employés Actifs',
      value: '24',
      icon: <PeopleIcon sx={{ color: '#1976d2' }} />,
      color: '#1976d2',
    },
    {
      title: 'Absents Aujourd\'hui',
      value: '3',
      icon: <AbsentIcon sx={{ color: '#dc004e' }} />,
      color: '#dc004e',
    },
    {
      title: 'En Congés',
      value: '2',
      icon: <LeaveIcon sx={{ color: '#ff9800' }} />,
      color: '#ff9800',
    },
    {
      title: 'Taux de Présence',
      value: '87%',
      icon: <TrendingUpIcon sx={{ color: '#4caf50' }} />,
      color: '#4caf50',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Activité Récente
            </Typography>
            {/* À implémenter : Liste des activités récentes */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 