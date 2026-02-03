import api from './api';

export const floorPlanService = {
  // Upload floor plan
  async uploadFloorPlan(floorId, file) {
    const formData = new FormData();
    formData.append('floorId', floorId);
    formData.append('file', file);

    const response = await api.post('/floorplans/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        return progress;
      },
    });

    return response.data;
  },

  // Get floor plans by floor ID
  async getFloorPlansByFloorId(floorId) {
    const response = await api.get(`/floorplans/floor/${floorId}`);
    return response.data;
  },

  // Get latest floor plan for a floor
  async getLatestFloorPlan(floorId) {
    const response = await api.get(`/floorplans/floor/${floorId}/latest`);
    return response.data;
  },

  // Get floor plan by ID
  async getFloorPlan(id) {
    const response = await api.get(`/floorplans/${id}`);
    return response.data;
  },

  // Download floor plan
  async downloadFloorPlan(id) {
    const response = await api.get(`/floorplans/${id}/download`, {
      responseType: 'blob',
    });
    return response;
  },

  // Delete floor plan
  async deleteFloorPlan(id) {
    await api.delete(`/floorplans/${id}`);
  },

  // Get file URL for display
  getFileUrl(fileUrl) {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
    return `${baseUrl}/files/${fileUrl}`;
  },

  // Helper method to create download link
  createDownloadLink(blobData, fileName) {
    const url = window.URL.createObjectURL(new Blob([blobData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
