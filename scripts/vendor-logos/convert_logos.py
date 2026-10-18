"""Make two versions of every logo in ./logos-raw:
  logos-out/<id>-color.<ext>  the original brand colors (SVGs cleaned of scripts/handlers)
  logos-out/<id>.svg          single color: every non-white pixel becomes ink, white becomes a cutout,
                              drawn in currentColor (so the container sets the color)
The single-color file wraps the original in an SVG filter + alpha mask, so it stays vector for SVG sources
and works the same way for PNG/JPG sources (embedded). IDs are prefixed per vendor so files can be inlined."""
import base64, re, struct, sys
from pathlib import Path

HERE = Path(__file__).parent
RAW, OUT = HERE / "logos-raw", HERE / "logos-out"
OUT.mkdir(exist_ok=True)

def num(v):
    m = re.match(r"\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)", v or "")
    return float(m.group(1)) if m else None

def clean_svg(text):
    text = re.sub(r"<\?xml[^>]*\?>", "", text)
    text = re.sub(r"<!DOCTYPE[^>[]*(\[[^\]]*\])?\s*>", "", text, flags=re.S)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = re.sub(r"<script\b.*?</script>", "", text, flags=re.S | re.I)
    text = re.sub(r"\son\w+\s*=\s*(\"[^\"]*\"|'[^']*')", "", text)
    return text.strip()

def svg_box(text):
    """The box the original renders in, as a browser draws it in an <img>: its own width/height
    when they're numbers, else its viewBox. Also returns its viewBox (None if it has none)."""
    root = re.search(r"<svg\b[^>]*>", text, re.S).group(0)
    vb = re.search(r"viewBox\s*=\s*[\"']([^\"']+)[\"']", root)
    w = re.search(r"\swidth\s*=\s*[\"']([^\"']+)[\"']", root)
    h = re.search(r"\sheight\s*=\s*[\"']([^\"']+)[\"']", root)
    viewbox = [float(n) for n in re.split(r"[\s,]+", vb.group(1).strip())] if vb else None
    ww = num(w.group(1)) if w and "%" not in w.group(1) else None
    hh = num(h.group(1)) if h and "%" not in h.group(1) else None
    if ww and hh:
        return ww, hh, viewbox, root
    if viewbox:
        return viewbox[2], viewbox[3], viewbox, root
    raise ValueError("no viewBox and no usable width/height")

def with_viewbox(text):
    """The color file: give it a viewBox if it has none, so it scales in an <img>."""
    w, h, viewbox, root = svg_box(text)
    if viewbox:
        return text
    return text.replace(root, root.replace("<svg", f'<svg viewBox="0 0 {w:g} {h:g}"', 1), 1)

def nested(text):
    """The original <svg> as a child filling the same box it renders in on its own."""
    w, h, viewbox, root = svg_box(text)
    new_root = re.sub(r"\s(width|height|x|y)\s*=\s*(\"[^\"]*\"|'[^']*')", "", root)
    new_root = new_root.replace("<svg", f'<svg x="0" y="0" width="{w:g}" height="{h:g}"', 1)
    if not viewbox:
        new_root = new_root.replace("<svg", f'<svg viewBox="0 0 {w:g} {h:g}"', 1)
    return text.replace(root, new_root, 1), w, h

def raster_size(data):
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", data[16:24])
    i = 2  # JPEG: walk segments to the first SOF
    while i < len(data):
        marker, length = data[i + 1], struct.unpack(">H", data[i + 2:i + 4])[0]
        if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
            h, w = struct.unpack(">HH", data[i + 5:i + 9])
            return w, h
        i += 2 + length
    raise ValueError("unknown raster")

# Default: anything darker than 5% counts as ink. Raise it where a pale background shape
# (e.g. a light grey bottle behind the text) would otherwise turn solid.
THRESHOLD = {"coca-cola-consolidated": 0.35, "chiquita": 0.3, "king-arthur": 0.3}
# Light artwork on a dark badge (white text in a blue box): the light parts become the ink instead.
INVERT = {"sargento": 0.5, "hain-celestial": 0.5}
# Full-color illustrations with no one-color reading: no single-color file (the UI falls back to the wordmark).
NO_MONO = {"sun-maid", "blue-bell"}

def mono(vid, inner, w, h):
    f, m = f"{vid}-ink", f"{vid}-mask"
    zeros = max(1, round((INVERT.get(vid) or THRESHOLD.get(vid, 0.05)) * 20))
    # Normal: alpha = A - luminance (dark = ink). Inverted: alpha = luminance + A - 1 (light = ink).
    alpha_row = "0.2126 0.7152 0.0722 1 -1" if vid in INVERT else "-0.2126 -0.7152 -0.0722 1 0"
    table = " ".join(["0"] * zeros + ["1"] * (20 - zeros))
    # alpha' = A - luminance: opaque white -> 0 (cutout), dark -> ~1, transparent -> 0.
    # Then a hard threshold, so light brand colors (yellow, light green) still read as ink.
    return f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w:g} {h:g}" width="{w:g}" height="{h:g}" aria-hidden="true" focusable="false">
<defs>
<filter id="{f}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  {alpha_row}"/>
<feComponentTransfer><feFuncA type="discrete" tableValues="{table}"/></feComponentTransfer>
</filter>
<mask id="{m}" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="{w:g}" height="{h:g}" style="mask-type:alpha">
<g filter="url(#{f})">{inner}</g>
</mask>
</defs>
<rect width="{w:g}" height="{h:g}" fill="currentColor" mask="url(#{m})"/>
</svg>
"""

done, failed = [], []
for src in sorted(RAW.iterdir()):
    vid, ext = src.stem, src.suffix[1:]
    try:
        if ext == "svg":
            text = clean_svg(src.read_text(encoding="utf-8", errors="replace"))
            (OUT / f"{vid}-color.svg").write_text(with_viewbox(text) + "\n")
            inner, w, h = nested(text)
        else:
            data = src.read_bytes()
            w, h = raster_size(data)
            (OUT / f"{vid}-color.{ext}").write_bytes(data)
            mime = "image/png" if ext == "png" else "image/jpeg"
            inner = f'<image width="{w}" height="{h}" xlink:href="data:{mime};base64,{base64.b64encode(data).decode()}"/>'
        if vid not in NO_MONO:
            (OUT / f"{vid}.svg").write_text(mono(vid, inner, w, h))
        done.append(vid)
    except Exception as e:
        failed.append((vid, str(e)))

print(f"converted {len(done)}; failed {len(failed)}")
for vid, why in failed:
    print("  ", vid, why)
