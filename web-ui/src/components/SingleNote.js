import ListItemText from '@mui/material/ListItemText';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import ListItemIcon  from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';


const SingleNote = (props) => {
  const { note, deleteNote } = props

  return (
    <>
      <ListItemButton>
        <ListItemText primary={note.text}  />
        <ListItemIcon onClick={()=>{deleteNote(note._id)}}>

            <DeleteForever />
        </ListItemIcon>
      </ListItemButton>
      <Divider  component="li" />
    </>
  );
}

export default SingleNote;
