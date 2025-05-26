import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function NumericSlider({ selectedStateMinYear, selectedStateMaxYear, onYearChange }) {
  const [year, setYear] = useState(selectedStateMinYear); // Set the initial value of the slider to min year

  const handleSliderChange = (event, newValue) => {
    setYear(newValue);
  };
  
  const handleSliderCommitChange = (event,  selectedYear) => {
    setYear(selectedYear);
    onYearChange(selectedYear);
  };

  useEffect(() => {
    if (!selectedStateMinYear)
      return; 

    setYear(selectedStateMinYear);
  }, [selectedStateMinYear]);

  return (
    <div style={{ padding: 20, width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>   
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2">{selectedStateMinYear}</Typography>
        <Typography variant="body2">{selectedStateMaxYear}</Typography>
      </div>
      <Slider
        value={year}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommitChange}
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
