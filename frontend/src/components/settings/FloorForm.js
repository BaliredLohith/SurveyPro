import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert,
  Grid
} from '@mui/material';
import { hierarchyService } from '../../services/hierarchyService';

const FloorForm = ({ open, onClose, floor, onSuccess, buildings }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    description: '',
    buildingId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (floor) {
      setFormData({
        name: floor.name || '',
        number: floor.number || '',
        description: floor.description || '',
        buildingId: floor.buildingId || ''
      });
    } else {
      setFormData({
        name: '',
        number: '',
        description: '',
        buildingId: ''
      });
    }
  }, [floor, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (floor) {
        await hierarchyService.updateFloor(floor.id, formData);
      } else {
        await hierarchyService.createFloor(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save floor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {floor ? 'Edit Floor' : 'Create New Floor'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Floor Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="number"
                  label="Floor Number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
            </Grid>
            
            <FormControl fullWidth required disabled={loading}>
              <InputLabel>Building</InputLabel>
              <Select
                name="buildingId"
                value={formData.buildingId}
                onChange={handleChange}
                label="Building"
              >
                {buildings?.map((building) => (
                  <MenuItem key={building.id} value={building.id}>
                    {building.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              disabled={loading}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? 'Saving...' : (floor ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FloorForm;
