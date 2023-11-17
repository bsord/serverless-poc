const apiDomain = window.REACT_APP_API_DOMAIN

// Register
export const register = (registration) => {
  return fetch(`https://${apiDomain}/auth/register`,{
    method: "POST",
    body: JSON.stringify(registration)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(error =>{
        throw new Error(error.message);
      })
    } else {
      return response.json()
    }
  })
}

// Add a new note
export const login = (credentials, callback) => {
  fetch(`https://${apiDomain}/auth/login`,{
    method: "POST",
    body: JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then( data => {
    data.success = true;
    callback(data);
  }).catch (error => {
    callback({ success: false, msg: "Error calling api.", status: error.response && error.response.status ? error.response.status : 'Invalid status' });
  })
}