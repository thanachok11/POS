import React from 'react';
import ReactDOM from 'react-dom/client';  // นำเข้า react-dom/client แทน react-dom
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // สร้าง root โดยใช้ createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
