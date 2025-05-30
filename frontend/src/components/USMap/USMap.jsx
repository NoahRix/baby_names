import React, { useEffect, useState } from 'react';
import statesData from './us_states_paths.json';
import { Box, Tooltip } from '@mui/material';
import { useAppState } from '../../AppStateContext';
import { betterFetch } from '@better-fetch/fetch';

const USMap = () => {
  const { setSelectedState, selectedState, setSelectedStateMinYear, setSelectedStateMaxYear, year, setYear } = useAppState();
  const [hoveredState, setHoveredState] = useState(null);

  const handleMouseEnter = (state) => {
    setHoveredState(state.StateName);
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const handleClick = async (state) => {
    setSelectedState(state);

    if (!state)
      return;

    const { data, error } = await betterFetch(`${window.location.origin}/api/BabyNames/min-max-years-using-state?stateCode=${state.StateCode}`);

    if (!year)
      setYear(data?.minYear ?? 0);

    setSelectedStateMinYear(data?.minYear ?? 0);
    setSelectedStateMaxYear(data?.maxYear ?? 0);
  };

  return (
    <Box
      sx={{
        width: '100%',
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
                fill: selectedState?.StateName === state.StateName ? 'orange' : hoveredState === state.StateName ? '#666' : '#aaa',
              }}
            />
          </Tooltip>
        ))}
      </svg>
    </Box>
  );
};

export default USMap;
