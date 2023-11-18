import React, { useState } from 'react';

import * as AuthService from '../features/auth/api/AuthService';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

  //initial state
  const initialState = {
    // set initial state to local storage if defined.
    authenticated: localStorage.getItem('authenticated') && localStorage.getItem('authenticated') !== undefined ? localStorage.getItem('authenticated') : false,
    token: localStorage.getItem('token') && localStorage.getItem('token') !== undefined ? localStorage.getItem('token') : null
  }

  const [state, setState] = useState(initialState);

  const register = (registration, callback) => {
    AuthService.register(registration)
    .then((response)=>{
        localStorage.setItem('authenticated', response.auth)
        localStorage.setItem('token', response.token)
        setState({
          authenticated: response.auth,
          token: response.token
        })
        callback && callback({success: true})
    }).catch (error => {
      callback && callback({ success: false, message: error.message});
    })
  }

  const login = (credentials, callback) => {
    AuthService.register( credentials, (response)=>{
      if (response.success) {

        localStorage.setItem('authenticated', true)
        localStorage.setItem('token', response.token)

        setState({
          authenticated: true,
          token: response.token
        })

        callback && callback(true)
      } else {
        callback && callback(false)
        //TODO: Handle Failure
      }
    })
  }

  const logout = (callback) => {
    localStorage.removeItem('authenticated')
    localStorage.removeItem('token')

    setState({
      authenticated: false,
      token: null
    })
    callback && callback(true)
  }

  return (
    <AuthContext.Provider value={{
        authenticated: state.authenticated,
        token: state.token,
        login: login,
        logout: logout,
        register: register
      }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;