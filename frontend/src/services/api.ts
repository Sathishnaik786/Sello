import axios from 'axios';

// Use your computer's IP address instead of localhost for mobile app
const API_BASE_URL = 'http://192.168.1.22:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (phone: string, password: string) =>
    api.post('/api/auth/login', { phone, password }),
  register: (userData: any) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
};

export const storesAPI = {
  getAll: () => api.get('/api/stores'),
  getById: (id: string) => api.get(`/api/stores/${id}`),
  create: (storeData: any) => api.post('/api/stores', storeData),
  update: (id: string, storeData: any) => api.put(`/api/stores/${id}`, storeData),
  delete: (id: string) => api.delete(`/api/stores/${id}`),
};

export const productsAPI = {
  getAll: (storeId?: string) => 
    api.get('/api/products', { params: { storeId } }),
  getById: (id: string) => api.get(`/api/products/${id}`),
  create: (productData: any) => api.post('/api/products', productData),
  update: (id: string, productData: any) => api.put(`/api/products/${id}`, productData),
  delete: (id: string) => api.delete(`/api/products/${id}`),
};

export const ordersAPI = {
  getAll: () => api.get('/api/orders'),
  getById: (id: string) => api.get(`/api/orders/${id}`),
  create: (orderData: any) => api.post('/api/orders', orderData),
  update: (id: string, orderData: any) => api.put(`/api/orders/${id}`, orderData),
  cancel: (id: string) => api.post(`/api/orders/${id}/cancel`),
};

export const usersAPI = {
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (userData: any) => api.put('/api/users/profile', userData),
  changePassword: (passwordData: any) => api.put('/api/users/password', passwordData),
};

export default api; 