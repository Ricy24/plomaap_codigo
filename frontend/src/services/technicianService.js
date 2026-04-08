import api from './api';

const technicianService = {
  getMyRequests: () => api.get('/technician/my-requests'),
  getPendingRequests: () => api.get('/technician/pending-requests'),
  getCompletedRequests: () => api.get('/technician/completed-requests'),
  updateRequestStatus: (requestId, status) => 
    api.put(`/technician/request/${requestId}/status`, { status }),
  getAvailability: () => api.get('/technician/availability'),
  updateAvailability: (data) => api.put('/technician/availability', data),
  getProfile: () => api.get('/technician/profile'),
  getRatings: () => api.get('/technician/ratings')
};

export default technicianService;
