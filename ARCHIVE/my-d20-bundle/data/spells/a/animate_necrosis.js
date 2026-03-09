/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animate Necrosis
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * Animates the dead tissue within a living creature's wound. The resulting 
 * necrotic tendril immediately attempts to stun and strangle the host.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'animate_necrosis',
  name: 'Animate Necrosis',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Death Domain: 5
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'fat_coated_string',
      quantity: 1,
      consumed: true,
      notes: 'A bit of string coated in animal fat.'
    }
  ],

  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'one wounded living creature',
  area: null,
  duration: 'instantaneous', // Animation is instantaneous; tendril persists until destroyed
  savingThrow: 'fortitude negates',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // Requirement: Target must be wounded
    if (target.getAttribute('health') >= target.getMaxAttribute('health')) {
      return caster.say("The spell finds no dead tissue to animate; the target is unscarred.");
    }

    const cl = caster.getMeta('level') || 1;
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const dc = 10 + 5 + D20Utils.getModifier(caster.getAttribute(ability) || 10);

    // 1. Initial Fortitude Save
    if (ctx.savePassed) {
      caster.say(`<yellow>${target.name}’s constitution rejects the necrotic spark.</yellow>`);
      return;
    }

    // 2. Will Save vs. Stun (1d3 rounds)
    const willDC = dc; 
    const willSave = Math.floor(Math.random() * 20) + 1 + (target.getMeta('save_will') || 0);
    if (willSave < willDC) {
      const stunDuration = (Math.floor(Math.random() * 3) + 1) * 6000;
      target.addEffect(state.EffectFactory.create('stunned', { duration: stunDuration }));
      target.say("<red>The horror of your own flesh rising against you leaves you paralyzed with shock!</red>");
    }

    // 3. Create the Necrotic Tendril
    const targetHD = target.getMeta('hit_dice') || 1;
    const tendrilEffect = state.EffectFactory.create('necrotic_tendril_effect', {
      state: { 
        hp: targetHD * 2,
        attackBonus: 15,
        strength: 20,
        constrictionDmg: '2d6'
      }
    });

    if (target.addEffect(tendrilEffect)) {
      caster.say(`<red>You pull the fat-slicked string through your fingers, and a matching tendril of black flesh erupts from ${target.name}'s wound!</red>`);
      target.room.broadcastExcept(caster, `<red>A sickly tendril of animated flesh reaches out of ${target.name}'s wound, coiling around their throat!</red>`, target);
    }
  }
};
