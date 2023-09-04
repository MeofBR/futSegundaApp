import { useState } from 'react';

import { useSnackbar } from 'notistack';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import ParticlesContainer from './particles-container.tsx';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#682B9C',
    },
    secondary: {
      main: '#837F86',
    },
    third: {
      main: '#1B1C23',
    },
    forth: {
      main: '#0D0E12',
    },
  },
});

function FutSegundaHome() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="container-global">
          <div className="left">
            {loading && (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            )}
            <ParticlesContainer />

            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></div>
          </div>
          <div className="right">
            <div class="container">
              <div class="box"></div>

              <div class="leftbox"></div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default FutSegundaHome;
