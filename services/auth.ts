import leogAPI from 'api/leogAPI';

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await leogAPI.post(`/auth/iniciar-sesion`, data);
  return response.data;
};

export const registerUser = async (data: { nombre: string; email: string; password: string }) => {
  const response = await leogAPI.post(`/auth/registrar-usuario`, data);
  return response.data;
};
