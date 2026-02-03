import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import {
  PlayArrow,
  CheckCircle,
  Send,
  ThumbUp,
  ThumbDown,
  MoreVert,
} from '@mui/icons-material';
import { surveyService } from '../../services/surveyService';

const SurveyActionButtons = ({ survey, onAction, loading, userRole }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  const getAvailableActions = () => {
    const actions = [];
    
    switch (survey.status) {
      case 'DRAFT':
        actions.push({
          key: 'start',
          label: 'Start Survey',
          icon: <PlayArrow />,
          color: 'primary',
          variant: 'contained',
        });
        break;
        
      case 'IN_PROGRESS':
        actions.push({
          key: 'complete',
          label: 'Complete Survey',
          icon: <CheckCircle />,
          color: 'success',
          variant: 'contained',
        });
        break;
        
      case 'COMPLETED':
        actions.push({
          key: 'submit-review',
          label: 'Submit for Review',
          icon: <Send />,
          color: 'warning',
          variant: 'contained',
        });
        break;
        
      case 'REVIEW_PENDING':
        if (['ROLE_SUPER_ADMIN', 'ROLE_ORG_ADMIN', 'ROLE_REVIEWER'].includes(userRole)) {
          actions.push({
            key: 'approve',
            label: 'Approve',
            icon: <ThumbUp />,
            color: 'success',
            variant: 'contained',
          });
          actions.push({
            key: 'reject',
            label: 'Reject',
            icon: <ThumbDown />,
            color: 'error',
            variant: 'outlined',
          });
        }
        break;
        
      case 'APPROVED':
        actions.push({
          key: 'view',
          label: 'View Details',
          icon: <CheckCircle />,
          color: 'success',
          variant: 'outlined',
        });
        break;
        
      case 'REJECTED':
        if (['ROLE_SUPER_ADMIN', 'ROLE_ORG_ADMIN', 'ROLE_SURVEY_ENGINEER'].includes(userRole)) {
          actions.push({
            key: 'restart',
            label: 'Restart Survey',
            icon: <PlayArrow />,
            color: 'primary',
            variant: 'contained',
          });
        }
        break;
    }
    
    return actions;
  };

  const handleAction = (actionKey) => {
    if (actionKey === 'approve' || actionKey === 'reject') {
      setDialogType(actionKey);
      setDialogOpen(true);
    } else {
      onAction(survey.id, actionKey);
    }
  };

  const handleDialogSubmit = () => {
    onAction(survey.id, dialogType, { reviewNotes });
    setDialogOpen(false);
    setReviewNotes('');
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setReviewNotes('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return 'default';
      case 'IN_PROGRESS': return 'warning';
      case 'COMPLETED': return 'info';
      case 'REVIEW_PENDING': return 'warning';
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const actions = getAvailableActions();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Status Chip */}
        <Chip
          label={survey.status.replace('_', ' ')}
          color={getStatusColor(survey.status)}
          size="small"
          sx={{ alignSelf: 'flex-start' }}
        />
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {actions.map((action) => (
            <Button
              key={action.key}
              size="small"
              variant={action.variant}
              color={action.color}
              startIcon={action.icon}
              onClick={() => handleAction(action.key)}
              disabled={loading}
            >
              {action.label}
            </Button>
          ))}
        </Box>

        {/* Progress Info */}
        {survey.completionPercentage !== undefined && (
          <Typography variant="caption" color="text.secondary">
            {survey.completionPercentage}% Complete
          </Typography>
        )}
      </Box>

      {/* Approval/Rejection Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'approve' ? 'Approve Survey' : 'Reject Survey'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            {dialogType === 'approve' 
              ? 'Please provide any notes for approving this survey:'
              : 'Please provide reasons for rejecting this survey:'
            }
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label={dialogType === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reasons (Required)'}
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            required={dialogType === 'reject'}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDialogSubmit}
            variant={dialogType === 'approve' ? 'contained' : 'outlined'}
            color={dialogType === 'approve' ? 'success' : 'error'}
            disabled={loading || (dialogType === 'reject' && !reviewNotes.trim())}
          >
            {dialogType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SurveyActionButtons;
