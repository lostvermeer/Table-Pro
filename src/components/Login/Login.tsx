import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, CircularProgress, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import useSignUp from './SignUp';


export default function Login() {

  // Destructuring SignUp component
  const {username, password, rememberMe, setFormInValid, setErrorMessege, setSubmitLoading, render} = useSignUp(userAuthorization);

  //Loading
  const [loading, setLoading] = useState(true);

  // Navigation
  const navigate = useNavigate();

  useEffect(() => {

    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (token) navigate ("/data-table");

    setLoading(false);
    
  }, [navigate]);

  // Call the login API
  async function userAuthorization () {
   
    const responce = await fetch('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: username, 
        password: password
      })
    });

    if (responce.ok) {
      const responceData = await responce.json();
      
      if (responceData.data) {
        
        if (rememberMe){
          localStorage.setItem('authToken', responceData.data.token);
        }
        
        navigate("/data-table");

      } else {

        setErrorMessege("Username or password is incorrect");
        setSubmitLoading(false);
        setFormInValid(true);
        return;
      }

    } else {

      setErrorMessege("Username or password is incorrect");
      setSubmitLoading(false);
      setFormInValid(true);
      return;
    }

  }

  return (
    <>
      { loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
          }}
        >
          <CircularProgress size={100} />
        </Box>
        ) : (
          <Container
            maxWidth= "sm"
            sx={{
                  m: '0 auto',
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '70vh'
                }}
          > 
            <Paper elevation={5} style={{padding: '20px', textAlign: 'center'}}>

              <LockIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography 
                variant="h4" 
                align="center" 
                color="primary" 
                style={{ wordWrap: "break-word" }}
              >
                Sign up
              </Typography>

              <Typography 
                variant="subtitle1" 
                align="center" 
                color="primary" 
                style={{ wordWrap: "break-word" }}
              >
                Welcome, please register to continue
              </Typography>
              
              {render}

            </ Paper>
          </Container>
        )}
    </>  
  );
}
