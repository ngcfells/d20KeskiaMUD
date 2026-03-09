/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Water Breathing
 * Source: WotC | Player's Handbook p.300
 * 
 * The reverse of Air Breathing. Allows air-breathing creatures to
 * breathe water freely. This does not grant a swim speed, only
 * the ability to respire submerged.
 */
module.exports = {
  id: 'water_breathing',
  name: 'Water Breathing',
  level: 3,
  school: 'transmutation',
  subschool: null,
  descriptors: ['water'],
  source: 'WotC | Player\'s Handbook p.300',

  /**
   * SPELL LISTS:
   * - Cleric: 3
   * - Druid: 3
   * - Sorcerer/Wizard: 3
   * - Ranger: 3
   * - Water Domain: 3
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'reed_straw',
      quantity: 1,
      consumed: true,
      notes: 'A short reed or piece of straw.'
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
    
    const totalMinutes = (cl * 2) * 60;
    const durationPerTarget = Math.floor(totalMinutes / targetList.length);
    const msPerTarget = durationPerTarget * 60000;

    targetList.forEach(target => {
      const effect = state.EffectFactory.create('water_breathing_effect', {
        duration: msPerTarget,
        state: { casterId: caster.id }
      });

      if (target.addEffect(effect)) {
        target.say("<bold><blue>You feel your lungs adjust to a heavier weight. The thought of inhaling water no longer brings fear, but comfort.</blue></bold>");
        caster.room.broadcastExcept(target, `<blue>${target.name} exhales a slow, steady stream of bubbles as their lungs adapt to the depths.</blue>`, target);
      }
    });
  }
};
