/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Splash
 * Source: WotC | Player's Handbook p.196
 * 
 * Logic:
 * - Ranged Touch Attack: (1d20 + Dex + BAB) vs Target Touch AC.
 * - Damage: 1d3 Acid damage.
 * - SR: No (Conjuration/Creation bypasses Spell Resistance).
 */

const { Broadcast } = require('ranvier');
const Defense = require('../../lib/combat/defense');
const D20Utils = require('../../lib/d20/d20Utils');
const { ACID } = require('../../lib/combat/damage-types');

module.exports = {
  id: 'acid_splash',
  name: 'Acid Splash',
  level: 0,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [ACID],
  source: 'WotC | Player\'s Handbook p.196',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 0
   */

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  range: 'close', 
  target: 'one creature',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    if (!target) {
        return caster.say("Hurl your acid at whom?");
    }

    // 1. RANGED TOUCH ATTACK CALCULATION
    const dexMod = D20Utils.getModifier(caster.getAttribute('dexterity') || 10);
    const bab = caster.getAttribute('bab') || 0;
    const roll = state.Dice.roll('1d20');
    const attackTotal = roll + dexMod + bab;
    
    // Use your Defense lib to get Touch AC
    const touchAC = Defense.getAC(target, { isTouch: true });

    // 2. INITIAL CASTING EMOTES
    caster.say(`<green>You chant a low syllable and hurl a glob of hissing emerald acid at ${target.name}!</green>`);
    target.say(`<green>${caster.name} hurls a small orb of hissing acid directly at you!</green>`);
    caster.room.emitExcept([caster, target], `<green>${caster.name} hurls a small orb of emerald acid toward ${target.name}!</green>`);

    // 3. HIT OR MISS LOGIC
    if (attackTotal >= touchAC || roll === 20) { // Natural 20 always hits
      const damageRoll = state.Dice.roll('1d3');
      
      // Hit Emotes
      target.say(`<bold><red>The acid splashes against you, searing your flesh!</red></bold>`);
      caster.room.emitExcept([caster, target], `<green>The orb of acid splashes against ${target.name}, hissing as it burns!</green>`);

      state.Damage.apply({
        amount: damageRoll,
        type: ACID,
        attacker: caster,
        target: target,
        source: this.name
      });

      // Immersion: Apply a trace of the 'acidic' effect from the liquids folder 
      // with a very short duration (1-2 seconds) for the "hissing" sound.
      const traceAcid = state.EffectFactory.create('acidic', {
        duration: 2000,
        state: { damagePerTick: '0', attacker: caster } // No extra damage, just flavor
      });
      target.addEffect(traceAcid);

    } else {
      // Miss Emotes
      caster.say(`<yellow>Your orb of acid narrowly misses ${target.name} and splashes harmlessly on the floor.</yellow>`);
      target.say(`<cyan>${caster.name}'s orb of acid misses you!</cyan>`);
      caster.room.emitExcept([caster, target], `<grey>The orb of acid misses ${target.name} and hisses as it hits the ground.</grey>`);
    }
  }
};
