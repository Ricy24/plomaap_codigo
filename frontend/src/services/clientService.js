import api from './api';

const clientService = {
  createServiceRequest: (data) => api.post('/client/service-request', data),
  getMyRequests: () => api.get('/client/my-requests'),
  getHistory: () => api.get('/client/history'),
  searchTechnicians: (specialty, location) => 
    api.get('/client/search-technicians', { params: { specialty, location } }),
  getTechnicianDetails: (id) => api.get(`/client/technician/${id}`),
  assignTechnician: (requestId, technicianId) => 
    api.post('/client/assign-technician', { requestId, technicianId }),
  rateService: (requestId, rating, comment) => 
    api.post('/client/rate-service', { requestId, rating, comment }),
  cancelRequest: (requestId) => api.post(`/client/cancel-request/${requestId}`)
};

export default clientService;
