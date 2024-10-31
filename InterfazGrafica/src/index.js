import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar createRoot en lugar de render
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Si estás usando Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root')); // Usar createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
