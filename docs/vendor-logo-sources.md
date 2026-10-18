# Vendor logo sources (mock data, Oct 18)

Logos for the 60-vendor mock set, from Wikimedia (`upload.wikimedia.org`). Real company logos are trademarks of their owners; used here in a prototype only (Will, Oct 18: trademark question set aside for now).

45 SVG · 14 raster (13 PNG, 1 JPG) · 1 none · about 2 MB downloaded.

## Two versions per vendor (`src/assets/vendor-logos/`)
- `<id>-color.<ext>`: the brand colors, as published (SVGs cleaned of scripts and comments, and given a `viewBox` when they had none so they scale).
- `<id>.svg`: single color. The original sits inside an SVG filter and alpha mask: every pixel darker than near-white becomes ink, white becomes a cutout, and the ink is `currentColor`. Shown with a CSS mask, it takes its color from its container. Vector sources stay vector.

Checked one by one on a contact sheet (brand color, single color on white, single color on the teal tile at 80×48). Adjusted:

| Vendor | Problem | Fix |
|---|---|---|
| Coca-Cola Consolidated | A pale grey bottle behind the text went solid | Stricter threshold (35%) |
| Chiquita | Yellow oval and blue ring merged into one shape | Stricter threshold (30%). Still weak at tile size |
| King Arthur Baking | Cream badge went solid | Stricter threshold (30%) |
| Sargento, Hain Celestial | White text on a dark box: the box went solid, the text vanished | Inverted: the light parts are the ink |
| Sun-Maid, Blue Bell | Full-color illustration; no one-color reading | No single-color file; wordmark fallback |
| Cargill, Tyson | Files with an unusual size declaration (mismatched viewBox, `1e3`) | Converter fixed |

Weak at tile size, worth a look in review: Chiquita, Del Monte Foods, Fresh Del Monte (solid badge, thin script cutout), Tyson (merges at small size), and very wide wordmarks (The Coca-Cola Company, Land O'Lakes) that shrink in an 80×48 tile. WK Kellogg's file is about 0.8 MB (twice), worth slimming later.

To re-run: `scripts/vendor-logos/` (lookup → download → convert → contact sheet), Python 3, no other tools.

| # | Vendor | Type | Size | Source file | Found via |
|---|---|---|---|---|---|
| 1 | Nestlé USA | SVG | 14 KB | [Nestlé.svg](https://upload.wikimedia.org/wikipedia/en/d/d8/Nestl%C3%A9.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 2 | PepsiCo | SVG | 3 KB | [PEP BIG.svg](https://upload.wikimedia.org/wikipedia/commons/6/67/PEP_BIG.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 3 | The Coca-Cola Company | SVG | 9 KB | [The Coca-Cola Company (2020).svg](https://upload.wikimedia.org/wikipedia/commons/0/09/The_Coca-Cola_Company_%282020%29.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 4 | Coca-Cola Consolidated | PNG | 40 KB | [Coca-Cola Bottling Co. Consolidated logo.png](https://upload.wikimedia.org/wikipedia/en/0/0e/Coca-Cola_Bottling_Co._Consolidated_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 5 | General Mills | SVG | 11 KB | [General Mills logo.svg](https://upload.wikimedia.org/wikipedia/commons/0/00/General_Mills_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 6 | The Kraft Heinz Company | SVG | 10 KB | [KraftHeinz.svg](https://upload.wikimedia.org/wikipedia/commons/5/55/KraftHeinz.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 7 | Mondelēz International | SVG | 12 KB | [Mondelez International.svg](https://upload.wikimedia.org/wikipedia/commons/3/3b/Mondelez_International.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 8 | Kellanova | SVG | 4 KB | [Kellanova logo.svg](https://upload.wikimedia.org/wikipedia/commons/5/59/Kellanova_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 9 | WK Kellogg Co | SVG | 789 KB | [WK Kellogg logo.svg](https://upload.wikimedia.org/wikipedia/commons/0/0d/WK_Kellogg_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 10 | Conagra Brands | PNG | 55 KB | [Conagra brands logo17.png](https://upload.wikimedia.org/wikipedia/en/4/44/Conagra_brands_logo17.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 11 | The Campbell's Company | SVG | 6 KB | [Campbell's 2021.svg](https://upload.wikimedia.org/wikipedia/commons/e/e2/Campbell%27s_2021.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 12 | The J.M. Smucker Company | SVG | 29 KB | [The J.M. Smucker Company logo.svg](https://upload.wikimedia.org/wikipedia/en/c/c6/The_J.M._Smucker_Company_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 13 | Hormel Foods | SVG | 12 KB | [Hormel_Foods_logo.svg](https://upload.wikimedia.org/wikipedia/en/9/9a/Hormel_Foods_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 14 | Tyson Foods | SVG | 9 KB | [Tyson Foods corporate logo (2024).svg](https://upload.wikimedia.org/wikipedia/commons/4/40/Tyson_Foods_corporate_logo_%282024%29.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 15 | Smithfield Foods | SVG | 10 KB | [Smithfield Foods logo.svg](https://upload.wikimedia.org/wikipedia/commons/0/0e/Smithfield_Foods_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 16 | Cargill | SVG | 11 KB | [Cargill logo.svg](https://upload.wikimedia.org/wikipedia/commons/3/30/Cargill_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 17 | Mars, Incorporated | SVG | 3 KB | [Mars Incorporated 2019 logo.svg](https://upload.wikimedia.org/wikipedia/commons/9/9c/Mars_Incorporated_2019_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 18 | The Hershey Company | SVG | 39 KB | [HersheyCo.svg](https://upload.wikimedia.org/wikipedia/commons/8/81/HersheyCo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 19 | Unilever | SVG | 27 KB | [Unilever.svg](https://upload.wikimedia.org/wikipedia/en/e/e4/Unilever.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 20 | Danone North America | PNG | 168 KB | [DANONE_LOGO_HORIZONTAL.png](https://upload.wikimedia.org/wikipedia/commons/f/f4/DANONE_LOGO_HORIZONTAL.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 21 | Keurig Dr Pepper | SVG | 7 KB | [Keurig Dr Pepper.svg](https://upload.wikimedia.org/wikipedia/commons/3/35/Keurig_Dr_Pepper.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 22 | Molson Coors Beverage Company | SVG | 19 KB | [Molson_Coors_Beverage_Company_logo.svg](https://upload.wikimedia.org/wikipedia/commons/7/75/Molson_Coors_Beverage_Company_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 23 | Anheuser-Busch | SVG | 30 KB | [Anheuser Busch logo 2022.svg](https://upload.wikimedia.org/wikipedia/en/8/82/Anheuser_Busch_logo_2022.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 24 | Constellation Brands | PNG | 6 KB | [Constellation Brands Logo.png](https://upload.wikimedia.org/wikipedia/en/7/7f/Constellation_Brands_Logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 25 | Heineken USA | SVG | 2 KB | [Heineken Logo.svg](https://upload.wikimedia.org/wikipedia/commons/0/0d/Heineken_Logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 26 | Post Holdings | SVG | 6 KB | [Post Holdings logo.svg](https://upload.wikimedia.org/wikipedia/commons/3/32/Post_Holdings_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 27 | McCormick & Company | SVG | 3 KB | [McCormick.svg](https://upload.wikimedia.org/wikipedia/commons/e/ec/McCormick.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 28 | Lamb Weston | SVG | 18 KB | [Lamb Weston logo.svg](https://upload.wikimedia.org/wikipedia/commons/2/20/Lamb_Weston_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 29 | B&G Foods | SVG | 107 KB | [B&G Foods logo.svg](https://upload.wikimedia.org/wikipedia/en/f/fc/B%26G_Foods_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 30 | Flowers Foods | PNG | 15 KB | [Flowers Foods logo.png](https://upload.wikimedia.org/wikipedia/en/2/21/Flowers_Foods_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 31 | Bimbo Bakeries USA | SVG | 6 KB | [Logo Grupo BIMBO.svg](https://upload.wikimedia.org/wikipedia/commons/d/dd/Logo_Grupo_BIMBO.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 32 | Pilgrim's Pride | SVG | 11 KB | [Pilgrim's Pride logo.svg](https://upload.wikimedia.org/wikipedia/en/3/37/Pilgrim%27s_Pride_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 33 | Perdue Farms | PNG | 11 KB | [Perdue logo.png](https://upload.wikimedia.org/wikipedia/commons/3/3a/Perdue_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 34 | Dole Food Company | SVG | 7 KB | [Dole Foods Logo Green Leaf.svg](https://upload.wikimedia.org/wikipedia/en/d/d5/Dole_Foods_Logo_Green_Leaf.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 35 | Del Monte Foods | SVG | 22 KB | [Logo_Del_Monte.svg](https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Del_Monte.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 36 | Fresh Del Monte Produce | SVG | 24 KB | [Fresh Del Monte logo.svg](https://upload.wikimedia.org/wikipedia/commons/f/fa/Fresh_Del_Monte_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 37 | Chiquita Brands International | SVG | 21 KB | [Chiquita logo 2019.svg](https://upload.wikimedia.org/wikipedia/commons/2/2b/Chiquita_logo_2019.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 38 | Ocean Spray Cranberries | SVG | 6 KB | [Ocean Spray logo.svg](https://upload.wikimedia.org/wikipedia/commons/6/60/Ocean_Spray_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 39 | Land O'Lakes | SVG | 10 KB | [Land O’Lakes Logo.svg](https://upload.wikimedia.org/wikipedia/commons/0/0e/Land_O%E2%80%99Lakes_Logo.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 40 | Dairy Farmers of America | SVG | 7 KB | [Dairy Farmers of America logo.svg](https://upload.wikimedia.org/wikipedia/commons/5/5c/Dairy_Farmers_of_America_logo.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 41 | Chobani | SVG | 8 KB | [Chobani 2017 logo.svg](https://upload.wikimedia.org/wikipedia/commons/8/88/Chobani_2017_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 42 | Sargento Foods | PNG | 71 KB | [Sargento foods logo.png](https://upload.wikimedia.org/wikipedia/commons/1/1b/Sargento_foods_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 43 | Tillamook County Creamery Association | SVG | 10 KB | [Tillamook County Creamery Association logo.svg](https://upload.wikimedia.org/wikipedia/en/f/f5/Tillamook_County_Creamery_Association_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 44 | Barilla America | SVG | 10 KB | [Barilla brand logo (2022-present).svg](https://upload.wikimedia.org/wikipedia/commons/b/b2/Barilla_brand_logo_%282022-present%29.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 45 | Ferrero North America | SVG | 11 KB | [Ferrero logo.svg](https://upload.wikimedia.org/wikipedia/en/b/b9/Ferrero_logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 46 | Lindt & Sprüngli (USA) | SVG | 22 KB | [Lindt & Sprüngli.svg](https://upload.wikimedia.org/wikipedia/en/8/8e/Lindt_%26_Spr%C3%BCngli.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 47 | Blue Diamond Growers | — | — | No logo found | — |
| 48 | Sun-Maid Growers of California | PNG | 80 KB | [Sun-Maid_emblem_2020.png](https://upload.wikimedia.org/wikipedia/en/a/a3/Sun-Maid_emblem_2020.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 49 | Welch's | SVG | 10 KB | [Welchs Logo.svg](https://upload.wikimedia.org/wikipedia/commons/3/30/Welchs_Logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 50 | The Hain Celestial Group | SVG | 46 KB | [Hain Celestial Group.svg](https://upload.wikimedia.org/wikipedia/commons/c/cf/Hain_Celestial_Group.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 51 | Bob's Red Mill Natural Foods | PNG | 64 KB | [Bob's Red Mill logo.png](https://upload.wikimedia.org/wikipedia/en/b/b1/Bob%27s_Red_Mill_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 52 | King Arthur Baking Company | SVG | 12 KB | [King_Arthur_Baking_Logo.svg](https://upload.wikimedia.org/wikipedia/commons/3/32/King_Arthur_Baking_Logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 53 | Kikkoman Sales USA | SVG | 8 KB | [Kikkoman-Logo.svg](https://upload.wikimedia.org/wikipedia/commons/3/38/Kikkoman-Logo.svg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 54 | Goya Foods | PNG | 2 KB | [Goya logo.png](https://upload.wikimedia.org/wikipedia/en/0/0b/Goya_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 55 | Blue Bell Creameries | JPEG | 12 KB | [Blue bell logo.jpg](https://upload.wikimedia.org/wikipedia/en/c/cd/Blue_bell_logo.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 56 | Red Bull North America | SVG | 3 KB | [Logo of Red bull.svg](https://upload.wikimedia.org/wikipedia/commons/9/91/Logo_of_Red_bull.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 57 | Monster Beverage Corporation | PNG | 15 KB | [Monster Beverage logo.png](https://upload.wikimedia.org/wikipedia/en/e/e2/Monster_Beverage_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 58 | Celsius Holdings | PNG | 14 KB | [Celsius Energy Drink logo.png](https://upload.wikimedia.org/wikipedia/commons/3/3c/Celsius_Energy_Drink_logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
| 59 | Utz Brands | SVG | 13 KB | [Utz-Logo.svg](https://upload.wikimedia.org/wikipedia/commons/3/36/Utz-Logo.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original) | Commons search |
| 60 | TreeHouse Foods | PNG | 31 KB | [TreeHouse Foods Logo.png](https://upload.wikimedia.org/wikipedia/en/f/f3/TreeHouse_Foods_Logo.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original) | Wikipedia infobox |
