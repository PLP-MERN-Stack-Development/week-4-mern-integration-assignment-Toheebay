// src/api/index.js
import axios from 'axios';

// Use .env variable
const baseURL = process.env.REACT_APP_API_URL || 'https://pilgimsblog-1.onrender.com';

if (!process.env.REACT_APP_API_URL) {
  console.warn("⚠️ REACT_APP_API_URL not set. Using fallback: http://localhost:5000/api");
}

const API = axios.create({
  baseURL,
  withCredentials: true, // Optional: only needed if your API sets cookies
});

// Posts
export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Categories
export const getCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);

// Auth
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (credentials) => API.post('/auth/register', credentials);
