const API_URL = 'http://localhost:5000/api/posts';

export const getPosts = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {throw new Error(data.message || 'Error obteniendo posts');}
  return data;
};