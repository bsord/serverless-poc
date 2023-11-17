import { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import NotesListItemEditor from './NotesListItemEditor';

const NoteListItem = (props) => {
  const { note } = props
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      {editMode? (
        <NotesListItemEditor note={note} handleClose={()=>{setEditMode(false)}}/>
      ): (
        <ListItemButton onClick={()=>{setEditMode(true)}}>
          <ListItemText primary={note.text}  primaryTypographyProps={{ style: { whiteSpace: "normal" } }} />
        </ListItemButton>
      )}
      <Divider  component="li" />
    </>
  );
  
}

export default NoteListItem;
