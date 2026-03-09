/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acquiescence
 * Source: WotC | Player's Handbook II p.103
 * 
 * Logic:
 * - Effect: Target is dazed for 1 round.
 * - Social: Target is considered 'willing' for the duration of the spell.
 */
const { MIND } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'acquiescence',
  name: 'Acquiescence',
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: [MIND, 'mind-affecting'],
  source: 'WotC | Player\'s Handbook II p.103',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Bard: 1
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'], 
  materialComponents: [],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'close', 
  target: 'one living creature',
  duration: '1 round',
  savingThrow: 'will negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const { savePassed } = ctx;

    caster.say(`<magenta>You speak a soft, rhythmic command, weaving your will into ${target.name}'s mind.</magenta>`);
    caster.room.emitExcept([caster, target], `<magenta>${caster.name} whispers a sequence of melodic syllables toward ${target.name}.</magenta>`);

    if (savePassed) {
      target.say("<white>A fleeting urge to stop and listen strikes you, but you shake it off.</white>");
      caster.say(`<yellow>${target.name} resists your influence.</yellow>`);
      return;
    }

    // Perspective Emote: Target
    target.say("<red>Your thoughts go quiet. Resistance seems like a distant, unnecessary effort. You stand still, waiting for direction.</red>");
    caster.room.emitExcept([caster, target], `<yellow>${target.name}'s eyes glaze over as they go suddenly, unnaturally still.</yellow>`);

    // Apply the "Dazed/Acquiescent" Effect
    const acquiesceEffect = state.EffectFactory.create('acquiescent_active', {
      duration: 6000, // 1 Round
    });
    
    target.addEffect(acquiesceEffect);
  }
};
