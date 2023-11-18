
import { useState, useContext } from 'react';
import { Input, Button} from '../../../components/Elements';

import { NotesContext } from '../contexts/NotesContext';
import { LinearProgress } from '../../../components/Elements';

const NotesListItemEditor = ({note, handleClose}) => {
    const { updateNote, deleteNote } = useContext(NotesContext);

    const [_note, setNote] = useState(note)
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(_note.text !== ""){
            setLoading(true)
            updateNote(_note, (success)=>{
                if(success){
                    setNote(note)
                    handleClose()
                }
                setLoading(false)
            })
        }
        
    };

    const handleTextChange = (event) => {
        setNote({
            ..._note,
            text: event.currentTarget.value
        })
    }

    const handleDelete = (event) => {
        setLoading(true)
        deleteNote(note, (success)=>{
            if (success) {
                handleClose()
            }
            setLoading(false)
        })
        
    }
    
    const handleOnBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)){
            handleClose()
        }

    }

    const handleKeyDown = (event) =>{
        if(event.keyCode === 13 && !event.shiftKey){
            if(_note.text !== ""){
                updateNote(_note)
            }
            setNote(note)
            handleClose()
        }
    }

    return (
        <form component="form" onSubmit={(event)=>{handleSubmit(event)}} noValidate sx={{ mt: 1, mb:2, width: '100%' }} onBlur={(event)=>{handleOnBlur(event)}}>
            <Input
                margin="normal"
                id="note"
                label="Note"
                name="note"
                autoComplete="note"
                autoFocus
                multiline="true"
                value={_note.text}
                onKeyDown={(e)=>{handleKeyDown(e)}}
                onChange={(e)=>{handleTextChange(e)}}
            />
            <Button onClick={()=>{handleDelete()}}>
                x
            </Button>
            {loading && <LinearProgress/>}
        </form>

    );
}

export default NotesListItemEditor;
