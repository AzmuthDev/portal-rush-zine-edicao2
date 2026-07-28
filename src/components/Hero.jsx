import React from 'react';
import { useAudioController } from '../hooks/useEffects';
import './Hero.css';

export default function Hero() {
  const { airportRef, cymbalRef, play } = useAudioController();

  const startTour = () => {
    play();
    const editorial = document.getElementById('editorial');
    if (editorial) editorial.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Audio elements — place real files in /public/audio/ */}
      <audio ref={airportRef} src="/audio/airport-ambience.mp3" loop preload="none" />
      <audio ref={cymbalRef} src="/audio/ride-cymbal.mp3" loop preload="none" />

      {/* Subtle light bloom */}
      <div className="hero__bloom" />

      {/* Content */}
      <div className="hero__content">
        <p className="hero__edition-tag">Edição N.º 02 — Julho 2026</p>

        <h1 className="hero__title metallic-text">
          Rush Zine
        </h1>

        <p className="hero__subtitle metallic-text">
          YYZ &amp; O Guia Turístico
        </p>

        <div className="hero__btn-wrapper">
          <button className="btn-luxury" onClick={startTour}>
            Iniciar Tour
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
}
