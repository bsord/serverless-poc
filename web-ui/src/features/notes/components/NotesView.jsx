import {useContext } from 'react';

import AddNote from './AddNote';
import NotesList from './NotesList';
import { NotesContext } from '../contexts/NotesContext';
import { Typography } from '../../../components/Elements';

export const NotesView = () => {

  const {notes, deleteNote} = useContext(NotesContext);

  return (
    <div className='max-w-md'>

      <div
        className='mt-6 flex flex-col items-center'
      >
        <Typography variant="h3">
          Notes
        </Typography>

        <AddNote/>
        <NotesList notes={notes} deleteNote={deleteNote}/>

      </div>
      
    </div>

  );
}