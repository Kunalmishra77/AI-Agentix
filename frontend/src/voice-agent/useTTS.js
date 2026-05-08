// ─── Web Speech API — Text-to-Speech Hook ────────────────────────────────────
import { useRef, useCallback } from 'react';

export function useTTS() {
  const speaking = useRef(false);

  const getBestVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    
    // The previous premium English selection that worked well
    const preferred = [
      'Google UK English Female',
      'Google US English',
      'Microsoft Aria Online (Natural)',
      'Microsoft Jenny Online (Natural)'
    ];

    for (const name of preferred) {
      const v = voices.find((v) => v.name === name);
      if (v) return v;
    }

    return voices.find((v) => v.lang === 'en-US' || v.lang === 'en-GB') || voices[0] || null;
  }, []);

  const speak = useCallback((text, { onStart, onEnd, onError } = {}) => {
    if (!window.speechSynthesis) {
      onError?.('TTS not supported');
      return;
    }
    window.speechSynthesis.cancel();
    
    // Fix pronunciation of AGENTiX so the TTS engine says it correctly
    const phoneticText = text.replace(/AGENTiX/gi, 'Agent tix');
    
    const utterance = new SpeechSynthesisUtterance(phoneticText);
    speaking.current = true;
    utterance.rate = 1.0; // Restored to normal speed (was 0.95)
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.onstart = () => { speaking.current = true; onStart?.(); };
    utterance.onend   = () => { speaking.current = false; onEnd?.(); };
    utterance.onerror = (e) => {
      speaking.current = false;
      if (e.error !== 'interrupted') onError?.(e.error);
      else onEnd?.();
    };
    const trySpeak = () => {
      utterance.voice = getBestVoice();
      window.speechSynthesis.speak(utterance);
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', trySpeak, { once: true });
    } else {
      trySpeak();
    }
  }, [getBestVoice]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    speaking.current = false;
  }, []);

  return { speak, stop, isSpeaking: () => speaking.current };
}
