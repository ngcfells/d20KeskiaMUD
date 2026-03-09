module.exports = {
  id: 'spellbook_midnight_constellation',
  title: 'Spellbook of the Midnight Constellation',
  type: 'spellbook',
  rarity: 'rare',
  tags: ['astral', 'arcane', 'stars'],
  description: 'A deep‑blue spellbook whose pages shimmer with faint starlight, used by astrologer‑mages.',
  spellbookData: {
    capacity: 100,
    pagesUsed: 38,
    spells: [
      { id: 'dancing_lights', pages: 1 },
      { id: 'faerie_fire', pages: 3 },
      { id: 'glitterdust', pages: 4 },
      { id: 'starlight_lance', pages: 6 },
      { id: 'astral_projection_minor', pages: 8 },
      { id: 'constellation_bind', pages: 16 }
    ],
    wards: ['astral ward'],
    scribingDifficulty: 18
  },
  magical: true,
  aura: 'faint evocation',
  casterLevel: 7,
  metadata: {}
};
