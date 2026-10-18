"""Download each logo in final_sources.json into ./logos-raw/<id>.<ext> (a dedicated folder)."""
import json, sys, time, urllib.error, urllib.request
from pathlib import Path

HERE = Path(__file__).parent
RAW = HERE / "logos-raw"
RAW.mkdir(exist_ok=True)
UA = "price-management-ui mock data (personal prototype)"
EXT = {"svg": "svg", "png": "png", "jpeg": "jpg"}

failed = []
for f in json.loads((HERE / "final_sources.json").read_text()):
    if not f["url"]:
        continue
    dest = RAW / f"{f['id']}.{EXT[f['type']]}"
    if dest.exists() and dest.stat().st_size == f["bytes"]:
        continue
    req = urllib.request.Request(f["url"], headers={"User-Agent": UA})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                dest.write_bytes(r.read())
            break
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == 4:
                failed.append((f["id"], str(e))); break
            time.sleep(int(e.headers.get("Retry-After") or 0) or 5 * (attempt + 1))
        except Exception as e:
            failed.append((f["id"], str(e))); break
    time.sleep(1)

files = sorted(RAW.iterdir())
print(f"{len(files)} files, {round(sum(p.stat().st_size for p in files) / 1024)} KB")
print("failed:", failed or "none")
