import React from 'react';
import { useScrollReveal } from '../hooks/useEffects';
import './Editorial.css';

export default function Editorial() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="editorial" className="editorial section">
      <div ref={ref} className={`editorial__inner ${isVisible ? '' : ''}`}>

        {/* Text Column */}
        <div className={`editorial__text-col reveal ${isVisible ? 'visible' : ''}`}>
          <div className="section-label">02 — Editorial</div>

          <h2 className="editorial__heading metallic-text">
            Os Garotos<br />de Willowdale
          </h2>

          <hr className="editorial__rule" />

          <div className="editorial__body">
            <p>
              Existe uma cidade no mundo onde o <strong>rock progressivo</strong> não é apenas gênero musical — é patrimônio cultural. 
              <strong>Toronto</strong>, no Canadá, é o berço de uma das maiores bandas da história do rock: o <strong>Rush</strong>.
            </p>
            <p>
              Foi nas ruas geladas de Willowdale, nos palcos lendários do centro e nos corredores do aeroporto mais movimentado 
              do país que <strong>Geddy Lee</strong>, <strong>Alex Lifeson</strong> e <strong>Neil Peart</strong> forjaram um 
              som que desafiou convenções por mais de quatro décadas.
            </p>
            <p>
              Para o fã do Rush, visitar Toronto não é turismo — é <strong>peregrinação</strong>. Cada esquina carrega um acorde, 
              cada marco conta um capítulo de uma discografia que redefiniu os limites do que três músicos podem fazer juntos. 
              Este roteiro é o seu guia por cinco paradas essenciais, na ordem perfeita para transformar a sua viagem numa jornada 
              digna de um álbum conceitual.
            </p>
            <p>
              <strong>Coloque os fones, dê play em <em>Moving Pictures</em> e embarque conosco.</strong>
            </p>
          </div>
        </div>

        {/* Photo Column */}
        <div className={`editorial__photo-col reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          <div className="editorial__photo-frame">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format"
              alt="Rush — fotografia clássica da banda a preto e branco"
              loading="lazy"
            />
            <div className="editorial__photo-caption">
              Rush — Toronto, anos 70
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
