import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

// Create a root element using createRoot and render your App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
         <App />
    </BrowserRouter>
    );
