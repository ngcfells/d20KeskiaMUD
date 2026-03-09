/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * The caster teleports the physical remains of a recently deceased humanoid 
 * to their person, where the flesh and bone magically knit into a macabre 
 * suit of plate armor. This provides significant protection and a ghastly 
 * camouflage against the mindless dead.
 */
module.exports = {
  id: 'armor_of_undeath',
  name: 'Armor of Undeath',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Relics & Rituals | Sword & Sorcery Studio | p.54',

  /**
   * SPELL LISTS:
   * - Cleric: 5 (Mordain)
   * - Sorcerer/Wizard: 5
   * - Death Domain: 5
   * - Dread Necromancer: 5
   */

  castingTime: 'full-round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'fresh_humanoid_corpse', 
      quantity: 1, 
      consumed: true, 
      notes: 'The corpse of a humanoid slain within the last 24 hours.' 
    }
  ],

  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 hour/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000; // 1 hour per level in ms

    const armorEffect = state.EffectFactory.create('armor_of_undeath_effect', {
      duration: duration,
      state: { casterLevel: cl }
    });

    if (caster.addEffect(armorEffect)) {
      // Perspective: Caster
      caster.say("<red>You chant the forbidden rites as the nearby corpse twitches. Its flesh sloughs off bone, flying toward you to latch onto your limbs, hardening into a cold, leathery shell that reeks of the grave.</red>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<red>${caster.name}'s voice drops to a grave-rattle. A nearby corpse liquefies into a red-black mist that rushes toward them, solidifying into a horrific suit of plate made of stitched skin and exposed ribs.</red>`);
    }
  }
};
