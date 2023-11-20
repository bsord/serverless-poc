
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const createNote = ( data )  => {
    return axios.post('/notes', data);
}

export const createNoteFn = async (data) => {
    console.log(data)
    const {note} = await createNote(data);
    return note
}
  
export const useCreateNote = (config) => {
    return useMutation({
        onMutate: async (newNote) => {
            await queryClient.cancelQueries(['notes']);
      
            const previousNotes = queryClient.getQueryData(['notes']);
      
            queryClient.setQueryData(
              ['notes'],
              [...(previousNotes || []), newNote]
            );
                console.log(previousNotes)
            return { previousNotes };
        },
        onError: (_, __, context) => {
            if (context?.previousNotes) {
                queryClient.setQueryData(['notes'], context.previousNotes);
            }
        },
        onSuccess: (notes) => {
            console.log(notes)
            queryClient.invalidateQueries(['notes']);
        },
        ...config,
        mutationFn: createNoteFn,
    })
}