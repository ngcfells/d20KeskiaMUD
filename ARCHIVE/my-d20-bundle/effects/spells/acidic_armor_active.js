'use strict';

const { Broadcast } = require('ranvier');
const DamageTypes = require('../../../lib/combat/damage-types');

/**
 * Effect: Acidic Armor Active
 * Source: Tome of Alchemy | Level 1 Abjuration
 * Logic:
 * - Reactive: Deals 1d4 + 1 per CL acid damage to non-reach melee attackers.
 * - Minimalist: Unlike Acid Sheath, it does not empower other spells or 
 *   punish grapplers as severely; it is a passive deterrent.
 */
module.exports = {
  config: {
    name: 'Acidic Armor',
    description: 'A thin, reactive film of acid coats your protective gear.',
    type: 'spell.abjuration',
    family: 'protection',
    tier: 1,
    unique: true,
    persists: false,
  },
  state: {
    casterLevel: 1
  },
  listeners: {
    effectActivated: function () {
      this.target.addTag('has_acidic_armor');
    },
    effectDeactivated: function () {
      this.target.removeTag('has_acidic_armor');
    },

    /**
     * REACTIVE TRIGGER: Fires when the target is struck.
     * Aligned with Sheath logic for reach/ranged bypass.
     */
    onBeingHit: function (state) {
      return (attacker, weapon, damage) => {
        const target = this.target;
        
        // Reach and Ranged weapons bypass the reactive splash
        if (weapon && (weapon.hasTag('reach') || weapon.hasTag('ranged'))) {
          return;
        }

        const reactiveDamage = state.Dice.roll('1d4') + this.state.casterLevel;

        Broadcast.sayAt(attacker, `<bold><green>Your strike connects, but a spray of acid from ${target.name}'s armor sears your hands!</green></bold>`);
        Broadcast.sayAt(target, `<green>Your acidic armor splashes ${attacker.name} in response to their strike!</green>`);

        attacker.receiveDamage({
          metadata: {
            amount: reactiveDamage,
            type: DamageTypes.ACID,
            source: "Acidic Armor (Reactive)",
            attacker: target
          }
        }, target);
        
        // Visual cue for the room
        Broadcast.sayAtExcept(target.room, `<green>Acid flares and hisses as ${attacker.name} strikes ${target.name}.</green>`, [attacker, target]);
      };
    }
  }
};
