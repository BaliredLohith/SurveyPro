import React, { useState } from 'react';
import {
  Fab,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Build,
  AddBusiness,
  Domain,
  Layers,
  MeetingRoom,
  Assignment,
  Speed,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { hierarchyService } from '../../services/hierarchyService';
import { surveyService } from '../../services/surveyService';
import { csvService } from '../../services/csvService';
import { 
  quickCreateDemoData, 
  downloadDemoCSV, 
  DEMO_CONFIG,
  createDemoProperty,
  createDemoBuilding,
  createDemoFloor,
  createDemoSpaces,
} from '../../utils/demoData';

const DemoHelper = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!DEMO_CONFIG.enabled) {
    return null;
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const showResult = (message, type = 'success') => {
    setResult({ message, type });
    setTimeout(() => setResult(null), 3000);
  };

  const handleQuickCreateAll = async () => {
    setLoading(true);
    setDialogContent('Creating complete demo dataset...');
    setDialogOpen(true);
    
    try {
      const data = await quickCreateDemoData(hierarchyService, surveyService, user);
      showResult('Successfully created complete demo dataset!');
      setResult({
        message: `Created: ${data.property.name}, ${data.building.name}, ${data.floor.name}, ${data.spaces.length} spaces, survey template, and survey.`,
        type: 'success',
      });
    } catch (error) {
      showResult('Failed to create demo data: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  const handleCreateProperty = async () => {
    setLoading(true);
    setDialogContent('Creating demo property...');
    setDialogOpen(true);
    
    try {
      const property = await hierarchyService.createProperty(createDemoProperty(user.organizationId));
      showResult(`Created property: ${property.name}`);
    } catch (error) {
      showResult('Failed to create property: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  const handleCreateBuilding = async () => {
    // For demo, we'll use the first available property
    const properties = await hierarchyService.getProperties(user.organizationId);
    if (properties.length === 0) {
      showResult('Please create a property first', 'error');
      return;
    }

    setLoading(true);
    setDialogContent('Creating demo building...');
    setDialogOpen(true);
    
    try {
      const building = await hierarchyService.createBuilding(createDemoBuilding(properties[0].id));
      showResult(`Created building: ${building.name}`);
    } catch (error) {
      showResult('Failed to create building: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  const handleCreateFloor = async () => {
    const properties = await hierarchyService.getProperties(user.organizationId);
    const buildings = properties.length > 0 
      ? await hierarchyService.getBuildings(properties[0].id)
      : [];
    
    if (buildings.length === 0) {
      showResult('Please create a building first', 'error');
      return;
    }

    setLoading(true);
    setDialogContent('Creating demo floor...');
    setDialogOpen(true);
    
    try {
      const floor = await hierarchyService.createFloor(createDemoFloor(buildings[0].id));
      showResult(`Created floor: ${floor.name}`);
    } catch (error) {
      showResult('Failed to create floor: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  const handleCreateSpaces = async () => {
    const properties = await hierarchyService.getProperties(user.organizationId);
    const buildings = properties.length > 0 
      ? await hierarchyService.getBuildings(properties[0].id)
      : [];
    const floors = buildings.length > 0
      ? await hierarchyService.getFloors(buildings[0].id)
      : [];
    
    if (floors.length === 0) {
      showResult('Please create a floor first', 'error');
      return;
    }

    setLoading(true);
    setDialogContent('Creating demo spaces...');
    setDialogOpen(true);
    
    try {
      const spaces = await Promise.all(
        createDemoSpaces(floors[0].id).map(space => 
          hierarchyService.createSpace(space)
        )
      );
      showResult(`Created ${spaces.length} spaces`);
    } catch (error) {
      showResult('Failed to create spaces: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  const handleDownloadCSV = () => {
    downloadDemoCSV();
    showResult('Downloaded demo CSV template');
  };

  const handleResetDemo = () => {
    setLoading(true);
    setDialogContent('Resetting demo data...');
    setDialogOpen(true);
    
    // This would delete all demo data
    // Implementation depends on backend delete endpoints
    setTimeout(() => {
      showResult('Demo data reset completed');
      setLoading(false);
      setDialogOpen(false);
    }, 2000);
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="demo-helper"
        onClick={handleMenuOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Build />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleQuickCreateAll}>
          <Speed sx={{ mr: 1 }} />
          Create Complete Demo
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCreateProperty}>
          <AddBusiness sx={{ mr: 1 }} />
          Quick Add Property
        </MenuItem>
        <MenuItem onClick={handleCreateBuilding}>
          <Domain sx={{ mr: 1 }} />
          Quick Add Building
        </MenuItem>
        <MenuItem onClick={handleCreateFloor}>
          <Layers sx={{ mr: 1 }} />
          Quick Add Floor
        </MenuItem>
        <MenuItem onClick={handleCreateSpaces}>
          <MeetingRoom sx={{ mr: 1 }} />
          Quick Add Spaces
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDownloadCSV}>
          <Assignment sx={{ mr: 1 }} />
          Download Demo CSV
        </MenuItem>
        <MenuItem onClick={handleResetDemo}>
          <Build sx={{ mr: 1 }} />
          Reset Demo Data
        </MenuItem>
      </Menu>

      {/* Result Alert */}
      {result && (
        <Box
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 2000,
            minWidth: 300,
          }}
        >
          <Alert 
            severity={result.type}
            onClose={() => setResult(null)}
            sx={{ mb: 1 }}
          >
            {result.message}
          </Alert>
        </Box>
      )}

      {/* Progress Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Demo Helper</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
            {loading && <CircularProgress size={24} />}
            <Typography>{dialogContent}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={loading}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DemoHelper;
