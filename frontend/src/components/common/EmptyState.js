import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Business,
  Assignment,
  UploadFile,
  SearchOff,
  AddCircle,
  Refresh,
} from '@mui/icons-material';

const EmptyState = ({
  type = 'default',
  title,
  description,
  action,
  icon,
  size = 'medium',
}) => {
  const theme = useTheme();

  // Default configurations for different types
  const configurations = {
    properties: {
      icon: <Business />,
      title: 'No Properties Found',
      description: 'Get started by creating your first property to manage site surveys.',
      action: {
        label: 'Create Property',
        onClick: () => {}, // Will be overridden by props
      },
    },
    surveys: {
      icon: <Assignment />,
      title: 'No Surveys Yet',
      description: 'Create your first survey to begin collecting site survey data.',
      action: {
        label: 'Create Survey',
        onClick: () => {}, // Will be overridden by props
      },
    },
    floorPlans: {
      icon: <UploadFile />,
      title: 'No Floor Plans Uploaded',
      description: 'Upload floor plans to visualize and manage spaces effectively.',
      action: {
        label: 'Upload Floor Plan',
        onClick: () => {}, // Will be overridden by props
      },
    },
    search: {
      icon: <SearchOff />,
      title: 'No Results Found',
      description: 'Try adjusting your search criteria or filters to find what you are looking for.',
      action: {
        label: 'Clear Filters',
        onClick: () => {}, // Will be overridden by props
      },
    },
    default: {
      icon: <AddCircle />,
      title: 'Nothing Here Yet',
      description: 'Start by adding some data to see meaningful information.',
    },
  };

  const config = configurations[type] || configurations.default;
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayAction = action || config.action;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          icon: { fontSize: 48 },
          title: 'h6',
          description: 'body2',
          spacing: 2,
        };
      case 'large':
        return {
          icon: { fontSize: 96 },
          title: 'h4',
          description: 'h6',
          spacing: 4,
        };
      default:
        return {
          icon: { fontSize: 64 },
          title: 'h5',
          description: 'body1',
          spacing: 3,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={size === 'large' ? '60vh' : '40vh'}
      p={3}
    >
      <Paper
        elevation={2}
        sx={{
          p: sizeStyles.spacing,
          textAlign: 'center',
          maxWidth: size === 'large' ? 600 : 400,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={sizeStyles.icon}>
            {displayIcon}
          </Box>
        </Box>

        <Typography
          variant={sizeStyles.title}
          gutterBottom
          color="textPrimary"
          fontWeight="medium"
        >
          {displayTitle}
        </Typography>

        <Typography
          variant={sizeStyles.description}
          color="textSecondary"
          paragraph
          sx={{ mb: displayAction ? 3 : 0 }}
        >
          {displayDescription}
        </Typography>

        {displayAction && (
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={displayAction.onClick}
            size={size === 'small' ? 'small' : 'medium'}
          >
            {displayAction.label}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default EmptyState;
