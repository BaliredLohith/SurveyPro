import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { hierarchyService } from '../services/hierarchyService';
import { floorPlanService } from '../services/floorPlanService';
import { csvService } from '../services/csvService';
import FloorPlanCanvas from '../components/floorplan/FloorPlanCanvas';
import ImportSpaces from '../components/floorplan/ImportSpaces';
import QuickTips from '../components/floorplan/QuickTips';

const FloorPlan = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      loadBuildings(selectedProperty);
    } else {
      setBuildings([]);
      setFloors([]);
      setSpaces([]);
      setFloorPlans([]);
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedBuilding) {
      loadFloors(selectedBuilding);
    } else {
      setFloors([]);
      setSpaces([]);
      setFloorPlans([]);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedFloor) {
      loadFloorData(selectedFloor);
    } else {
      setSpaces([]);
      setFloorPlans([]);
    }
  }, [selectedFloor]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const organizationId = user?.organizationId;
      const data = await hierarchyService.getProperties(organizationId);
      setProperties(data);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const loadBuildings = async (propertyId) => {
    try {
      setLoading(true);
      const data = await hierarchyService.getBuildings(propertyId);
      setBuildings(data);
    } catch (err) {
      setError(err.message || 'Failed to load buildings');
    } finally {
      setLoading(false);
    }
  };

  const loadFloors = async (buildingId) => {
    try {
      setLoading(true);
      const data = await hierarchyService.getFloors(buildingId);
      setFloors(data);
    } catch (err) {
      setError(err.message || 'Failed to load floors');
    } finally {
      setLoading(false);
    }
  };

  const loadFloorData = async (floorId) => {
    try {
      setLoading(true);
      const [spacesData, floorPlansData] = await Promise.all([
        hierarchyService.getSpaces(floorId),
        floorPlanService.getFloorPlansByFloorId(floorId),
      ]);
      setSpaces(spacesData);
      setFloorPlans(floorPlansData);
    } catch (err) {
      setError(err.message || 'Failed to load floor data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadProgress(0);
      const result = await floorPlanService.uploadFloorPlan(selectedFloor, file);
      setFloorPlans(prev => [result, ...prev]);
      setUploadDialogOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to upload floor plan');
    }
  };

  const handleCSVImport = async (file) => {
    try {
      setLoading(true);
      const result = await csvService.importSpaces(selectedFloor, file);
      
      if (result.failedImports > 0) {
        setError(`${result.failedImports} out of ${result.totalRows} rows failed to import. Check the errors.`);
      } else {
        setError(null);
      }
      
      // Reload spaces after import
      await loadFloorData(selectedFloor);
    } catch (err) {
      setError(err.message || 'Failed to import spaces');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSVTemplate = async () => {
    try {
      await csvService.downloadTemplateFile();
    } catch (err) {
      setError(err.message || 'Failed to download template');
    }
  };

  return (
    <Box m={3}>
      <Typography variant="h4" gutterBottom>
        Floor Plan
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Hierarchy Selector */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Property</InputLabel>
                <Select
                  value={selectedProperty}
                  onChange={(e) => {
                    setSelectedProperty(e.target.value);
                    setSelectedBuilding('');
                    setSelectedFloor('');
                  }}
                  label="Property"
                >
                  {properties.map((property) => (
                    <MenuItem key={property.id} value={property.id}>
                      {property.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth disabled={!selectedProperty}>
                <InputLabel>Building</InputLabel>
                <Select
                  value={selectedBuilding}
                  onChange={(e) => {
                    setSelectedBuilding(e.target.value);
                    setSelectedFloor('');
                  }}
                  label="Building"
                >
                  {buildings.map((building) => (
                    <MenuItem key={building.id} value={building.id}>
                      {building.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth disabled={!selectedBuilding}>
                <InputLabel>Floor</InputLabel>
                <Select
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                  label="Floor"
                >
                  {floors.map((floor) => (
                    <MenuItem key={floor.id} value={floor.id}>
                      {floor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                onClick={() => setUploadDialogOpen(true)}
                disabled={!selectedFloor}
                fullWidth
              >
                Upload Floor Plan
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content */}
      {selectedFloor ? (
        <Grid container spacing={3}>
          {/* Floor Plan Canvas */}
          <Grid item xs={12} md={8}>
            <FloorPlanCanvas
              spaces={spaces}
              floorPlan={floorPlans[0]} // Show latest floor plan
              loading={loading}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* Import Spaces */}
              <ImportSpaces
                onImport={handleCSVImport}
                onDownloadTemplate={downloadCSVTemplate}
                loading={loading}
              />

              {/* Quick Tips */}
              <QuickTips />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center" color="textSecondary">
              Select a property, building, and floor to view the floor plan
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Upload Floor Plan</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*,.pdf,.dwg,.dxf,.svg"
            onChange={handleFileUpload}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FloorPlan;
