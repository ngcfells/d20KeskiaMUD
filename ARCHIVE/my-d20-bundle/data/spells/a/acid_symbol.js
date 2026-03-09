/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Symbol
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * Imbues the caster's animated undead with a floating corrosive sigil.
 * The minions drip with acidic slime that dissolves equipment, 
 * punishes melee attackers, and grants elemental immunities.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'acid_symbol',
  name: 'Acid Symbol',
  level: 6,
  school: 'necromancy',
  subschool: null,
  descriptors: ['acid', 'fire'],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Death Domain: 6
   * - Ooze Domain: 6
   */

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [], // V and S only

  range: 'medium', 
  target: '1 HD of animated corporeal undead/level',
  area: null,
  duration: 'instantaneous', // The imbuement is permanent until the undead is destroyed
  savingThrow: 'none (see text)',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    let hdRemaining = cl;

    // Logic: Find undead in the room that belong to the caster
    const potentialTargets = caster.room.npcs.filter(npc => 
      npc.hasTag('undead') && 
      npc.getMeta('master') === caster.id &&
      !npc.effects.has('acid_symbol_effect')
    );

    let affectedCount = 0;
    for (const undead of potentialTargets) {
      const undeadHD = undead.getMeta('hit_dice') || 1;
      if (hdRemaining >= undeadHD) {
        const acidEffect = state.EffectFactory.create('acid_symbol_effect', {
          state: { casterId: caster.id }
        });

        if (undead.addEffect(acidEffect)) {
          hdRemaining -= undeadHD;
          affectedCount++;
          
          // Perspective: Room
          caster.room.broadcastExcept(caster, `<green>A pulsing, sickly green sigil manifests above ${undead.name}. Thick grey slime begins to ooze from its joints and eye sockets.</green>`, undead);
        }
      }
      if (hdRemaining <= 0) break;
    }

    if (affectedCount > 0) {
      caster.say(`<green>You bind the corrosive power of the void to your servants. ${affectedCount} undead now bear the Acid Symbol.</green>`);
    } else {
      caster.say("<red>You have no suitable animated undead servants nearby to receive the symbol.</red>");
    }
  }
};
