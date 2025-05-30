import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useAppState } from '../../AppStateContext';
import { betterFetch } from '@better-fetch/fetch';


function NumericSlider() {
  const { setYear, selectedState, selectedStateMinYear, selectedStateMaxYear, setDistinctMaleCountForSelectedState, setDistinctFemaleCountForSelectedState } = useAppState();

  const [selectedYear, setSelectedYear] = useState(null);

  //Set the selected year when the slider value changes.
  const handleYearChange = async (event, selectedYear) => {
    setYear(selectedYear);

    if (!selectedState)
      return;

    if (!selectedYear)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/male-female-counts?stateCode=${selectedState.StateCode}&year=${selectedYear}`);

    setDistinctMaleCountForSelectedState(data?.item1 ?? 0);
    setDistinctFemaleCountForSelectedState(data?.item2 ?? 0);
  };

  return (
    <div style={{ padding: 20, width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2">{selectedStateMinYear}</Typography>
        <Typography variant="body2">{selectedStateMaxYear}</Typography>
      </div>
      <Slider
        value={selectedYear ?? 0}
        onChange={(event, newValue) => setSelectedYear(newValue)}
        onChangeCommitted={handleYearChange}
        aria-labelledby="input-slider"
        min={selectedStateMinYear}
        max={selectedStateMaxYear}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}`}
        marks
        track="normal"
        sx={{
          width: '100%',
          '& .MuiSlider-thumb': {
            width: 14,  // Set a smaller thumb width
            height: 14, // Set a smaller thumb height
            backgroundColor: 'primary.main', // Optional: custom thumb color
            borderRadius: '50%', // Optional: make the thumb round
          },
        }}
      />
    </div>
  );
}

export default NumericSlider;
