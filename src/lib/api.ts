import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// API Base URL - Update this with your Django backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add JWT token
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const response = await this.api.post('/auth/refresh/', {
                refresh: refreshToken,
              });
              
              const { access } = response.data;
              this.setToken(access);
              
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            this.clearAuth();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Auth token management
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  private clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  // Authentication methods
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login/', { email, password });
    const { access, refresh, user } = response.data;
    this.setToken(access);
    this.setRefreshToken(refresh);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    const response = await this.api.post('/auth/register/', {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  }

  async logout() {
    try {
      await this.api.post('/auth/logout/');
    } finally {
      this.clearAuth();
    }
  }

  async getCurrentUser() {
    const response = await this.api.get('/auth/user/');
    return response.data;
  }

  // Project methods
  async getProjects() {
    const response = await this.api.get('/projects/');
    return response.data;
  }

  async getProject(id: string) {
    const response = await this.api.get(`/projects/${id}/`);
    return response.data;
  }

  async createProject(data: any) {
    const response = await this.api.post('/projects/', data);
    return response.data;
  }

  async updateProject(id: string, data: any) {
    const response = await this.api.patch(`/projects/${id}/`, data);
    return response.data;
  }

  async deleteProject(id: string) {
    await this.api.delete(`/projects/${id}/`);
  }

  // Task methods
  async getTasks(projectId?: string) {
    const params = projectId ? { project: projectId } : {};
    const response = await this.api.get('/tasks/', { params });
    return response.data;
  }

  async getTask(id: string) {
    const response = await this.api.get(`/tasks/${id}/`);
    return response.data;
  }

  async createTask(data: any) {
    const response = await this.api.post('/tasks/', data);
    return response.data;
  }

  async updateTask(id: string, data: any) {
    const response = await this.api.patch(`/tasks/${id}/`, data);
    return response.data;
  }

  async deleteTask(id: string) {
    await this.api.delete(`/tasks/${id}/`);
  }

  // Time tracking methods
  async getTimeEntries(taskId?: string) {
    const params = taskId ? { task: taskId } : {};
    const response = await this.api.get('/time-entries/', { params });
    return response.data;
  }

  async createTimeEntry(data: any) {
    const response = await this.api.post('/time-entries/', data);
    return response.data;
  }

  async updateTimeEntry(id: string, data: any) {
    const response = await this.api.patch(`/time-entries/${id}/`, data);
    return response.data;
  }

  // Analytics methods
  async getAnalytics(projectId?: string) {
    const params = projectId ? { project: projectId } : {};
    const response = await this.api.get('/analytics/', { params });
    return response.data;
  }

  // Notification methods
  async getNotifications() {
    const response = await this.api.get('/notifications/');
    return response.data;
  }

  async markNotificationRead(id: string) {
    const response = await this.api.patch(`/notifications/${id}/`, { read: true });
    return response.data;
  }
}

export const apiService = new ApiService();
