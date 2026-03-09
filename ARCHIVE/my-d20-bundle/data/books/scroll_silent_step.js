module.exports = {
  id: 'scroll_silent_step',
  title: 'Scroll of the Silent Step',
  type: 'scroll',
  rarity: 'uncommon',
  tags: ['stealth'],
  description: 'A scroll granting supernatural silence to the caster’s movements.',
  containsSpells: true,
  spells: ['silence_step'],
  scrollData: {
    multiSpell: false,
    spells: ['silence_step'],
    casterLevels: { silence_step: 5 },
    scribingDC: 18
  },
  metadata: {}
};
