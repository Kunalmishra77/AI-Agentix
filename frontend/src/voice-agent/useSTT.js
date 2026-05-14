// ─── Web Speech API — Speech-to-Text Hook ────────────────────────────────────
import { useRef, useCallback, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

export function useSTT({ onResult, onInterim, onError, onStart, onEnd }) {
  const recognitionRef = useRef(null);
  const activeRef = useRef(false);
  
  // Timers for patient listening and stuck prevention
  const silenceTimerRef = useRef(null);
  const watchdogTimerRef = useRef(null);
  const finalTranscriptRef = useRef('');

  const clearTimers = useCallback(() => {
    clearTimeout(silenceTimerRef.current);
    clearTimeout(watchdogTimerRef.current);
  }, []);

  const start = useCallback(() => {
    if (!SpeechRecognition) {
      onError?.('Speech recognition is not supported. Please use Chrome or Edge.');
      return;
    }
    if (activeRef.current) return;

    finalTranscriptRef.current = '';
    clearTimers();

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Default to Indian English
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      activeRef.current = true;
      onStart?.();
      
      // Watchdog: If nothing happens for 10 seconds, reset it so it doesn't get stuck
      watchdogTimerRef.current = setTimeout(() => {
        if (activeRef.current && !finalTranscriptRef.current) {
           recognition.stop();
        }
      }, 10000);
    };

    recognition.onresult = (event) => {
      clearTimers(); // Clear watchdog and silence timer

      let interim = '';
      let currentFinal = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          currentFinal += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (currentFinal) {
        finalTranscriptRef.current += ' ' + currentFinal;
      }

      const fullText = (finalTranscriptRef.current + ' ' + interim).trim();
      onInterim?.(fullText);

      // Patient listening: wait 2.5 seconds of silence before finalizing
      silenceTimerRef.current = setTimeout(() => {
        if (activeRef.current) recognition.stop();
      }, 2500);
    };

    recognition.onerror = (event) => {
      clearTimers();
      activeRef.current = false;
      if (event.error === 'no-speech') { onEnd?.(); return; }
      onError?.(event.error);
    };

    recognition.onend = () => {
      clearTimers();
      activeRef.current = false;
      const finalResult = finalTranscriptRef.current.trim();
      if (finalResult) {
        onResult?.(finalResult);
      } else {
        onEnd?.();
      }
    };

    try { recognition.start(); }
    catch (e) { activeRef.current = false; onError?.(e.message); }
  }, [onResult, onInterim, onError, onStart, onEnd, clearTimers]);

  const stop = useCallback(() => {
    clearTimers();
    if (recognitionRef.current && activeRef.current) {
      recognitionRef.current.stop();
      activeRef.current = false;
    }
  }, [clearTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return { start, stop, isSupported: !!SpeechRecognition };
}

