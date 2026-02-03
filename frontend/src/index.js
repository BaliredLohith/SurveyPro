import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as productionUtils from './utils/production';
import './index.css';

// Initialize production utilities
if (process.env.NODE_ENV === 'production') {
  productionUtils.reportWebVitals();
  productionUtils.registerServiceWorker();
  productionUtils.preloadCriticalResources();
  productionUtils.analyzeBundleSize();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
