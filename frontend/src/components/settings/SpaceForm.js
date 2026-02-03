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

const SpaceForm = ({ open, onClose, space, onSuccess, floors }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'OFFICE',
    status: 'ACTIVE',
    area: '',
    xCoord: '',
    yCoord: '',
    floorId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (space) {
      setFormData({
        name: space.name || '',
        type: space.type || 'OFFICE',
        status: space.status || 'ACTIVE',
        area: space.area || '',
        xCoord: space.xCoord || '',
        yCoord: space.yCoord || '',
        floorId: space.floorId || ''
      });
    } else {
      setFormData({
        name: '',
        type: 'OFFICE',
        status: 'ACTIVE',
        area: '',
        xCoord: '',
        yCoord: '',
        floorId: ''
      });
    }
  }, [space, open]);

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
      if (space) {
        await hierarchyService.updateSpace(space.id, formData);
      } else {
        await hierarchyService.createSpace(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save space');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {space ? 'Edit Space' : 'Create New Space'}
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
                  label="Space Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required disabled={loading}>
                  <InputLabel>Floor</InputLabel>
                  <Select
                    name="floorId"
                    value={formData.floorId}
                    onChange={handleChange}
                    label="Floor"
                  >
                    {floors?.map((floor) => (
                      <MenuItem key={floor.id} value={floor.id}>
                        {floor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={loading}>
                  <InputLabel>Space Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Space Type"
                  >
                    <MenuItem value="OFFICE">Office</MenuItem>
                    <MenuItem value="MEETING_ROOM">Meeting Room</MenuItem>
                    <MenuItem value="CONFERENCE_ROOM">Conference Room</MenuItem>
                    <MenuItem value="STORAGE">Storage</MenuItem>
                    <MenuItem value="RESTROOM">Restroom</MenuItem>
                    <MenuItem value="KITCHEN">Kitchen</MenuItem>
                    <MenuItem value="LOBBY">Lobby</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={loading}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="ACTIVE">Active</MenuItem>
                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                    <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="area"
                  label="Area (sq ft)"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="xCoord"
                  label="X Coordinate"
                  type="number"
                  value={formData.xCoord}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="yCoord"
                  label="Y Coordinate"
                  type="number"
                  value={formData.yCoord}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
            </Grid>
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
            {loading ? 'Saving...' : (space ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SpaceForm;
