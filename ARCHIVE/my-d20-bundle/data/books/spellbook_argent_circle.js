module.exports = {
  id: 'spellbook_argent_circle',
  title: 'Spellbook of the Argent Circle',
  type: 'spellbook',
  rarity: 'uncommon',
  tags: ['arcane', 'order'],
  description: 'A silver‑leafed spellbook used by the mages of the Argent Circle.',
  spellbookData: {
    capacity: 100,
    pagesUsed: 41,
    spells: [
      { id: 'detect_magic', pages: 1 },
      { id: 'mage_armor', pages: 3 },
      { id: 'see_invisibility', pages: 4 },
      { id: 'dispel_magic', pages: 6 },
      { id: 'arcane_eye', pages: 8 },
      { id: 'dimension_door', pages: 9 },
      { id: 'stoneskin', pages: 10 }
    ]
  },
  metadata: {}
};
