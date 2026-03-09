/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Algid Maneuver
 * Source: WotC | Spell Compendium p.9
 * 
 * Creates a flash of freezing rime beneath the target. The sudden ice 
 * deals cold damage and attempts to trip or bull rush the target using 
 * the caster's magical potency instead of physical strength.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'algid_maneuver',
  name: 'Algid Maneuver',
  level: 2,
  school: 'evocation',
  subschool: null,
  descriptors: ['cold'], 
  source: 'WotC | Spell Compendium p.9',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Druid: 2
   * - Cold Domain: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'pinch_of_ice', 
      quantity: 1, 
      consumed: true, 
      notes: 'A pinch of ice or frozen water.' 
    }
  ],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'one creature',
  area: null,
  duration: 'instantaneous', 
  savingThrow: 'reflex partial',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const abilityMod = D20Utils.getModifier(caster.getAttribute(ability) || 10);
    const dc = 10 + 2 + abilityMod;

    // 1. Damage: 1d6 per 2 levels (Max 5d6)
    const diceCount = Math.min(Math.floor(cl / 2), 5) || 1;
    let damage = 0;
    for (let i = 0; i < diceCount; i++) {
      damage += Math.floor(Math.random() * 6) + 1;
    }

    // 2. Save Check (Reflex)
    const saveRoll = Math.floor(Math.random() * 20) + 1 + (target.getMeta('save_reflex') || 0);
    const saved = saveRoll >= dc;

    if (saved) {
      damage = Math.floor(damage / 2);
    }

    // 3. Maneuver Logic (Only if save failed)
    let maneuverSuccess = false;
    const maneuverType = (ctx.args && ctx.args.toLowerCase() === 'bullrush') ? 'bullrush' : 'trip';

    if (!saved) {
      // Roll: 1d20 + CL + AbilityMod vs Target's CMD (Combat Maneuver Defense)
      const maneuverRoll = (Math.floor(Math.random() * 20) + 1) + cl + abilityMod;
      const targetCMD = target.getMeta('cmd') || (10 + (target.getMeta('bab') || 0) + D20Utils.getModifier(target.getAttribute('strength') || 10));

      if (maneuverRoll >= targetCMD) {
        maneuverSuccess = true;
      }
    }

    // 4. Execution & Emotes
    caster.say(`<blue>You gesture, and a flash of freezing rime erupts beneath ${target.name}'s feet!</blue>`);
    target.receiveDamage('cold', damage, caster);

    if (maneuverSuccess) {
      if (maneuverType === 'trip') {
        target.addEffect(state.EffectFactory.create('prone', { duration: 6000 }));
        target.say("<bold><cyan>The sudden ice slick sends you crashing to the ground!</cyan></bold>");
        caster.room.broadcastExcept(caster, `<cyan>${target.name} slips on a flash-frozen patch of ice and falls prone!</cyan>`, target);
      } else {
        // Bull Rush: Pushed back
        target.say("<bold><cyan>A wave of expanding ice shoves you backward!</cyan></bold>");
        caster.room.broadcastExcept(caster, `<cyan>${target.name} is thrown backward by a localized eruption of frost!</cyan>`, target);
        target.emit('pushed', { direction: 'away', distance: 5 });
      }
    } else if (saved) {
      target.say("<yellow>You nimbly dance across the frost, avoiding the worst of the cold.</yellow>");
    }
  }
};
