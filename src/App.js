import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import './App.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { Typography, BottomNavigation, BottomNavigationAction, styled } from '@mui/material';

const Bn2 = styled(BottomNavigationAction)`
color: #008aa3;
`
const Bn1= styled(BottomNavigation)`
  border-bottom: 2px solid rebeccapurple;
`

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut= () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname= '/login';
    })
  }
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <Router>
          <Bn1 value={value} onChange={handleChange} showLabels={true} >
          <Bn2 label= "Home" value="/" component={Link} to='/'/>
          {!isAuth && <Bn2 label="Login" value="/login" component={Link} to='/login'/> }
          {isAuth && <Bn2 label="Create" value="/createpost" component={Link} to='/createpost'/>  }              
          {isAuth && <Bn2 label="Signout" onClick= { signUserOut } /> }
          </Bn1>
      <Routes>
        <Route path= '/' element= {<Home isAuth= { isAuth }/>} />
        <Route path= '/createpost' element= {<CreatePost isAuth= {isAuth} />} />
        <Route path= '/login' element= {<Login setIsAuth= { setIsAuth } />} />
      </Routes>
    </Router>
  );
}

export default App;
