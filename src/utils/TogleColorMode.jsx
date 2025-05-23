import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const ColorModeContext = createContext();

const TogleColorMode = ({ children }) => {
    const [ mode, setMode ] = useState('dark');

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')); 
    };

    const theme = useMemo(() => createTheme({
        palette:{
            mode,
        }
    }), [mode]);

  return (
    <ColorModeContext.Provider value={{mode, setMode, toggleColorMode}}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default TogleColorMode;