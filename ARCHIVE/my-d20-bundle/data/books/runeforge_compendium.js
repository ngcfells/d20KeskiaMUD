module.exports = {
  id: 'runeforge_compendium',
  title: 'The Runeforge Compendium',
  author: 'Runesmith Haldrik',
  publisher: 'SRD',

  type: 'codex',
  rarity: 'rare',
  tags: ['runes', 'enchanting'],

  description:
    'A heavy tome detailing the forging and activation of magical runes.',

  pages: 280,
  language: 'Dwarven',

  containsSpells: true,
  spells: ['glyph_of_warding', 'symbol_of_pain'],

  magical: true,
  aura: 'moderate abjuration',
  casterLevel: 9,

  metadata: {}
};
