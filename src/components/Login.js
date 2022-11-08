import React from 'react'
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from './login.png';
import './login.css';

const Login = ( {setIsAuth }) => {
  let navigate= useNavigate();

const signInWithGoogle= () => {
  signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
  });
}

  return (
    <div className= 'loginPage'>
      <img src= { logo } />
      <p>Signup with google to continue</p>
      <Button style={{
        borderRadius: 35,
        backgroundColor: 'rgb(82, 215, 206)',
        padding: "18px 36px",
        fontSize: "18px"
    }} variant="contained" onClick= { signInWithGoogle }>SignIn</Button>
    </div>
  )
}

export default Login