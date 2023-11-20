import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteNote = (noteId) => {
  return axios.delete(`/notes/${noteId}`);
};

export const useDeleteNote = (config) => {
  return useMutation({
    onMutate: async (deletedNote) => {
      await queryClient.cancelQueries(['notes']);

      const previousNotes = queryClient.getQueryData(['notes']);

      queryClient.setQueryData(
        ['notes'],
        previousNotes?.filter((note) => note._id !== deletedNote._id)
      );

      return { previousNotes };
    },
    onError: (_, __, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
    ...config,
    mutationFn: deleteNote,
  });
};