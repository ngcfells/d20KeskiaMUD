module.exports = {
  id: 'scroll_threefold_shield',
  title: 'Scroll of the Threefold Shield',
  type: 'scroll',
  rarity: 'rare',
  tags: ['abjuration'],
  description: 'A scroll containing layered defensive spells.',
  containsSpells: true,
  spells: ['shield', 'protection_from_arrows', 'resist_energy'],
  scrollData: {
    multiSpell: true,
    spells: ['shield', 'protection_from_arrows', 'resist_energy'],
    casterLevels: {
      shield: 5,
      protection_from_arrows: 7,
      resist_energy: 7
    },
    scribingDC: 24
  },
  metadata: {}
};
