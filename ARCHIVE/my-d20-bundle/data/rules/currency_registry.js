/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/rules/currency_registry.js
 * Sources for more currencies to add:
 * https://homebrewery.naturalcrit.com/share/rJZB2UZwLE
 * https://www.scribd.com/document/130792564/Coins-of-Greyhawk
 * https://www.worldanvil.com/w/eberron-palant/a/currency-article
 * 
 */
'use strict';

module.exports = {
  // BASE_VALUE 1.0 = 1 Gold Piece (GP) equivalent
  // TYPES: 'universal' (auto-converts), 'local' (region locked)
  
  // --- FANTASY (Standard d20) ---
  cp: { name: 'Copper',   type: 'universal', baseValue: 0.01 },
  sp: { name: 'Silver',   type: 'universal', baseValue: 0.1 },
  ep: { name: 'Electrum', type: 'universal', baseValue: 0.5 },
  gp: { name: 'Gold',     type: 'universal', baseValue: 1.0 },
  pp: { name: 'Platinum', type: 'universal', baseValue: 10.0 },

  // --- FORGOTTEN REALMS
  authokh: { name: 'Authokh', type: 'local', baseValue: 10.0, region: 'chessenta' },
  balan: { name: 'Balan', type: 'local', baseValue: 1.0, region: 'impiltur' },
  baldurian_sword: { name: 'Sword', type: 'local', baseValue: 0.1, region: 'baldur_s_gate' },
  bean: { name: 'Bean', type: 'local', baseValue: 0.01, region: 'maztica' },
  bebolt: { name: 'Bebolt', type: 'local', baseValue: 20.0, region: 'chessenta' },
  bedoar: { name: 'Bedoar', type: 'local', baseValue: 0.1, region: 'cormanthyr' },
  bicenta: { name: 'Bicenta', type: 'local', baseValue: 1.0, region: 'calimport' },
  bit: { name: 'Bit', type: 'local', baseValue: 0.02, region: 'chessenta' },
  blade: { name: 'Blade', type: 'local', baseValue: 0.1, region: 'maztica' },
  blue_eye: { name: 'Blue Eye', type: 'local', baseValue: 0.5, region: 'cormyr' },
  bult: { name: 'Bult', type: 'local', baseValue: 0.1, region: 'neverwiner' },
  centarche: { name: 'Centarche', type: 'local', baseValue: 0.5, region: 'calimport' },
  centaur: { name: 'Centaur', type: 'local', baseValue: 0.5, region: 'amn' },
  coat_of_arms: { name: 'Coat of Arms', type: 'local', baseValue: 10.0, region: 'moonshaes' },
  cog: { name: 'Cog', type: 'local', baseValue: 0.1, region: 'mulmaster' },
  cord: { name: 'Cord', type: 'local', baseValue: 0.01, region: 'iriaebor' },
  corner: { name: 'Corner', type: 'local', baseValue: 1.0, region: 'eltural' },
  danter: { name: 'Danter', type: 'local', baseValue: 1.0, region: 'amn' },
  decarche: { name: 'Dearche', type: 'local', baseValue: 0.1, region: 'calimport' },
  dena: { name: 'Dena', type: 'local', baseValue: 0.1, region: 'mirabar' },
  djendive: { name: 'Djendive', type: 'local', baseValue: 0.5, region: 'manshaka' },
  djendjen: { name: 'Djendjen', type: 'local', baseValue: 1.0, region: 'manshaka' },
  double_eagle: { name: 'Dobule Eagle', type: 'local', baseValue: 1.0, region: 'baldur_s_gate' },
  drake: { name: 'Drake', type: 'local', baseValue: 1.0, region: 'chessenta' },
  dubloon: { name: 'Dubloon', type: 'local', baseValue: 1.0, region: 'halruaa' },
  ducat: { name: 'Ducat', type: 'local', baseValue: 1.0, region: 'mulmaster' },
  espedrille: { name: 'Espedrille', type: 'local', baseValue: 0.1, region: 'volothamp' },
  fairsail: { name: 'Fairsail', type: 'local', baseValue: 10.0, region: 'neverwinter' },
  falcon: { name: 'Falcon', type: 'local', baseValue: 0.1, region: 'cormyr' },
  fandar: { name: 'Fandar', type: 'local', baseValue: 0.01, region: 'amn' },
  great_worm: { name: 'Great Worm', type: 'local', baseValue: 1.0, region: 'memnon' },
  halanth: { name: 'Halanth', type: 'local', baseValue: 0.1, region: 'impiltur' },
  halruaan_penny: { name: 'Halruuan Penny', type: 'local', baseValue: 0.01, region: 'halruaa' },
  halruaan_shilling: { name: 'Halruuan Shilling', type: 'local', baseValue: 0.1, region: 'halruaa' },
  head: { name: 'Head', type: 'local', baseValue: 0.01, region: 'baldur_s_gate' },
  hillsfarian_crown: { name: 'Hillsfarian Crown', type: 'local', baseValue: 1.0, region: 'hillsfar' },
  hillsfarian_half_crown: { name: 'Hillsfarian Half-Crown', type: 'local', baseValue: 0.5, region: 'hillsfar' },
  iriaeborian_scroll: { name: 'Scroll', type: 'local', baseValue: 1.0, region: 'iriaebor' },
  kilarche: { name: 'Kilarche', type: 'local', baseValue: 10.0, region: 'calimport' },
  knarr: { name: 'Knarr', type: 'local', baseValue: 0.01, region: 'mulmaster' },
  lion: { name: 'Lion', type: 'local', baseValue: 1.0, region: 'cormyr' },
  mandrille: { name: 'Mandrille', type: 'local', baseValue: 10.0, region: 'volothamp' },
  mark: { name: 'Mark', type: 'local', baseValue: 0.5, region: 'impiltur' },
  messine: { name: 'Messine', type: 'local', baseValue: 0.1, region: 'keltar' },
  moon: { name: 'Moon', type: 'local', baseValue: 0.1, region: 'eltural' },
  moonshaen_crown: { name: 'Moonshaen Crown', type: 'local', baseValue: 1.0, region: 'moonshaes' },
  moonshaen_half_crown: { name: 'Moonshaen Half-Crown', type: 'local', baseValue: 0.5, region: 'moonshaes' },
  moonshaen_penny: { name: 'Moonshaen Penny', type: 'local', baseValue: 0.01, region: 'moonshaes' },
  moonshaen_shilling: { name: 'Moonshaen Shilling', type: 'local', baseValue: 0.1, region: 'moonshaes' },
  myth_drannorian_axe: { name: 'Myth Drannorian Common Axe', type: 'local', baseValue: 0.1, region: 'myth_drannor' },
  myth_drannorian_dwarf: { name: 'Myth Drannorian Races Dwarf', type: 'local', baseValue: 0.1, region: 'myth_drannor' },
  myth_drannorian_elf: { name: 'Myth Drannorian Races Elf', type: 'local', baseValue: 10.0, region: 'myth_drannor' },
  myth_drannorian_gem: { name: 'Myth Drannorian Noble Gem', type: 'local', baseValue: 0.1, region: 'myth_drannor' },
  myth_drannorian_gnome: { name: 'Myth Drannorian Races Gnome', type: 'local', baseValue: 0.5, region: 'myth_drannor' },
  myth_drannorian_halfling: { name: 'Myth Drannorian Races Halfling', type: 'local', baseValue: 0.01, region: 'myth_drannor' },
  myth_drannorian_human: { name: 'Myth Drannorian Races Human', type: 'local', baseValue: 1.0, region: 'myth_drannor' },
  myth_drannorian_longsword: { name: 'Myth Drannorian Common Longsword', type: 'local', baseValue: 10.0, region: 'myth_drannor' },
  myth_drannorian_pipe: { name: 'Myth Drannorian Noble Pipe', type: 'local', baseValue: 0.5, region: 'myth_drannor' },
  myth_drannorian_scroll: { name: 'Myth Drannorian Noble Scroll', type: 'local', baseValue: 1.0, region: 'myth_drannor' },
  myth_drannorian_sling: { name: 'Myth Drannorian Common Sling', type: 'local', baseValue: 0.01, region: 'myth_drannor' },
  myth_drannorian_star: { name: 'Myth Drannorian Noble Star', type: 'local', baseValue: 10.0, region: 'myth_drannor' },
  myth_drannorian_spear: { name: 'Myth Drannorian Common Spear', type: 'local', baseValue: 1.0, region: 'myth_drannor' },
  myth_drannorian_sword: { name: 'Myth Drannorian Common Sword', type: 'local', baseValue: 0.5, region: 'myth_drannor' },
  myth_drannorian_tankard: { name: 'Myth Drannorian Noble Tankard', type: 'local', baseValue: 0.01, region: 'myth_drannor' },
  neverwinterese_dragon: { name: 'Neverwinterese Dragon', type: 'local', baseValue: 1.0, region: 'neverwinter' },
  niften: { name: 'Niften', type: 'local', baseValue: 0.01, region: 'teshburi' },
  orb: { name: 'Orb', type: 'local', baseValue: 1.0, region: 'mirabar' },
  pulon: { name: 'Pulon', type: 'local', baseValue: 1.0, region: 'teshburi' },
  pyramid: { name: 'Pyramid', type: 'local', baseValue: 20.0, region: 'netheril' },
  quill: { name: 'Quill', type: 'local', baseValue: 5.0, region: 'maztica' },
  rada: { name: 'Rada', type: 'local', baseValue: 0.01, region: 'almraiven' },
  red_worm: { name: 'Red Worm', type: 'local', baseValue: 0.1, region: 'memnon' },
  redoline: { name: 'Redoline', type: 'local', baseValue: 1.0, region: 'keltar' },
  rekatik: { name: 'Rekatik', type: 'local', baseValue: 1.0, region: 'volothamp' },
  roldon: { name: 'Roldon', type: 'local', baseValue: 10.0, region: 'amn' },
  ruendil: { name: 'Ruendil', type: 'local', baseValue: 10.0, region: 'cormanthyr' },
  sardil: { name: 'Sardil', type: 'local', baseValue: 0.01, region: 'impiltur' },
  sea_shee: { name: 'Sea-Shee', type: 'local', baseValue: 0.5, region: 'neverwinter' },
  shill: { name: 'Shill', type: 'local', baseValue: 0.1, region: 'hillsfar' },
  shilmaer: { name: 'Shilmaer', type: 'local', baseValue: 1.0, region: 'cormanthyr' },
  skie: { name: 'Skie', type: 'local', baseValue: 5.0, region: 'halruaa' },
  spanner: { name: 'Spanner', type: 'local', baseValue: 0.01, region: 'manshaka' },
  square: { name: 'Square', type: 'local', baseValue: 0.01, region: 'eltural' },
  tanner: { name: 'Tanner', type: 'local', baseValue: 0.01, region: 'mirabar' },
  talent: { name: 'Talent', type: 'local', baseValue: 0.1, region: 'chessenta' },
  taran: { name: 'Taran', type: 'local', baseValue: 0.1, region: 'amn' },
  tazo: { name: 'Tazo', type: 'local', baseValue: 0.5, region: 'almraiven' },
  thalver: { name: 'Thalver', type: 'local', baseValue: 0.01, region: 'cormanthyr' },
  thammarch: { name: 'Thammarch', type: 'local', baseValue: 0.5, region: 'cormanthyr' },
  tharn: { name: 'Tharn', type: 'local', baseValue: 0.01, region: 'neverwinter' },
  thuhrn: { name: 'Thuhrn', type: 'local', baseValue: 10.0, region: 'netheril' },
  thumb: { name: 'Thumb', type: 'local', baseValue: 0.01, region: 'cormyr' },
  torch: { name: 'Torch', type: 'local', baseValue: 0.1, region: 'iriaebor' },
  torntar: { name: 'Torntar', type: 'local', baseValue: 10.0, region: 'impiltur' },
  tricrown: { name: 'Tricrown', type: 'local', baseValue: 10.0, region: 'cormyr' },
  unarche: { name: 'Unarche', type: 'local', baseValue: 0.01, region: 'calimport' },
  weight: { name: 'Weight', type: 'local', baseValue: 0.01, region: 'hillsfar' },
  zonth: { name: 'Zonth', type: 'local', baseValue: 0.5, region: 'memnon' },

  // --- MODERN / CYBERPUNK ---
  usd: { name: 'Dollars',  type: 'universal', baseValue: 0.05 }, // 20 USD = 1 GP
  nuyen: { name: 'Nuyen',  type: 'universal', baseValue: 0.02 }, // 50 Nuyen = 1 GP
  eddie: { name: 'Eddies', type: 'universal', baseValue: 0.02 },

  // --- SCI-FI / STAR WARS ---
  cred: { name: 'Credits', type: 'universal', baseValue: 0.1 },
  thrug: { name: 'Watto-Pegat', type: 'local', baseValue: 4.0, region: 'tatooine' },

  // --- XIANXIA / ANIME ---
  spirit_stone: { name: 'Spirit Stone', type: 'local', baseValue: 100.0, region: 'cultivator_peaks' },
  silver_tael: { name: 'Silver Tael', type: 'universal', baseValue: 2.0 }
};
