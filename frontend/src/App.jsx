import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import USMap from './components/USMap/USMap';
import { Box, Grid2 } from '@mui/material';
import NumericSlider from './components/USMap/NumericalSlider';
import { betterFetch } from '@better-fetch/fetch';
import PieChartWithCenterLabel from './components/PieChartWithCenterLabel';

function App() {
  const [selectedStateCode, setSelectedStateCode] = useState(null);
  const [selectedStateMinYear, setSelectedStateMinYear] = useState(0);
  const [selectedStateMaxYear, setSelectedStateMaxYear] = useState(0);
  const [year, setYear] = useState(null); // Set the initial value of the slider to min year
  const [selectedMaleYearState, setSelectedMaleYearState] = useState(null);
  const [selectedFemaleYearState, setSelectedFemaleYearState] = useState(null);
  const [topPopularMaleFemaleNameCounts, setTopPopularMaleFemaleNameCounts] = useState(null);

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

  const getTopPopularMaleFemaleNameCounts = async () => {
    if (!selectedStateCode)
      return;

    if (!year)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/top-popular-male-female-name-counts?stateCode=${selectedStateCode}&year=${year}`);
    setTopPopularMaleFemaleNameCounts(data ?? null);
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
      if (year >= selectedStateMinYear && year <= selectedStateMaxYear) {
        getMaleFemaleCounts(year);
        getTopPopularMaleFemaleNameCounts(year);
      }
      else {
        // If the year is out of bounds, reset it to the minimum year
        setYear(selectedStateMinYear);
        getMaleFemaleCounts(selectedStateMinYear);
      }
    }
  }, [selectedStateCode, selectedStateMinYear, selectedStateMaxYear, year]);

  return (
    <Box justifyContent={"center"} alignItems="center" display="flex" flexDirection="column" >
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ width: '100%' }}>
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
      </Box>
      {year && topPopularMaleFemaleNameCounts &&
        <Grid2 container spacing={6} justifyContent="center" alignItems="center" style={{ width: '800px', maxWidth: '100%' }}>
          <Grid2 xs={6} textAlign='center'>
            <Typography>Distinct Male Name Count: {selectedMaleYearState?.toLocaleString('en-US')}</Typography>
            <PieChartWithCenterLabel title={`Top 5 Male Names for ${selectedStateCode}`} data={topPopularMaleFemaleNameCounts.male} />
          </Grid2>
          <Grid2 xs={6} textAlign='center'>
            <Typography>Distinct Female Name Count: {selectedFemaleYearState?.toLocaleString('en-US')}</Typography>
            <PieChartWithCenterLabel title={`Top 5 Female Names for ${selectedStateCode}`} data={topPopularMaleFemaleNameCounts.female} />
          </Grid2>
        </Grid2>
      }
    </Box>
  );
}

export default App;
