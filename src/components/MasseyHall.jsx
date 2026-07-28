import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './MasseyHall.css';

export default function MasseyHall() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="massey-hall" className="massey section">
      <div ref={ref} className="massey__inner">

        <div className={`section-label reveal ${isVisible ? 'visible' : ''}`}>
          05 — Ponto Turístico N.º 3
        </div>

        <h2 className={`massey__heading metallic-text-gold reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          A Lenda do Massey Hall
        </h2>

        <p className={`massey__address reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          178 Victoria St. — Toronto, ON
        </p>

        <div className="massey__content">
          <div className={`massey__image-block reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
            <video
              src="/videos/massey-hall-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="massey__brick-accent" />
          </div>

          {/* Text */}
          <div className={`massey__text-block reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
            <p>
              Se existe um palco que pode se orgulhar de ter testemunhado o momento em que o Rush deixou 
              de ser uma banda e se tornou um <strong>fenômeno</strong>, esse palco é o do <strong>Massey Hall</strong>. 
              Construída em 1894, esta é uma das salas de concerto mais reverenciadas do Canadá.
            </p>
            <p>
              Após uma restauração magistral concluída em 2021, o Massey Hall reabriu com sua acústica lendária 
              preservada e uma estrutura modernizada. Entrar neste salão é pisar no mesmo chão que tremeu sob 
              os pés de milhares de fãs naquelas noites históricas.
            </p>

            <div className="massey__album-callout">
              <h4 className="metallic-text-gold">All the World's a Stage (1976)</h4>
              <p>
                Nas noites de 11, 12 e 13 de junho de 1976, o Rush gravou o seu primeiro álbum ao vivo aqui. 
                Aquele disco não foi apenas um registro de turnê — foi uma <strong>declaração de intenções</strong>. 
                Capturou a energia bruta de uma banda jovem e feroz, pavimentando o caminho para a era épica 
                de <em>2112</em>, <em>A Farewell to Kings</em> e <em>Hemispheres</em>.
              </p>
            </div>
            
            <div className="airport__tips" style={{ marginTop: '2rem' }}>
              <h4 style={{ color: 'var(--paper)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>Dicas para o visitante:</h4>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Consulte a programação: assistir a qualquer concerto ali já vale a experiência.</li>
                <li>Há visitas guiadas disponíveis que contam a história do edifício (pergunte sobre o Rush).</li>
                <li>Dica de fã: ouça <em>All the World's a Stage</em> inteiro enquanto estiver sentado nas poltronas do balcão.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
