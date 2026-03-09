// bundles/my-d20-bundle/data/classes/base/cleric.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const clericSpellList = require('../../spelllists/cleric');
  const clericDomainList = require('../../spelllists/cleric_domains');

  return {
    id: 'cleric',
    name: 'Cleric',
    description: 'A divine spellcaster who channels the power of a deity.',
    hitDie: 8,
    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'heal',
      'knowledge_arcana',
      'knowledge_history',
      'knowledge_religion',
      'knowledge_planes',
      'profession',
      'spellcraft'
    ],
    abilities: {
      1: ['turn_undead', 'cleric_domains'],
      3: ['divine_health'],
      5: ['remove_disease'],
      8: ['divine_resistance'],
      11: ['divine_intervention_minor'],
      15: ['divine_intervention_major']
    },
    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
      spellSlots: {
        1:  { 0: 3, 1: 1 },
        2:  { 0: 4, 1: 2 },
        3:  { 0: 4, 1: 2, 2: 1 },
        4:  { 0: 4, 1: 3, 2: 2 },
        5:  { 0: 4, 1: 3, 2: 2, 3: 1 },
        6:  { 0: 4, 1: 3, 2: 3, 3: 2 },
        7:  { 0: 4, 1: 4, 2: 3, 3: 2, 4: 1 },
        8:  { 0: 4, 1: 4, 2: 3, 3: 3, 4: 2 },
        9:  { 0: 4, 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 },
        10: { 0: 4, 1: 4, 2: 4, 3: 3, 4: 3, 5: 2 },
        11: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 3, 5: 2, 6: 1 },
        12: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 3, 5: 3, 6: 2 },
        13: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 2, 7: 1 },
        14: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 3, 7: 2 },
        15: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 2, 8: 1 },
        16: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 3, 8: 2 },
        17: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 2, 9: 1 },
        18: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 3, 9: 2 },
        19: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 3, 9: 3 },
        20: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }
      },
      spellList: clericSpellList,
      domainList: clericDomainList
    },
    setup: player => {
      Broadcast.sayAt(player, 'You walk the path of the Cleric.');
      
      // Initialize core class metadata
      player.setMeta('class', 'cleric');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Prepare basic spellcasting metadata
      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }

      // Initialize class skills from the base list
      // Note: We use a Set to ensure unique skill IDs as we add domain skills
      let classSkills = new Set([
        'concentration', 'craft', 'diplomacy', 'heal', 
        'knowledge_arcana', 'knowledge_history', 'knowledge_religion', 
        'knowledge_planes', 'profession', 'spellcraft'
      ]);

      // Domain-specific granted power initialization
      const domains = player.getMeta('domains') || [];
      const domainList = require('../../spelllists/cleric_domains');
      
      const domainSkillBonuses = {};
      const slas = player.getMeta('resources.slas') || {};
      const profs = new Set(player.getMeta('proficiencies') || []);

      domains.forEach(domainId => {
        const domain = domainList[domainId];
        if (!domain || !domain.grantedPowers) return;

        const gp = domain.grantedPowers;

        // 1. Grant Class Skills (e.g., Knowledge Nature for Animal)
        if (gp.classSkills && Array.isArray(gp.classSkills)) {
          gp.classSkills.forEach(skill => classSkills.add(skill));
        }
      
        // 2. Grant Permanent Attribute/Skill Bonuses (e.g., +2 Diplomacy for Community)
        if (gp.skillBonuses) {
          for (const [skill, bonus] of Object.entries(gp.skillBonuses)) {
            domainSkillBonuses[skill] = (domainSkillBonuses[skill] || 0) + bonus;
          }
        }

        // 3. Setup Spell-Like Abilities (SLAs)
        // Checks both 'slas' and 'spellLikeAbilities' keys for compatibility
        const slaEntries = gp.slas || gp.spellLikeAbilities || [];
        slaEntries.forEach(sla => {
          if (!slas[sla.id]) {
            slas[sla.id] = { used: 0, max: sla.uses || 1 };
          }
        });

        // 4. Handle Proficiencies (e.g., Heavy Armor for Ancestry)
        if (gp.bonusProficiencies) {
          gp.bonusProficiencies.forEach(p => profs.add(p));
        }
      });

      // Finalize the meta updates
      player.setMeta('classSkills', Array.from(classSkills));
      player.setMeta('domainSkillBonuses', domainSkillBonuses);
      player.setMeta('resources.slas', slas);
      player.setMeta('proficiencies', Array.from(profs));
    }
  };
};
