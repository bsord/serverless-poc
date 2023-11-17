import * as React from 'react';
import {useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import EditNote from '@mui/icons-material/EditNote';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AddNote from '../custom_components/notes/AddNote';
import NotesList from '../custom_components/notes/NotesList';
import { NotesContext } from '../contexts/NotesContext';
import Copyright from '../custom_components/Copyright';

const NotesView = () => {

  const {notes, deleteNote} = useContext(NotesContext);

  return (
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EditNote />
        </Avatar>

        <Typography component="h1" variant="h5">
          Notes
        </Typography>

        <AddNote/>
        <NotesList notes={notes} deleteNote={deleteNote}/>

      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
      
    </Container>

  );
}

export default NotesView