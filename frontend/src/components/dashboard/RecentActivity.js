import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Assignment,
  UploadFile,
  AddCircle,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

const RecentActivity = ({ userActivity }) => {
  if (!userActivity) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Typography color="textSecondary">
            Loading activity data...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'survey_created':
        return <Assignment color="primary" />;
      case 'file_uploaded':
        return <UploadFile color="secondary" />;
      case 'space_added':
        return <AddCircle color="success" />;
      case 'survey_completed':
        return <CheckCircle color="success" />;
      default:
        return <Schedule color="action" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'survey_created':
        return 'primary';
      case 'file_uploaded':
        return 'secondary';
      case 'space_added':
        return 'success';
      case 'survey_completed':
        return 'success';
      default:
        return 'default';
    }
  };

  // Mock recent activities - this would come from the backend
  const recentActivities = [
    {
      id: 1,
      type: 'survey_created',
      description: 'New survey created for Downtown Office',
      user: 'John Doe',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'file_uploaded',
      description: 'Floor plan uploaded for Building A - Floor 2',
      user: 'Jane Smith',
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      type: 'space_added',
      description: '12 spaces imported via CSV',
      user: 'Mike Johnson',
      timestamp: '6 hours ago',
    },
    {
      id: 4,
      type: 'survey_completed',
      description: 'Site survey completed for West Campus',
      user: 'Sarah Wilson',
      timestamp: '1 day ago',
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>

        {/* Activity Summary */}
        {userActivity.recentActivity && (
          <Box mb={3}>
            <Typography variant="subtitle2" gutterBottom>
              Today's Activity
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <Chip
                label={`${userActivity.recentActivity.surveys_created_today || 0} Surveys Created`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`${userActivity.recentActivity.spaces_added_today || 0} Spaces Added`}
                size="small"
                color="success"
                variant="outlined"
              />
              <Chip
                label={`${userActivity.recentActivity.floor_plans_uploaded_today || 0} Files Uploaded`}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Box>
          </Box>
        )}

        {/* User Activity by Role */}
        {userActivity.usersByRole && (
          <Box mb={3}>
            <Typography variant="subtitle2" gutterBottom>
              Active Users by Role
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(userActivity.usersByRole).map(([role, count]) => (
                <Chip
                  key={role}
                  label={`${role.replace('ROLE_', '')}: ${count}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Recent Activities List */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Recent Activities
          </Typography>
          <List dense>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemIcon>
                    {getActivityIcon(activity.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.description}
                    secondary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption">
                          {activity.user}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          • {activity.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                  <Chip
                    label={activity.type.replace('_', ' ')}
                    size="small"
                    color={getActivityColor(activity.type)}
                    variant="outlined"
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No recent activity"
                  secondary="Activity will appear here as users interact with the system"
                />
              </ListItem>
            )}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
