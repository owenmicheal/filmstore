import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./app/store";
import './index.css';
import TogleColorMode from "./utils/TogleColorMode";


// Create a root element using createRoot and render your App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <TogleColorMode>
    <BrowserRouter>
         <App />
    </BrowserRouter>
    </TogleColorMode>,
    </Provider>
    );
