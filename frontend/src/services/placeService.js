const API_URL = 'http://localhost:5000/api/places';

export const getPlaces = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {throw new Error(data.message || 'Error obteniendo lugares');}
  return data;
};