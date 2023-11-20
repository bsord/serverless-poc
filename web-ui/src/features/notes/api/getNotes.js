import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getNotes = () => {
  return axios.get(`/notes`);
};

export const getNotesFn = async () => {
  const { notes } = await getNotes();
  return notes;
};

export const useNotes = (config) => {
  return useQuery({
    ...config,
    queryKey: ['notes'],
    queryFn: getNotesFn,
  });
};
