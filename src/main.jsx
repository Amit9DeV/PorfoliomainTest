import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Preload critical fonts and resources
const preloadResources = () => {
  // Preload Google Fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=New+Amsterdam&family=Rajdhani:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = function() {
    this.onload = null;
    this.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);
  
  // Preload critical images
  const criticalImages = ['/download.png'];
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Initialize preloading
preloadResources();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
