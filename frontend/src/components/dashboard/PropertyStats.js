import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Business, LocationCity, Domain, MeetingRoom } from '@mui/icons-material';

const PropertyStats = ({ propertyStats, properties, userRole }) => {
  if (!propertyStats || !properties) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Property Statistics
          </Typography>
          <Typography color="textSecondary">
            Loading property data...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const recentProperties = properties.slice(0, 5);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom display="flex" alignItems="center">
          <Business sx={{ mr: 1 }} />
          Property Statistics
        </Typography>

        {/* Stats Overview */}
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box textAlign="center">
                <LocationCity color="primary" />
                <Typography variant="h4" color="primary">
                  {propertyStats.totalProperties || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Properties
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Domain color="secondary" />
                <Typography variant="h4" color="secondary">
                  {propertyStats.avgSpacesPerProperty?.toFixed(1) || 0}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Avg Spaces/Property
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Property Types */}
        {propertyStats.propertiesByType && (
          <Box mb={3}>
            <Typography variant="subtitle2" gutterBottom>
              Properties by Type
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(propertyStats.propertiesByType).map(([type, count]) => (
                <Box
                  key={type}
                  sx={{
                    backgroundColor: 'grey.100',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    {type}: {count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Recent Properties */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Recent Properties
          </Typography>
          <List dense>
            {recentProperties.length > 0 ? (
              recentProperties.map((property, index) => (
                <ListItem key={property.id} divider={index < recentProperties.length - 1}>
                  <ListItemText
                    primary={property.name}
                    secondary={
                      <Box>
                        <Typography variant="caption" display="block">
                          {property.address}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          {property.totalBuildings || 0} buildings, {property.totalFloors || 0} floors
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No properties found"
                  secondary="Start by adding your first property"
                />
              </ListItem>
            )}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyStats;
