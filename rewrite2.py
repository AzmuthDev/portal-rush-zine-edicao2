import re

html = open('index_backup.html', 'r', encoding='utf-8').read()

# 1. CSS Overrides
style_inject = """
<style>
:root {
  --ink: #000000 !important;
  --paper: #C0C0C0 !important;
  --red: #FF003C !important;
  --dim: rgba(192, 192, 192, 0.5) !important;
  --hair: rgba(192, 192, 192, 0.14) !important;
  --panel: rgba(255, 255, 255, 0.05) !important;
}
.feat-media, .ab-portrait, .roll-thumb, .m-desc {
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5) !important;
}
.red {
  text-shadow: 0 0 10px #FF003C, 0 0 20px #FF003C;
}
a.nav-here, .m-name, .cta-btn, .feat-end-cta {
  text-shadow: 0 0 8px rgba(192,192,192,0.5);
}
/* Prevent long descriptions from breaking the flex container */
.feat-cap { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.feat-data { font-size: 0.75rem; text-align: left; text-transform: none; line-height: 1.4; color: var(--paper) !important; white-space: normal; }
/* Keep cursor visible natively */
* { cursor: auto !important; }
</style>
"""
html = html.replace('</head>', style_inject + '\n</head>')

# 2. Hero H1 without inline styles!
def create_spans(text):
    spans = []
    for c in text:
        if c == ' ':
            spans.append('<span class="hl-ch">&nbsp;</span>')
        else:
            spans.append(f'<span class="hl-ch">{c}</span>')
    return ''.join(spans)

new_h1_html = f'<h1>\n<span class="hero-mask"><span class="hero-line" data-split="">{create_spans("-.-- -.-- --..")}</span></span>\n<span class="hero-mask"><span class="hero-line" data-split="">{create_spans("PORTAL RUSH ZINE: YYZ")}<span aria-hidden="true" class="red hero-dot hl-ch"></span></span></span>\n</h1>'
html = re.sub(r'<h1>[\s\S]*?</h1>', new_h1_html, html)

# 3. Disable custom cursor in JS to prevent bugs
html = html.replace("document.body.style.cursor = 'none';", "// document.body.style.cursor = 'none';")
html = html.replace("el.style.cursor = 'none'", "/*el.style.cursor = 'none'*/")

# 4. Text replacements
replacements = {
    "Twelve rolls a year. No reshoots, no noise — photographs filed the way negatives are: numbered, dated, and left to speak.": "Sem palavras. Apenas o som do retorno a casa. Explora Toronto através do compasso 5/4.",
    "The Quiet Range": "Moving Pictures: O Equilíbrio Perfeito",
    "Ten days above the weather line. The mountains sat still;": "Lançado em 1981, este álbum vendeu mais de 5 milhões de cópias (5x Platina). ",
    "the light did all the moving.": "É o momento exato em que a complexidade do prog rock e a acessibilidade do rádio colidiram.",
    
    # Section 2
    "Nightfall Survey": "O Código Aéreo",
    "F/1.8 · 20S": "O riff nasceu do código Morse de radar do Aeroporto Pearson captado no painel do avião de Alex Lifeson.",
    "Fog Ledger": "Matemática 5/4",
    "F/5.6 · 1/125": "Alternância genial de bússolas 5/4 e 4/4 e compassos complexos.",
    "Still Water Study": "Jazz-Fusion Fills",
    "F/8 · 1/60": "Preenchimentos assustadores de baixo de Geddy Lee.",
    
    # Section 3
    "Dune Study": "1. Aeroporto YYZ",
    "F/11 · 1/250": "O ponto de partida",
    "Salt Flat": "2. Lee Lifeson Art Park",
    "F/8 · 1/500": "O Retorno às Raízes",
    "Pine Dark": "3. Massey Hall",
    "F/2.8 · 1/60": "A Consagração",
    "Low Tide": "4. Henderson Brewing",
    "F/16 · 1/125": "O Brinde",
    "Harbour Wall": "5. Assembleia de Ontário",
    "F/5.6 · 1/250": "O Cenário da Capa",

    # Section 4
    "“The most quietly confident": "“Quando ouvi YYZ, percebi que o baixo",
    "eye working in film today.”": "podia ser a voz principal.”",
    "— British Journal of Photography": "— Les Claypool",
    "Ten years": "O Legado",
    "chasing light": "e Testemunhos",
    "I shoot on film, develop by hand, and file every roll like a specimen. Landscapes at first light, portraits that hold still, editorial that refuses to shout — based in Berlin, working anywhere the light is worth the trip.": "\"Um testamento de proficiência técnica assustadora.\" – Dave Grohl. Apesar da pressão corporativa para fazer hits de 3 minutos, a banda sobreviveu à 'Down the Tubes Tour' para lançar a sua música mais honesta.",
    
    # Footer
    "HALIDE © 2026 · A TEMPLATE FICTION": "Desenvolvido sob a estética Luxury Tech. Mantém os links de navegação limpos e com efeito de hover metálico.",
    "EXPOSED, DEVELOPED, FILED": "A JORNADA YYZ",
    
    # Various other places
    "PHOTOGRAPHER — AN ARCHIVE OF LIGHT": "UMA JORNADA DOCUMENTAL DE RUSH",
    "HALIDE — Photographer &amp; Darkroom Archive": "Portal Rush Zine - Edição 2: YYZ",
    "SELECTED WORK / THE ARCHIVE": "ENGENHARIA DE SOM / YYZ",
    "THE PHOTOGRAPHER / BEHIND THE LENS": "O LEGADO / BASTIDORES",
    "RECOGNITION / SELECTED PRESS": "TESTEMUNHOS / CRÍTICA",
    "JOURNAL / DARKROOM NOTES": "ROTEIRO TURÍSTICO / TORONTO",
    "COMMISSIONS / 2026 — 2027": "EXPLORE / A JORNADA",
    
    "Notes between rolls.": "Passos em Toronto.",
    "Why I still meter by hand": "O aeroporto e o início",
    "Ten days without a reshoot": "Lee Lifeson Art Park",
    "The frame I didn't take": "A lenda do Massey Hall",
    "Grain is not noise": "Brindando na Henderson",
    "Chasing the blue hour north": "Sons na Assembleia",
    "On loving a single fixed lens": "O retorno a casa"
}

for old, new in replacements.items():
    html = html.replace(old, new)

# Also fix the top nav HALIDE name
html = html.replace(">HALIDE<", ">PORTAL RUSH<")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
