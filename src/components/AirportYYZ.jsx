import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './AirportYYZ.css';

/**
 * Renders the Morse code for YYZ:
 *   Y = -.--    Y = -.--    Z = --..
 * Each dot/dash is animated with staggered timing.
 */
function MorseVisualization() {
  // Y: dash dot dash dash | Y: dash dot dash dash | Z: dash dash dot dot
  const morseElements = [
    'dash', 'dot', 'dash', 'dash',  // Y
    'letter-space',
    'dash', 'dot', 'dash', 'dash',  // Y
    'letter-space',
    'dash', 'dash', 'dot', 'dot',   // Z
  ];

  let pulseIndex = 0;

  return (
    <div className="morse__sequence">
      {morseElements.map((type, i) => {
        if (type === 'letter-space') {
          return <div key={i} className="morse__letter-space" />;
        }
        const idx = pulseIndex++;
        return (
          <div
            key={i}
            className={`morse__${type}`}
            style={{ animationDelay: `${idx * 0.15}s` }}
          />
        );
      })}
    </div>
  );
}

export default function AirportYYZ() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="yyz" className="airport section">
      <div ref={ref} className="airport__inner">

        <div className={`section-label reveal ${isVisible ? 'visible' : ''}`}>
          03 — Ponto Turístico N.º 1
        </div>

        {/* Boarding Pass */}
        <div className={`boarding-pass glass-card reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          <div className="boarding-pass__layout">

            {/* Main Panel */}
            <div className="boarding-pass__main">
              <div className="boarding-pass__header">
                <div>
                  <p className="boarding-pass__airline">Rush Airways</p>
                  <h2 className="boarding-pass__code metallic-text">YYZ</h2>
                  <p className="boarding-pass__airport-name">
                    Toronto Pearson International Airport
                  </p>
                </div>
              </div>

              <div className="boarding-pass__fields">
                <div>
                  <p className="boarding-pass__field-label">Passageiro</p>
                  <p className="boarding-pass__field-value">Fã do Rush</p>
                </div>
                <div>
                  <p className="boarding-pass__field-label">Destino</p>
                  <p className="boarding-pass__field-value">Toronto, ON</p>
                </div>
                <div>
                  <p className="boarding-pass__field-label">Embarque</p>
                  <p className="boarding-pass__field-value">Moving Pictures</p>
                </div>
                <div>
                  <p className="boarding-pass__field-label">Assento</p>
                  <p className="boarding-pass__field-value">2112</p>
                </div>
              </div>
            </div>

            {/* Stub */}
            <div className="boarding-pass__stub">
              <div className="boarding-pass__stub-code metallic-text">YYZ</div>
            </div>
          </div>
        </div>

        {/* Morse Code Animation */}
        <div className={`morse reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          <p className="morse__title">Código Morse IATA — YYZ</p>
          <MorseVisualization />

          <div className="morse__description">
            <p>
              Antes mesmo de pisar no solo de Toronto, a sua conexão com o Rush já começou. O 
              código IATA do aeroporto — <strong>YYZ</strong> — não é apenas uma sigla de identificação 
              aeroportuária: é o título de uma das faixas instrumentais mais icônicas do rock.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Lançada no álbum <em>Moving Pictures</em> (1981), a música <strong>"YYZ"</strong> abre com 
              uma sequência rítmica hipnótica que reproduz as letras Y-Y-Z em código Morse (-.-- -.-- --..). 
              Neil Peart transformou essa sequência de pontos e traços no compasso de abertura da faixa, 
              criando um dos riffs mais reconhecíveis da história.
            </p>
            <div className="airport__tips" style={{ marginTop: '2rem' }}>
              <h4>Dicas para o visitante:</h4>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', opacity: 0.8 }}>
                <li>Ao desembarcar, preste atenção às placas com o código YYZ.</li>
                <li>Alguns fãs marcam a chegada com uma foto ao lado dos letreiros.</li>
                <li>Curiosidade: a faixa foi indicada ao Grammy de Melhor Performance Instrumental de Rock em 1982.</li>
                <li>Antes de sair do aeroporto, coloque "YYZ" para tocar e tente acompanhar o compasso 5/4.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
