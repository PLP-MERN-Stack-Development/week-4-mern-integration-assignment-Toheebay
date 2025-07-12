// src/api/index.js
import axios from 'axios';

// ✅ Use environment variable or fallback for development
const baseURL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

if (!import.meta.env?.VITE_API_URL) {
  console.warn("⚠️ VITE_API_URL not set. Using fallback: http://localhost:5000/api");
}

// ✅ Create Axios instance
const API = axios.create({
  baseURL,
  withCredentials: true, // Enable if using cookies/auth sessions
});

// ✅ Post APIs
export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// ✅ Category APIs
export const getCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);

// ✅ Auth APIs
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (credentials) => API.post('/auth/register', credentials);

// ✅ Optional: Export API instance for custom requests if needed elsewhere
export default API;
