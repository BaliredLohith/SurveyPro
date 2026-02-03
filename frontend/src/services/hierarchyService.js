import api from './api';

export const hierarchyService = {
  // Properties
  async getProperties(organizationId = null) {
    const params = organizationId ? { organizationId } : {};
    const response = await api.get('/hierarchy/properties', { params });
    return response.data;
  },

  async getProperty(id) {
    const response = await api.get(`/hierarchy/properties/${id}`);
    return response.data;
  },

  async createProperty(propertyData) {
    const response = await api.post('/hierarchy/properties', propertyData);
    return response.data;
  },

  async updateProperty(id, propertyData) {
    const response = await api.put(`/hierarchy/properties/${id}`, propertyData);
    return response.data;
  },

  async deleteProperty(id) {
    await api.delete(`/hierarchy/properties/${id}`);
  },

  // Buildings
  async getBuildings(propertyId = null) {
    const params = propertyId ? { propertyId } : {};
    const response = await api.get('/hierarchy/buildings', { params });
    return response.data;
  },

  async getBuilding(id) {
    const response = await api.get(`/hierarchy/buildings/${id}`);
    return response.data;
  },

  async createBuilding(buildingData) {
    const response = await api.post('/hierarchy/buildings', buildingData);
    return response.data;
  },

  async updateBuilding(id, buildingData) {
    const response = await api.put(`/hierarchy/buildings/${id}`, buildingData);
    return response.data;
  },

  async deleteBuilding(id) {
    await api.delete(`/hierarchy/buildings/${id}`);
  },

  // Floors
  async getFloors(buildingId = null) {
    const params = buildingId ? { buildingId } : {};
    const response = await api.get('/hierarchy/floors', { params });
    return response.data;
  },

  async getFloor(id) {
    const response = await api.get(`/hierarchy/floors/${id}`);
    return response.data;
  },

  async createFloor(floorData) {
    const response = await api.post('/hierarchy/floors', floorData);
    return response.data;
  },

  async updateFloor(id, floorData) {
    const response = await api.put(`/hierarchy/floors/${id}`, floorData);
    return response.data;
  },

  async deleteFloor(id) {
    await api.delete(`/hierarchy/floors/${id}`);
  },

  // Spaces
  async getSpaces(floorId = null) {
    const params = floorId ? { floorId } : {};
    const response = await api.get('/hierarchy/spaces', { params });
    return response.data;
  },

  async getSpace(id) {
    const response = await api.get(`/hierarchy/spaces/${id}`);
    return response.data;
  },

  async createSpace(spaceData) {
    const response = await api.post('/hierarchy/spaces', spaceData);
    return response.data;
  },

  async updateSpace(id, spaceData) {
    const response = await api.put(`/hierarchy/spaces/${id}`, spaceData);
    return response.data;
  },

  async deleteSpace(id) {
    await api.delete(`/hierarchy/spaces/${id}`);
  },

  // Helper methods for hierarchical data
  async getFullHierarchy(organizationId = null) {
    const properties = await this.getProperties(organizationId);
    
    const hierarchy = await Promise.all(
      properties.map(async (property) => {
        const buildings = await this.getBuildings(property.id);
        
        const buildingsWithFloors = await Promise.all(
          buildings.map(async (building) => {
            const floors = await this.getFloors(building.id);
            
            const floorsWithSpaces = await Promise.all(
              floors.map(async (floor) => {
                const spaces = await this.getSpaces(floor.id);
                return { ...floor, spaces };
              })
            );
            
            return { ...building, floors: floorsWithSpaces };
          })
        );
        
        return { ...property, buildings: buildingsWithFloors };
      })
    );
    
    return hierarchy;
  },
};
