'use strict';

/**
 * ScriptRegistry
 * --------------
 * Canonical registry for writing systems used by languages.
 * This is purely descriptive/mechanical metadata; languages reference scripts by id.
 */

class ScriptRegistry {
  constructor() {
    this.scripts = new Map();
    this._bootstrap();
  }

  _register(script) {
    if (!script.id) throw new Error('Script must have an id');
    this.scripts.set(script.id, {
      direction: 'ltr',
      complexity: 'medium',
      magicalAffinity: false,
      psychicResonance: false,
      ...script
    });
  }

  _bootstrap() {


  // ───────────────────────────────────────────────
  //  PRIMARY WRITING SYSTEMS (existing preserved)
  // ───────────────────────────────────────────────

  
  this._register({ id: 'alasiyan', name: 'Alasiyan Script', family: 'ylari_script', direction: 'rtl', complexity: 'medium', magicalAffinity: false /* notes: 'A flowing, cursive script used by the Ylari; influenced by ancient Nithian glyphs.' */ });
  this._register({ id: 'alphatian', name: 'Alphatian', family: 'planar_arcane', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'antalian_runes', name: 'Antalian Runes', family: 'antalian_script', direction: 'ltr', complexity: 'medium', magicalAffinity: false /* notes: 'An archaic runic script used by Antalian-descended cultures across Norwold, Heldann, and Denagoth.' */ });
  this._register({ id: 'aurebesh', name: 'Aurebesh', family: 'galactic_standard', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'barazhad', name: 'Barazhad', family: 'planar_infernal', direction: 'ltr', complexity: 'high', magicalAffinity: true });
    this._register({ 
  id: 'carrion_glyphs', 
  name: 'Carrion Glyphs', 
  family: 'planar', 
  complexity: 'medium', 
  magicalAffinity: false, 
  notes: 'The degraded, scratched script of the Nagpa; looks like bird-scratches but retains a trace of Ethereal glow.' 
});
  this._register({ id: 'celestial', name: 'Celestial Script', family: 'planar_celestial', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'daan', name: 'Daan', family: 'planar_order', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'daelkyr', name: 'Daelkyr', family: 'planar_madness', direction: 'variable', complexity: 'high', magicalAffinity: true });
  this._register({ 
  id: 'dark_dethek', 
  name: 'Dark Dethek', 
  family: 'dwarven', 
  direction: 'boustrophedon', // Reflects their chaotic, non-linear thinking
  complexity: 'high', 
  magicalAffinity: true, // Used for binding malicious enchantments
  psychicResonance: true // Often carries the "Madness of the Forge"
});
  this._register({ id: 'dethek', name: 'Dethek', family: 'dwarven', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'espruar', name: 'Espruar', family: 'elven', direction: 'ltr', complexity: 'high' });
    this._register({ 
  id: 'ethereal_vocal_runes', 
  name: 'Ethereal Vocal Runes', 
  family: 'planar', 
  complexity: 'very_high', 
  magicalAffinity: true, 
  notes: 'Shimmering, multi-dimensional glyphs that resonate in both the Material and Ethereal planes.' 
});
  this._register({ id: 'hamarfae', name: 'Hamarfae', family: 'ritual_script', direction: 'ltr', complexity: 'very_high', magicalAffinity: true });
  this._register({ id: 'herathian_glyphs', name: 'Herathian Glyphs', family: 'aranean', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'herathian_script', name: 'Herathian Diplomatic Script', family: 'elven', /* It "pretends" to be elven*/ direction: 'ltr', complexity: 'medium', magicalAffinity: false });
  this._register({ id: 'hulian', name: 'Hulian Script', family: 'hulian_script', direction: 'ltr', complexity: 'medium', magicalAffinity: false, notes: 'A bureaucratic script used in Hule; derived from Oltec glyphic roots but simplified for administration.'});
  this._register({ id: 'imaskari', name: 'Imaskari Glyphs', family: 'ancient_imaskari', direction: 'ltr', complexity: 'very_high', magicalAffinity: true });
  this._register({ id: 'infernal', name: 'Infernal Script', family: 'planar_infernal', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'iokharic', name: 'Iokharic', family: 'planar_arcane', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({
  id: 'jenn',
  name: 'Jennite Script',
  family: 'jenn_script',
  direction: 'ltr',
  complexity: 'medium',
  magicalAffinity: false,
  notes: 'A phonetic script used by the Jennites; adapted from Oltec glyphs into a simpler alphabetic form.'
});

  this._register({ id: 'khezu', name: 'Khezu Script', family: 'undercommon_feral', direction: 'none', complexity: 'medium' });
  this._register({ id: 'kolshet', name: 'Kolshet', family: 'high_ogre', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'kopru', name: 'Kopru Ideographs', family: 'aberrant_ancient', direction: 'none', complexity: 'high', magicalAffinity: true, psychicResonance: true });
  this._register({ id: 'laterran', name: 'Laterran Script', family: 'laterran_script', direction: 'ltr', complexity: 'medium', magicalAffinity: false /* notes: 'A script of otherworldly origin brought by the Laterran peoples; used in Averoigne, Klantyre, and Fenfolk regions.'*/ });
  this._register({ id: 'milennian', name: 'Milennian Script', family: 'milennian_script', direction: 'ltr', complexity: 'medium', magicalAffinity: false /* notes: 'A classical script resembling ancient Greek; preserved in Davania and the Hollow World.' */ });
  this._register({ id: 'milennian_alphabet', name: 'Milennian Alphabet', family: 'milennian_script', direction: 'ltr', complexity: 'medium', magicalAffinity: false /* notes: 'A simplified phonetic alphabet derived from the classical Milennian script; used by early Traldar peoples.' */ });
  this._register({ id: 'nithian_hieroglyphs', name: 'Nithian Hieroglyphs', family: 'nithian_script', direction: 'ltr', complexity: 'high', magicalAffinity: true /* notes: 'A complex, magical hieroglyphic system used by the ancient Nithian Empire.' */ });
  this._register({ id: 'oghyr', name: 'Oghyr', family: 'goblinoid', direction: 'ltr', complexity: 'low' });
  this._register({
  id: 'oltec_glyphs',
  name: 'Oltec Glyphs',
  family: 'oltec_script',
  direction: 'ltr',
  complexity: 'high',
  magicalAffinity: false,
  notes: 'A logographic glyph system used by ancient Oltec and Azcan cultures; complex and ceremonial.'
});
this._register({
  id: 'phonetic_glyphs',
  name: 'Phonetic Glyphs',
  family: 'oltec_script',
  direction: 'ltr',
  complexity: 'medium',
  magicalAffinity: false,
  notes: 'A simplified phonetic derivative of Oltec glyphs used by Makai islanders.'
});

  this._register({ id: 'qualith', name: 'Qualith', family: 'aberrant_psionic', direction: 'parallel_quad', complexity: 'high', psychicResonance: true });
  this._register({ id: 'quori', name: 'Quori', family: 'planar_dream', direction: 'ltr', complexity: 'high', magicalAffinity: true, psychicResonance: true });
  this._register({ id: 'selvaran', name: 'Selvaran', family: 'ritual_script', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'shadow_runes', name: 'Shadow Runes', family: 'elven', direction: 'boustrophedon', /* Traditional for cavern walls */ complexity: 'medium', magicalAffinity: false, psychicResonance: true /* Adapted for the Shadow Elves' unique connection to Rafiel */ });
  this._register({ id: 'shou', name: 'Shou Logographs', family: 'human_kara_tur', direction: 'ttb', complexity: 'high' });
  this._register({
  id: 'tanagoro',
  name: 'Tanagoro Script',
  family: 'tanagoro_script',
  direction: 'ltr',
  complexity: 'medium',
  magicalAffinity: false,
  notes: 'A rhythmic, syllabic script used by Tanagoro-descended cultures across Davania and the Savage Coast.'
});
this._register({
  id: 'taymoran_glyphs',
  name: 'Taymoran Glyphs',
  family: 'taymoran_script',
  direction: 'ltr',
  complexity: 'high',
  magicalAffinity: true,
  notes: 'A funerary and ritual glyphic system used by the ancient Taymoran necromancers; complex and heavily magical.'
});

  this._register({ id: 'thorass', name: 'Thorass', family: 'human_faerunian', direction: 'ltr', complexity: 'low' });
  this._register({ id: 'thyatian', name: 'Thyatian', family: 'antalian_thantalian', direction: 'ltr', complexity: 'medium', magicalAffinity: true });
  this._register({ id: 'tirsu', name: "Tir'su", family: 'gith_astral', direction: 'circular', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'ylari_phonetic', name: 'Ylari Phonetic Script', family: 'ylari_script', direction: 'rtl', complexity: 'medium', magicalAffinity: false /* notes: 'A phonetic script blending Alasiyan cursive with simplified Nithian glyphic elements.' */ });


  // Existing real-world Han
  this._register({ id: 'han', name: 'Han Characters', family: 'human_realworld', direction: 'ttb', complexity: 'high' });

  // ───────────────────────────────────────────────
  //  UNIFIED BINARY / DIGITAL SYSTEM
  // ───────────────────────────────────────────────

  this._register({
    id: 'binary_unified',
    name: 'Unified Binary Code',
    family: 'machine_logic',
    direction: 'ltr',
    complexity: 'high',
    notes: 'Universal digital encoding system used across technological, cybernetic, psionic-interface, and multiversal machine languages.'
  });

  // ───────────────────────────────────────────────
  //  MODERN EARTH SCRIPTS
  // ───────────────────────────────────────────────

  this._register({ id: 'latin', name: 'Latin Script', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'cyrillic', name: 'Cyrillic Script', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'greek', name: 'Greek Script', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'arabic', name: 'Arabic Script', family: 'human_modern', direction: 'rtl', complexity: 'medium' });
  this._register({ id: 'hebrew', name: 'Hebrew Script', family: 'human_modern', direction: 'rtl', complexity: 'medium' });
  this._register({ id: 'devanagari', name: 'Devanagari', family: 'human_modern', direction: 'ltr', complexity: 'high' });
  this._register({ id: 'thai', name: 'Thai Script', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'indonesian_latin', name: 'Indonesian Latin', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'hiragana', name: 'Hiragana', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'katakana', name: 'Katakana', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'kanji', name: 'Kanji', family: 'human_modern', direction: 'ttb', complexity: 'high' });
  this._register({ id: 'hangul', name: 'Hangul', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'ethiopic', name: 'Ethiopic', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'armenian', name: 'Armenian', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'georgian', name: 'Georgian', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'tibetan', name: 'Tibetan', family: 'human_modern', direction: 'ltr', complexity: 'high' });
  this._register({ id: 'lao', name: 'Lao', family: 'human_modern', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'khmer', name: 'Khmer', family: 'human_modern', direction: 'ltr', complexity: 'high' });
  this._register({ id: 'burmese', name: 'Burmese', family: 'human_modern', direction: 'ltr', complexity: 'high' });
  this._register({ id: 'mongolian_vertical', name: 'Mongolian Vertical', family: 'human_modern', direction: 'ttb', complexity: 'high' });
  this._register({ id: 'braille', name: 'Braille', family: 'tactile_psionic', direction: 'multi', complexity: 'medium' });

  // ───────────────────────────────────────────────
  //  STAR WARS SCRIPTS
  // ───────────────────────────────────────────────

  this._register({ id: 'rodese_glyphs', name: 'Rodese Glyphs', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'ryl_glyphs', name: 'Ryl Glyphs', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'selkath_script', name: 'Selkath Script', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'sith_hieroglyphs', name: 'Sith Hieroglyphs', family: 'starwars_force', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'skakoan_arithmetic', name: 'Skakoan Arithmetic', family: 'starwars_alien', direction: 'ltr', complexity: 'high' });
  this._register({ id: 'sullustese_glyphs', name: 'Sullustese Glyphs', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'umbaran_glyphs', name: 'Umbaran Glyphs', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'utapaun_glyphs', name: 'Utapaun Glyphs', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'dosh_glyphs', name: 'Dosh Glyphs', family: 'starwars_alien', direction: 'ltr', complexity: 'medium' });

  // ───────────────────────────────────────────────
  //  STAR TREK SCRIPTS
  // ───────────────────────────────────────────────

  this._register({ id: 'andorian_glyphs', name: 'Andorian Glyphs', family: 'startrek_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'axanar_glyphs', name: 'Axanar Glyphs', family: 'startrek_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'bajoran_script', name: 'Bajoran Script', family: 'startrek_humanoid', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'betazoid_glyphs', name: 'Betazoid Glyphs', family: 'startrek_humanoid', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'cardassian_glyphs', name: 'Cardassian Glyphs', family: 'startrek_humanoid', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'dominion_glyphs', name: 'Dominion Glyphs', family: 'startrek_universal', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'eredic_glyphs', name: 'Eredic Glyphs', family: 'startrek_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'ferengi_glyphs', name: 'Ferengi Glyphs', family: 'startrek_humanoid', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'garidian_glyphs', name: 'Garidian Glyphs', family: 'startrek_romulan', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'iconian_glyphs', name: 'Iconian Glyphs', family: 'startrek_ancient', direction: 'ltr', complexity: 'high', magicalAffinity: true });
  this._register({ id: 'kazon_glyphs', name: 'Kazon Glyphs', family: 'startrek_humanoid', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'pikl_uth', name: 'Pikl-Uth', family: 'startrek_klingon', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'romulan_glyphs', name: 'Romulan Glyphs', family: 'startrek_romulan', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'tellarite_glyphs', name: 'Tellarite Glyphs', family: 'startrek_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'trill_glyphs', name: 'Trill Glyphs', family: 'startrek_humanoid', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'xindi_glyphs', name: 'Xindi Glyphs', family: 'startrek_alien', direction: 'ltr', complexity: 'medium' });

  // ───────────────────────────────────────────────
  //  BABYLON 5 SCRIPTS
  // ───────────────────────────────────────────────

  this._register({ id: 'abbai_glyphs', name: 'Abbai Glyphs', family: 'b5_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'centauri_glyphs', name: 'Centauri Glyphs', family: 'b5_centauri', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'hyach_glyphs', name: 'Hyach Glyphs', family: 'b5_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'minbari_glyphs', name: 'Minbari Glyphs', family: 'b5_minbari', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'narn_glyphs', name: 'Narn Glyphs', family: 'b5_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'yolu_glyphs', name: 'Yolu Glyphs', family: 'b5_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'vorlon_glyphs', name: 'Vorlon Glyphs', family: 'b5_ancient', direction: 'ltr', complexity: 'high', magicalAffinity: true });

  // ───────────────────────────────────────────────
  //  DUNE SCRIPTS
  // ───────────────────────────────────────────────

  this._register({ id: 'azhar_script', name: 'Azhar Script', family: 'dune_human', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'chakobsa_glyphs', name: 'Chakobsa Glyphs', family: 'dune_secret', direction: 'ltr', complexity: 'medium' });

  // ───────────────────────────────────────────────
  //  TRAVELLER SCRIPTS
  // ───────────────────────────────────────────────

  this._register({ id: 'darian_glyphs', name: 'Darian Glyphs', family: 'traveller_human', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'vilani_glyphs', name: 'Vilani Glyphs', family: 'traveller_human', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'zhodani_alphabet', name: 'Zhodani Alphabet', family: 'traveller_human', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'aslan_glyphs', name: 'Aslan Glyphs', family: 'traveller_alien', direction: 'ltr', complexity: 'medium' });
  this._register({ id: 'droyne_chirps', name: 'Droyne Chirp-Script', family: 'traveller_alien', direction: 'none', complexity: 'medium' });
  this._register({
    id: 'k_kree_runes',
    name: 'K’kree Runes',
    family: 'traveller_alien',
    direction: 'ltr',
    complexity: 'medium',
    notes: 'A bold, sweeping script adapted for the herd-mind communication of the K’kree.'
  });

  // CTHULHU / HYPERBOREA / ZOTHIQUE
    this._register({
    id: 'elder_runes',
    name: 'Elder Runes',
    family: 'mythos_alien',
    direction: 'multi',
    complexity: 'high',
    magicalAffinity: true,
    notes: 'Non-Euclidean sigils used by the Elder Things; geometry shifts when observed.'
  });

  this._register({
    id: 'pnakotic_glyphs',
    name: 'Pnakotic Glyphs',
    family: 'mythos_alien',
    direction: 'ltr',
    complexity: 'very_high',
    magicalAffinity: true,
    notes: 'A script designed to encode non-linear time and multi-dimensional grammar.'
  });

  this._register({
    id: 'geometric',
    name: 'Geometric Script',
    family: 'mythos_alien',
    direction: 'multi',
    complexity: 'high',
    notes: 'Angular, fractal shapes used by the Shan and other extradimensional entities.'
  });

  this._register({
    id: 'hieroglyphs',
    name: 'Egyptian Hieroglyphs',
    family: 'historical_human',
    direction: 'ltr',
    complexity: 'high',
    notes: 'Classical logographic script used in ancient Khem; required for Black Pharaoh lore.'
  });

  this._register({
    id: 'cuneiform',
    name: 'Cuneiform',
    family: 'historical_human',
    direction: 'ltr',
    complexity: 'high',
    notes: 'Wedge-based script used by ancient Mesopotamian cultures; appears in Mythos tablets.'
  });

  this._register({
    id: 'pictographs',
    name: 'Pictographs',
    family: 'symbolic',
    direction: 'multi',
    complexity: 'medium',
    notes: 'Generic pictographic system used across multiple settings (Aztechnology, OSR, Zothique).'
  });

  // SHADOWRUN / CYBERPUNK
  this._register({
    id: 'pictographs_modern',
    name: 'Modern Pictographs',
    family: 'urban_modern',
    direction: 'multi',
    complexity: 'medium',
    notes: 'Corporate and gang pictographs used by Aztlan and megacorp subcultures.'
  });

  // STARGATE
    this._register({
    id: 'ancient_glyphs',
    name: 'Ancient Glyphs',
    family: 'stargate_ancient',
    direction: 'ltr',
    complexity: 'high',
    magicalAffinity: true,
    notes: 'The script of the Alterans; used in stargate addresses and ascension texts.'
  });

  this._register({
    id: 'asgard_runes',
    name: 'Asgard Runes',
    family: 'stargate_asgard',
    direction: 'ltr',
    complexity: 'medium',
    notes: 'A clean, geometric script compatible with holographic projection.'
  });

  this._register({
    id: 'furling_glyphs',
    name: 'Furling Glyphs',
    family: 'stargate_ancient',
    direction: 'multi',
    complexity: 'high',
    magicalAffinity: true,
    notes: 'Extremely rare glyphs found only in ruins of the Furlings.'
  });

  this._register({
    id: 'goauld_hieroglyphs',
    name: 'Goa’uld Hieroglyphs',
    family: 'stargate_goauld',
    direction: 'ltr',
    complexity: 'medium',
    notes: 'A stylized derivative of Egyptian hieroglyphs used by the System Lords.'
  });

  this._register({
    id: 'wraith_glyphs',
    name: 'Wraith Glyphs',
    family: 'stargate_wraith',
    direction: 'ltr',
    complexity: 'medium',
    notes: 'Organic, chitin-like glyphs used by the Wraith for ship systems and genetic records.'
  });

  // BATTLETECH
    this._register({
    id: 'kanji_bt',
    name: 'Kanji (Battletech)',
    family: 'human_battletech',
    direction: 'ttb',
    complexity: 'high',
    notes: 'Used by the Draconis Combine; derived from ancient Japanese logographs.'
  });

  this._register({
    id: 'pictographs_bt',
    name: 'Capellan Pictographs',
    family: 'human_battletech',
    direction: 'multi',
    complexity: 'medium',
    notes: 'Used by the Capellan Confederation; stylized and ideographic.'
  });

  this._register({
    id: 'runic_bt',
    name: 'Runic Script (Jarnfolk)',
    family: 'human_battletech',
    direction: 'ltr',
    complexity: 'medium',
    notes: 'An archaic runic system used by the Jarnfolk traders.'
  });

  // MIDDLE-EARTH
  this._register({
    id: 'tengwar',
    name: 'Tengwar',
    family: 'elvish_middle_earth',
    direction: 'ltr',
    complexity: 'high',
    notes: 'The elegant script of the Elves; used for Quenya, Sindarin, and ritual texts.'
  });

  this._register({
    id: 'cirth',
    name: 'Cirth',
    family: 'dwarven_middle_earth',
    direction: 'ltr',
    complexity: 'medium',
    notes: 'Angular runes used by Dwarves and some Men; adapted for Orkish in later ages.'
  });
  // End of script registrations
  }

  getScript(id) {
    return this.scripts.get(id) || null;
  }

  getAllScripts() {
    return Array.from(this.scripts.values());
  }
}

module.exports = ScriptRegistry;


