"""Write logos-out/index.html: every vendor's brand-color and single-color logo, large and at tile size."""
import html, json
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE / "logos-out"
final = json.loads((HERE / "final_sources.json").read_text())

cards = []
for f in final:
    vid, name = f["id"], html.escape(f["name"])
    color = next((p.name for p in OUT.glob(f"{vid}-color.*")), None)
    mono = (OUT / f"{vid}.svg").exists()
    if not color:
        cards.append(f'<div class="card missing"><h3>{name}</h3><p>No logo</p></div>')
        continue
    m = f"--logo:url('{vid}.svg')"
    cards.append(f"""<div class="card" id="{vid}"><h3>{name} <small>{f['type']}</small></h3>
<div class="row"><div class="big brand"><img src="{color}" alt=""></div>
<div class="big"><i class="ink" style="{m}"></i></div>
</div>
<div class="row small"><div class="tile teal"><i class="ink" style="{m}"></i></div></div></div>""" if mono else
f"""<div class="card" id="{vid}"><h3>{name} <small>{f['type']}</small></h3>
<div class="row"><div class="big brand"><img src="{color}" alt=""></div><div class="big"><p>No single-color version: wordmark fallback</p></div></div></div>""")

page = f"""<!doctype html><meta charset="utf-8"><title>Vendor logos</title>
<style>
body {{ font: 13px/1.4 system-ui; margin: 16px; background: #f7f6f8; color: #1c1821; }}
.grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; }}
.card {{ background: #fff; border: 1px solid #e2dee7; border-radius: 8px; padding: 10px; }}
.card.missing {{ border-style: dashed; color: #8c8397; }}
h3 {{ margin: 0 0 8px; font-size: 13px; }} small {{ color: #8c8397; font-weight: 400; }}
.row {{ display: flex; gap: 6px; margin-bottom: 6px; }}
.big {{ flex: 1; height: 72px; display: grid; place-items: center; border: 1px solid #eee; border-radius: 6px; padding: 6px; color: #35635f; }}
.tile {{ width: 80px; height: 48px; display: grid; place-items: center; border: 1px solid #e2dee7; border-radius: 6px; padding: 6px; color: #35635f; box-sizing: border-box; }}
.teal {{ background: #35635f; color: #fff; }} .plum {{ background: #3c2745; color: #fff; }}
.big img {{ width: 100%; height: 58px; object-fit: contain; }}
.ink {{ display: block; width: 100%; height: 100%; background: currentColor;
  -webkit-mask: var(--logo) center / contain no-repeat; mask: var(--logo) center / contain no-repeat; }}
</style>
<h1>Vendor logos ({sum(1 for c in cards if 'missing' not in c)} of {len(final)})</h1>
<p>Each card: brand color · single color on white; below, single color on the teal tile at 80×48.</p>
<div class="grid">{''.join(cards)}</div>
"""
for n in range(0, len(cards), 12):
    chunk = cards[n:n + 12]
    pg = page.replace("".join(cards), "".join(chunk))
    (OUT / f"page{n // 12 + 1}.html").write_text(pg)
fix = ["chiquita", "king-arthur", "blue-bell", "sargento", "hain-celestial", "utz", "sun-maid"]
chosen = [c for c in cards if any(f'id="{v}"' in c for v in fix)]
(OUT / "fixes.html").write_text(page.replace("".join(cards), "".join(chosen)))
print("pages written")
