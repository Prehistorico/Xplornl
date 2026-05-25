const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Error al actualizar el usuario');
    throw error;
  }
  return data;
};
