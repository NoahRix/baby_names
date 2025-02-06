// src/theme.js
import { createTheme } from '@mui/material/styles';

// Create a custom theme with various options
const theme = createTheme({
  // Palette (colors)
  palette: {
    primary: {
      main: '#1976d2', // Primary color for your app (e.g., blue)
    },
    secondary: {
      main: '#dc004e', // Secondary color (e.g., pink)
    },
    error: {
      main: '#f44336', // Error color (red)
    },
    warning: {
      main: '#ff9800', // Warning color (orange)
    },
    info: {
      main: '#2196f3', // Info color (blue)
    },
    success: {
      main: '#4caf50', // Success color (green)
    },
    // Custom colors
    customColor: {
      main: '#FF5733', // Custom color for elements like slider thumb
      light: '#FF8F5A', // Lighter shade of the custom color
      dark: '#C1351D', // Darker shade of the custom color
    },
    background: {
      default: '#fafafa', // Default background color for your app
      paper: '#ffffff', // Paper background color (used for cards, dialogs, etc.)
    },
  },

  // Typography settings
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Font family
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    // More typography options...
  },

  // Spacing settings (default unit = 8px)
  spacing: 4, // This sets the base spacing unit to 4px, can be customized

  // Breakpoints (responsiveness)
  breakpoints: {
    values: {
      xs: 0, // Extra small screens (phones)
      sm: 600, // Small screens (tablets)
      md: 960, // Medium screens (small laptops)
      lg: 1280, // Large screens (desktops)
      xl: 1920, // Extra-large screens (large desktops)
    },
  },

  // Shape settings (border-radius, etc.)
  shape: {
    borderRadius: 8, // Set default border-radius for components
  },

  // Overrides for specific components (customize appearance of specific MUI components)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase text on buttons
          borderRadius: 12, // Custom border radius for buttons
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Custom border-radius for text fields
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          width: 16, // Custom thumb width for sliders
          height: 16, // Custom thumb height for sliders
          backgroundColor: '#FF5733', // Custom thumb color
        },
        rail: {
          backgroundColor: '#FF8F5A', // Custom rail color
        },
        track: {
          backgroundColor: '#C1351D', // Custom track color
        },
      },
    },
    // More component overrides as needed...
  },

  // Shadows (you can define custom shadow effects)
  shadows: [
    'none', // Shadow for index 0
    '0px 1px 2px rgba(0, 0, 0, 0.2)', // Shadow for index 1
    '0px 1px 3px rgba(0, 0, 0, 0.2)', // Shadow for index 2
    // More shadow definitions...
  ],

  // Z-index (controls stacking of components)
  zIndex: {
    appBar: 1100, // AppBar stacking level
    drawer: 1200, // Drawer stacking level
    modal: 1300, // Modal stacking level
    snackbar: 1400, // Snackbar stacking level
  },

  // Direction of the layout (LTR or RTL)
  direction: 'ltr', // Right-to-left can be set as 'rtl' (useful for languages like Arabic)
});

export default theme;
