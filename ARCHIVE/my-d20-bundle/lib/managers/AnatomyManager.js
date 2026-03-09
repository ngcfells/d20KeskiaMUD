'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { Logger } = require('ranvier');

class RaceManager {
  constructor() {
    this.races = new Map();
    this.dataPatch = path.join(__dirname, '..', 'data', 'races');
  }

  /**
   * Load all .yml files from bundles/my-d20-bundle/data/races/
   */
  load() {
    if (!fs.existsSync(this.dataPatch)) {
      Logger.error(`Race directory not found: ${this.dataPatch}`);
      return;
    }

    const files = fs.readdirSync(this.dataPatch);
    for (const file of files) {
      if (file.endsWith('.yml')) {
        const race = yaml.load(fs.readFileSync(path.join(this.dataPatch, file), 'utf8'));
        this.races.set(race.id, race);
      }
    }
    Logger.info(`Loaded ${this.races.size} races.`);
  }

  get(id) {
    return this.races.get(id);
  }

  /**
   * Returns all races that are "Base" races (no parent or marked isBase)
   */
  getBaseRaces() {
    return Array.from(this.races.values()).filter(r => !r.parent || r.isBase);
  }

  /**
   * Returns sub-races for a specific parent
   */
  getSubRaces(parentId) {
    return Array.from(this.races.values()).filter(r => r.parent === parentId);
  }
}

module.exports = new RaceManager();
