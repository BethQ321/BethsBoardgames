import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, useNavigate, Route, Routes } from 'react-router-dom';
import api from './api';
import Home from './Home';
import SignIn from './SignIn';
import Products from './Products';
import SignUp from './SignUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Css } from '@mui/icons-material';

const defaultTheme = createTheme({
  palette: {
    //check variations to see if light and dark are correct
    mode: 'light',
    //prussian blue
    primary: {
      main: '#003366',
      light: '#bbe4f2',
      dark: '#66c4e1',
      contrastText: '#3d3d3d',
    },
    //atomic tangerine
    secondary: {
      main: '#ff9966',
      light: '#f8f3dd',
      dark: '#eadb99',
    },
    //cerulean blue 
    accentBlue: {
      dark: '#c999ff',
      main: '#277490',
      light: '#e9d6ff',
    },
    //tiffany blue
    accentTeal: {
      dark: '#FE86AE',
      main: '#89D2CA',
      light: '#FEC2D6',
      darkest: '#fd5d93'
    },
  
    //very light cream
    background: {
      default: '#f3eedc',
    },
    text: {
      primary: 'rgba(20,20,20,1)',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontWeightLight: 200,
    fontFamily: 'ABeeZee',
    h1: {
      fontFamily: 'ABeeZee',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'ABeeZee',
      fontWeight: 800,
    },
    h3: {
      fontFamily: 'ABeeZee',
      fontWeight: 800,
    },
    h4: {
      fontFamily: 'ABeeZee',
      fontWeight: 800,
    },
    h5: {
      fontFamily: 'ABeeZee',
      fontWeight: 800,
    },
    h6: {
      fontFamily: 'ABeeZee',
      fontWeight: 800,
    },
    body1: {
      fontWeight: 550
    },
    body2: {
      fontWeight: 500
    }
  },
});

const App = () => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
    navigate("/");
  };

  const logout = () => {
    api.logout(setAuth);
    navigate("/");
   }; 

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<Home user={auth} logout={logout} setUser={setAuth} />} />
        <Route path="/sign-in" element={<SignIn login={login} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);