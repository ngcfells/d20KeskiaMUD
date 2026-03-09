module.exports = {
  id: 'necromancers_ledger',
  title: 'The Necromancer\'s Ledger',
  author: 'Morvath the Pale',
  publisher: 'SRD',

  type: 'grimoire',
  rarity: 'rare',
  tags: ['necromancy', 'undead'],

  description:
    'A bone-bound ledger cataloging rituals for animating and controlling the dead.',

  pages: 201,
  language: 'Dark Speech',

  containsSpells: true,
  spells: ['animate_dead', 'create_undead'],

  magical: true,
  aura: 'strong necromancy',
  casterLevel: 12,

  metadata: {}
};
