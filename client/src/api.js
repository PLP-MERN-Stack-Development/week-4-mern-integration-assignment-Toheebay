// src/api/index.js
import axios from 'axios';

// ✅ Axios instance using env variable with fallback
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api`,
  withCredentials: true, // Optional: if using cookies/auth
});

// ✅ Posts API
export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// ✅ Categories API
export const getCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);

// ✅ Auth API
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (credentials) => API.post('/auth/register', credentials);
