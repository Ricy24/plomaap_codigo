import api from './api';

const adminService = {
  getUsers: () => api.get('/admin/users'),
  getUsersByRole: (role) => api.get(`/admin/users/${role}`),
  blockUser: (userId) => api.post(`/admin/users/${userId}/block`),
  unblockUser: (userId) => api.post(`/admin/users/${userId}/unblock`),
  getServiceRequests: () => api.get('/admin/service-requests'),
  getRequestsByStatus: (status) => api.get(`/admin/service-requests/${status}`),
  getIncomeReport: () => api.get('/admin/reports/income'),
  getCompletedServicesReport: () => api.get('/admin/reports/completed-services'),
  getComplaints: () => api.get('/admin/complaints'),
  getComplaintById: (id) => api.get(`/admin/complaints/${id}`),
  resolveComplaint: (id, resolution) => api.put(`/admin/complaints/${id}/resolve`, { resolution }),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  exportUsers: () => api.get('/admin/export/users'),
  exportRequests: () => api.get('/admin/export/requests')
};

export default adminService;
