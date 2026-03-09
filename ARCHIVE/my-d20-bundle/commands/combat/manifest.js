'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  usage: 'manifest',
  command: (state) => (args, player) => {
    const effect = player.effects.get('absorbed_weapon_effect');

    if (!effect) {
      return Broadcast.sayAt(player, "You do not have a weapon absorbed.");
    }

    const { weaponRef, sourceSlot, preservedPoison } = effect.state;

    // 1. MANIFESTATION LOGIC
    weaponRef.unhide();
    weaponRef.moveTo(player);
    
    try {
      player.equip(weaponRef, sourceSlot);
    } catch (e) {
      // Fallback if slot is blocked
      weaponRef.moveTo(player.inventory);
      Broadcast.sayAt(player, `<yellow>Your ${sourceSlot} is occupied; the weapon returns to your bag.</yellow>`);
      effect.remove();
      return;
    }

    // 2. RESTORE POISON
    if (preservedPoison) {
      const restoredPoison = state.EffectFactory.create('poisoned_blade', {
        duration: preservedPoison.remaining,
      }, { poisonId: preservedPoison.id });
      weaponRef.addEffect(restoredPoison);
    }

    // 3. APPLY ENHANCEMENT BONUS (Next Attack)
    const strikeBonus = state.EffectFactory.create('absorbed_strike_bonus', {
      duration: 6000, // 1 round / 6 seconds
    }, {
      modifiers: {
        attackRoll: (stat) => stat + 1,
        damageRoll: (stat) => stat + 1
      }
    });
    player.addEffect(strikeBonus);

    // 4. FEEDBACK
    Broadcast.sayAt(player, `<cyan>With a thought, your ${weaponRef.name} ripples back into your grip!</cyan>`);
    Broadcast.sayAtExcept(player.room, `<cyan>${player.name} manifests a ${weaponRef.name} out of thin air!</cyan>`, [player]);

    effect.remove();
  }
};
