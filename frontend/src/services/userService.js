const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: userData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar el usuario');
  }

  return data;
};
