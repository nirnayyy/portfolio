import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Chatbot } from '@/components/ui/chatbot'
import LoadingScreen from '@/components/ui/8bit-loading-screen'
import './index.css'

const EASTER_EGG_TIPS = [
  "ENTERING HIDDEN THEME...",
  "DECOMPILING STYLESHEET BUILDS...",
  "ACTIVATING 8-BIT COMPILER MODULES...",
  "INITIALIZING MONOCHROME PALETTES...",
  "NIRNAY-BOT: SYSTEM PREPARATION COMPLETE...",
  "WARNING: SYSTEM REBOOTING INTO RETRO 8-BIT ENVIRONMENT...",
];

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleTriggerRetro = () => {
      setIsLoading(true);

      // Disable scrolling during load
      document.body.style.overflow = 'hidden';

      // After loading progress is completed (3.5 seconds)
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = '';
        
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        
        if (currentTheme === "retro") {
          // Toggle back to dark mode
          html.setAttribute("data-theme", "dark");
          localStorage.setItem("portfolio-theme", "dark");
        } else {
          // Toggle into 8-bit retro theme
          html.setAttribute("data-theme", "retro");
          localStorage.setItem("portfolio-theme", "retro");
        }
      }, 3800);
    };

    window.addEventListener('trigger-retro-loading', handleTriggerRetro);
    return () => {
      window.removeEventListener('trigger-retro-loading', handleTriggerRetro);
    };
  }, []);

  return (
    <>
      <Chatbot />
      {isLoading && (
        <LoadingScreen
          variant="fullscreen"
          title="ENTERING HIDDEN THEME"
          tips={EASTER_EGG_TIPS}
          autoProgress
          autoProgressDuration={3500}
        />
      )}
    </>
  );
}

const rootEl = document.getElementById('chatbot-root')

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

