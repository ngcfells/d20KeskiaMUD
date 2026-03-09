// bundles/my-d20-bundle/behaviors/npc/weapon_focus_choice.js
'use strict';

const { setFavoredWeapon } = require('../../data/rules/weapon_prefs');

module.exports = {
  listeners: {
    command: state => function (commandName, args) {
      if (commandName !== 'chooseweapon') return;

      const weaponId = args.trim();
      if (!weaponId) {
        return this.say('Usage: chooseweapon <weapon_id>');
      }

      // You can validate against your item definitions if you want:
      // const weaponDef = state.ItemFactory.getDefinition(weaponId);
      // if (!weaponDef || weaponDef.type !== 'weapon') { ... }

      setFavoredWeapon(this, weaponId);
      this.say(`<cyan>You focus your training on: ${weaponId}</cyan>`);
    }
  }
};
