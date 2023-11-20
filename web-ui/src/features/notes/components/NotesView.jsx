import AddNote from './AddNote';
import NotesList from './NotesList';
import { Typography } from '../../../components/Elements';

export const NotesView = () => {
  return (
    <div className="max-w-md">
      <div className="mt-6 flex flex-col items-center">
        <Typography variant="h3">Notes</Typography>

        <AddNote />
        <NotesList />
      </div>
    </div>
  );
};
