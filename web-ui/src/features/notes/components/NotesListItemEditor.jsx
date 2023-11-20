import { useState } from 'react';
import { Input, Button } from '../../../components/Elements';

import { LinearProgress } from '../../../components/Elements';
import { useDeleteNote } from '../api/deleteNote';
import { useUpdateNote } from '../api/updateNote';

const NotesListItemEditor = ({ note, handleClose }) => {
  const { mutate: deleteNote, isPending: isDeletePending, error: deleteError } = useDeleteNote();
  const { mutate: updateNote, isPending: isUpdatePending, error: updateError } = useUpdateNote();

  const [_note, setNote] = useState(note);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_note.text !== '') {
      updateNote(_note, {
        onSuccess: () => {
          console.log('updated note');
          handleClose();
        },
      });
    }
  };

  const handleTextChange = (event) => {
    setNote({
      ..._note,
      text: event.currentTarget.value,
    });
  };

  const handleDelete = () => {
    deleteNote(note._id, {
      onSuccess: () => {
        console.log('created note');
        handleClose();
      },
    });
  };

  const handleOnBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      handleClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      if (_note.text !== '') {
        updateNote(_note);
      }
      setNote(note);
      handleClose();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      onBlur={(event) => {
        handleOnBlur(event);
      }}
    >
      <Input
        margin="normal"
        id="note"
        label="Note"
        name="note"
        autoComplete="note"
        autoFocus
        multiline="true"
        value={_note.text}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        onChange={(e) => {
          handleTextChange(e);
        }}
      />
      <Button
        onClick={() => {
          handleDelete();
        }}
      >
        x
      </Button>
      {isDeletePending || (isUpdatePending && <LinearProgress />)}
      {deleteError || (updateError && <span>failed to delete</span>)}
    </form>
  );
};

export default NotesListItemEditor;
