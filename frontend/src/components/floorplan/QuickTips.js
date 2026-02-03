import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip
} from '@mui/material';
import {
  TouchApp as TouchAppIcon,
  ZoomIn as ZoomInIcon,
  PanTool as PanToolIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  GridOn as GridOnIcon
} from '@mui/icons-material';

const QuickTips = () => {
  const tips = [
    {
      icon: <TouchAppIcon />,
      title: 'Click to Select',
      description: 'Click on any space to select it for editing'
    },
    {
      icon: <ZoomInIcon />,
      title: 'Zoom Controls',
      description: 'Use mouse wheel or zoom buttons to zoom in/out'
    },
    {
      icon: <PanToolIcon />,
      title: 'Pan Canvas',
      description: 'Click and drag to move around the floor plan'
    },
    {
      icon: <SaveIcon />,
      title: 'Auto-Save',
      description: 'Changes are automatically saved as you work'
    },
    {
      icon: <UploadIcon />,
      title: 'Import Images',
      description: 'Upload floor plan images to trace over'
    },
    {
      icon: <GridOnIcon />,
      title: 'Grid Snap',
      description: 'Enable grid to align spaces precisely'
    }
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Tips
        </Typography>
        
        <List dense>
          {tips.map((tip, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Box sx={{ color: 'primary.main' }}>
                  {tip.icon}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight="medium">
                    {tip.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {tip.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        
        <Box mt={2}>
          <Chip 
            label="Pro Tip: Hold Shift while drawing to create perfect squares" 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickTips;
