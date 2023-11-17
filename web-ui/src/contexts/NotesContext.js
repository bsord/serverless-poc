import React, { useState, useEffect } from 'react';

import * as NotesService from '../services/NotesService';

export const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
  console.log('notes context')

  //initial state
  const initialState = {
    // set initial state to local storage if defined.
    notes: localStorage.getItem('notes') && localStorage.getItem('notes') !== undefined ? JSON.parse(localStorage.getItem('notes')) : [],
  }

  const [state, setState] = useState(initialState);

  const addNote = (note, callback) => {
    NotesService.addNote( note, (response)=>{
      if (response.success) {

        const newNotes = [
          ...state.notes,
          response.note
        ]

        localStorage.setItem('notes', JSON.stringify(newNotes))

        setState({
          notes: newNotes
        })
        callback && callback(true)
      } else {
        callback && callback(false)
        //TODO: Handle Failure
      }
    })
  }

  const getNotes = (callback) => {
    // call notes services to get notes and save to context/localstorage
    NotesService.getNotes((response)=>{
      if (response.success) {

        localStorage.setItem('notes', JSON.stringify(response.notes))

        setState({
          notes: response.notes
        })

        callback && callback(true)
      } else {
        callback && callback(false)
        //TODO: Handle Failure
      }
    })
  }

  const updateNote = (note, callback) => {
    NotesService.updateNote( note, (response)=>{
      if (response.success) {

        const index = state.notes.findIndex((note => note._id === response.note._id));
        let newNotes = state.notes
        newNotes[index] = response.note

        localStorage.setItem('notes', JSON.stringify(newNotes))

        setState({
          notes: newNotes
        })
        callback && callback(true)
      } else {
        callback && callback(false)
        //TODO: Handle Failure
      }
    })
  }

  const deleteNote = (note, callback) => {
    NotesService.deleteNote( note, (response)=>{
      if (response.success) {

        const newNotes = state.notes.filter(item=>{
          return item._id !== note._id
        })

        localStorage.setItem('notes', JSON.stringify(newNotes))

        setState({
          notes: newNotes
        })
        callback && callback(true)
      } else {
        callback && callback(false)
        //TODO: Handle Failure
      }
    })
  }

  // on first load, fetch notes and save to state as well as local storage
  useEffect(() => {
    NotesService.getNotes((response)=>{
      if (response.success) {

        localStorage.setItem('notes', JSON.stringify(response.notes))
        setState({
          notes: response.notes
        })

      } else {
        //TODO: Handle Failure
      }
    })
  }, []);

  return (
    <NotesContext.Provider value={{
        notes: state.notes,
        addNote: addNote,
        getNotes: getNotes,
        updateNote: updateNote,
        deleteNote: deleteNote
      }}>
      {children}
    </NotesContext.Provider>
  );

};

export default NotesProvider;