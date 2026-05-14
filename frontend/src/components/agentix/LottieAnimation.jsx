import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';

const STABLE_FALLBACK = 'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json';

const LottieAnimation = ({ url, style, loop = true, autoplay = true }) => {
  const { ref, inView } = useInView({ rootMargin: '200px', triggerOnce: true });
  const [animationData, setAnimationData] = useState(null);
  const [isReady, setIsReady] = useState(false);

  function fetchAnimation(fetchUrl, isFallback = false) {
    if (!fetchUrl) return;
    fetch(fetchUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get('content-type');
        if (!ct || !ct.includes('application/json')) throw new Error('Invalid content type');
        return res.json();
      })
      .then(data => {
        if (data && data.layers && Array.isArray(data.layers)) {
          setAnimationData(data);
          setTimeout(() => setIsReady(true), 100);
        } else {
          throw new Error('Invalid Lottie JSON');
        }
      })
      .catch(() => {
        if (!isFallback) fetchAnimation(STABLE_FALLBACK, true);
      });
  }

  useEffect(() => {
    if (!inView) return;
    setIsReady(false);
    fetchAnimation(url);
  }, [inView, url]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', ...style }}>
      {animationData && (
        <div style={{
          width: '100%', height: '100%',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          pointerEvents: 'none',
        }}>
          <Lottie
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default LottieAnimation;
