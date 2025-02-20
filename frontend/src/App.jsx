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
  const [year, setYear] = useState(selectedStateMinYear); // Set the initial value of the slider to min year

  const getMinMaxYearUsingStateCode = async () => {
    if (!selectedStateCode)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/min-max-years-using-state?stateCode=${selectedStateCode}`);
    setSelectedStateMinYear(data?.minYear ?? 0);
    setSelectedStateMaxYear(data?.maxYear ?? 0);
  }

  const onYearChange = (year) => {
    setYear(year);
  }

  useEffect(() => {
    getMinMaxYearUsingStateCode();
  }, [selectedStateCode]);

  useEffect(() => {
    console.log("year", year);
    console.log("selectedStateCode", selectedStateCode);
  }, [year]);

  return (
    // <ThemeProvider theme={theme}> {/* Wrap the application with the theme */}
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <USMap setSelectedStateCode={setSelectedStateCode} />
      {selectedStateCode && <NumericSlider selectedStateMinYear={selectedStateMinYear} selectedStateMaxYear={selectedStateMaxYear} onYearChange={onYearChange}></NumericSlider>}
    </Box>
    // </ThemeProvider>
  );
}

export default App;
