import SingleNote from "./SingleNote";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';


const NotesList = (props) => {
    const { notes, deleteNote } = props
    
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Notes
                </ListSubheader>
            }
        >
  
            {notes.map((note, key)=>{
                return <SingleNote key={key} note={note} deleteNote={deleteNote}/>
            })}

      </List>
    );
  }
  
  export default NotesList;