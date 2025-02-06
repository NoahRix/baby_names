import React from 'react';
import Typography from '@mui/material/Typography';
import USMap from './components/USMap/USMap';
import { Box } from '@mui/material';
import NumericSlider from './components/USMap/NumericalSlider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom theme

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Wrap the application with the theme */}
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <USMap/>
        <NumericSlider></NumericSlider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
