import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

// Constant for the ultra-stable fallback to prevent runtime crashes
const STABLE_FALLBACK = 'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json';

/**
 * Technically Stabilized Lottie Component for AI AGENTIX.
 * Features:
 * 1. Defensive fetch logic with content-type verification.
 * 2. Automated fallback to stable assets if primary fetch fails.
 * 3. Prevents runtime crashes from invalid data formats.
 */
const LottieAnimation = ({ url, style, loop = true, autoplay = true }) => {
  const [animationData, setAnimationData] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const fetchAnimation = (fetchUrl, isFallback = false) => {
    if (!fetchUrl) return;
    
    fetch(fetchUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type: expected JSON');
        }
        return res.json();
      })
      .then(data => {
        // Robust check for valid Lottie JSON structure (fr, nm, layers are common keys)
        if (data && data.layers && Array.isArray(data.layers)) {
          setAnimationData(data);
          setTimeout(() => setIsReady(true), 100);
        } else {
          throw new Error('Invalid Lottie JSON structure');
        }
      })
      .catch(err => {
        console.error(`Lottie fetch error (${fetchUrl}):`, err.message);
        // If the primary URL fails, try the ultra-stable fallback once
        if (!isFallback) {
          console.log('Switching to stable Lottie fallback');
          fetchAnimation(STABLE_FALLBACK, true);
        }
      });
  };

  useEffect(() => {
    setIsReady(false);
    fetchAnimation(url);
  }, [url]);

  if (!animationData) return null;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      opacity: isReady ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
      pointerEvents: 'none',
      ...style 
    }}>
      <Lottie 
        animationData={animationData} 
        loop={loop} 
        autoplay={autoplay} 
        style={{ width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default LottieAnimation;
