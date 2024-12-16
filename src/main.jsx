import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./components/App";
const theme = createTheme({});

// Create a root element using createRoot and render your App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
         <App />
    </BrowserRouter>
    </ThemeProvider>,
    );
