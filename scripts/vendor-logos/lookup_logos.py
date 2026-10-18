"""Find each vendor's infobox logo on English Wikipedia and report the file's URL, type and size.
Reads metadata only; downloads nothing. Writes logo_sources.json next to this script."""
import json, re, sys, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from vendors60 import VENDORS

API = "https://en.wikipedia.org/w/api.php"
UA = "price-management-ui mock data lookup (personal prototype)"

def get(params):
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json", "formatversion": 2, "maxlag": 5})
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == 5:
                raise
            time.sleep(int(e.headers.get("Retry-After") or 0) or 5 * (attempt + 1))

def infobox_logo(title):
    data = get({"action": "parse", "page": title, "prop": "wikitext", "section": 0, "redirects": 1})
    if "error" in data:
        return None, data["error"].get("info")
    text = data["parse"]["wikitext"]
    m = re.search(r"\|\s*logo\s*=\s*([^\n|]+)", text, re.I)
    if not m:
        return None, "no logo field"
    val = m.group(1).strip()
    f = re.search(r"(?:\[\[)?(?:File:|Image:)?\s*([^\]\|{}]+?\.(?:svg|png|jpe?g|gif))", val, re.I)
    if not f:
        return None, f"unparsed logo field: {val[:60]}"
    return f.group(1).strip(), None

def file_info(name):
    data = get({"action": "query", "titles": "File:" + name, "prop": "imageinfo",
                "iiprop": "url|size|mime|extmetadata", "iiextmetadatafilter": "LicenseShortName"})
    page = data["query"]["pages"][0]
    if "imageinfo" not in page:
        return None
    ii = page["imageinfo"][0]
    lic = ii.get("extmetadata", {}).get("LicenseShortName", {}).get("value", "")
    return {"url": ii["url"], "mime": ii["mime"], "bytes": ii["size"], "w": ii["width"], "h": ii["height"],
            "host": "commons" if "/commons/" in ii["url"] else "enwiki", "license": lic}

prev_path = Path(__file__).with_name("logo_sources.json")
prev = {o["id"]: o for o in json.loads(prev_path.read_text())} if prev_path.exists() else {}
out = []
for vid, name, title in VENDORS:
    if vid in prev and not (prev[vid]["note"] or "").startswith("error"):
        out.append(prev[vid]); continue
    try:
        fname, why = infobox_logo(title)
        info = file_info(fname) if fname else None
    except Exception as e:
        fname, info, why = None, None, f"error: {e}"
    out.append({"id": vid, "name": name, "article": title, "file": fname, "info": info, "note": why})
    time.sleep(1.5)

Path(__file__).with_name("logo_sources.json").write_text(json.dumps(out, indent=1, ensure_ascii=False))
svg = sum(1 for o in out if o["info"] and o["info"]["mime"] == "image/svg+xml")
png = sum(1 for o in out if o["info"] and o["info"]["mime"] != "image/svg+xml")
print(f"svg {svg} · raster {png} · none {60 - svg - png}")
for o in out:
    i = o["info"]
    print(f"{o['id']:24} {(i['mime'].split('/')[1] if i else '-'):8} {(str(round(i['bytes']/1024))+'KB' if i else ''):>7}  {o['file'] or o['note']}")
