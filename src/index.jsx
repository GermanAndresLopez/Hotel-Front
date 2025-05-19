
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';
import './index.css';
import { store } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#580EF6',
    },
    secondary: {
      main: '#F7F7F7',
    },
    third: {
      main: '#3D3A50',
    },
    fourth: {
      main: '#1A1C22',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Router>
  </StrictMode>
  
)
