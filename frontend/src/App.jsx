import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import USMap from './components/USMap/USMap';
import { Box } from '@mui/material';
import NumericSlider from './components/USMap/NumericalSlider';
import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme'; // Import the custom theme
import { betterFetch } from '@better-fetch/fetch';
import { PieChart } from '@mui/x-charts/PieChart';

function App() {
  const [selectedStateCode, setSelectedStateCode] = useState(null);
  const [selectedStateMinYear, setSelectedStateMinYear] = useState(0);
  const [selectedStateMaxYear, setSelectedStateMaxYear] = useState(0);
  const [year, setYear] = useState(null); // Set the initial value of the slider to min year
  const [selectedMaleYearState, setSelectedMaleYearState] = useState(null); 
  const [selectedFemaleYearState, setSelectedFemaleYearState] = useState(null); 

  const getMinMaxYearUsingStateCode = async () => {
    if (!selectedStateCode)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/min-max-years-using-state?stateCode=${selectedStateCode}`);
    setSelectedStateMinYear(data?.minYear ?? 0);
    setSelectedStateMaxYear(data?.maxYear ?? 0);
  }

  const getMaleFemaleCounts = async (selectedYear) => {
    if (!selectedStateCode)
      return;

    if (!selectedYear)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/male-female-counts?stateCode=${selectedStateCode}&year=${selectedYear}`);
    setSelectedMaleYearState(data?.item1 ?? 0);
    setSelectedFemaleYearState(data?.item2 ?? 0);
  }

  const onYearChange = (selectedYear) => {
    setYear(selectedYear);
    getMaleFemaleCounts(selectedYear);
  }

  useEffect(() => {
    getMinMaxYearUsingStateCode();
  }, [selectedStateCode]);

  // Listen for changes in either the year or selectedStateCode
  // and fetch all needed data
  useEffect(() => {
    if (selectedStateCode && selectedStateMinYear && selectedStateMaxYear) {
      if(year >= selectedStateMinYear && year <= selectedStateMaxYear) {
        getMaleFemaleCounts(year);
      }
      else {
        // If the year is out of bounds, reset it to the minimum year
        setYear(selectedStateMinYear);
        getMaleFemaleCounts(selectedStateMinYear);
      }
    }
  }, [selectedStateCode, selectedStateMinYear, selectedStateMaxYear]);

  // Scroll to the bottom of the page when the year or selected state changes
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    
    //TESTING
    // console.log("Selected State Code:", selectedStateCode);
    // console.log("Selected State Min Year:", selectedStateMinYear);
    // console.log("Selected State Max Year:", selectedStateMaxYear);
    // console.log("Selected Year:", year);
    //TESTING
  }, [year, selectedStateCode, selectedStateMinYear, selectedStateMaxYear]);


  return (
    // <ThemeProvider theme={theme}> {/* Wrap the application with the theme */}
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <USMap setSelectedStateCode={setSelectedStateCode} />
      {
        selectedStateCode && 
        <>
          <Typography variant="h6" gutterBottom>
            Select a year
          </Typography>          
          <Typography>{year}</Typography>
          <NumericSlider selectedStateMinYear={selectedStateMinYear} selectedStateMaxYear={selectedStateMaxYear} onYearChange={onYearChange}></NumericSlider>
        </>
      }
        {year &&
        <>
        <Box display="flex" justifyContent="space-around" width="90%" padding={2} style={{ backgroundColor: '#f0f0f0' }}>
          <Typography>Distinct Male Name Count: {selectedMaleYearState?.toLocaleString('en-US')}</Typography>
          <Typography>Distinct Female Name Count: {selectedFemaleYearState?.toLocaleString('en-US')}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="90%" padding={2} style={{ backgroundColor: '#f0f0f0' }}>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 33, label: 'series A' },
                { id: 1, value: 33, label: 'series B' },
                { id: 2, value: 33, label: 'series C' },
              ],
            },
          ]}
          width={300}
          height={300}
          />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={300}
          height={300}
          />                
          </Box>
        </>
        }  
    </Box>
    // </ThemeProvider>
  );
}

export default App;
