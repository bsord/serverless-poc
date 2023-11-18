
import { useState, useContext } from 'react';
import { Input } from '../../../components/Elements';

import { NotesContext } from '../contexts/NotesContext';
import {LinearProgress} from '../../../components/Elements';

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
        <form onSubmit={(event)=>{handleSubmit(event)}} >
            <Input
                id="note"
                label="Note"
                name="note"
                autoComplete="note"
                autoFocus
                value={text}
                onChange={(e)=>{handleChange(e)}}
            />
            {loading && <LinearProgress/>}
        </form>
    );
}

export default AddNote;
