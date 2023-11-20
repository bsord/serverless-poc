import NoteListItem from './NotesListItem';
import { List } from '../../../components/Elements';

import { useNotes } from '../api/getNotes';

const NotesList = () => {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>There was an error</span>;
  }

  return (
    <List>
      {notes?.map((note, key) => {
        return <NoteListItem key={key} note={note} />;
      })}
    </List>
  );
};

export default NotesList;
