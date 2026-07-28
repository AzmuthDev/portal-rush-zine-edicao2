import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace from <section id="about-teaser"> up to </section>\n</main>
# with our new sections + </main>

new_content = '''
<section id="airport-yyz" class="roll-section" style="padding: clamp(3rem, 10vh, 10rem) var(--pad);">
  <div class="ab-grid">
    <div class="ab-portrait" style="clip-path: none;">
       <img alt="Airport YYZ" loading="lazy" src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format"/>
    </div>
    <div class="ab-copy">
       <p class="mono dim sec-label" data-decode="" data-text="01 — PONTO TURÍSTICO">01 — PONTO TURÍSTICO</p>
       <h2 class="ab-title">
         <span class="line-mask"><span class="line" style="transform: translate(0px, 0px);">Aeroporto YYZ<span class="red">.</span></span></span>
       </h2>
       <p class="ab-lede" data-fade="">Antes mesmo de pisar no solo de Toronto, a sua conexão com o Rush já começou. O código IATA do aeroporto — YYZ — não é apenas uma sigla: é o título de uma das faixas instrumentais mais icônicas do rock (Moving Pictures, 1981).</p>
       <div class="ab-stats" data-fade="">
         <div class="ab-stat"><span class="ab-num">#1</span><span class="ab-lab mono">Placas YYZ</span></div>
         <div class="ab-stat"><span class="ab-num">#2</span><span class="ab-lab mono">Grammy '82</span></div>
       </div>
    </div>
  </div>
</section>

<section id="lee-lifeson-park" class="roll-section" style="padding: clamp(3rem, 10vh, 10rem) var(--pad);">
  <div class="ab-grid" style="direction: rtl;">
    <div class="ab-portrait" style="clip-path: none; direction: ltr;">
       <img alt="Lee Lifeson Park" loading="lazy" src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format"/>
    </div>
    <div class="ab-copy" style="direction: ltr;">
       <p class="mono dim sec-label" data-decode="" data-text="02 — PONTO TURÍSTICO">02 — PONTO TURÍSTICO</p>
       <h2 class="ab-title">
         <span class="line-mask"><span class="line" style="transform: translate(0px, 0px);">Lee Lifeson Park<span class="red">.</span></span></span>
       </h2>
       <p class="ab-lede" data-fade="">No coração de Willowdale, onde Geddy Lee e Alex Lifeson cresceram e formaram a banda. O parque é uma homenagem oficial da cidade de Toronto com arte interativa e música.</p>
       <div class="ab-stats" data-fade="">
         <div class="ab-stat"><span class="ab-num">#1</span><span class="ab-lab mono">Bairro histórico</span></div>
         <div class="ab-stat"><span class="ab-num">#2</span><span class="ab-lab mono">Subdivisions</span></div>
       </div>
    </div>
  </div>
</section>

<section id="massey-hall" class="roll-section" style="padding: clamp(3rem, 10vh, 10rem) var(--pad);">
  <div class="ab-grid">
    <div class="ab-portrait" style="clip-path: none; height: 100%;">
       <video src="videos/massey-hall-video.mp4" autoPlay loop muted playsInline style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.8) contrast(1.1);"></video>
    </div>
    <div class="ab-copy">
       <p class="mono dim sec-label" data-decode="" data-text="03 — A LENDA">03 — A LENDA</p>
       <h2 class="ab-title">
         <span class="line-mask"><span class="line" style="transform: translate(0px, 0px);">Massey Hall<span class="red">.</span></span></span>
       </h2>
       <p class="ab-lede" data-fade="">Se existe um palco que viu o Rush se tornar um fenômeno, é o Massey Hall. Foi aqui que gravaram o épico All the World's a Stage (1976), um álbum que pavimentou o caminho para 2112 e Hemispheres.</p>
       <div class="ab-stats" data-fade="">
         <div class="ab-stat"><span class="ab-num">#1</span><span class="ab-lab mono">Consulte shows</span></div>
         <div class="ab-stat"><span class="ab-num">#2</span><span class="ab-lab mono">Acústica mágica</span></div>
       </div>
    </div>
  </div>
</section>

<section id="ontario-assembly" class="roll-section" style="padding: clamp(3rem, 10vh, 10rem) var(--pad);">
  <div class="ab-grid" style="direction: rtl;">
    <div class="ab-portrait" style="clip-path: none; direction: ltr;">
       <img alt="Ontario Assembly" loading="lazy" src="https://images.unsplash.com/photo-1569982175971-d92b01cf8694?q=80&w=1200&auto=format"/>
    </div>
    <div class="ab-copy" style="direction: ltr;">
       <p class="mono dim sec-label" data-decode="" data-text="04 — A CAPA">04 — A CAPA</p>
       <h2 class="ab-title">
         <span class="line-mask"><span class="line" style="transform: translate(0px, 0px);">Assembleia<br/>de Ontário<span class="red">.</span></span></span>
       </h2>
       <p class="ab-lede" data-fade="">Nas escadarias majestosas do Queen's Park foi fotografada a capa de Moving Pictures (1981). A arte mostra pessoas carregando quadros (moving pictures) e outras se comovendo (moved to tears).</p>
       <div class="ab-stats" data-fade="">
         <div class="ab-stat"><span class="ab-num">#1</span><span class="ab-lab mono">Leve um quadro</span></div>
         <div class="ab-stat"><span class="ab-num">#2</span><span class="ab-lab mono">Acesso público</span></div>
       </div>
    </div>
  </div>
</section>

<section id="henderson-brewing" class="roll-section" style="padding: clamp(3rem, 10vh, 10rem) var(--pad);">
  <div class="ab-grid">
    <div class="ab-portrait" style="clip-path: none;">
       <img alt="Henderson Brewing" loading="lazy" src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=800&auto=format"/>
    </div>
    <div class="ab-copy">
       <p class="mono dim sec-label" data-decode="" data-text="05 — O BRINDE">05 — O BRINDE</p>
       <h2 class="ab-title">
         <span class="line-mask"><span class="line" style="transform: translate(0px, 0px);">Henderson Brewing<span class="red">.</span></span></span>
       </h2>
       <p class="ab-lede" data-fade="">Nada mais justo do que levantar um copo na Henderson Brewing Company, a cervejaria que selou parceria com a banda para criar a Rush Canadian Golden Ale. Um verdadeiro santuário para fãs.</p>
       <div class="ab-stats" data-fade="">
         <div class="ab-stat"><span class="ab-num">#1</span><span class="ab-lab mono">Visite o taproom</span></div>
         <div class="ab-stat"><span class="ab-num">#2</span><span class="ab-lab mono">Latas souvenir</span></div>
       </div>
    </div>
  </div>
</section>
</main>
'''

pattern = r'<section id="about-teaser">.*?</section>\s*</main>'
replaced = re.sub(pattern, new_content, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(replaced)

print("Replacement successful")
