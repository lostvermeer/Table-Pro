import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './Components/App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './ReduxStore/store';

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Root container missing in index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
