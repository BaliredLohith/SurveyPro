import api from './api';

export const surveyService = {
  // Checklist Templates
  async getChecklistTemplates(organizationId = null) {
    const params = organizationId ? { organizationId } : {};
    const response = await api.get('/checklist/templates', { params });
    return response.data;
  },

  async getChecklistTemplate(id) {
    const response = await api.get(`/checklist/templates/${id}`);
    return response.data;
  },

  async createChecklistTemplate(templateData) {
    const response = await api.post('/checklist/templates', templateData);
    return response.data;
  },

  async updateChecklistTemplate(id, templateData) {
    const response = await api.put(`/checklist/templates/${id}`, templateData);
    return response.data;
  },

  async deleteChecklistTemplate(id) {
    await api.delete(`/checklist/templates/${id}`);
  },

  // Checklist Questions
  async getQuestionsByTemplateId(templateId) {
    const response = await api.get(`/checklist/questions/template/${templateId}`);
    return response.data;
  },

  async addQuestion(questionData) {
    const response = await api.post('/checklist/questions', questionData);
    return response.data;
  },

  async deleteQuestion(id) {
    await api.delete(`/checklist/questions/${id}`);
  },

  // Surveys
  async getSurveys(propertyId = null, status = null) {
    const params = {};
    if (propertyId) params.propertyId = propertyId;
    if (status) params.status = status;
    
    const response = await api.get('/surveys', { params });
    return response.data;
  },

  async getSurvey(id) {
    const response = await api.get(`/surveys/${id}`);
    return response.data;
  },

  async createSurvey(surveyData) {
    const response = await api.post('/surveys', surveyData);
    return response.data;
  },

  async updateSurvey(id, surveyData) {
    const response = await api.put(`/surveys/${id}`, surveyData);
    return response.data;
  },

  async deleteSurvey(id) {
    await api.delete(`/surveys/${id}`);
  },

  // Survey Actions
  async startSurvey(id) {
    const response = await api.post(`/surveys/${id}/start`);
    return response.data;
  },

  async completeSurvey(id) {
    const response = await api.post(`/surveys/${id}/complete`);
    return response.data;
  },

  async submitForReview(id) {
    const response = await api.post(`/surveys/${id}/submit-review`);
    return response.data;
  },

  async approveSurvey(id, reviewNotes = '') {
    const response = await api.post(`/surveys/${id}/approve`, null, {
      params: { reviewNotes },
    });
    return response.data;
  },

  async rejectSurvey(id, reviewNotes) {
    const response = await api.post(`/surveys/${id}/reject`, null, {
      params: { reviewNotes },
    });
    return response.data;
  },

  // Survey Responses
  async getSurveyResponses(surveyId) {
    const response = await api.get(`/surveys/${surveyId}/responses`);
    return response.data;
  },

  async saveResponse(responseData) {
    const response = await api.post('/surveys/responses', responseData);
    return response.data;
  },

  // Helper methods
  async getSurveyWithResponses(surveyId) {
    const [survey, responses] = await Promise.all([
      this.getSurvey(surveyId),
      this.getSurveyResponses(surveyId),
    ]);

    return { ...survey, responses };
  },

  // Get surveys by status
  async getSurveysByStatus(status) {
    return this.getSurveys(null, status);
  },

  // Get user's surveys
  async getUserSurveys() {
    const response = await api.get('/surveys', {
      params: { createdBy: 'current' }, // This would need backend implementation
    });
    return response.data;
  },
};
