import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import USMap from './components/USMap/USMap';
import { Box } from '@mui/material';
import NumericSlider from './components/USMap/NumericalSlider';
import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme'; // Import the custom theme
import { betterFetch } from '@better-fetch/fetch';


function App() {
  const [selectedStateCode, setSelectedStateCode] = useState(null);
  const [selectedStateMinYear, setSelectedStateMinYear] = useState(0);
  const [selectedStateMaxYear, setSelectedStateMaxYear] = useState(0);

  const getMinMaxYearUsingStateCode = async () => {
    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/min-max-years-using-state?stateCode=${selectedStateCode}`);
    setSelectedStateMinYear(data?.minYear ?? 0);
    setSelectedStateMaxYear(data?.maxYear ?? 0);
    console.log(data);
  }

  useEffect(() => {
    getMinMaxYearUsingStateCode();
  }, [selectedStateCode]);

  return (
    // <ThemeProvider theme={theme}> {/* Wrap the application with the theme */}

    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <USMap setSelectedStateCode={setSelectedStateCode} />
      <NumericSlider selectedStateMinYear={selectedStateMinYear} selectedStateMaxYear={selectedStateMaxYear}></NumericSlider>
    </Box>
    // </ThemeProvider>
  );
}

export default App;
