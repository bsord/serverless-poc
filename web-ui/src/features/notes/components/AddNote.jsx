import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateNote } from '../api/createNote'

const AddNote = () => {
  const { mutate: createNote, isPending, error } = useCreateNote()

  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (text !== '') {
      createNote(
        {
          text: text,
        },
        {
          onSuccess: () => {
            console.log('created note')
            setText('')
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setText(event.currentTarget.value)
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event)
      }}
    >
      <Input
        id="note"
        label="Note"
        name="note"
        autoComplete="note"
        autoFocus
        value={text}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default AddNote
