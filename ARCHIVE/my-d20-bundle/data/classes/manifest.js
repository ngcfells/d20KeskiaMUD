// ../my-d20-bundle/data/classes/manifest.js
'use strict';

const AbilityManager = require('./ability-manager');
const loadAbilities = require('./abilities');

const FeatManager = require('./feat-manager');
const loadFeats = require('./feats');

const ClassManager = require('../lib/classes/class-manager'); 
const SkillManager = require('../lib/skills/skill-manager');

module.exports = srcPath => {
  return {
    listeners: {
      startup: state => {
        // 0. Initialize Managers on State
        // This prevents "Cannot read property 'add' of undefined"
        state.ClassManager = new ClassManager();
        state.SkillManager = SkillManager;
        state.SkillManager.load(); // Load all umbrellas and standalones
        //
        // 1. Replace Player prototype
        //
        state.Player = require('./player')(srcPath);

        //
        // 2. Ability system
        //
        state.AbilityManager = new AbilityManager();
        loadAbilities(state, state.AbilityManager, __dirname);

        //
        // 3. Feat system
        //
        state.FeatManager = new FeatManager();
        loadFeats(state, state.FeatManager, __dirname);

        //
        // 4. Register behaviors
        //
        state.BehaviorManager.loadBehavior('wizard-spellcasting', require('./behaviors/wizard-spellcasting'));
        state.BehaviorManager.loadBehavior('wizard-specialization', require('./behaviors/wizard-specialization'));
        state.BehaviorManager.loadBehavior('feat-choice', require('./behaviors/feat-choice'));
        state.BehaviorManager.loadBehavior('stance', require('./behaviors/stance'));
        state.BehaviorManager.loadBehavior('weapon-focus-choice', require('./behaviors/weapon_focus_choice'));

        //
        // 5. Register classes
        //
        // aristocrat
        // barbarian
        // bard
        // cleric
        state.ClassManager.add('fighter', require('./class/fighter')(srcPath));
        state.ClassManager.add('monk', require('./class/monk')(srcPath));
        state.ClassManager.add('paladin', require('./class/paladin')(srcPath));
        // ranger
        state.ClassManager.add('rogue', require('./class/rogue')(srcPath));
        // sorcerer
        state.ClassManager.add('wizard', require('./class/wizard')(srcPath));
        
        //
        // 6. Register Events
        //
        state.EventManager.addListener('player-enter', require('../../lib/classes/player-events')(srcPath));
      }
    }
  };
};
