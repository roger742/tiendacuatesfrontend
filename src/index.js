import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // ⬅️ Asegúrate de que esta ruta esté correcta

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ⬅️ Aquí envuelves tu App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
