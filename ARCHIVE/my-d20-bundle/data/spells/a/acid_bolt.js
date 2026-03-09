/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acid Bolt
 * Source: Tome of Alchemy | 3.5 Conversion
 * 
 * Logic:
 * - Ranged Touch Attack: (1d20 + Dex + BAB) vs Target Touch AC.
 * - Damage: 1d6 per level (Max 10d6) Acid damage.
 * - Secondary: On a successful hit, target is 'Drenched' in acid (liquid effect).
 */

const { Broadcast } = require('ranvier');
const Defense = require('../../lib/combat/defense');
const D20Utils = require('../../lib/d20/d20Utils');
const { ACID } = require('../../lib/combat/damage-types');

module.exports = {
  id: 'acid_bolt',
  name: 'Acid Bolt',
  level: 3,
  school: 'evocation',
  subschool: null,
  descriptors: [ACID],
  source: 'Tome of Alchemy',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Arcane Artificer: 3
   * - Destruction Domain: 3
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'acid_vial', 
      quantity: 1, 
      consumed: true, 
      notes: 'A small, pressurized glass vial of concentrated acid.' 
    }
  ],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'one creature',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!target) {
        return Broadcast.sayAt(caster, "At whom do you aim your bolt?");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const dexMod = D20Utils.getModifier(caster.getAttribute('dexterity') || 10);
    const bab = caster.getAttribute('bab') || 0;
    const roll = state.Dice.roll('1d20');
    const attackTotal = roll + dexMod + bab;
    const touchAC = Defense.getAC(target, { isTouch: true });

    // Narrative: Casting
    Broadcast.sayAt(caster, `<bold><green>You thrust your hand forward, and a pressurized bolt of emerald acid shrieks through the air toward ${target.name}!</green></bold>`);
    Broadcast.sayAt(target, `<bold><green>${caster.name} hurls a high-velocity bolt of glowing acid directly at your chest!</green></bold>`);
    Broadcast.sayAtExcept(caster.room, `<green>A spear of hissing green acid streaks from ${caster.name}'s fingertips toward ${target.name}.</green>`, [caster, target]);

    if (attackTotal >= touchAC || roll === 20) {
      const damageDice = Math.min(cl, 10);
      const damageRoll = state.Dice.roll(`${damageDice}d6`);

      // Hit Emotes
      Broadcast.sayAt(target, `<bold><red>The bolt slams into you with a wet thud, shattering and drenching you in caustic fluid!</red></bold>`);
      Broadcast.sayAtExcept(caster.room, `<green>The bolt shatters against ${target.name}, coating them in a spray of smoking, green liquid.</green>`, [caster, target]);

      state.Damage.apply({
        amount: damageRoll,
        type: ACID,
        attacker: caster,
        target: target,
        source: this.name
      });

      // Apply the "Acidic" liquid effect (leveraging your ./effects/liquids/ directory)
      const liquidAcid = state.EffectFactory.create('acidic', {
        duration: 12000, // 2 rounds of lingering burn
        state: { 
          damagePerTick: '1d6', 
          attacker: caster 
        }
      });
      target.addEffect(liquidAcid);

    } else {
      // Miss Emotes
      Broadcast.sayAt(caster, `<yellow>Your bolt streaks wide, hissing as it dissolves a patch of the floor near ${target.name}.</yellow>`);
      Broadcast.sayAtExcept(caster.room, `<grey>The bolt of acid misses ${target.name} and splashes harmlessly in the distance.</grey>`, [caster, target]);
    }
  }
};
