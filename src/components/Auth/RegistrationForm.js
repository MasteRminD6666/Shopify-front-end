import React, { useState, useContext } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';

function Registration(props) {
  let roles = [
    { label: 'Buyer', value: 1 },
    { label: 'Seller', value: 2 },
  ]
// this switcher for to change login state 
  return (
    <>
      {!props.loggedIn && (
        <div className="login-page">
          <div className="form">
            {props.switcher && (
              <form onSubmit={props.handleSubmit} className="login-form">
                <input type="email"  name="email" placeholder="email"  required/>
                <input type="text" name="username" placeholder="username" required />
                <input type="password" name="password" placeholder="password"required />
                <Form.Select onChange={props.handleDropdownChange}>
                <option value="" disabled selected>Select your role</option>
                  {roles.map((role) => {
                  return <option name ="role" value={role.value} required >{role.label}</option>
                  })}
                </Form.Select>
                <br></br>
                <button>create</button>
                <p className="message">
                  Already registered?{' '}
                  <a onClick={() => props.switchBtn(false)} href="#">
                    Sign In
                  </a>
                </p>
             
              </form>
            )}
            {!props.switcher && (
              <form className="login-form" onSubmit={props.handleLogin}>
                <input type="text"  name="username" placeholder="username" required/>
                <input type="password"  name="password" placeholder="password"required />
                <button>login</button>
                <p className="message">
                  Not registered?{' '}
                  <a onClick={() => props.switchBtn(true)} href="#">
                    Create an account
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Registration;