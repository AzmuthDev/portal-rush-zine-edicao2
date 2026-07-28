"""
Rebuild index.html from index_backup.html (original Halide template).
- Replace only text content, keep ALL structural tags, classes, attributes.
- Add custom CSS theme at the very end of <head>, AFTER all existing styles.
- Fix IS_CSR to false so the original GSAP animations run.
- Force native cursor.
"""
import re

html = open('index_backup.html', 'r', encoding='utf-8').read()

# ═══════════════════════════════════════════
# 1. Text-only replacements (safe, no tags)
# ═══════════════════════════════════════════
text_swaps = {
    # ── TITLE + META ──
    "HALIDE — Photographer &amp; Darkroom Archive":
        "Portal Rush Zine — Edição 2: YYZ",
    "HALIDE — the darkroom archive of a fictional photographer. Rolls, frames, and prints that develop as you scroll.":
        "Portal Rush Zine — uma jornada documental pela banda Rush e a cidade de Toronto.",

    # ── NAV WORDMARK ──
    ">HALIDE<": ">POrtal Rush <span class=\"red\">ZIne</span><",

    # ── HERO EYEBROW ──
    "PHOTOGRAPHER — AN ARCHIVE OF LIGHT":
        "UMA JORNADA DOCUMENTAL DE RUSH",

    # ── HERO SUBTITLE ──
    "36 EXP · EST. 2016": "36 EXP · EST. 2016",

    # ── HERO FOOT DESC ──
    "Twelve rolls a year. No reshoots, no noise — photographs filed the way negatives are: numbered, dated, and left to speak.":
        "Sem palavras. Apenas o som do retorno a casa. Explora Toronto através do compasso 5/4.",

    # ── ROLL 01 — title + facts ──
    "The Quiet Range": "Moving Pictures",
    "Ten days above the weather line. The mountains sat still;":
        "Lançado em 1981, este álbum vendeu mais de 5 milhões de cópias.",
    "the light did all the moving.":
        "É o momento em que a complexidade do prog rock e a acessibilidade do rádio colidiram.",

    # ── SELECTED WORK — section head ──
    "FROM THE ARCHIVE.": "DO ARQUIVO.",
    "SELECTED WORK / THE ARCHIVE": "ENGENHARIA DE SOM / YYZ",

    # ── FEAT CARD 1 (lead) ──
    "Nightfall Survey": "O Código Aéreo",
    "F/1.8 · 20S": "O riff nasceu do código Morse",

    # ── FEAT CARD 2 (lead) ──
    "Fog Ledger": "Matemática 5/4",
    "F/5.6 · 1/125": "Compassos complexos 5/4 e 4/4",

    # ── FEAT CARD 3 (lead) ──
    "Still Water Study": "Jazz-Fusion Fills",
    "F/8 · 1/60": "O baixo de Geddy Lee",

    # ── FEAT CARD 4–8 ──
    "Dune Study": "1. Aeroporto YYZ",
    "F/11 · 1/250": "O ponto de partida",
    "Salt Flat": "2. Lee Lifeson Art Park",
    "F/8 · 1/500": "O retorno às raízes",
    "Pine Dark": "3. Massey Hall",
    "F/2.8 · 1/60": "A consagração",
    "Low Tide": "4. Henderson Brewing",
    "F/16 · 1/125": "O brinde final",
    "Harbour Wall": "5. Assembleia de Ontário",
    "F/5.6 · 1/250": "O cenário da capa",

    # ── ABOUT TEASER ──
    "THE PHOTOGRAPHER / BEHIND THE LENS": "O LEGADO / BASTIDORES",
    "Ten years": "O Legado",
    "chasing light": "e Testemunhos",
    "I shoot on film, develop by hand, and file every roll like a specimen. Landscapes at first light, portraits that hold still, editorial that refuses to shout — based in Berlin, working anywhere the light is worth the trip.":
        "\"Um testamento de proficiência técnica assustadora.\" — Dave Grohl. Apesar da pressão corporativa para fazer hits de 3 minutos, a banda sobreviveu à 'Down the Tubes Tour' para lançar a sua música mais honesta.",

    # ── RECOGNITION ──
    "RECOGNITION / SELECTED PRESS": "TESTEMUNHOS / CRÍTICA",
    # Quote
    "\u201cThe most quietly confident": "\u201cQuando ouvi YYZ, percebi que o baixo",
    "eye working in film today.\u201d": "podia ser a voz principal.\u201d",
    "— British Journal of Photography": "— Les Claypool",

    # ── JOURNAL ──
    "JOURNAL / DARKROOM NOTES": "ROTEIRO TURÍSTICO / TORONTO",
    "Notes between rolls.": "Passos em Toronto.",
    "Why I still meter by hand": "O aeroporto e o início",
    "Ten days without a reshoot": "Lee Lifeson Art Park",
    "The frame I didn't take": "A lenda do Massey Hall",
    "Grain is not noise": "Brindando na Henderson",
    "Chasing the blue hour north": "Sons na Assembleia",
    "On loving a single fixed lens": "O retorno a casa",

    # ── FOOTER CTA ──
    "LET'S": "A JORNADA",
    "SHOOT.": "YYZ.",
    "COMMISSIONS / 2026 — 2027": "EXPLORE / A JORNADA",

    # ── FOOTER BAR ──
    "HALIDE © 2026 · A TEMPLATE FICTION": "PORTAL RUSH ZINE © 2026",
    "EXPOSED, DEVELOPED, FILED": "A JORNADA YYZ",
}

for old, new in text_swaps.items():
    html = html.replace(old, new)

# ═══════════════════════════════════════════
# 2. Replace hero H1 text (HALIDE → -.-- / PORTAL RUSH)
#    The H1 has been split into .hl-ch spans by the original page capture.
#    We need to replace the text content of each span.
# ═══════════════════════════════════════════

# First hero-line: "HALIDE" → "-.-- -.-- --.."
# The original captured HTML has individual <span class="hl-ch"> for each letter.
# We need to find the first hero-line and replace each hl-ch's text.

def replace_hero_line(html, line_idx, new_text):
    """Replace the text in hero-line spans. line_idx: 0-based."""
    pattern = r'(<span class="hero-line" data-split="")'
    matches = list(re.finditer(pattern, html))
    if line_idx >= len(matches):
        return html
    
    start = matches[line_idx].start()
    # Find the closing </span> of the hero-line (it wraps the hl-ch spans)
    # We need to find the matching close for THIS span
    depth = 0
    i = start
    end = -1
    while i < len(html):
        if html[i:i+5] == '<span':
            depth += 1
        elif html[i:i+7] == '</span>':
            depth -= 1
            if depth == 0:
                end = i + 7
                break
        i += 1
    
    if end == -1:
        return html
    
    old_line = html[start:end]
    
    # Build new spans for each character
    new_spans = []
    for ch in new_text:
        if ch == ' ':
            new_spans.append('<span class="hl-ch">&nbsp;</span>')
        else:
            new_spans.append(f'<span class="hl-ch">{ch}</span>')
    
    # Check if there's a hero-dot in this line and preserve it
    dot_match = re.search(r'<span[^>]*class="[^"]*hero-dot[^"]*"[^>]*>.*?</span>', old_line)
    dot_html = dot_match.group(0) if dot_match else ''
    
    new_line = f'<span class="hero-line" data-split="">{"".join(new_spans)}{dot_html}</span>'
    html = html[:start] + new_line + html[end:]
    return html

# Line 1 (index 0): "HALIDE" + dot → "-.-- -.-- --.."
html = replace_hero_line(html, 0, "-.-- -.-- --..")

# Line 2 (index 1): "ARCHIVE" → "PORTAL RUSH ZINE: YYZ"  
html = replace_hero_line(html, 1, "PORTAL RUSH ZINE: YYZ")

# Make "ZINE" orange in the hero title
old_zine = '<span class="hl-ch">Z</span><span class="hl-ch">I</span><span class="hl-ch">N</span><span class="hl-ch">E</span>'
new_zine = '<span class="hl-ch red">Z</span><span class="hl-ch red">I</span><span class="hl-ch red">N</span><span class="hl-ch red">E</span>'
html = html.replace(old_zine, new_zine)

# Make "YYZ" red in the hero title
old_yyz = '<span class="hl-ch">Y</span><span class="hl-ch">Y</span><span class="hl-ch">Z</span>'
new_yyz = '<span class="hl-ch true-red">Y</span><span class="hl-ch true-red">Y</span><span class="hl-ch true-red">Z</span>'
html = html.replace(old_yyz, new_yyz)

# ═══════════════════════════════════════════
# 3. Inject our custom CSS theme JUST before </head>
#    This overrides the original design tokens.
# ═══════════════════════════════════════════
custom_css = """
<style id="portal-rush-theme">
/* ═══ PORTAL RUSH THEME — Vantablack + Silver + Neon Red ═══ */
:root {
  --ink: #000000 !important;
  --paper: #C0C0C0 !important;
  --red: #FF6600 !important;
  --dim: rgba(192, 192, 192, 0.5) !important;
  --hair: rgba(192, 192, 192, 0.14) !important;
  --panel: rgba(255, 255, 255, 0.05) !important;
}
/* Glassmorphism on feature cards */
.feat-media, .ab-portrait, .roll-thumb, .m-desc {
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5) !important;
}
/* Orange text for accent elements (removed neon) */
.red {
  color: var(--red) !important;
}
/* True red for specific words */
.true-red {
  color: #cf2e2e !important;
}
/* Hover glow on nav + buttons */
a.nav-here, .m-name, .cta-btn, .feat-end-cta {
  text-shadow: 0 0 8px rgba(192,192,192,0.5);
}
/* Native cursor always visible */
* { cursor: auto !important; }
/* Fix feat-cap for longer descriptions */
.feat-cap {
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}
.feat-data {
  font-size: 0.72rem;
  text-align: left;
  text-transform: none;
  line-height: 1.4;
  color: var(--paper) !important;
  white-space: normal;
}
</style>
"""
html = html.replace('</head>', custom_css + '\n</head>')

# ═══════════════════════════════════════════
# 4. Disable the custom cursor JS (which hides native cursor)
#    The GSAP cursor code sets body.style.cursor = 'none'
# ═══════════════════════════════════════════
html = html.replace(
    "document.body.style.cursor = 'none';",
    "/* document.body.style.cursor = 'none'; */"
)
html = html.replace(
    "el.style.cursor = 'none'",
    "{ /* cursor kept native */ }"
)

# ═══════════════════════════════════════════
# 5. Keep IS_CSR = false so original GSAP animations run!
#    The offline-fix script has IS_CSR = false, which means
#    GSAP/ScrollTrigger will handle animations natively.
#    The snapReveal at 5s acts as a safety net.
# ═══════════════════════════════════════════
# (IS_CSR is already false in the backup, we just keep it)

# ═══════════════════════════════════════════
# 6. Fix the page title tag
# ═══════════════════════════════════════════
html = html.replace(
    '<title>HALIDE',
    '<title>Portal Rush Zine'
)

# ═══════════════════════════════════════════
# 7. Fix the foot-mark (giant watermark text)
# ═══════════════════════════════════════════
html = html.replace(
    '>HALIDE</p>',
    '>PORTAL</p>'
)

# ═══════════════════════════════════════════
# WRITE OUTPUT
# ═══════════════════════════════════════════
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("[OK] index.html rebuilt successfully from index_backup.html")
print(f"   Output size: {len(html):,} bytes")
