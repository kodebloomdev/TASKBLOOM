import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";  // ✅ Bootstrap first
import './index.css'; // ✅ Tailwind last (ensures it takes priority)
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer autoClose={2000} />
  </React.StrictMode>,
);
