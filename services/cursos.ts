import leogAPI from 'api/leogAPI';
import { FormData } from 'interfaces/cursos';
import { CursoI } from 'interfaces/cursos';

export const getCursos = async () => {
  const { data } = await leogAPI.get(`/admin/cursos`);
  return data;
};

export const addCurso = async (data: FormData) => {
  try {
    const response = await leogAPI.post(`/admin/cursos`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo agregar el curso');
  }
};

export const updateCurso = async (id: number, data: FormData) => {
  try {
    const response = await leogAPI.put(`/admin/cursos/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo actualizar el curso');
  }
};

export const eliminarCurso = async (id: number) => {
  const response = await leogAPI.delete(`/admin/cursos/${id}`);
  return response.data;
};

export const getCursoPorId = async (id: number) => {
  const response = await leogAPI.get(`/admin/cursos/${id}`);
  return response.data;
};
