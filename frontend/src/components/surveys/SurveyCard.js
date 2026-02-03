import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

const SurveyCard = ({ survey, onAction, userRole }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    onAction(action, survey);
    handleClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'default';
      case 'ACTIVE':
        return 'primary';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const canEdit = () => {
    return userRole === 'ROLE_SUPER_ADMIN' || 
           userRole === 'ROLE_ORG_ADMIN' || 
           userRole === 'ROLE_SURVEY_ENGINEER';
  };

  const canDelete = () => {
    return userRole === 'ROLE_SUPER_ADMIN' || 
           userRole === 'ROLE_ORG_ADMIN';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" component="h2" gutterBottom>
            {survey.title}
          </Typography>
          <Chip 
            label={survey.status} 
            color={getStatusColor(survey.status)}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {survey.description}
        </Typography>
        
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Property: {survey.propertyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created by: {survey.createdByName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: {format(new Date(survey.createdAt), 'MMM dd, yyyy')}
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleAction('view')}>
            <VisibilityIcon sx={{ mr: 1 }} />
            View Details
          </MenuItem>
          
          {survey.status === 'DRAFT' && canEdit() && (
            <MenuItem onClick={() => handleAction('edit')}>
              <EditIcon sx={{ mr: 1 }} />
              Edit
            </MenuItem>
          )}
          
          {survey.status === 'ACTIVE' && (
            <MenuItem onClick={() => handleAction('start')}>
              <PlayArrowIcon sx={{ mr: 1 }} />
              Start Survey
            </MenuItem>
          )}
          
          {canDelete() && (
            <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
              <DeleteIcon sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          )}
        </Menu>
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
