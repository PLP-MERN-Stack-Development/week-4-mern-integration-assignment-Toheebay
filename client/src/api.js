// src/api/index.js
import axios from 'axios';

// ✅ Automatically use the deployed Render backend via env variable
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
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

// Auth (if you use login/register)
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (credentials) => API.post('/auth/register', credentials);
