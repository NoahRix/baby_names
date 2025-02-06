import React, { useState } from 'react';
import statesData from './us_states_paths.json';
import { Box, Tooltip } from '@mui/material';

const USMap = ({onclick, onMouseEnter, onMouseLeave}) => {
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
    alert(`You clicked on ${state.StateName}`);
  };

  return (
    <Box>
      <svg viewBox="0 0 950 600" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }} >
        {statesData.map((state) => (
          <Tooltip key={state.StateCode} title={state.StateName} arrow>
            <path
              key={state.StateCode}
              d={state.DrawPath}
              fill="#ccc"
              stroke="#333"
              strokeWidth="1"
              onMouseEnter={() => handleMouseEnter(state)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(state)}
              style={{
                cursor: 'pointer',
                fill: hoveredState === state.StateName ? '#888' : '#ccc',
              }}
              />
            </Tooltip>
        ))}
      </svg>
    </Box>
  );
};

export default USMap;
