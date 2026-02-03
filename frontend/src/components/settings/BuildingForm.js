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

const BuildingForm = ({ open, onClose, building, onSuccess, properties }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    propertyId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name || '',
        address: building.address || '',
        city: building.city || '',
        state: building.state || '',
        country: building.country || '',
        postalCode: building.postalCode || '',
        propertyId: building.propertyId || ''
      });
    } else {
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        propertyId: ''
      });
    }
  }, [building, open]);

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
      if (building) {
        await hierarchyService.updateBuilding(building.id, formData);
      } else {
        await hierarchyService.createBuilding(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save building');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {building ? 'Edit Building' : 'Create New Building'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth required disabled={loading}>
              <InputLabel>Property</InputLabel>
              <Select
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                label="Property"
              >
                {properties?.map((property) => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              name="name"
              label="Building Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              disabled={loading}
            />
            
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              disabled={loading}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="country"
                  label="Country"
                  value={formData.country}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="postalCode"
                  label="Postal Code"
                  value={formData.postalCode}
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
            {loading ? 'Saving...' : (building ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BuildingForm;
