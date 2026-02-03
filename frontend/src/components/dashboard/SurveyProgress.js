import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import { Assignment, CheckCircle, Schedule, RateReview } from '@mui/icons-material';

const SurveyProgress = ({ surveyStatuses, userRole }) => {
  if (!surveyStatuses) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Survey Progress
          </Typography>
          <Typography color="textSecondary">
            Loading survey data...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'REVIEW_PENDING':
        return 'info';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
      case 'APPROVED':
        return <CheckCircle />;
      case 'IN_PROGRESS':
        return <Schedule />;
      case 'REVIEW_PENDING':
        return <RateReview />;
      default:
        return <Assignment />;
    }
  };

  const totalSurveys = surveyStatuses.reduce((sum, item) => sum + item.count, 0);
  const completedSurveys = surveyStatuses.find(item => item.status === 'COMPLETED')?.count || 0;
  const completionRate = totalSurveys > 0 ? (completedSurveys / totalSurveys) * 100 : 0;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center">
          <Assignment sx={{ mr: 1 }} />
          Survey Progress
        </Typography>

        {/* Overall Progress */}
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="textSecondary">
              Overall Completion
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {typeof completionRate === 'number' ? completionRate.toFixed(1) : '0.0'}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionRate}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
            }}
          />
        </Box>

        {/* Status Breakdown */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Status Breakdown
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {surveyStatuses.map((item) => (
              <Box
                key={item.status}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {getStatusIcon(item.status)}
                  <Typography variant="body2">
                    {item.status.replace('_', ' ')}
                  </Typography>
                </Box>
                <Chip
                  label={item.count}
                  size="small"
                  color={getStatusColor(item.status)}
                  variant="outlined"
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Summary */}
        <Box mt={2} pt={2} borderTop={1} borderColor="grey.200">
          <Typography variant="body2" color="textSecondary">
            Total Surveys: <strong>{totalSurveys}</strong> | 
            Completed: <strong>{completedSurveys}</strong> | 
            Pending Review: <strong>{surveyStatuses.find(item => item.status === 'REVIEW_PENDING')?.count || 0}</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SurveyProgress;
