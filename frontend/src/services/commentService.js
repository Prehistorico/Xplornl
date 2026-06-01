const API_URL = "http://localhost:5000/api/comments";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

export const getComments = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener comentarios");
  }

  return data;
};

export const getCommentsByPost = async (postId) => {
  const response = await fetch(
    `${API_URL}/post/${postId}`,
    {
      headers: getHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener comentarios");
  }

  return data;
};

export const getCommentById = async (commentId) => {
  const response = await fetch(
    `${API_URL}/${commentId}`,
    {
      headers: getHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener comentario");
  }

  return data;
};

export const createComment = async ({
  post,
  description
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders()
    },
    body: JSON.stringify({
      post,
      description
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear comentario");
  }

  return data;
};

export const updateComment = async (
  commentId,
  description
) => {
  const response = await fetch(
    `${API_URL}/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders()
      },
      body: JSON.stringify({
        description
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar comentario");
  }

  return data;
};

export const deleteComment = async (
  commentId
) => {
  const response = await fetch(
    `${API_URL}/${commentId}`,
    {
      method: "DELETE",
      headers: getHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar comentario");
  }

  return data;
};

export const toggleLikeComment = async (
  commentId
) => {
  const response = await fetch(
    `${API_URL}/${commentId}/like`,
    {
      method: "PATCH",
      headers: getHeaders()
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al dar like");
  }

  return data;
};

export const approveComment = async (commentId) => {
  const response = await fetch(`${API_URL}/${commentId}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error aprobando comentario');
  return data;
};

export const rejectComment = async (commentId) => {
  const response = await fetch(`${API_URL}/${commentId}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error rechazando comentario');
  return data;
};