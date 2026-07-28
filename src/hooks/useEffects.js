import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook: Intersection Observer for scroll-triggered reveals.
 * Returns [ref, isVisible] — attach ref to a DOM element.
 */
export function useScrollReveal(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Fire once
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * Custom hook: Audio controller for the tour ambience.
 */
export function useAudioController() {
  const airportRef = useRef(null);
  const cymbalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    // These will be wired to real audio files placed in /public/audio/
    // For now, the refs are created but won't crash if files are missing.
    try {
      if (airportRef.current) {
        airportRef.current.volume = 0.3;
        airportRef.current.play().catch(() => {});
      }
      if (cymbalRef.current) {
        cymbalRef.current.volume = 0.15;
        cymbalRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    } catch (e) {
      // Audio files not yet provided
    }
  }, []);

  const stop = useCallback(() => {
    try {
      if (airportRef.current) airportRef.current.pause();
      if (cymbalRef.current) cymbalRef.current.pause();
      setIsPlaying(false);
    } catch (e) {}
  }, []);

  return { airportRef, cymbalRef, play, stop, isPlaying };
}
