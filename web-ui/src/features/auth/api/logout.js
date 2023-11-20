import { useMutation, useQueryClient } from '@tanstack/react-query';
import storage from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

export const logoutFn = async () => {
    storage.auth.clearToken()
    storage.auth.clearAuthenticatedUser()
}

export const useLogout = (config) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation({
    onSuccess: () => {
      console.log('logout')
        queryClient.setQueryData('authenticated-user', null)
        navigate('/')
    },
    ...config,
    mutationFn: logoutFn,
  });
};