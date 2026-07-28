import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './OntarioAssembly.css';

export default function OntarioAssembly() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="assembleia" className="assembly section">
      <div ref={ref} className="assembly__inner">

        <div className={`section-label reveal ${isVisible ? 'visible' : ''}`}>
          07 — Ponto Turístico N.º 5
        </div>

        <h2 className={`assembly__heading metallic-text reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          Assembleia Legislativa<br />de Ontário
        </h2>

        <p className={`assembly__subheading reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          Queen's Park, 111 Wellesley St W, Toronto, ON
        </p>

        {/* Crossfade Glassmorphism Card */}
        <div className={`assembly__card glass-card reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
          {/* Layer 1: Album cover (underneath) */}
          <img
            className="assembly__img assembly__img--album"
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200&auto=format"
            alt="Moving Pictures — Capa do álbum (1981)"
            loading="lazy"
          />
          {/* Layer 2: Modern photo (on top, fades out on hover) */}
          <img
            className="assembly__img assembly__img--modern"
            src="https://images.unsplash.com/photo-1569982175971-d92b01cf8694?q=80&w=1200&auto=format"
            alt="Ontario Legislative Building, Queen's Park — Vista moderna"
            loading="lazy"
          />

          {/* Label that appears on hover */}
          <div className="assembly__album-label">
            <div>
              <p className="assembly__album-title metallic-text">Moving Pictures</p>
              <p className="assembly__album-year">1981 — Mercury Records</p>
            </div>
          </div>
        </div>

        {/* Description Grid */}
        <div className={`assembly__description reveal reveal-delay-4 ${isVisible ? 'visible' : ''}`}>
          <div className="assembly__desc-block">
            <h4>O Cenário Perfeito</h4>
            <p>
              O grand finale do seu roteiro Rush em Toronto acontece nas escadarias da Assembleia 
              Legislativa de Ontário, no majestoso Queen's Park. É o cenário exato onde foi fotografada 
              a capa do álbum <em>Moving Pictures</em> (1981), o disco mais vendido e aclamado da 
              carreira do Rush. As escadarias e a fachada neorromânica, construída em 1893, permanecem 
              praticamente idênticas.
            </p>
          </div>
          <div className="assembly__desc-block">
            <h4>O Triplo Trocadilho</h4>
            <p>
              A capa, criada por <strong>Hugh Syme</strong>, é uma obra-prima de metalinguagem visual: mostra 
              pessoas carregando quadros (literalmente <em>moving pictures</em>), uma equipe de filmagem 
              registrando a cena (capturando <em>moving pictures</em>), e espectadores sendo movidos emocionalmente 
              pela cena (<em>moved to tears</em>).
            </p>
          </div>
        </div>
        
        <div className={`airport__tips reveal reveal-delay-5 ${isVisible ? 'visible' : ''}`} style={{ marginTop: '3rem' }}>
          <h4 style={{ color: 'var(--paper)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1rem' }}>Dicas para o visitante:</h4>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>Recrie a cena da capa! Leve um quadro e posicione-se nas escadarias. É tradição.</li>
            <li>O prédio é aberto ao público em horário comercial — você pode conhecer por dentro gratuitamente.</li>
            <li>Fica ao lado da Universidade de Toronto, num dos bairros mais bonitos da cidade.</li>
            <li>Melhor horário para fotos: manhã cedo ou final de tarde (luz dourada nas pedras).</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
