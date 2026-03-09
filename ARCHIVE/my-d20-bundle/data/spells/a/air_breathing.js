/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Air Breathing
 * Source: WotC | Spell Compendium p.8
 * 
 * Translates the respiratory system of aquatic creatures, allowing them
 * to survive on land. The duration is a pool of 2 hours per level,
 * which must be divided equally among all targets touched.
 */
module.exports = {
  id: 'air_breathing',
  name: 'Air Breathing',
  level: 3,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'WotC | Spell Compendium p.8',

  /**
   * SPELL LISTS:
   * - Cleric: 3
   * - Druid: 3
   * - Sorcerer/Wizard: 3
   * - Ranger: 3
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'grass_blade',
      quantity: 1,
      consumed: true,
      notes: 'A blade of grass or a tiny flower.'
    }
  ],

  range: 'touch',
  target: 'living creatures touched',
  duration: '2 hours/level (Divided)',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  onCast(state, caster, targets, ctx) {
    const targetList = Array.isArray(targets) ? targets : [targets];
    const cl = caster.getMeta('level') || 1;
    
    // Duration Logic: (CL * 2 hours) / number of targets
    const totalMinutes = (cl * 2) * 60;
    const durationPerTarget = Math.floor(totalMinutes / targetList.length);
    const msPerTarget = durationPerTarget * 60000;

    targetList.forEach(target => {
      const effect = state.EffectFactory.create('air_breathing_effect', {
        duration: msPerTarget,
        state: { casterId: caster.id }
      });

      if (target.addEffect(effect)) {
        target.say("<bold><cyan>A cool, refreshing sensation washes over your gills. The dry air suddenly feels as life-giving as the deep sea.</cyan></bold>");
        caster.room.broadcastExcept(target, `<cyan>${target.name}'s labored gasping ceases as their breathing becomes steady in the open air.</cyan>`, target);
      }
    });
  }
};
