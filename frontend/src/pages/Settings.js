import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { hierarchyService } from '../services/hierarchyService';
import PropertyForm from '../components/settings/PropertyForm';
import BuildingForm from '../components/settings/BuildingForm';
import FloorForm from '../components/settings/FloorForm';
import SpaceForm from '../components/settings/SpaceForm';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`settings-tabpanel-${index}`}
    aria-labelledby={`settings-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const Settings = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  const [properties, setProperties] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [spaces, setSpaces] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const organizationId = user?.organizationId;
      
      // Load all hierarchy data
      const propertiesData = await hierarchyService.getProperties(organizationId);
      setProperties(propertiesData);
      
      // Load buildings, floors, and spaces for all properties
      const allBuildings = [];
      const allFloors = [];
      const allSpaces = [];
      
      for (const property of propertiesData) {
        const propertyBuildings = await hierarchyService.getBuildings(property.id);
        allBuildings.push(...propertyBuildings);
        
        for (const building of propertyBuildings) {
          const buildingFloors = await hierarchyService.getFloors(building.id);
          allFloors.push(...buildingFloors);
          
          for (const floor of buildingFloors) {
            const floorSpaces = await hierarchyService.getSpaces(floor.id);
            allSpaces.push(...floorSpaces);
          }
        }
      }
      
      setBuildings(allBuildings);
      setFloors(allFloors);
      setSpaces(allSpaces);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (type) => {
    setDialogType(type);
    setSelectedItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (type, item) => {
    setDialogType(type);
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setLoading(true);
      
      switch (type) {
        case 'property':
          await hierarchyService.deleteProperty(id);
          setProperties(prev => prev.filter(p => p.id !== id));
          break;
        case 'building':
          await hierarchyService.deleteBuilding(id);
          setBuildings(prev => prev.filter(b => b.id !== id));
          break;
        case 'floor':
          await hierarchyService.deleteFloor(id);
          setFloors(prev => prev.filter(f => f.id !== id));
          break;
        case 'space':
          await hierarchyService.deleteSpace(id);
          setSpaces(prev => prev.filter(s => s.id !== id));
          break;
      }
    } catch (err) {
      setError(err.message || 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (type, data) => {
    try {
      setLoading(true);
      
      let result;
      if (selectedItem) {
        // Update existing item
        switch (type) {
          case 'property':
            result = await hierarchyService.updateProperty(selectedItem.id, data);
            setProperties(prev => prev.map(p => p.id === result.id ? result : p));
            break;
          case 'building':
            result = await hierarchyService.updateBuilding(selectedItem.id, data);
            setBuildings(prev => prev.map(b => b.id === result.id ? result : b));
            break;
          case 'floor':
            result = await hierarchyService.updateFloor(selectedItem.id, data);
            setFloors(prev => prev.map(f => f.id === result.id ? result : f));
            break;
          case 'space':
            result = await hierarchyService.updateSpace(selectedItem.id, data);
            setSpaces(prev => prev.map(s => s.id === result.id ? result : s));
            break;
        }
      } else {
        // Create new item
        switch (type) {
          case 'property':
            result = await hierarchyService.createProperty(data);
            setProperties(prev => [result, ...prev]);
            break;
          case 'building':
            result = await hierarchyService.createBuilding(data);
            setBuildings(prev => [result, ...prev]);
            break;
          case 'floor':
            result = await hierarchyService.createFloor(data);
            setFloors(prev => [result, ...prev]);
            break;
          case 'space':
            result = await hierarchyService.createSpace(data);
            setSpaces(prev => [result, ...prev]);
            break;
        }
      }
      
      setDialogOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderDialog = () => {
    const formProps = {
      item: selectedItem,
      properties,
      buildings,
      floors,
      onSubmit: (data) => handleSave(dialogType, data),
      onCancel: () => setDialogOpen(false),
      loading,
    };

    switch (dialogType) {
      case 'property':
        return <PropertyForm {...formProps} />;
      case 'building':
        return <BuildingForm {...formProps} />;
      case 'floor':
        return <FloorForm {...formProps} />;
      case 'space':
        return <SpaceForm {...formProps} />;
      default:
        return null;
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Properties" />
          <Tab label="Buildings" />
          <Tab label="Floors" />
          <Tab label="Spaces" />
        </Tabs>
      </Box>

      {/* Properties Tab */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Properties</Typography>
              <Button variant="contained" onClick={() => handleCreate('property')}>
                Add Property
              </Button>
            </Box>
            <List>
              {properties.map((property) => (
                <ListItem key={property.id} divider>
                  <ListItemText
                    primary={property.name}
                    secondary={property.address}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEdit('property', property)}>
                      Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete('property', property.id)}>
                      Delete
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Buildings Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Buildings</Typography>
              <Button variant="contained" onClick={() => handleCreate('building')}>
                Add Building
              </Button>
            </Box>
            <List>
              {buildings.map((building) => (
                <ListItem key={building.id} divider>
                  <ListItemText
                    primary={building.name}
                    secondary={`Property: ${building.propertyName}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEdit('building', building)}>
                      Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete('building', building.id)}>
                      Delete
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Floors Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Floors</Typography>
              <Button variant="contained" onClick={() => handleCreate('floor')}>
                Add Floor
              </Button>
            </Box>
            <List>
              {floors.map((floor) => (
                <ListItem key={floor.id} divider>
                  <ListItemText
                    primary={floor.name}
                    secondary={`Building: ${floor.buildingName} - Floor ${floor.floorNumber}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEdit('floor', floor)}>
                      Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete('floor', floor.id)}>
                      Delete
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Spaces Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Spaces</Typography>
              <Button variant="contained" onClick={() => handleCreate('space')}>
                Add Space
              </Button>
            </Box>
            <List>
              {spaces.map((space) => (
                <ListItem key={space.id} divider>
                  <ListItemText
                    primary={space.name}
                    secondary={`${space.type} - ${space.floorName} (${space.buildingName})`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleEdit('space', space)}>
                      Edit
                    </IconButton>
                    <IconButton onClick={() => handleDelete('space', space.id)}>
                      Delete
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedItem ? `Edit ${dialogType}` : `Create ${dialogType}`}
        </DialogTitle>
        <DialogContent>
          {renderDialog()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Settings;
