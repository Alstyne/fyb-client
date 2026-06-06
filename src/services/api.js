import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Attach token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('fyb_token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Invites
export const createInvite = (data) => API.post('/invites', data);
export const getAllInvites = () => API.get('/invites');
export const validateInvite = (token) => API.get(`/invites/validate/${token}`);
export const deleteInvite = (id) => API.delete(`/invites/${id}`);

// Users
export const getAllUsers = () => API.get('/users');
export const getUserById = (id) => API.get(`/users/${id}`);
export const updateProfile = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Memories
export const getAllMemories = () => API.get('/memories');
export const addMemory = (data) => API.post('/memories', data);
export const deleteMemory = (id) => API.delete(`/memories/${id}`);

// Comments
export const addComment = (data) => API.post('/comments', data);
export const getCommentsByProfile = (profileId) => API.get(`/comments/${profileId}`);
export const deleteComment = (id) => API.delete(`/comments/${id}`);

// Likes
export const toggleLike = (data) => API.post('/likes/toggle', data);
export const checkLike = (memoryId) => API.get(`/likes/check/${memoryId}`);

// Upload profile image
export const uploadProfileImage = (formData) =>
  API.post('/upload/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Upload memory image
export const uploadMemoryImage = (formData) =>
  API.post('/upload/memory', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // Profile (full finalist card)
export const updateFullProfile = (id, data) => API.put(`/users/${id}`, data);

// Carousel
export const getFeatured = () => API.get('/carousel');
export const refreshFeatured = () => API.delete('/carousel/refresh');

// Admin
export const getAnalytics        = ()     => API.get('/admin/analytics');
export const adminGetMemories    = ()     => API.get('/admin/memories');
export const adminDeleteMemory   = (id)   => API.delete(`/admin/memories/${id}`);
export const adminGetComments    = ()     => API.get('/admin/comments');
export const adminDeleteComment  = (id)   => API.delete(`/admin/comments/${id}`);
export const setFeatured         = (data) => API.post('/admin/carousel/set', data);
export const adminRefreshCarousel= ()     => API.delete('/admin/carousel/refresh');

// Feed
export const getFeedPosts       = ()     => API.get('/feed');
export const createPost         = (data) => API.post('/feed', data);
export const deletePost         = (id)   => API.delete(`/feed/${id}`);
export const togglePostLike     = (data) => API.post('/feed/like', data);
export const getPostComments    = (id)   => API.get(`/feed/${id}/comments`);
export const addPostComment     = (data) => API.post('/feed/comment', data);
export const deletePostComment  = (id)   => API.delete(`/feed/comment/${id}`);

// Wall
export const getWall            = ()     => API.get('/wall');
export const upsertWallEntry    = (data) => API.post('/wall', data);
export const deleteWallEntry    = ()     => API.delete('/wall');