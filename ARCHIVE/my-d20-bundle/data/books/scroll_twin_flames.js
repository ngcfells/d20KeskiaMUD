module.exports = {
  id: 'scroll_twin_flames',
  title: 'Scroll of Twin Flames',
  type: 'scroll',
  rarity: 'rare',
  tags: ['fire', 'scroll'],
  description: 'A rare scroll containing two synergistic fire spells.',
  containsSpells: true,
  spells: ['burning_hands', 'scorching_ray'],
  scrollData: {
    multiSpell: true,
    spells: ['burning_hands', 'scorching_ray'],
    casterLevels: {
      burning_hands: 5,
      scorching_ray: 7
    },
    scribingDC: 22,
    inkType: 'pyroclastic ink'
  },
  metadata: {}
};
