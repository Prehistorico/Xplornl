const API_URL = 'http://localhost:5000/api/posts';
const getToken = () => localStorage.getItem('token');

export const getPosts = async () => {
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error obteniendo posts');
  return data;
};

export const createPost = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData, 
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error creando el post');
  return data;
};

export const toggleLike = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}/like`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al dar like');
  return data;
};

export const approvePost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error aprobando post');
  return data;
};

export const rejectPost = async (postId) => {
  const response = await fetch(`${API_URL}/${postId}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error rechazando post');
  return data;
};
