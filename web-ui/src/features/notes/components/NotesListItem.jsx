import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import NotesListItemEditor from './NotesListItemEditor';

const NoteListItem = (props) => {
  const { note } = props;
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <NotesListItemEditor
          note={note}
          handleClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ListItem
          onClick={() => {
            setEditMode(true);
          }}
        >
          <Typography variant="h5">{note.text}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default NoteListItem;
