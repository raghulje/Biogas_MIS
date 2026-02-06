import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2879b6',
      light: '#1D9AD4',
      dark: '#235EAC',
    },
    secondary: {
      main: '#7dc244',
      light: '#139B49',
      dark: '#139B49',
    },
    warning: {
      main: '#F59E21',
    },
    error: {
      main: '#ee6a31',
    },
    background: {
      default: '#f8f9fa',
    },
    text: {
      primary: '#333842',
      secondary: '#58595B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(40, 121, 182, 0.3)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={__BASE_PATH__}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;