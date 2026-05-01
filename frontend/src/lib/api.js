import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchCaseStudies      = () => api.get('/case-studies').then(r => r.data.data);
export const fetchCaseStudyBySlug  = (slug) => api.get(`/case-studies/${slug}`).then(r => r.data.data);
export const fetchPosts            = (params) => api.get('/posts', { params }).then(r => r.data);
export const fetchFeaturedPosts    = () => api.get('/posts/featured').then(r => r.data.data);
export const fetchPostBySlug       = (slug) => api.get(`/posts/${slug}`).then(r => r.data.data);
export const fetchServices         = () => api.get('/services').then(r => r.data.data);
export const fetchServiceBySlug    = (slug) => api.get(`/services/${slug}`).then(r => r.data.data);
export const fetchClients          = () => api.get('/clients').then(r => r.data.data);
export const fetchResources        = () => api.get('/resources').then(r => r.data.data);
export const fetchAwards           = () => api.get('/awards').then(r => r.data.data);
export const submitContact         = (data) => api.post('/contact', data).then(r => r.data);
export const subscribeNewsletter   = (email) => api.post('/newsletter/subscribe', { email }).then(r => r.data);

export default api;
