import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './FooterMap.css';

/**
 * SVG Circuit-Board Map of Toronto
 * Draws an animated path connecting the 4 tour stops.
 * Styled like a luxury tech circuit board trace.
 */
function CircuitMap({ isVisible }) {
  // Simplified node positions representing Toronto landmarks
  const nodes = [
    { id: 1, x: 100, y: 140, label: 'Pearson Airport', sub: 'YYZ' },
    { id: 2, x: 300, y: 80, label: 'Willowdale', sub: 'Lee Lifeson Park' },
    { id: 3, x: 480, y: 180, label: 'Victoria St.', sub: 'Massey Hall' },
    { id: 4, x: 620, y: 100, label: 'Sterling Rd.', sub: 'Henderson Brewing' },
    { id: 5, x: 780, y: 140, label: 'Queen\'s Park', sub: 'Assembleia' },
  ];

  // The circuit-board path connecting all nodes with right-angle traces
  const pathD = `M 100 140 L 200 140 L 200 80 L 300 80 L 300 80 L 390 80 L 390 180 L 480 180 L 480 180 L 550 180 L 550 100 L 620 100 L 620 100 L 700 100 L 700 140 L 780 140`;

  return (
    <div className="circuit-map">
      <svg className="circuit-map__svg" viewBox="0 0 850 260" preserveAspectRatio="xMidYMid meet">
        {/* Definitions */}
        <defs>
          <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#666666" />
            <stop offset="30%" stopColor="#cccccc" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#cccccc" />
            <stop offset="100%" stopColor="#666666" />
          </linearGradient>
        </defs>

        {/* Grid dots background */}
        <g className="circuit-map__grid">
          {Array.from({ length: 17 }).map((_, col) =>
            Array.from({ length: 6 }).map((_, row) => (
              <circle
                key={`${col}-${row}`}
                cx={50 * col + 25}
                cy={45 * row + 10}
                r="1"
                fill="#ffffff"
              />
            ))
          )}
        </g>

        {/* Circuit trace */}
        <path
          className={`circuit-path ${isVisible ? 'animated' : ''}`}
          d={pathD}
        />

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Outer ring */}
            <circle
              className="circuit-node"
              cx={node.x}
              cy={node.y}
              r="12"
            />
            {/* Inner dot */}
            <circle
              className={`circuit-node-center ${isVisible ? 'animated' : ''}`}
              cx={node.x}
              cy={node.y}
              r="3"
              style={{ animationDelay: `${1.5 + i * 0.5}s` }}
            />
            {/* Label */}
            <text
              className="circuit-label"
              x={node.x}
              y={node.y + 28}
              textAnchor="middle"
            >
              {node.label}
            </text>
            <text
              className="circuit-label-number"
              x={node.x}
              y={node.y + 40}
              textAnchor="middle"
            >
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function FooterMap() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const steps = [
    { num: '01', name: 'Pearson Airport (YYZ)', desc: 'A porta de entrada e a génese do riff 5/4.' },
    { num: '02', name: 'Lee Lifeson Art Park', desc: 'Willowdale. Onde nasceram os primeiros acordes.' },
    { num: '03', name: 'Massey Hall', desc: 'Victoria St. Onde All the World\'s a Stage se tornou lenda.' },
    { num: '04', name: 'Henderson Brewing', desc: 'Junction Triangle. Um brinde à Rush Canadian Golden Ale.' },
    { num: '05', name: 'Assembleia de Ontário', desc: 'Queen\'s Park. O cenário de Moving Pictures.' },
  ];

  return (
    <footer id="rotas" className="routeFooter section">
      <div ref={ref} className="footer__inner">

        <div className={`section-label reveal ${isVisible ? 'visible' : ''}`} style={{ justifyContent: 'center' }}>
          08 — A Rota
        </div>

        <h2 className={`footer__heading metallic-text reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          A Playlist Está Esperando
        </h2>

        {/* SVG Map */}
        <div className={`reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          <CircuitMap isVisible={isVisible} />
        </div>

        {/* Route Steps */}
        <div className={`route-steps reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
          {steps.map((step) => (
            <div key={step.num} className="route-step glass-card">
              <span className="route-step__number">{step.num}</span>
              <p className="route-step__name">{step.name}</p>
              <p className="route-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className={`reveal reveal-delay-4 ${isVisible ? 'visible' : ''}`} style={{ textAlign: 'center', marginTop: '4rem', maxWidth: '800px', margin: '4rem auto 0 auto' }}>
          <p style={{ color: 'var(--silver-mid)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            Cada parada deste roteiro é uma chance de conectar as músicas que marcaram a sua vida com os lugares reais que as inspiraram. Abra o Spotify, monte a sua playlist definitiva do Rush e comece a fazer as malas. Toronto está esperando — e o compasso 5/4 já está marcando o ritmo da sua próxima aventura.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--gold-warm)', marginTop: '2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            "Attention all planets of the Solar Federation: We have assumed control." 🚀
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            &copy; 2026 Rush Zine. Todos os direitos reservados.
          </span>
          <span className="footer__edition">
            Edição N.º 02 — YYZ &amp; O Guia Turístico
          </span>
        </div>
      </div>
    </footer>
  );
}
