import React from "react";
import {Link as ReactRDLink} from 'react-router-dom'
import { Box, TextField, Alert, Typography, Link, FormControlLabel, FormControl, InputAdornment, InputLabel, Checkbox, Input, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import LoadingButton from "@mui/lab/LoadingButton";


const SingUp = (userAuthorization: { (): Promise<void>; (): void; }) => {

  // Input fields
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(true);

  // RememberMe Checkbox handling
  const handleRememeberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  // Password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Username onBlur validation
  const [errorUsername, setErrorUsername] = React.useState(false)
  const handleUsernameBlure = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    let length = username.length;
    let user = username.slice(0, 4);
    let number = Number(username.slice(4));

    if (length < 5 || length > 6 || user !== "user" || number !== number) {
      setErrorUsername(true);
      return;
    }

    setErrorUsername(false);
  }

  // Password onBlur validation
  const [errorPassword, setErrorPassword] = React.useState(false);
  const handlePasswordBlur = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password !== 'password') {
      setErrorPassword(true);
      return;
    }

    setErrorPassword(false);
  }

  //Submit button loading 
  const [submitLoading, setSubmitLoading] = React.useState(false);

  // Submit validation
  const [formInValid, setFormInValid] = React.useState(false);
  const [errorMessege, setErrorMessege] = React.useState("") ;

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (errorUsername && errorPassword) {
      setErrorMessege("Username and password are incorrect");
      setFormInValid(true);
      return;
    }

    if (errorUsername) {
      setErrorMessege("Username is incorrect");
      setFormInValid(true);
      return;
    }

    if (errorPassword) {
      setErrorMessege('Password is incorrect');
      // setErrorMessege('Password is incorrect. Please register as a "password"');
      setFormInValid(true);
      return;
    }

    setSubmitLoading(true);
    setFormInValid(false);

    userAuthorization();
  }

  return (
    {
      username,
      password,
      rememberMe,
      setFormInValid,
      setErrorMessege,
      setSubmitLoading,
      render: (
        <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField 
          id="Username" 
          label="Username" 
          variant="standard" 
          size="small" 
          margin="dense"
          helperText= 'Please register as "userN", where N is a number [1-33].'
          value={username}
          error={errorUsername}
          onChange={(event) => {setUsername(event.target.value)}}
          onBlur={handleUsernameBlure}
          sx={{ mb: 1 }}
          required
          fullWidth 
        />

        <FormControl fullWidth sx={{ mb: 1 }} variant="standard" required>
          <InputLabel error={errorPassword} htmlFor="input_password">Password</InputLabel>
          <Input
            id="input_password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            error={errorPassword}
            onChange={(event) => {setPassword(event.target.value)}}
            onBlur={handlePasswordBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>  

        <FormControl fullWidth ><FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleRememeberMe} />}  label="Remember Me" /></FormControl>

        <LoadingButton
          type="submit"
          variant="contained"
          loadingPosition="end"
          loading={submitLoading}
          endIcon={<Login />}
          sx={{ mt: 1, mb: 1 }}
          fullWidth
        >
          Sugn Up
        </LoadingButton>

        {formInValid &&   <Alert severity="error">{errorMessege}</Alert>}
        <Box sx={{ width: '100%', ml:1 }}>
          <Typography 
            variant="caption" 
            align="left"  
            style={{ wordWrap: "break-word" }}
            gutterBottom sx={{ display: 'block' }}
          >
            Don't have an account yet? Please 
            <ReactRDLink to="/Login"> SignUp</ReactRDLink>
          </Typography>
        </Box>
      </form> 
    </Box>

      )
    }
  );
};

export default SingUp;
