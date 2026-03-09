/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/spells/SpellManager.js
 * PURPOSE: Loads and manages spell definitions for the d20 spellcasting engine.
 */

'use strict';

const fs = require('fs');
const path = require('path');

class SpellManager {
  constructor() {
    this.spells = new Map();
  }

  /**
   * Load all spells from bundles/my-d20-bundle/data/spells
   */
  load(rootPath) {
    const spellDir = path.join(rootPath, 'data', 'spells');

    if (!fs.existsSync(spellDir)) return;

    for (const file of fs.readdirSync(spellDir)) {
      if (!file.endsWith('.js')) continue;

      const id = file.replace('.js', '');
      const spell = require(path.join(spellDir, file));

      // Ensure ID consistency
      spell.id = spell.id || id;

      this.add(id, spell);
    }
  }

  add(id, spell) {
    this.spells.set(id, spell);
  }

  get(id) {
    return this.spells.get(id);
  }

  has(id) {
    return this.spells.has(id);
  }

  list() {
    return Array.from(this.spells.keys());
  }
}

module.exports = SpellManager;
