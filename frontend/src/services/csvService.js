import api from './api';

export const csvService = {
  // Import spaces from CSV
  async importSpaces(floorId, file) {
    const formData = new FormData();
    formData.append('floorId', floorId);
    formData.append('file', file);

    const response = await api.post('/csv/spaces/import', formData, {
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

  // Download CSV template
  async downloadTemplate() {
    const response = await api.get('/csv/spaces/template', {
      responseType: 'blob',
    });
    return response;
  },

  // Helper method to create download link for template
  async downloadTemplateFile() {
    try {
      const response = await this.downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'space_import_template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download template:', error);
      throw error;
    }
  },

  // Validate CSV file before upload
  validateCSVFile(file) {
    // Check file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      throw new Error('Please upload a CSV file');
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    return true;
  },

  // Parse CSV file content (for preview)
  parseCSVFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const lines = text.split('\n').filter(line => line.trim());
          
          if (lines.length < 2) {
            reject(new Error('CSV file must contain at least a header and one data row'));
            return;
          }

          const headers = lines[0].split(',').map(h => h.trim());
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            return headers.reduce((obj, header, index) => {
              obj[header] = values[index] || '';
              return obj;
            }, {});
          });

          resolve({ headers, data });
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  },
};
