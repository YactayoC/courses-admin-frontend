import leogAPI from 'api/leogAPI';

export const getCommentsByIdCourse = async (idCourse: string) => {
  const response = await leogAPI.get(`/comment/${idCourse}`);
  return response.data;
};

export const addComment = async (data: { usuarioId: number; cursoId: number; comentario: string }) => {
  const response = await leogAPI.post(`/comment`, data);
  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await leogAPI.delete(`/comment/${id}`);
  return response.data;
};

