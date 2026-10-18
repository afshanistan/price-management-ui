/*
  Mock vendors for pressure-testing the design: 60 real food and beverage suppliers to a US grocer.
  Names are real; ESNs are invented 8-digit numbers (Will, Oct 18). The Final Comps set stays in vendors.ts.
  Logos come from Wikimedia (docs/vendor-logo-sources.md), each in two versions:
    color  the brand colors, as published
    mono   single color: draws in the color of its container (CSS mask with currentColor)
  Blue Diamond Growers has no logo; Sun-Maid and Blue Bell have no single-color version (their artwork
  has no one-color reading). Those fall back to the wordmark tile.
*/
import type { Vendor } from './vendors'

const files = import.meta.glob('../assets/vendor-logos/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
// ratio: the logo's ink width ÷ height (blank margins excluded), measured Oct 18.
const logo = (color: string, mono: string | undefined, ratio: number) => ({
  color: files[`../assets/vendor-logos/${color}`],
  mono: mono ? files[`../assets/vendor-logos/${mono}`] : undefined,
  ratio,
})

export const mockVendors: Vendor[] = [
  { id: 'nestle-usa', name: "Nestlé USA", esn: '08233589', wordmark: 'NES', logo: logo("nestle-usa-color.svg", "nestle-usa.svg", 0.97) },
  { id: 'pepsico', name: "PepsiCo", esn: '05612989', wordmark: 'PEP', logo: logo("pepsico-color.svg", "pepsico.svg", 3.3) },
  { id: 'coca-cola', name: "The Coca-Cola Company", esn: '69668596', wordmark: 'KO', logo: logo("coca-cola-color.svg", "coca-cola.svg", 6.2) },
  { id: 'coca-cola-consolidated', name: "Coca-Cola Consolidated", esn: '98815267', wordmark: 'COKE', logo: logo("coca-cola-consolidated-color.png", "coca-cola-consolidated.svg", 2.66) },
  { id: 'general-mills', name: "General Mills", esn: '59353692', wordmark: 'GIS', logo: logo("general-mills-color.svg", "general-mills.svg", 1.72) },
  { id: 'kraft-heinz', name: "The Kraft Heinz Company", esn: '24870547', wordmark: 'KHC', logo: logo("kraft-heinz-color.svg", "kraft-heinz.svg", 5.92) },
  { id: 'mondelez', name: "Mondelēz International", esn: '50825923', wordmark: 'MDLZ', logo: logo("mondelez-color.svg", "mondelez.svg", 4.17) },
  { id: 'kellanova', name: "Kellanova", esn: '52753416', wordmark: 'K', logo: logo("kellanova-color.svg", "kellanova.svg", 3.94) },
  { id: 'wk-kellogg', name: "WK Kellogg Co", esn: '58876596', wordmark: 'KLG', logo: logo("wk-kellogg-color.svg", "wk-kellogg.svg", 4.62) },
  { id: 'conagra', name: "Conagra Brands", esn: '71578451', wordmark: 'CAG', logo: logo("conagra-color.png", "conagra.svg", 1.41) },
  { id: 'campbells', name: "The Campbell's Company", esn: '53833652', wordmark: 'CPB', logo: logo("campbells-color.svg", "campbells.svg", 3.7) },
  { id: 'smucker', name: "The J.M. Smucker Company", esn: '28403894', wordmark: 'SJM', logo: logo("smucker-color.svg", "smucker.svg", 2.03) },
  { id: 'hormel', name: "Hormel Foods", esn: '27951325', wordmark: 'HRL', logo: logo("hormel-color.svg", "hormel.svg", 2.89) },
  { id: 'tyson', name: "Tyson Foods", esn: '74706550', wordmark: 'TSN', logo: logo("tyson-color.svg", "tyson.svg", 2.12) },
  { id: 'smithfield', name: "Smithfield Foods", esn: '52037236', wordmark: 'SFD', logo: logo("smithfield-color.svg", "smithfield.svg", 4.76) },
  { id: 'cargill', name: "Cargill", esn: '70441642', wordmark: 'CGL', logo: logo("cargill-color.svg", "cargill.svg", 2.24) },
  { id: 'mars', name: "Mars, Incorporated", esn: '81542557', wordmark: 'MARS', logo: logo("mars-color.svg", "mars.svg", 3.52) },
  { id: 'hershey', name: "The Hershey Company", esn: '65696599', wordmark: 'HSY', logo: logo("hershey-color.svg", "hershey.svg", 2.76) },
  { id: 'unilever', name: "Unilever", esn: '56275173', wordmark: 'UL', logo: logo("unilever-color.svg", "unilever.svg", 0.9) },
  { id: 'danone-na', name: "Danone North America", esn: '63456197', wordmark: 'DAN', logo: logo("danone-na-color.png", "danone-na.svg", 3.32) },
  { id: 'keurig-dr-pepper', name: "Keurig Dr Pepper", esn: '70894855', wordmark: 'KDP', logo: logo("keurig-dr-pepper-color.svg", "keurig-dr-pepper.svg", 3.34) },
  { id: 'molson-coors', name: "Molson Coors Beverage Company", esn: '58258329', wordmark: 'TAP', logo: logo("molson-coors-color.svg", "molson-coors.svg", 4.31) },
  { id: 'anheuser-busch', name: "Anheuser-Busch", esn: '15696155', wordmark: 'BUD', logo: logo("anheuser-busch-color.svg", "anheuser-busch.svg", 2.56) },
  { id: 'constellation', name: "Constellation Brands", esn: '86050825', wordmark: 'STZ', logo: logo("constellation-color.png", "constellation.svg", 7.17) },
  { id: 'heineken-usa', name: "Heineken USA", esn: '65185491', wordmark: 'HEIA', logo: logo("heineken-usa-color.svg", "heineken-usa.svg", 4.26) },
  { id: 'post-holdings', name: "Post Holdings", esn: '67494696', wordmark: 'POST', logo: logo("post-holdings-color.svg", "post-holdings.svg", 1.46) },
  { id: 'mccormick', name: "McCormick & Company", esn: '27287331', wordmark: 'MKC', logo: logo("mccormick-color.svg", "mccormick.svg", 1.22) },
  { id: 'lamb-weston', name: "Lamb Weston", esn: '01601988', wordmark: 'LW', logo: logo("lamb-weston-color.svg", "lamb-weston.svg", 5.01) },
  { id: 'bg-foods', name: "B&G Foods", esn: '48593093', wordmark: 'BGS', logo: logo("bg-foods-color.svg", "bg-foods.svg", 1.59) },
  { id: 'flowers-foods', name: "Flowers Foods", esn: '66052036', wordmark: 'FLO', logo: logo("flowers-foods-color.png", "flowers-foods.svg", 3.88) },
  { id: 'bimbo-usa', name: "Bimbo Bakeries USA", esn: '63870734', wordmark: 'BBU', logo: logo("bimbo-usa-color.svg", "bimbo-usa.svg", 2.13) },
  { id: 'pilgrims', name: "Pilgrim's Pride", esn: '29688489', wordmark: 'PPC', logo: logo("pilgrims-color.svg", "pilgrims.svg", 1.68) },
  { id: 'perdue', name: "Perdue Farms", esn: '79388255', wordmark: 'PRD', logo: logo("perdue-color.png", "perdue.svg", 1.52) },
  { id: 'dole', name: "Dole Food Company", esn: '73965015', wordmark: 'DOLE', logo: logo("dole-color.svg", "dole.svg", 1.49) },
  { id: 'del-monte-foods', name: "Del Monte Foods", esn: '56818691', wordmark: 'DLM', logo: logo("del-monte-foods-color.svg", "del-monte-foods.svg", 1.34) },
  { id: 'fresh-del-monte', name: "Fresh Del Monte Produce", esn: '12306476', wordmark: 'FDP', logo: logo("fresh-del-monte-color.svg", "fresh-del-monte.svg", 1.28) },
  { id: 'chiquita', name: "Chiquita Brands International", esn: '67457914', wordmark: 'CHQ', logo: logo("chiquita-color.svg", "chiquita.svg", 0.83) },
  { id: 'ocean-spray', name: "Ocean Spray Cranberries", esn: '94681603', wordmark: 'OSC', logo: logo("ocean-spray-color.svg", "ocean-spray.svg", 1.82) },
  { id: 'land-o-lakes', name: "Land O'Lakes", esn: '29156460', wordmark: 'LOL', logo: logo("land-o-lakes-color.svg", "land-o-lakes.svg", 9.16) },
  { id: 'dfa', name: "Dairy Farmers of America", esn: '86801365', wordmark: 'DFA', logo: logo("dfa-color.svg", "dfa.svg", 2.66) },
  { id: 'chobani', name: "Chobani", esn: '35309701', wordmark: 'CHO', logo: logo("chobani-color.svg", "chobani.svg", 4.85) },
  { id: 'sargento', name: "Sargento Foods", esn: '92575989', wordmark: 'SGT', logo: logo("sargento-color.png", "sargento.svg", 3.18) },
  { id: 'tillamook', name: "Tillamook County Creamery Association", esn: '06344057', wordmark: 'TCCA', logo: logo("tillamook-color.svg", "tillamook.svg", 2.6) },
  { id: 'barilla', name: "Barilla America", esn: '75755608', wordmark: 'BAR', logo: logo("barilla-color.svg", "barilla.svg", 2.5) },
  { id: 'ferrero', name: "Ferrero North America", esn: '46906786', wordmark: 'FER', logo: logo("ferrero-color.svg", "ferrero.svg", 7.95) },
  { id: 'lindt', name: "Lindt & Sprüngli (USA)", esn: '09972869', wordmark: 'LISN', logo: logo("lindt-color.svg", "lindt.svg", 3.69) },
  { id: 'blue-diamond', name: "Blue Diamond Growers", esn: '11176941', wordmark: 'BDG' },
  { id: 'sun-maid', name: "Sun-Maid Growers of California", esn: '16612973', wordmark: 'SMG', logo: logo("sun-maid-color.png", undefined, 0.84) },
  { id: 'welchs', name: "Welch's", esn: '76962014', wordmark: 'WEL', logo: logo("welchs-color.svg", "welchs.svg", 2.28) },
  { id: 'hain-celestial', name: "The Hain Celestial Group", esn: '68501274', wordmark: 'HAIN', logo: logo("hain-celestial-color.svg", "hain-celestial.svg", 1.7) },
  { id: 'bobs-red-mill', name: "Bob's Red Mill Natural Foods", esn: '66255237', wordmark: 'BRM', logo: logo("bobs-red-mill-color.png", "bobs-red-mill.svg", 2.17) },
  { id: 'king-arthur', name: "King Arthur Baking Company", esn: '46416617', wordmark: 'KAB', logo: logo("king-arthur-color.svg", "king-arthur.svg", 1.01) },
  { id: 'kikkoman', name: "Kikkoman Sales USA", esn: '49490252', wordmark: 'KIK', logo: logo("kikkoman-color.svg", "kikkoman.svg", 3.99) },
  { id: 'goya', name: "Goya Foods", esn: '33950289', wordmark: 'GOYA', logo: logo("goya-color.png", "goya.svg", 2.67) },
  { id: 'blue-bell', name: "Blue Bell Creameries", esn: '01388102', wordmark: 'BBC', logo: logo("blue-bell-color.jpg", undefined, 1.11) },
  { id: 'red-bull', name: "Red Bull North America", esn: '19130109', wordmark: 'RB', logo: logo("red-bull-color.svg", "red-bull.svg", 4.19) },
  { id: 'monster', name: "Monster Beverage Corporation", esn: '63548085', wordmark: 'MNST', logo: logo("monster-color.png", "monster.svg", 3.18) },
  { id: 'celsius', name: "Celsius Holdings", esn: '81411179', wordmark: 'CELH', logo: logo("celsius-color.png", "celsius.svg", 2.92) },
  { id: 'utz', name: "Utz Brands", esn: '98185772', wordmark: 'UTZ', logo: logo("utz-color.svg", "utz.svg", 1) },
  { id: 'treehouse', name: "TreeHouse Foods", esn: '03294602', wordmark: 'THS', logo: logo("treehouse-color.png", "treehouse.svg", 1.29) },
]
