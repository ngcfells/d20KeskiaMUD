/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Burrowing Bony Digits
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * Launches skeletal fingers that impale targets and tunnel deeper 
 * into their viscera. Once lodged, they are impossible to extract 
 * through mundane means, grinding against bone and organ.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'burrowing_bony_digits',
  name: 'Burrowing Bony Digits',
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Hunger Domain: 4
   * - Pain Domain: 4
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'skeletal_finger_bundle',
      quantity: 1,
      consumed: true,
      notes: 'Five humanoid fingers stripped of flesh, tied with black thread.'
    }
  ],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'up to five creatures (max 30ft apart)',
  area: null,
  duration: 'special (see text)',
  savingThrow: 'reflex partial',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, targets, ctx) {
    const cl = caster.getMeta('level') || 1;
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const dc = 10 + 4 + D20Utils.getModifier(caster.getAttribute(ability) || 10);
    const burrowDuration = Math.floor(cl / 3) * 6000; // 1 round per 3 levels

    // Limited to 5 targets
    const validTargets = Array.isArray(targets) ? targets.slice(0, 5) : [targets];

    validTargets.forEach(target => {
      // 1. Initial Impact Damage
      const initialDmg = state.Dice.roll('1d6');
      target.receiveDamage('kinetic', initialDmg, caster);
      
      caster.say(`<red>A skeletal finger streaks from your hand and buries itself in ${target.name}!</red>`);
      target.say("<bold><red>A jagged bone shard slams into your flesh!</red></bold>");

      // 2. Reflex Save to prevent burrowing
      const saveRoll = Math.floor(Math.random() * 20) + 1 + (target.getMeta('save_reflex') || 0);
      
      if (saveRoll >= dc) {
        target.say("<yellow>You quickly slap the digit away before it can sink deeper.</yellow>");
      } else {
        // 3. Apply Burrowing Effect
        const burrowEffect = state.EffectFactory.create('burrowing_digit_effect', {
          duration: burrowDuration,
          state: { casterId: caster.id }
        });
        target.addEffect(burrowEffect);
      }
    });
  }
};
