import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppStateContext = createContext(null);

// Custom hook to use the AppStateContext
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Provider component
export const AppStateProvider = ({ children }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [year, setYear] = useState(null);
  const [selectedStateMinYear, setSelectedStateMinYear] = useState(null);
  const [selectedStateMaxYear, setSelectedStateMaxYear] = useState(null);
  const [distinctMaleCountForSelectedState, setDistinctMaleCountForSelectedState] = useState(null);
  const [distinctFemaleCountForSelectedState, setDistinctFemaleCountForSelectedState] = useState(null);
  const [topPopularMaleFemaleNameCounts, setTopPopularMaleFemaleNameCounts] = useState(null);

  const value = {
    selectedState,
    setSelectedState,
    year,
    setYear,
    selectedStateMinYear,
    setSelectedStateMinYear,
    selectedStateMaxYear,
    setSelectedStateMaxYear,
    distinctMaleCountForSelectedState,
    setDistinctMaleCountForSelectedState,
    distinctFemaleCountForSelectedState,
    setDistinctFemaleCountForSelectedState,
    topPopularMaleFemaleNameCounts,
    setTopPopularMaleFemaleNameCounts,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
