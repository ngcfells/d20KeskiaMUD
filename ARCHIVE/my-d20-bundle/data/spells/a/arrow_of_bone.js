/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You scribe runes of absolute finality upon a projectile. 
 * The arrow or bolt transforms into a jagged, ivory-white shard of bone 
 * that hungers for the life-force of its target.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arrow_of_bone',
  name: 'Arrow of Bone',
  level: 7,
  school: 'necromancy',
  subschool: null,
  descriptors: ['death', 'evil'],
  source: 'Spell Compendium | p. 16',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 7
   * - Cleric: 7
   * - Death Domain: 7
   * - Rarity: Rare / Forbidden
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'tiny_ivory_arrow', 
      quantity: 1, 
      minValue: 50, 
      consumed: true, 
      notes: 'A tiny ivory arrow or bolt worth at least 50 gp.' 
    },
    {
      id: 'undead_bone_shard',
      quantity: 1,
      consumed: true,
      notes: 'A piece of bone from any undead creature.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one projectile (arrow, bolt, or sling bullet)',
  area: null,
  duration: '1 hour/level',
  savingThrow: 'fortitude-partial',
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
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 60 * 60 * 1000;
    const dc = 10 + 7 + D20Utils.getModifier(caster.getAttribute('intelligence') || 10);

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<magenta>You press the ivory sliver and the undead shard against ${target.name}. They fuse together in a flash of sickly green light, transforming the projectile into a jagged, whistling bolt of pure bone.</magenta>`);
    caster.room.broadcastExcept(caster, `<magenta>${caster.name} whispers a dark incantation over their ammunition. A single ${target.name} warps and lengthens, turning into a piece of bleached, rune-etched bone.</magenta>`);

    const effect = state.EffectFactory.create('arrow_of_bone_active', {
      config: { 
        name: "Arrow of Bone",
        duration: durationMs 
      },
      state: {
        casterId: caster.id,
        casterLevel: casterLevel,
        saveDC: dc
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    impactLethal: (victim) => {
      victim.say("<red>The bone-bolt pierces your flesh, and a coldness beyond death instantly stops your heart. Your vision fades to white as your soul is snuffed out.</red>");
      victim.room.broadcastExcept(victim, `<red>The bone arrow strikes ${victim.name} squarely. They freeze mid-breath, their eyes turning a milky white as they collapse, stone-dead before hitting the ground.</red>`);
    },
    impactPartial: (victim) => {
      victim.say("<blue>The bone-bolt grazes you, sending a surge of necrotic frost through your veins. You fight through the urge to simply stop living.</blue>");
      victim.room.broadcastExcept(victim, `<blue>${victim.name} is struck by the bone arrow! A layer of frost instantly coats their wound as they shudder from the necrotic shock.</blue>`);
    }
  }
};
