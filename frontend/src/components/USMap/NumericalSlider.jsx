import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function NumericSlider() {
  const [value, setValue] = useState(30); // Initial value of the slider

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ padding: 20, width: '90%' }}>
      <Typography gutterBottom>Numeric Slider with Small Thumb</Typography>
      <Slider
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={0}
        max={100}
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
      <Typography variant="h6" gutterBottom>
        Value: {value}
      </Typography>
    </div>
  );
}

export default NumericSlider;
