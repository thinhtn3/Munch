import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import './index.css';

// Use createRoot() to render the root of your application
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);