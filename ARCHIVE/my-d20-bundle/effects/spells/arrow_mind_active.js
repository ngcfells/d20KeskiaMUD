'use strict';

/**
 * Arrow Mind Active Effect
 * -----------------------
 * 1. Negates Attacks of Opportunity provoked by using a ranged weapon in melee.
 * 2. Allows the character to threaten 5ft squares with a bow.
 */
module.exports = {
  config: {
    name: "Arrow Mind",
    description: "You threaten nearby squares with your bow and do not provoke AoO for firing in melee.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {},
  listeners: {
    effectActivated() {
      const player = this.target;
      player.setMeta('threatensWithRanged', true);
      player.setMeta('noProvokeRanged', true);
    },

    effectDeactivated() {
      const player = this.target;
      player.removeMeta('threatensWithRanged');
      player.removeMeta('noProvokeRanged');
      player.say("<yellow>The predatory clarity leaves you. Your bow once again feels unwieldy in the press of close combat.</yellow>");
    },

    /**
     * Hook: Intercept the combat engine's AoO provocation check.
     */
    onCheckProvocation: state => function (actionData) {
      if (actionData.type === 'ranged_attack') {
        const spellDef = state.SpellManager.get('arrow_mind');
        if (spellDef.emotes.noProvoke) spellDef.emotes.noProvoke(this.target);
        actionData.provokes = false;
      }
    },

    /**
     * Hook: Triggered when an enemy provokes an AoO within 5ft.
     */
    onEnemyProvoked: state => function (enemy) {
        const spellDef = state.SpellManager.get('arrow_mind');
        if (spellDef.emotes.aooTrigger) spellDef.emotes.aooTrigger(this.target, enemy);
        // Combat engine then proceeds to process a free ranged attack
    }
  }
};
