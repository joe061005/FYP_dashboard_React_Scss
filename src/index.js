import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';

import { UserContextProvider } from './context/UserContext'
import 'leaflet/dist/leaflet.css'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <UserContextProvider>
      <App />
    </UserContextProvider>
);
