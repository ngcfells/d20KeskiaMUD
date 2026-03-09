// bundles/my-d20-bundle/data/classes/base/prestige/blackguard.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const blackguardSpellList = require('../../../spelllists/antipaladin');

  return {
    id: 'blackguard',
    name: 'Blackguard',
    description: 'The quintessential black knight, a villain who epitomizes evil and consorts with fiends.',
    hitDie: 10,
    isPrestige: true,

    // 3.5e Prerequisites
    requirements: {
      alignment: 'Any Evil',
      baseAttackBonus: 6,
      skills: { hide: 5, knowledge_religion: 2 },
      feats: ['cleave', 'improved_sunder', 'power_attack'],
      special: 'Must have made peaceful contact with an evil outsider.'
    },

    classSkills: [
      'concentration', 'craft', 'diplomacy', 'handle_animal', 'heal', 
      'hide', 'intimidate', 'knowledge_religion', 'profession', 'ride'
    ],

    abilities: {
      1: ['detect_good', 'poison_use', 'aura_of_evil'],
      2: ['dark_blessing', 'smite_good_1'],
      3: ['aura_of_despair', 'command_undead'],
      4: ['sneak_attack_1d6'],
      5: ['fiendish_servant'],
      7: ['sneak_attack_2d6'],
      10: ['sneak_attack_3d6', 'smite_good_2']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
      // Blackguard spells per day (Wisdom bonus adds to these)
      spellSlots: {
        1:  { 1: 0 }, // 0 means only bonus spells from high Wisdom
        2:  { 1: 1 },
        3:  { 1: 1, 2: 0 },
        4:  { 1: 1, 2: 1 },
        5:  { 1: 1, 2: 1, 3: 0 },
        6:  { 1: 1, 2: 1, 3: 1 },
        7:  { 1: 2, 2: 1, 3: 1, 4: 0 },
        8:  { 1: 2, 2: 2, 3: 1, 4: 1 },
        9:  { 1: 2, 2: 2, 3: 2, 4: 1 },
        10: { 1: 2, 2: 2, 3: 2, 4: 2 }
      },
      spellList: blackguardSpellList
    },

    setup: (player, wasPaladin = false, paladinLevels = 0) => {
      Broadcast.sayAt(player, 'You have turned your back on the light to become a Blackguard.');
      player.setMeta('class', 'blackguard');

      // 3.5e Fallen Paladin Trade-in Logic
      if (wasPaladin && paladinLevels > 0) {
        let bonuses = [];
        if (paladinLevels >= 1) bonuses.push('smite_good_extra');
        if (paladinLevels >= 3) bonuses.push('lay_on_hands_blackguard');
        if (paladinLevels >= 5) bonuses.push('sneak_attack_extra_1d6', 'smite_good_extra_2');
        if (paladinLevels >= 7) bonuses.push('fiendish_summoning');
        if (paladinLevels >= 9) bonuses.push('undead_companion', 'smite_good_extra_3');
        
        player.setMeta('blackguard_fallen_bonuses', bonuses);
        Broadcast.sayAt(player, 'Your fallen past grants you additional dark favor.');
      }
    }
  };
};
