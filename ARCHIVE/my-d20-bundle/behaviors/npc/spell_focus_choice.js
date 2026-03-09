// bundles/my-d20-bundle/behaviors/npc/spell_focus_choice.js
'use strict';

const { setFavoredSchool } = require('../../data/rules/spell_school_prefs');

module.exports = {
  listeners: {
    command: state => function (commandName, args) {
      if (commandName !== 'chooseschoolfocus') return;

      const school = args.trim().toLowerCase();
      const valid = [
        'abjuration','conjuration','divination','enchantment',
        'evocation','illusion','necromancy','transmutation'
      ];

      if (!valid.includes(school)) {
        return this.say(`Valid schools: ${valid.join(', ')}`);
      }

      setFavoredSchool(this, school);
      this.say(`<cyan>You focus your spellcasting on: ${school}</cyan>`);
    }
  }
};
