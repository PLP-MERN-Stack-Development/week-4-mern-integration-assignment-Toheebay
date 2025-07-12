// src/api/index.js
import axios from 'axios';

// ✅ Safely read VITE_API_URL with fallback
const baseURL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

if (!import.meta.env?.VITE_API_URL) {
  console.warn("⚠️ VITE_API_URL is not defined. Falling back to http://localhost:5000/api");
}

// ✅ Create Axios instance
const API = axios.create({
  baseURL,
  withCredentials: true, // Optional: Enable if using cookies or sessions
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
