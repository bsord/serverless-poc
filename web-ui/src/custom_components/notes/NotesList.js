
import NoteListItem from "./NotesListItem";
import List from '@mui/material/List';
import { useContext } from "react";

import { NotesContext } from "../../contexts/NotesContext";

const NotesList = () => {

    const { notes, deleteNote } = useContext(NotesContext);

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
            aria-labelledby="nested-list-subheader"
            
        >
  
            {notes.map((note, key)=>{
                return <NoteListItem key={key} note={note} deleteNote={deleteNote}/>
            })}

      </List>
    );
  }
  
  export default NotesList;