/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Aching Dread
 * Source: WotC | Dragon Magazine #330 (Cerebrosis)
 * 
 * Logic:
 * - Area: Room-wide burst targeting enemies.
 * - Save: Will negates.
 * - Effect: Inflicts 'Shaken' (Tier 2 Fear) and minor Sanity loss.
 */

const { Broadcast } = require('ranvier');
const D20Utils = require('../../../lib/d20/d20Utils');
const { MIND } = require('../../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'aching_dread',
  name: 'Aching Dread',
  level: 1,
  school: 'necromancy',
  subschool: null,
  descriptors: [MIND, 'fear', 'mind-affecting', 'cerebrosis'],
  source: 'WotC | Dragon Magazine #330',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Bard: 1
   * - Dread Necromancer: 1
   * - Death Domain: 1
   * - Cerebrosis: 1
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
  target: 'all enemies in room',
  area: 'burst',
  duration: '1 round/level',
  savingThrow: 'will negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const castingAbility = caster.getMeta('spellcastingAbility') || 'intelligence';
    const abilityMod = D20Utils.getModifier(caster.getAttribute(castingAbility) || 10);
    const dc = 10 + this.level + abilityMod;
    
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const durationMs = cl * 6000;

    // Narrative: Caster
    Broadcast.sayAt(caster, "<bold><magenta>You exhale a cloud of invisible, psychic miasma that vibrates with the frequency of pure terror.</magenta></bold>");
    
    // Narrative: Room
    Broadcast.sayAtExcept(caster.room, `<magenta>A heavy, oppressive silence falls over the room as ${caster.name} whispers words of ancient agony.</magenta>`, [caster]);

    const roomTargets = [...caster.room.characters];

    for (const unit of roomTargets) {
      if (unit === caster) continue;
      
      // Target Filter: Hostiles/Combatants
      const isEnemy = unit.isInCombat() || unit.hasTag('hostile');
      if (!isEnemy) continue;

      // Spell Resistance Check
      if (this.spellResistance && !state.SpellcastingManager.checkSR(caster, unit)) continue;

      // Saving Throw
      const savePassed = state.SpellcastingManager._savingThrow(state, unit, 'will', dc);

      if (!savePassed) {
        // 1. Apply 'Shaken' (Tier 2) from your common/ folder
        const shakenEffect = state.EffectFactory.create('shaken', {
          duration: durationMs, 
        });
        unit.addEffect(shakenEffect);

        // 2. Sanity Damage (Cerebrosis Flavor - mapping to your attributes.js)
        const sanityLoss = state.Dice.roll('1d3');
        unit.lowerAttribute('sanity', sanityLoss);

        // Perspective Emotes
        unit.say("<red>The whisper echoes in the hollows of your mind, dragging up memories of pain you thought forgotten.</red>");
        Broadcast.sayAtExcept(unit.room, `<red>${unit.name} pales and begins to tremble as the psychic weight of the spell takes hold.</red>`, [unit, caster]);
      } else {
        unit.say("<white>You feel a cold, oily mental pressure, but you steel your mind against the dread.</white>");
      }
    }
  },

  onTick(state, caster, effect) {},
  onEnd(state, caster, effect) {}
};
