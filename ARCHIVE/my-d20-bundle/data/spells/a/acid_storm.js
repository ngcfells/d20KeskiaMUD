/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Storm (Lingering Aftermath Edition)
 * Source: WotC | Spell Compendium p.7
 * 
 * Logic:
 * - Instantaneous: 1d6/level acid damage (Max 15d6).
 * - Aftermath: Lingering "Corrosive Air" for 1d3 rounds.
 * - Hazard: 1d6 damage/round + penalty to Concentration.
 */

const { ACID } = require('../../lib/combat/damage-types');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'acid_storm',
  name: 'Acid Storm',
  level: 6,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [ACID],
  source: 'WotC | Spell Compendium p.7',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Druid: 7
   * - Wu Jen: 6 (Water)
   * - Caustic Domain: 6
   * - Water Domain: 7
   * - Ooze Domain: 6
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'flask_of_acid', 
      quantity: 1, 
      consumed: true, 
      notes: 'A glass flask of caustic alchemical acid.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'medium',
  target: 'area', 
  area: 'cylinder', // 20-ft. radius, 20 ft. high
  duration: 'instantaneous (plus 1d3 rounds of lingering vapor)',
  savingThrow: 'reflex half',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const damageRoll = state.Dice.roll(`${Math.min(cl, 15)}d6`);

    caster.room.emit("<bold><white>The air turns sour and heavy. Sickly green lightning cracks across the ceiling!</white></bold>");
    caster.room.emitExcept(caster, `<bold><green>A torrential downpour of steaming, emerald acid slams into the area around ${caster.name}!</green></bold>`);
    caster.say("<green>You call down a vertical deluge of liquid dissolution.</green>");

    for (const unit of caster.room.characters) {
      if (unit === caster) continue;
      if (this.spellResistance && !state.SpellcastingManager.checkSR(caster, unit)) continue;

      let finalDamage = ctx.savePassed ? Math.floor(damageRoll / 2) : damageRoll;

      state.Damage.apply({ 
        amount: finalDamage, 
        type: ACID, 
        attacker: caster, 
        target: unit, 
        source: this.name 
      });

      if (ctx.savePassed) {
        unit.say("<yellow>You shield your face as the caustic rain burns your skin!</yellow>");
        caster.room.emitExcept([caster, unit], `<green>${unit.name} hunkers down, but the acid still hisses against their gear.</green>`);
      } else {
        unit.say("<red>The acid storm drenches you! Your flesh blisters and smokes under the emerald deluge!</red>");
        caster.room.emitExcept([caster, unit], `<red>${unit.name} is caught in the open, the acid melting into their armor and skin.</red>`);
      }
    }

    for (const item of caster.room.items) {
      if (item.applyDamage) {
        item.applyDamage(Math.floor(damageRoll / 2), ACID);
        caster.room.emit(`<green>${item.name} hisses and pits as the acid eats into its surface.</green>`);
      }
    }

    const aftermathDuration = state.Dice.roll('1d3');
    state.AreaEffectManager?.create({
      id: 'corrosive_aftermath',
      caster,
      room: caster.room,
      duration: aftermathDuration * 6000,
      
      onEffectStart: (state, room) => {
        room.emit("<yellow>The rain stops, but a thick, caustic mist remains, burning your lungs.</yellow>");
      },

      tick: (state, room) => {
        for (const entity of room.characters) {
          if (entity === caster) continue;
          const vaporDamage = state.Dice.roll('1d6');
          state.Damage.apply({ amount: vaporDamage, type: ACID, attacker: caster, target: entity, source: "Corrosive Air" });
          
          const chokeEffect = state.EffectFactory.create('acid_choke', {
            duration: 6500,
            modifiers: { attributes: { concentration: -4 } }
          });
          entity.addEffect(chokeEffect);
          entity.say("<red>The ionized air burns your throat and stings your eyes!</red>");
        }
      }
    });
  },

  onEnd(state, caster, room) {
    room.emit("<cyan>The green vapors finally settle, leaving the air clear but the room scarred.</cyan>");
  }
};
