const apiDomain = window.REACT_APP_API_DOMAIN;

// Get all Notes
export const getNotes = (callback) => {
  fetch(`https://${apiDomain}/notes`)
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};

// Add a new note
export const addNote = (note, callback) => {
  fetch(`https://${apiDomain}/notes`, {
    method: 'POST',
    body: JSON.stringify({
      text: note,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};

// Update a note
export const updateNote = (note, callback) => {
  fetch(`https://${apiDomain}/notes/${note._id}`, {
    method: 'POST',
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};

// delete a note
export const deleteNote = (note, callback) => {
  fetch(`https://${apiDomain}/notes/${note._id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      data.success = true;
      callback(data);
    })
    .catch((error) => {
      console.log(error);
      callback({
        success: false,
        msg: 'Error calling api.',
        status: error.response && error.response.status ? error.response.status : 'Invalid status',
      });
    });
};
