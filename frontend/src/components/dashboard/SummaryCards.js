import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  TrendingUp,
  Business,
  Assignment,
  People,
} from '@mui/icons-material';

const SummaryCards = ({ stats, userRole }) => {
  if (!stats) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      Loading...
                    </Typography>
                    <Typography variant="h4">-</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  const cards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties || 0,
      icon: <Business />,
      color: '#1976d2',
      visible: true,
    },
    {
      title: 'Total Surveys',
      value: stats.totalSurveys || 0,
      icon: <Assignment />,
      color: '#388e3c',
      visible: true,
    },
    {
      title: 'Completed Surveys',
      value: stats.completedSurveys || 0,
      icon: <TrendingUp />,
      color: '#f57c00',
      visible: true,
    },
    {
      title: 'Active Users',
      value: stats.totalUsers || 0,
      icon: <People />,
      color: '#7b1fa2',
      visible: ['ROLE_SUPER_ADMIN', 'ROLE_ORG_ADMIN'].includes(userRole),
    },
  ].filter(card => card.visible);

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card className="neon-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="overline">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {card.value.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: card.color,
                    color: 'white',
                    borderRadius: 1,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
