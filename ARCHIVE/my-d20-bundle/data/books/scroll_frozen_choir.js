module.exports = {
  id: 'scroll_frozen_choir',
  title: 'Scroll of the Frozen Choir',
  type: 'scroll',
  rarity: 'uncommon',
  tags: ['cold', 'sound'],
  description: 'A scroll that unleashes a chilling harmonic blast.',
  containsSpells: true,
  spells: ['frozen_chorus'],
  scrollData: {
    multiSpell: false,
    spells: ['frozen_chorus'],
    casterLevels: { frozen_chorus: 9 },
    scribingDC: 21
  },
  metadata: {}
};
