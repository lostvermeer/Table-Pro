import React from 'react';
import {Link} from 'react-router-dom'
import { Box, Typography } from '@mui/material';


const WelcomePage = () => {

    return(
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
        }}
        >
        <Typography variant="h2" gutterBottom>
            Welcome to Table-pro
        </Typography>
        <Typography variant="h5" gutterBottom align="center" sx={{ maxWidth: '600px' }}>
            Please log in to access your account. If you are already logged in, you will be automatically redirected to your table.
            <br />
            <br />
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2'}}>Go to the Login Page</Link>
        </Typography>
        </Box>
    );
}

export default WelcomePage;