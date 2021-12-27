import Header from './components/Header';
import React, { useState,useEffect} from 'react';
import LoginForm from './components/Auth/RegistrationForm';
import axios from 'axios';
import Swal from 'sweetalert2';
function App() {

  let [role, setRole] = useState('');
  let [loggedIn, setloggedIn] = useState(false);
  let [switcher, setSwitcher] = useState(false);
 


  useEffect(() => {
    setloggedIn(JSON.parse(window.localStorage.getItem('Token')))
    console.log(loggedIn);
  
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
      console.log(result.data);
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
  function handleLogin(e){
    e.preventDefault();
    let LoginData = {
      username: e.target.username.value,
      password: e.target.password.value,
    
    }
    axios.post('http://localhost:3001/signin', LoginData).then((result) => {
      const accessToken = result.data
      console.log(result.data);
      window.localStorage.setItem('Token', JSON.stringify(accessToken));
    }).catch(e => {
      console.log(e.message);
    })
    console.log(loggedIn);
    if (loggedIn) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your account created successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'username or password is incorrect',
      })
    }
  }
  function handleDropdownChange(e) {
    setRole(e.target.value)
  }
  return (
    <>
      <LoginForm
        handleSubmit={handleSubmit}
        handleDropdownChange={handleDropdownChange}
        handleLogin={handleLogin}
        switchBtn ={switchBtn}
        loggedIn = {loggedIn}
        switcher= {switcher}

      />

    </>
  );
}

export default App;
