import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateNote = (note) => {
  return axios.post(`/notes/${note._id}`, note);
};

export const useUpdateNote = (config) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    onMutate: async (updatedNote) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      // Snapshot the previous value
      const previousNotes = queryClient.getQueryData(['notes']);

      // Optimistically update to the new value
      queryClient.setQueryData(['notes'], (old) => [...old, updatedNote]);

      // Return a context object with the snapshotted value
      return { previousNotes };
    },
    onError: (err, updatedNote, context) => {
      queryClient.setQueryData(['notes'], context.previousNotes);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    mutationFn: updateNote,
  });
};
