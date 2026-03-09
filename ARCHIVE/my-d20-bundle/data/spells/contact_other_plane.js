/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/contact_other_plane.js
 */
'use strict';

module.exports = {
  id: 'contact_other_plane',
  name: 'Contact Other Plane',
  level: 5,
  school: 'divination',
  castingTime: '10 minutes',
  components: ['V'],
  range: 'personal',
  target: 'self',
  duration: 'concentration',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You send your mind to another plane to seek forbidden answers.");
    // Logic: Int/Cha check or suffer temporary ability score reduction.
  }
};
