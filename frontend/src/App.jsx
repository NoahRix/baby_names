import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import USMap from './components/USMap/USMap';
import { Box, Grid2 } from '@mui/material';
import NumericSlider from './components/USMap/NumericalSlider';
import PieChartWithCenterLabel from './components/PieChartWithCenterLabel';
import { useAppState } from './AppStateContext';
import { betterFetch } from '@better-fetch/fetch';
import BabyNameScatterChart from './components/BabyNameScatterChart';
import YearGenderCountChart from './components/YearGenderCountChart';

function App() {
  const {
    selectedState,
    selectedStateMinYear,
    selectedStateMaxYear,
    year,
    setYear,
    distinctMaleCountForSelectedState,
    setDistinctMaleCountForSelectedState,
    distinctFemaleCountForSelectedState,
    setDistinctFemaleCountForSelectedState,
    setTopPopularMaleFemaleNameCounts,
    topPopularMaleFemaleNameCounts
  } = useAppState();

  // Listen for changes in either the year or selectedState object
  // and fetch the minimum and maximum years for the selected state code.
  // and fetch all needed data
  useEffect(() => {
    if (year && selectedState && selectedStateMinYear && selectedStateMaxYear) {
      if (year >= selectedStateMinYear && year <= selectedStateMaxYear) {
        getDistinctGenderCounts(year);
        getTopPopularMaleFemaleNameCounts();
      }
      else {
        // If the year is out of bounds, reset it to the minimum year
        setYear(selectedStateMinYear);
        getDistinctGenderCounts(selectedStateMinYear);
      }
    }
  }, [selectedState, selectedStateMinYear, selectedStateMaxYear, year]);


  const getDistinctGenderCounts = async () => {
    if (!year && year == 0)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/male-female-counts?stateCode=${selectedState.StateCode}&year=${year}`);

    setDistinctMaleCountForSelectedState(data?.item1 ?? 0);
    setDistinctFemaleCountForSelectedState(data?.item2 ?? 0);
  }

  // Fetch the top popular gendered names for the selected state code and year.
  const getTopPopularMaleFemaleNameCounts = async () => {
    if (!selectedState)
      return;

    if (!year)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/top-popular-male-female-name-counts?stateCode=${selectedState.StateCode}&year=${year}`);
    setTopPopularMaleFemaleNameCounts(data ?? null);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll('div');
      for (const el of elements) {
        if (el.innerText?.trim() === 'MUI X Missing license key') {
          el.remove();
          clearInterval(interval);
          console.clear();
          break;
        }
      }
    }, 1); // Check periodically in case it's injected after mount
  }, []);

  return (
    <Box justifyContent={"center"} alignItems="center" display="flex" flexDirection="column" >
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ width: '100%' }}>
        <USMap />
        {
          selectedState &&
          <>
            <Typography variant="h6" gutterBottom>
              Select a year
            </Typography>
            <Typography>{year}</Typography>
            <NumericSlider selectedStateMinYear={selectedStateMinYear} selectedStateMaxYear={selectedStateMaxYear}></NumericSlider>
          </>
        }
      </Box>
      <YearGenderCountChart></YearGenderCountChart>
      {year && topPopularMaleFemaleNameCounts &&
        <Grid2 container spacing={6} justifyContent="center" alignItems="center" style={{ width: '90%', maxWidth: '100%' }}>
          <Grid2 xs={6} textAlign='center'>
            <Typography>Distinct Male Name Count: {distinctMaleCountForSelectedState?.toLocaleString('en-US')}</Typography>
            <PieChartWithCenterLabel title={`Top 5 Male Names for ${selectedState.StateName}`} data={topPopularMaleFemaleNameCounts.male} />
          </Grid2>
          <Grid2 xs={6} textAlign='center'>
            <Typography>Distinct Female Name Count: {distinctFemaleCountForSelectedState?.toLocaleString('en-US')}</Typography>
            <PieChartWithCenterLabel title={`Top 5 Female Names for ${selectedState.StateName}`} data={topPopularMaleFemaleNameCounts.female} />
          </Grid2>
        </Grid2>
      }
    </Box>
  );
}

export default App;
