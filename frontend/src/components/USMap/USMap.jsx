import React, { useState } from 'react';
import statesData from './us_states_paths.json';
import { Box, Tooltip } from '@mui/material';

const USMap = ({setSelectedStateCode}) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [clickedState, setClickedState] = useState(null);

  const handleMouseEnter = (state) => {
    setHoveredState(state.StateName);
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const handleClick = (state) => {
    setClickedState(state.StateName);
    setSelectedStateCode(state.StateCode);
  };

  return (
    <Box
      sx={{
        width: '80%',
        maxWidth: '1600px',
        height: 'auto',
        margin: '0 auto', // Center the map horizontally
      }}
    >
      <svg viewBox="0 0 950 600" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        {statesData.map((state) => (
          <Tooltip 
            key={state.StateCode} 
            title={state.StateName}             
            arrow>
            <path
              key={state.StateCode}
              d={state.DrawPath}
              strokeWidth={0}
              onMouseEnter={() => handleMouseEnter(state)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(state)}
              style={{
                cursor: 'pointer',
                fill: clickedState === state.StateName ? 'orange' : hoveredState === state.StateName ? '#666' : '#aaa',
              }}           
              />
            </Tooltip>
        ))}
      </svg>
    </Box>
  );
};

export default USMap;
