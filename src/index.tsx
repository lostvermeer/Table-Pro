import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('Root container missing in index.html');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
);


// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import App from './components/app';

// ReactDOM.render(
//     (<App/>),
//     document.querySelector('#root')
// );
