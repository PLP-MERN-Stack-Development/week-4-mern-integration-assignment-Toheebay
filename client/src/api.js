import axios from 'axios';

// Base URL (local or production)
const baseURL = process.env.REACT_APP_API_URL || 'https://pilgimsblog-1.onrender.com/api';

if (!process.env.REACT_APP_API_URL) {
  console.warn('⚠️ REACT_APP_API_URL not set. Using fallback:', baseURL);
}

const API = axios.create({
  baseURL,
  withCredentials: true, // if you're using cookies for auth
});

// ========== POSTS ==========
export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post('/posts', data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.post(`/posts/${id}/like`);

// ========== CATEGORIES ==========
export const getCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);

// ========== AUTH ==========
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (credentials) => API.post('/auth/register', credentials);

// ========== COMMENTS ==========
export const addComment = (postId, data) => API.post(`/comments/${postId}`, data);
export const getComments = (postId) => API.get(`/comments/${postId}`);
export const updateComment = (commentId, data) => API.put(`/comments/${commentId}`, data);
export const deleteComment = (commentId) => API.delete(`/comments/${commentId}`);
export const likeComment = (commentId) => API.post(`/comments/${commentId}/like`);

// ========== REPLIES (optional structure) ==========
export const addReply = (postId, commentId, data) =>
  API.post(`/comments/${postId}/${commentId}/reply`, data);

export const updateReply = (postId, commentId, replyId, data) =>
  API.put(`/comments/${postId}/${commentId}/reply/${replyId}`, data);

export const deleteReply = (postId, commentId, replyId) =>
  API.delete(`/comments/${postId}/${commentId}/reply/${replyId}`);
