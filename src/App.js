import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import LoginForm from './components/Auth/RegistrationForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import store from './components/reducers/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { If, Else, Then, } from 'react-if';
import Home from './components/Home'
function App(props) {
  const [role, setRole] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  useEffect(() => {
    store.dispatch({
      type: 'SET_USER_TOKEN',
      payload: JSON.parse(window.localStorage.getItem('Token'))
    })
  }, [])
  function switchBtn(e) {
    setSwitcher(e)
  }
  function handleSubmit(e) {
    e.preventDefault();
    let registerData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: role,
    }
    axios.post('http://localhost:3001/signup', registerData).then((result) => {
    ;
    }).catch(e => {
      console.log(e.message);
    })

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your account created successfully',
      showConfirmButton: false,
      timer: 1500
    })
    switchBtn(false)
  }
  async function handleLogin(e) {
    e.preventDefault();
    let LoginData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    await axios.post('http://localhost:3001/signin', LoginData).then((result) => {
      const accessToken = result.data.accessToken
      if (!accessToken) {
        return
      }
      store.dispatch({
        type: 'SET_USER_TOKEN',
        payload: accessToken
      })
      window.localStorage.setItem('Token', JSON.stringify(accessToken));
  
      //TODO logiend
    }).catch(e => {
      console.log(e.message);
    })
    let token
    let tokenstoarge = window.localStorage.getItem('Token')
    if (tokenstoarge) {
      token = JSON.parse(window.localStorage.getItem('Token'));
    }
    if (token) {
      setLoggedIn(true)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You logged in successfully',
        showConfirmButton: false,
        timer: 1500
      })
    } if (!token || token == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'username or password is incorrect',
      })
    }
    console.log(loggedIn);
  }
  function handleDropdownChange(e) {
    setRole(e.target.value)
  }

  {/*  */ }
  return (
    <>
      <div >
        <BrowserRouter>
          <If condition={!props.userToken}>
            <Then>
              <LoginForm
                handleSubmit={handleSubmit}
                handleDropdownChange={handleDropdownChange}
                handleLogin={handleLogin}
                switchBtn={switchBtn}
                loggedIn={loggedIn}
                switcher={switcher}
                Token={props.userToken} />
            </Then>
            <Else>
              <Header
                setLoggedIn={setLoggedIn} />
              <Home></Home>
            </Else>
          </If>
        </BrowserRouter>
      </div>
    </>
  );
}
export default connect(function (state) {
  return state
})(App) 
