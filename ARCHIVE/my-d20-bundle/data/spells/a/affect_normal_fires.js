/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Allows the caster to manipulate the intensity of nonmagical flames. 
 * Fires can be dampened to glowing embers for stealth or flared to 
 * blinding brilliance to illuminate vast areas. 
 */
module.exports = {
  id: 'affect_normal_fires',
  name: 'Affect Normal Fires',
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: ['fire'], 
  source: 'Player\'s Handbook 2E | Wizards of the Coast | p.130',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Druid: 1
   * - Pyromancy Domain: 1
   */

  castingTime: 'standard', 
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'pinch_of_charcoal', 
      quantity: 1, 
      consumed: true,
      notes: 'A small piece of charred wood or coal.' 
    }
  ],

  range: 'medium', // 100 ft. + 10 ft./level (converted from 5 yds/level)
  target: 'all nonmagical fires in area',
  area: '10-ft. radius burst',
  duration: '2 rounds/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 12000; // 2 rounds (12s) per level

    const fireEffect = state.EffectFactory.create('affect_normal_fires_effect', {
      duration: duration,
      state: { 
        casterId: caster.id,
        mode: 'bright' // Default starting mode
      }
    });

    // Apply to the room/area environment
    if (caster.room.addEffect(fireEffect)) {
      caster.say("<orange>You gesture toward the flames, feeling their heat respond to your will.</orange>");
      caster.room.broadcastExcept(caster, `<orange>${caster.name} weaves their hands in a circular motion, and the nearby flames begin to dance unnaturally.</orange>`);
    }
  }
};
