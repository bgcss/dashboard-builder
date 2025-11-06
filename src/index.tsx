import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import PreviewPage from './PreviewPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// ✅ Only set basename in production, and make sure it’s JUST the path (e.g. "/dashboard-builder")
const basename =
  process.env.NODE_ENV === 'production'
    ? new URL(process.env.PUBLIC_URL!, window.location.origin).pathname.replace(/\/$/, '')
    : undefined;

root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/preview" element={<PreviewPage />} />
        {/* optional: catch-all to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();


