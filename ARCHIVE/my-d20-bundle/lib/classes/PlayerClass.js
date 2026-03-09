// path: ../bundles/my-d20-bundle/lib/classes/PlayerClass.js
'use strict';

const fs = require('fs');
const path = require('path');

const classesDir = `${__dirname}/../../data/classes/`;
let classes = null;

class PlayerClass {
  static getClasses() {
    if (classes) return classes;

    classes = {};
    const readDir = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          readDir(fullPath);
        } else if (file.match(/\.js$/)) {
          const id = path.basename(file, '.js');
          const configFn = require(fullPath);
          // Standard Ranvier pattern passing srcPath
          const config = (typeof configFn === 'function') 
            ? configFn(path.join(__dirname, '../../../../src/')) 
            : configFn;

          classes[id] = new this(id, config);
        }
      }
    };
    readDir(classesDir);
    return classes;
  }

  static getClassesByOrigin(origin) {
    const all = this.getClasses();
    return Object.fromEntries(
      Object.entries(all).filter(([id, cls]) => {
        // Classes like Charismatic Hero have 'origin' at the top level of the export
        const classOrigin = cls.config.origin || 'fantasy';
        return classOrigin === origin;
      })
    );
  }

  static get(id) { return this.getClasses()[id]; }

  constructor(id, config) {
    this.id = id;
    this.config = config;
  }

  setupPlayer(state, player) {
    // Priority to the Modern 'setup' method, fallback to Legacy 'setupPlayer'
    if (typeof this.config.setup === 'function') {
      this.config.setup(player);
    } else if (typeof this.config.setupPlayer === 'function') {
      this.config.setupPlayer(state, player);
    }
  }

  get abilityTable() { return this.config.abilities || this.config.abilityTable || {}; }

  get abilityList() {
    return Object.values(this.abilityTable).flat().reduce((acc, entry) => {
      if (Array.isArray(entry)) return acc.concat(entry);
      if (typeof entry === 'object') return acc.concat(entry.skills || []).concat(entry.spells || []);
      return acc.concat(entry);
    }, []);
  }

  getAbilitiesForPlayer(player) {
    let totalAbilities = [];
    Object.entries(this.abilityTable).forEach(([level, entry]) => {
      if (parseInt(level, 10) > player.level) return;
      if (Array.isArray(entry)) totalAbilities = totalAbilities.concat(entry);
      else if (typeof entry === 'object') totalAbilities = totalAbilities.concat(entry.skills || []).concat(entry.spells || []);
    });
    return totalAbilities;
  }
}

module.exports = PlayerClass;
