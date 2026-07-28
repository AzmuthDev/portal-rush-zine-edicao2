import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './LeeLifesonPark.css';

export default function LeeLifesonPark() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="lee-lifeson-park" className="parkSection section">
      <div ref={ref} className="park__inner">

        <div className={`section-label reveal ${isVisible ? 'visible' : ''}`}>
          04 — Ponto Turístico N.º 2
        </div>

        <h2 className={`park__heading metallic-text reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          Lee Lifeson Art Park
        </h2>

        <p className={`park__location reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          130 Newtonbrook Plaza, North York (Willowdale) — Toronto, ON
        </p>

        <p className={`park__intro reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          No coração de <strong>Willowdale</strong>, o pacato bairro suburbano do norte de Toronto onde dois adolescentes decidiram mudar a história do rock, existe um parque que carrega os seus nomes: o <strong>Lee Lifeson Art Park</strong>. É aqui que <strong>Geddy Lee</strong> e <strong>Alex Lifeson</strong> cresceram, frequentaram a mesma escola e formaram, em 1968, a banda que se tornaria o Rush.
          <br /><br />
          Inaugurado em 2018, o parque é uma homenagem oficial da cidade de Toronto aos seus filhos mais célebres. O espaço conta com instalações de arte interativas que celebram a conexão entre música, comunidade e criatividade.
        </p>

        {/* Feature Cards */}
        <div className={`park__features reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
          <div className="park__feature-card glass-card">
            <div className="park__feature-icon">🚶</div>
            <h4>Caminhe pelo bairro</h4>
            <p>
              As ruas residenciais pacatas ao redor são as mesmas onde Lee e Lifeson andavam de bicicleta antes de se tornarem lendas.
            </p>
          </div>

          <div className="park__feature-card glass-card">
            <div className="park__feature-icon">🎧</div>
            <h4>Pausa Contemplativa</h4>
            <p>
              O parque é aberto ao público, com acesso gratuito. Ideal para uma pausa contemplativa com <em>Subdivisions</em> tocando nos fones.
            </p>
          </div>

          <div className="park__feature-card glass-card">
            <div className="park__feature-icon">📸</div>
            <h4>Ponto de Fotos</h4>
            <p>
              Combine a visita com um passeio por North York. A iluminação do fim de tarde transforma as esculturas em algo quase cinematográfico.
            </p>
          </div>
        </div>

        {/* Closing Quote */}
        <div className={`park__closing reveal reveal-delay-4 ${isVisible ? 'visible' : ''}`}>
          <p className="park__quote">
            "Partimos daqui para percorrer o mundo inteiro. Mas é sempre aqui 
            que o coração regressa."
          </p>
          <p className="park__quote-source">
            <span className="park__quote-dash" />
            Geddy Lee, sobre Willowdale
          </p>
        </div>

      </div>
    </section>
  );
}
