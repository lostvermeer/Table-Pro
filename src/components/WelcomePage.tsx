import React from 'react';
import {Link} from 'react-router-dom'

const WelcomePage = () => {

    return(
        <div>
            <h1>Welcome Page</h1>
            <Link to="/login">Navigate to Login page</Link>
        </div>
    );
}

export default WelcomePage;