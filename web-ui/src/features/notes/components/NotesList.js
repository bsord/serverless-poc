
import NoteListItem from "./NotesListItem";
import { List } from '../../../components/Elements';
import { useContext } from "react";

import { NotesContext } from "../contexts/NotesContext";

const NotesList = () => {

    const { notes, deleteNote } = useContext(NotesContext);

    return (
        <List>
  
            {notes.map((note, key)=>{
                return <NoteListItem key={key} note={note} deleteNote={deleteNote}/>
            })}

      </List>
    );
  }
  
  export default NotesList;