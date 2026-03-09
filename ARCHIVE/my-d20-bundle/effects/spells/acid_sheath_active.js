'use strict';

const { Broadcast } = require('ranvier');
const DamageTypes = require('../../../lib/combat/damage-types');

/**
 * Effect: Acid Sheath Active
 * Logic:
 * - Reactive: Deals 2/CL acid damage to non-reach melee attackers.
 * - Offensive: Grants +1 damage per die to [Acid] spells.
 * - Grapple: Deals damage to grapple participants every tick.
 */
module.exports = {
  config: {
    name: 'Acid Sheath',
    description: 'A shimmering film of acid covers your body and gear.',
    type: 'spell.conjuration',
    unique: true,
    persists: false,
  },
  state: {
    damage: 0
  },
  listeners: {
    effectActivated: function () {
      this.target.addTag('has_acid_sheath');
    },
    effectDeactivated: function () {
      this.target.removeTag('has_acid_sheath');
    },

    /**
     * REACTIVE TRIGGER: Fires when the target is struck.
     */
    onBeingHit: function (state) {
      return (attacker, weapon, damage) => {
        const target = this.target;
        
        // Reach weapons (spears/whips) and Ranged weapons bypass the sheath
        if (weapon && (weapon.hasTag('reach') || weapon.hasTag('ranged'))) {
          return;
        }

        Broadcast.sayAt(attacker, `<bold><green>Your attack hits, but ${target.name}'s acidic sheath splashes over you!</green></bold>`);
        Broadcast.sayAt(target, `<green>Your sheath sears ${attacker.name} as their weapon connects!</green>`);

        attacker.receiveDamage({
          metadata: {
            amount: this.state.damage,
            type: DamageTypes.ACID,
            source: "Acid Sheath (Reactive)",
            attacker: target
          }
        }, target);
      };
    },

    /**
     * OFFENSIVE SYNERGY: Hooks into SpellResolver for acid spells.
     */
    onBeforeSpellCast: function (state) {
      return (subject, castCtx) => {
        if (castCtx.spell.descriptors && castCtx.spell.descriptors.includes('acid')) {
          castCtx.damagePerDieBonus = (castCtx.damagePerDieBonus || 0) + 1;
          Broadcast.sayAt(subject, "<green>The acid coating your form empowers your spell!</green>");
        }
      };
    },

    /**
     * GRAPPLE LOGIC: Fires every tick (standard 2s in Ranvier or 6s d20 round).
     */
    updateTick: function (state) {
      const target = this.target;
      if (target.hasTag('is_grappled')) {
        // Find everyone grappling this target in the room
        const roomTargets = [...target.room.characters];
        for (const opponent of roomTargets) {
          if (opponent === target) continue;
          if (opponent.getMeta('grapplingTarget') === target.uuid) {
            Broadcast.sayAt(opponent, "<red>The acid coating your prey burns your flesh as you struggle!</red>");
            
            opponent.receiveDamage({
              metadata: {
                amount: this.state.damage,
                type: DamageTypes.ACID,
                source: "Acid Sheath (Grapple)",
                attacker: target
              }
            }, target);
          }
        }
      }
    }
  }
};
