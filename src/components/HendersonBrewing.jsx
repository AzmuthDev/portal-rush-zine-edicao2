import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './HendersonBrewing.css';

export default function HendersonBrewing() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="henderson-brewing" className="henderson section">
      <div ref={ref} className="henderson__inner">

        <div className={`section-label reveal ${isVisible ? 'visible' : ''}`}>
          06 — Ponto Turístico N.º 4
        </div>

        <h2 className={`henderson__heading metallic-text reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          Henderson Brewing Co.
        </h2>

        <p className={`henderson__location reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          128A Sterling Rd — Toronto, ON
        </p>

        <div className="henderson__content">
          {/* Text Block */}
          <div className={`henderson__text-block reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
            <p>
              Depois de absorver tanta história e emoção, nada mais justo do que <strong>levantar um copo em homenagem ao Rush</strong>. E não existe lugar melhor para isso do que a Henderson Brewing Company, a cervejaria artesanal de Toronto que selou uma parceria oficial com a banda para criar a <strong>Rush Canadian Golden Ale</strong>.
            </p>
            <p>
              A Henderson vai além da cerveja: o espaço funciona como um <strong>santuário não-oficial para fãs</strong>, com exposições de itens de colecionador, memorabilia autografada e um ambiente que celebra a cultura rock de Toronto.
            </p>
            
            <div className="airport__tips" style={{ marginTop: '2rem' }}>
              <h4 style={{ color: 'var(--paper)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>Dicas para o visitante:</h4>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Visite o taproom: o ambiente é descontraído e a equipe conhece a história da parceria com o Rush.</li>
                <li>Leve latas da Rush Canadian Golden Ale como souvenir (os rótulos são colecionáveis).</li>
                <li>A cervejaria fica em Junction Triangle, uma região artística e descolada de Toronto.</li>
              </ul>
            </div>
          </div>

          {/* Image Block */}
          <div className={`henderson__image-block reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
            <div className="henderson__image-wrapper glass-card">
              <img
                src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=800&auto=format"
                alt="Henderson Brewing taproom"
                loading="lazy"
              />
              <div className="henderson__image-caption">
                Um brinde à banda em Junction Triangle.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
