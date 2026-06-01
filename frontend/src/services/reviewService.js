const API_URL = 'http://localhost:5000/api/reviews';
const getToken = () => localStorage.getItem('token');

export const getReviewsByPlace = async (placeId) => {
  const response = await fetch(`${API_URL}/place/${placeId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error obteniendo reseñas');
  return data;
};

export const createReview = async ({ place, title, description, rating }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ place, title, description, rating })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error creando reseña');
  return data;
};

export const updateReview = async (reviewId, { title, description, rating }) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ title, description, rating })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error actualizando reseña');
  return data;
};

export const deleteReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error eliminando reseña');
  return data;
};

export const approveReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/${reviewId}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error aprobando reseña');
  return data;
};

export const rejectReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/${reviewId}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error rechazando reseña');
  return data;
};