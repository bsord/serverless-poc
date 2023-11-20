import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthenticatedUser } from './getAuthenticatedUser';
import storage from '@/utils/storage';

export const registerWithEmailAndPassword = (data) => {
  return axios.post('/auth/register', data);
};

async function saveTokenFromResponse(data) {
  const { token } = data;
  storage.auth.setToken(token);
  return token;
}

export const registerFn = async (data) => {
  const response = await registerWithEmailAndPassword(data);
  await saveTokenFromResponse(response);
  const user = await getAuthenticatedUser()
  return user;
}

export const useRegister = (config) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (user) => {
      console.log(user)
      storage.auth.setAuthenticatedUser(user)
      queryClient.invalidateQueries('authenticated-user');
    },
    queryKey: ['authenticated-user'],
    ...config,
    mutationFn: registerFn,
  });
};