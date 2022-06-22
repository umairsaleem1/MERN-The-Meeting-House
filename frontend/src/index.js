import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import theme from './theme/theme';
import store from './redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </Provider>
  // </React.StrictMode>
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();



