/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A specialized necromantic curse developed by Liang Chou to punish 
 * those who deface or lose archived knowledge. It transmutes the 
 * victim's circulatory system into a viscous, magical ink that 
 * slowly "writes" their death from the inside out.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_ink_blood',
  name: "Liang's Ink-Blood Curse",
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: ['curse', 'evil'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Cleric: 4 (Death/Knowledge)
   * - Rarity: Rare (Liang Sect Retribution)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one living creature',
  area: null,
  duration: 'permanent',
  savingThrow: 'fortitude-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    if (ctx.savePassed) {
        caster.say(`<white>You attempt to corrupt ${target.name}'s blood, but their constitution filters out the arcane ink before it can take root.</white>`);
        target.say(`<cyan>A cold, oily sensation creeps into your wrist where ${caster.name} touched you, but it quickly dissolves into a harmless shiver.</cyan>`);
        return;
    }

    // SUCCESS EMOTES
    caster.say(`<magenta>You touch ${target.name}, and the black ink staining your own fingers sinks into their skin. Their veins instantly turn a bruised, obsidian black, visible beneath the flesh.</magenta>`);
    
    target.say(`<red>A horrifying, stinging heat surges through your heart. As you look at your hands, your veins bulge with a thick, midnight fluid. Your vision begins to swim in a sea of black oil.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} brushes a finger against ${target.name}. A network of black, spider-webbing lines erupts from the point of contact, racing through the victim's body.</magenta>`);

    const effect = state.EffectFactory.create('ink_blood_curse', {
      config: { 
        name: "Ink-Blood Curse",
        duration: -1 // Permanent
      },
      state: {
          casterId: caster.id,
          dailyConDrain: 1
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    inkBlinding: (target) => {
      target.say(`<red>Black ink wells up from your tear ducts, coating your eyes in an impenetrable, oily film. You are blind.</red>`);
      target.room.broadcastExcept(target, `<grey>${target.name}'s eyes turn entirely black, weeping thick droplets of ink down their cheeks.</grey>`);
    },
    conDrain: (target) => {
        target.say(`<red>Your heart labors against the thickness of your own blood; the ink is becoming a sludge that denies you breath.</red>`);
    }
  }
};
