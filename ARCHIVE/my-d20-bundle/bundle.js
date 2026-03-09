// path: bundles/my-d20-bundle/bundle.js
'use strict';

const attributes = require('./attributes'); // <-- correct location

module.exports = srcPath => {
  return {
    name: 'my-d20-bundle',
    description: 'D20 ruleset for RanvierMUD',
    author: 'Chris Fells',
    version: '1.0.0',

    autoload: {
      areas: true,
      behaviors: true,
      channels: true,
      commands: true,
      effects: true,
      help: true,
      'input-events': true,
      items: true,
      npcs: true,
      quests: true,
      rooms: true,
      skills: true,
      abilities: true,
      attributes: true,
      states: true,
      crafting: true,

      // never autoload
      lib: false,
      classes: false,
      combat: false,
      equipment: false,
      anatomy: false,
      movement: false,
      data: false,
      docs: false,
      scripts: false,
      sourceContent: false
    },

    //
    // EARLY INIT — runs BEFORE hydration
    //
    init: state => {
      console.log(">>> D20 INIT RUNNING <<<");

      // Register D20 attributes
      for (const attr of attributes) {
        console.log("Registering attribute:", attr.name);
        state.AttributeFactory.setDefinition(attr.name, attr);
      }

      //
      // Load index.js properly
      //
      const d20 = require('./index.js')(srcPath);

      if (typeof d20.init === 'function') {
        d20.init(state);
      }

      if (typeof d20.startup === 'function') {
        state.on('startup', () => d20.startup(state));
      }
    },

    //
    // POST-HYDRATION STARTUP
    //
    listeners: {
      startup: state => {
        // reserved
      }
    }
  };
};
