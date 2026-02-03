import React from 'react';
import {
  Switch,
  FormControlLabel,
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Settings,
  Refresh,
} from '@mui/icons-material';
import { useDemoMode } from '../../hooks/useDemoMode';

const DemoModeToggle = ({ position = 'top-right' }) => {
  const {
    isDemoMode,
    enableDemoMode,
    disableDemoMode,
    resetDemoData,
    getDemoCredentials,
  } = useDemoMode();

  const handleToggle = () => {
    if (isDemoMode) {
      disableDemoMode();
    } else {
      enableDemoMode();
      // Auto-fill demo credentials when enabling demo mode
      const credentials = getDemoCredentials();
      // This could trigger an event that the login form listens to
      window.dispatchEvent(new CustomEvent('demoCredentials', { 
        detail: credentials 
      }));
    }
  };

  const handleReset = () => {
    resetDemoData();
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return {
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        };
      case 'top-left':
        return {
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
        };
      default:
        return {
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        };
    }
  };

  if (!process.env.NODE_ENV === 'development' && !process.env.REACT_APP_DEMO_MODE) {
    return null;
  }

  return (
    <Box sx={getPositionStyles()}>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 2,
          boxShadow: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Tooltip title="Toggle Demo Mode">
          <IconButton size="small" color="primary">
            <Settings />
          </IconButton>
        </Tooltip>

        <FormControlLabel
          control={
            <Switch
              checked={isDemoMode}
              onChange={handleToggle}
              color="primary"
              size="small"
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Demo Mode</Typography>
              <Chip
                label={isDemoMode ? 'ON' : 'OFF'}
                color={isDemoMode ? 'success' : 'default'}
                size="small"
              />
            </Box>
          }
          sx={{ m: 0 }}
        />

        {isDemoMode && (
          <Tooltip title="Reset Demo Data">
            <IconButton size="small" onClick={handleReset} color="secondary">
              <Refresh />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Demo Mode Info */}
      {isDemoMode && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'info.main',
            color: 'white',
            p: 2,
            borderRadius: 2,
            fontSize: '0.75rem',
            maxWidth: 300,
            zIndex: 1000,
          }}
        >
          <Typography variant="body2" gutterBottom>
            <strong>Demo Mode Active</strong>
          </Typography>
          <Typography variant="caption">
            Using sample data for testing. Click the demo button (bottom-right) for quick actions.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DemoModeToggle;
