import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import Preloader from './components/agentix/Preloader.jsx';
import './index.css';

const SHOW_MS = 1800;
const FADE_MS = 400;
const SESSION_KEY = 'ax_loaded';

function Root() {
  const alreadySeen = sessionStorage.getItem(SESSION_KEY);
  const [show, setShow] = useState(!alreadySeen);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (alreadySeen) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setFadeOut(true), SHOW_MS);
    const t2 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, SHOW_MS + FADE_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {show && <Preloader fadeOut={fadeOut} />}
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
