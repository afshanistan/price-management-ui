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
const logo = (color: string, mono?: string) => ({
  color: files[`../assets/vendor-logos/${color}`],
  mono: mono ? files[`../assets/vendor-logos/${mono}`] : undefined,
})

export const mockVendors: Vendor[] = [
  { id: 'nestle-usa', name: "Nestlé USA", esn: '08233589', wordmark: 'NES', logo: logo("nestle-usa-color.svg", "nestle-usa.svg") },
  { id: 'pepsico', name: "PepsiCo", esn: '05612989', wordmark: 'PEP', logo: logo("pepsico-color.svg", "pepsico.svg") },
  { id: 'coca-cola', name: "The Coca-Cola Company", esn: '69668596', wordmark: 'KO', logo: logo("coca-cola-color.svg", "coca-cola.svg") },
  { id: 'coca-cola-consolidated', name: "Coca-Cola Consolidated", esn: '98815267', wordmark: 'COKE', logo: logo("coca-cola-consolidated-color.png", "coca-cola-consolidated.svg") },
  { id: 'general-mills', name: "General Mills", esn: '59353692', wordmark: 'GIS', logo: logo("general-mills-color.svg", "general-mills.svg") },
  { id: 'kraft-heinz', name: "The Kraft Heinz Company", esn: '24870547', wordmark: 'KHC', logo: logo("kraft-heinz-color.svg", "kraft-heinz.svg") },
  { id: 'mondelez', name: "Mondelēz International", esn: '50825923', wordmark: 'MDLZ', logo: logo("mondelez-color.svg", "mondelez.svg") },
  { id: 'kellanova', name: "Kellanova", esn: '52753416', wordmark: 'K', logo: logo("kellanova-color.svg", "kellanova.svg") },
  { id: 'wk-kellogg', name: "WK Kellogg Co", esn: '58876596', wordmark: 'KLG', logo: logo("wk-kellogg-color.svg", "wk-kellogg.svg") },
  { id: 'conagra', name: "Conagra Brands", esn: '71578451', wordmark: 'CAG', logo: logo("conagra-color.png", "conagra.svg") },
  { id: 'campbells', name: "The Campbell's Company", esn: '53833652', wordmark: 'CPB', logo: logo("campbells-color.svg", "campbells.svg") },
  { id: 'smucker', name: "The J.M. Smucker Company", esn: '28403894', wordmark: 'SJM', logo: logo("smucker-color.svg", "smucker.svg") },
  { id: 'hormel', name: "Hormel Foods", esn: '27951325', wordmark: 'HRL', logo: logo("hormel-color.svg", "hormel.svg") },
  { id: 'tyson', name: "Tyson Foods", esn: '74706550', wordmark: 'TSN', logo: logo("tyson-color.svg", "tyson.svg") },
  { id: 'smithfield', name: "Smithfield Foods", esn: '52037236', wordmark: 'SFD', logo: logo("smithfield-color.svg", "smithfield.svg") },
  { id: 'cargill', name: "Cargill", esn: '70441642', wordmark: 'CGL', logo: logo("cargill-color.svg", "cargill.svg") },
  { id: 'mars', name: "Mars, Incorporated", esn: '81542557', wordmark: 'MARS', logo: logo("mars-color.svg", "mars.svg") },
  { id: 'hershey', name: "The Hershey Company", esn: '65696599', wordmark: 'HSY', logo: logo("hershey-color.svg", "hershey.svg") },
  { id: 'unilever', name: "Unilever", esn: '56275173', wordmark: 'UL', logo: logo("unilever-color.svg", "unilever.svg") },
  { id: 'danone-na', name: "Danone North America", esn: '63456197', wordmark: 'DAN', logo: logo("danone-na-color.png", "danone-na.svg") },
  { id: 'keurig-dr-pepper', name: "Keurig Dr Pepper", esn: '70894855', wordmark: 'KDP', logo: logo("keurig-dr-pepper-color.svg", "keurig-dr-pepper.svg") },
  { id: 'molson-coors', name: "Molson Coors Beverage Company", esn: '58258329', wordmark: 'TAP', logo: logo("molson-coors-color.svg", "molson-coors.svg") },
  { id: 'anheuser-busch', name: "Anheuser-Busch", esn: '15696155', wordmark: 'BUD', logo: logo("anheuser-busch-color.svg", "anheuser-busch.svg") },
  { id: 'constellation', name: "Constellation Brands", esn: '86050825', wordmark: 'STZ', logo: logo("constellation-color.png", "constellation.svg") },
  { id: 'heineken-usa', name: "Heineken USA", esn: '65185491', wordmark: 'HEIA', logo: logo("heineken-usa-color.svg", "heineken-usa.svg") },
  { id: 'post-holdings', name: "Post Holdings", esn: '67494696', wordmark: 'POST', logo: logo("post-holdings-color.svg", "post-holdings.svg") },
  { id: 'mccormick', name: "McCormick & Company", esn: '27287331', wordmark: 'MKC', logo: logo("mccormick-color.svg", "mccormick.svg") },
  { id: 'lamb-weston', name: "Lamb Weston", esn: '01601988', wordmark: 'LW', logo: logo("lamb-weston-color.svg", "lamb-weston.svg") },
  { id: 'bg-foods', name: "B&G Foods", esn: '48593093', wordmark: 'BGS', logo: logo("bg-foods-color.svg", "bg-foods.svg") },
  { id: 'flowers-foods', name: "Flowers Foods", esn: '66052036', wordmark: 'FLO', logo: logo("flowers-foods-color.png", "flowers-foods.svg") },
  { id: 'bimbo-usa', name: "Bimbo Bakeries USA", esn: '63870734', wordmark: 'BBU', logo: logo("bimbo-usa-color.svg", "bimbo-usa.svg") },
  { id: 'pilgrims', name: "Pilgrim's Pride", esn: '29688489', wordmark: 'PPC', logo: logo("pilgrims-color.svg", "pilgrims.svg") },
  { id: 'perdue', name: "Perdue Farms", esn: '79388255', wordmark: 'PRD', logo: logo("perdue-color.png", "perdue.svg") },
  { id: 'dole', name: "Dole Food Company", esn: '73965015', wordmark: 'DOLE', logo: logo("dole-color.svg", "dole.svg") },
  { id: 'del-monte-foods', name: "Del Monte Foods", esn: '56818691', wordmark: 'DLM', logo: logo("del-monte-foods-color.svg", "del-monte-foods.svg") },
  { id: 'fresh-del-monte', name: "Fresh Del Monte Produce", esn: '12306476', wordmark: 'FDP', logo: logo("fresh-del-monte-color.svg", "fresh-del-monte.svg") },
  { id: 'chiquita', name: "Chiquita Brands International", esn: '67457914', wordmark: 'CHQ', logo: logo("chiquita-color.svg", "chiquita.svg") },
  { id: 'ocean-spray', name: "Ocean Spray Cranberries", esn: '94681603', wordmark: 'OSC', logo: logo("ocean-spray-color.svg", "ocean-spray.svg") },
  { id: 'land-o-lakes', name: "Land O'Lakes", esn: '29156460', wordmark: 'LOL', logo: logo("land-o-lakes-color.svg", "land-o-lakes.svg") },
  { id: 'dfa', name: "Dairy Farmers of America", esn: '86801365', wordmark: 'DFA', logo: logo("dfa-color.svg", "dfa.svg") },
  { id: 'chobani', name: "Chobani", esn: '35309701', wordmark: 'CHO', logo: logo("chobani-color.svg", "chobani.svg") },
  { id: 'sargento', name: "Sargento Foods", esn: '92575989', wordmark: 'SGT', logo: logo("sargento-color.png", "sargento.svg") },
  { id: 'tillamook', name: "Tillamook County Creamery Association", esn: '06344057', wordmark: 'TCCA', logo: logo("tillamook-color.svg", "tillamook.svg") },
  { id: 'barilla', name: "Barilla America", esn: '75755608', wordmark: 'BAR', logo: logo("barilla-color.svg", "barilla.svg") },
  { id: 'ferrero', name: "Ferrero North America", esn: '46906786', wordmark: 'FER', logo: logo("ferrero-color.svg", "ferrero.svg") },
  { id: 'lindt', name: "Lindt & Sprüngli (USA)", esn: '09972869', wordmark: 'LISN', logo: logo("lindt-color.svg", "lindt.svg") },
  { id: 'blue-diamond', name: "Blue Diamond Growers", esn: '11176941', wordmark: 'BDG' },
  { id: 'sun-maid', name: "Sun-Maid Growers of California", esn: '16612973', wordmark: 'SMG', logo: logo("sun-maid-color.png", undefined) },
  { id: 'welchs', name: "Welch's", esn: '76962014', wordmark: 'WEL', logo: logo("welchs-color.svg", "welchs.svg") },
  { id: 'hain-celestial', name: "The Hain Celestial Group", esn: '68501274', wordmark: 'HAIN', logo: logo("hain-celestial-color.svg", "hain-celestial.svg") },
  { id: 'bobs-red-mill', name: "Bob's Red Mill Natural Foods", esn: '66255237', wordmark: 'BRM', logo: logo("bobs-red-mill-color.png", "bobs-red-mill.svg") },
  { id: 'king-arthur', name: "King Arthur Baking Company", esn: '46416617', wordmark: 'KAB', logo: logo("king-arthur-color.svg", "king-arthur.svg") },
  { id: 'kikkoman', name: "Kikkoman Sales USA", esn: '49490252', wordmark: 'KIK', logo: logo("kikkoman-color.svg", "kikkoman.svg") },
  { id: 'goya', name: "Goya Foods", esn: '33950289', wordmark: 'GOYA', logo: logo("goya-color.png", "goya.svg") },
  { id: 'blue-bell', name: "Blue Bell Creameries", esn: '01388102', wordmark: 'BBC', logo: logo("blue-bell-color.jpg", undefined) },
  { id: 'red-bull', name: "Red Bull North America", esn: '19130109', wordmark: 'RB', logo: logo("red-bull-color.svg", "red-bull.svg") },
  { id: 'monster', name: "Monster Beverage Corporation", esn: '63548085', wordmark: 'MNST', logo: logo("monster-color.png", "monster.svg") },
  { id: 'celsius', name: "Celsius Holdings", esn: '81411179', wordmark: 'CELH', logo: logo("celsius-color.png", "celsius.svg") },
  { id: 'utz', name: "Utz Brands", esn: '98185772', wordmark: 'UTZ', logo: logo("utz-color.svg", "utz.svg") },
  { id: 'treehouse', name: "TreeHouse Foods", esn: '03294602', wordmark: 'THS', logo: logo("treehouse-color.png", "treehouse.svg") },
]
