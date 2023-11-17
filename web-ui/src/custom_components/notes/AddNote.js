
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { NotesContext } from '../../contexts/NotesContext';
import LinearIndeterminate from '../LinearProgress';

const AddNote = () => {

    const { addNote } = useContext(NotesContext);

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(text !== ""){
            setLoading(true)
            addNote(text, (success)=>{
                if(success){
                    setText('')
                }
                setLoading(false)
            })
        }
        
    };

    const handleChange = (event) => {
        setText(event.currentTarget.value)
    }
    

    return (
        <Box component="form" onSubmit={(event)=>{handleSubmit(event)}} noValidate sx={{ mt: 1, width: '100%', }}>
            <TextField
                margin="normal"
                fullWidth
                id="note"
                label="Note"
                name="note"
                autoComplete="note"
                autoFocus
                value={text}
                onChange={(e)=>{handleChange(e)}}
            />
            {loading && <LinearIndeterminate/>}
        </Box>
    );
}

export default AddNote;
