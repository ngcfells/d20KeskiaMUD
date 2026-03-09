// path: bundles\my-d20-bundle\areas\ossuary\scripts\npcs\gatekeeper_tutorial.js

'use strict';

module.exports = {
  listeners: {
    playerEnter: state => function (player) {
      const npc = this;

      if (!player.getMeta('tutorial_started')) {
        player.say('The Spirit sighs, a sound like dry leaves skittering on stone.');
        player.say('The Spirit: "Seek the <yellow>Guard\'s Recess</yellow> to the west. Arm yourself, or be forgotten."');
        player.setMeta('tutorial_started', true);
      }
    },

    combatStart: state => function (attacker) {
      const npc = this;
      const player = attacker;

      const weapon = player.equipment.get('wield');
      let attackType = "";
      let failMessage = "";

      if (!weapon) {
        const unarmedActions = ['fists', 'feet', 'teeth'];
        attackType = unarmedActions[Math.floor(Math.random() * unarmedActions.length)];
        failMessage = `Your ${attackType} pass uselessly through the Spirit's cold mist.`;
      } else {
        attackType = weapon.name;
        failMessage = `The ${attackType} swings through empty air as the Spirit flickers like a dying candle.`;
      }

      player.say(`<red>${failMessage}</red>`);

      if (!weapon) {
        player.say('The Spirit: "You would strike a shadow with flesh? How... quaint. You need a weapon, mortal."');
      } else {
        player.say(`The Spirit: "A ${attackType} is but a toy against the incorporeal. Find your resolve before you find your end."`);
      }
    },

    hit: state => function (damage, target, attacker) {
      const npc = this;

      // Only fire when the Spirit hits the player
      if (attacker !== npc) return;

      target.say('<magenta>A numbing cold spreads through your chest as the Spirit touches you.</magenta>');

      if (target.hasAttribute('resolve')) {
        target.mutateAttribute('resolve', -1);
      }
    }
  }
};
