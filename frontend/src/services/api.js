import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Instance axios avec configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Service d'authentification
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Service des employés
export const employeeService = {
  getAll: async () => {
    const response = await api.get('/employees');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  create: async (employeeData) => {
    const formData = new FormData();
    Object.keys(employeeData).forEach(key => {
      if (key === 'photo' && employeeData[key]) {
        formData.append('photo', employeeData[key]);
      } else {
        formData.append(key, employeeData[key]);
      }
    });

    const response = await api.post('/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, employeeData) => {
    const formData = new FormData();
    Object.keys(employeeData).forEach(key => {
      if (key === 'photo' && employeeData[key]) {
        formData.append('photo', employeeData[key]);
      } else {
        formData.append(key, employeeData[key]);
      }
    });

    const response = await api.put(`/employees/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },

  updateAttendance: async (id, attendanceData) => {
    const response = await api.post(`/employees/${id}/attendance`, attendanceData);
    return response.data;
  },
};

// Service de planification
export const planningService = {
  getAll: async () => {
    const response = await api.get('/planning');
    return response.data;
  },

  create: async (planningData) => {
    const response = await api.post('/planning', planningData);
    return response.data;
  },

  update: async (id, planningData) => {
    const response = await api.put(`/planning/${id}`, planningData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/planning/${id}`);
    return response.data;
  },
};

export default api; 