'use strict';

module.exports = srcPath => {
  return {
    listeners: {
      startup: state => function () {
        const linguistics = require('../data/skills/standalone/linguistics');
        state.SkillManager.add('linguistics', linguistics);
      }
    }
  };
};
