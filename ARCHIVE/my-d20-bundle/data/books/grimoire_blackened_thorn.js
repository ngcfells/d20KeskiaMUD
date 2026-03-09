module.exports = {
  id: 'grimoire_blackened_thorn',
  title: 'Grimoire of the Blackened Thorn',
  type: 'grimoire',
  rarity: 'rare',
  tags: ['nature', 'corruption'],
  description: 'A corrupted druidic tome filled with twisted plant magic.',
  containsSpells: true,
  spells: ['thorn_burst', 'blight'],
  grimoireData: {
    corruption: 2,
    forbiddenRituals: ['thorn_binding'],
    sanityRisk: 1
  },
  metadata: {}
};
