"""For vendors whose infobox logo isn't an SVG, search Wikimedia Commons for SVG logo files.
Metadata only; downloads nothing. Writes commons_candidates.json."""
import json, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path

HERE = Path(__file__).parent
API = "https://commons.wikimedia.org/w/api.php"
UA = "price-management-ui mock data lookup (personal prototype)"

QUERIES = {
    "coca-cola-consolidated": "Coca-Cola Consolidated logo",
    "mondelez": "Mondelez International logo",
    "conagra": "Conagra Brands logo",
    "danone-na": "Danone logo",
    "constellation": "Constellation Brands logo",
    "flowers-foods": "Flowers Foods logo",
    "bimbo-usa": "Grupo Bimbo logo",
    "perdue": "Perdue Farms logo",
    "land-o-lakes": "Land O'Lakes logo",
    "dfa": "Dairy Farmers of America logo",
    "sargento": "Sargento logo",
    "barilla": "Barilla logo",
    "blue-diamond": "Blue Diamond Growers logo",
    "sun-maid": "Sun-Maid logo",
    "hain-celestial": "Hain Celestial logo",
    "bobs-red-mill": "Bob's Red Mill logo",
    "goya": "Goya Foods logo",
    "blue-bell": "Blue Bell Creameries logo",
    "red-bull": "Red Bull logo",
    "monster": "Monster Energy logo",
    "celsius": "Celsius energy drink logo",
    "utz": "Utz logo",
    "treehouse": "TreeHouse Foods logo",
}

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

out = {}
for vid, q in QUERIES.items():
    try:
        data = get({"action": "query", "generator": "search", "gsrsearch": f"{q} filemime:image/svg+xml",
                    "gsrnamespace": 6, "gsrlimit": 4, "prop": "imageinfo", "iiprop": "url|size"})
        pages = sorted(data.get("query", {}).get("pages", []), key=lambda p: p.get("index", 99))
        out[vid] = [{"title": p["title"], "url": p["imageinfo"][0]["url"], "bytes": p["imageinfo"][0]["size"]}
                    for p in pages if "imageinfo" in p]
    except Exception as e:
        out[vid] = [{"error": str(e)}]
    time.sleep(1.5)

(HERE / "commons_candidates.json").write_text(json.dumps(out, indent=1, ensure_ascii=False))
for vid, cands in out.items():
    print(vid)
    for c in cands:
        print("   ", c.get("title") or c.get("error"), f"{round(c['bytes']/1024)}KB" if "bytes" in c else "")
