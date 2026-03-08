'use strict';

const fs = require('fs');
const path = require('path');
const TQ = require('../TraitQuery');

class AnatomyResolver {
  constructor(state) {
    this.state = state;

    // Path to anatomy tables
    this.anatomyPath = path.join(__dirname, '..', 'data', 'anatomy');
  }

  /**
   * Load anatomy table for a physiology type.
   * Returns {} if file missing (modular safety).
   */
  loadPhysiologyTable(physiology) {
    const file = path.join(this.anatomyPath, `${physiology}.yml`);
    if (!fs.existsSync(file)) {
      return {};
    }

    return this.state.Yaml.load(file).anatomy || {};
  }

  /**
   * Merge physiology anatomy + subtype anatomy + NPC overrides.
   * NPC overrides always win.
   */
  resolve(entity) {
    const physiology = TQ.getPhysiology(entity) || 'humanoid';
    const subtype = TQ.getSubtype(entity);

    // 1. Load physiology anatomy
    const physTable = this.loadPhysiologyTable(physiology);

    // 2. Load subtype anatomy (if present)
    let subtypeTable = {};
    if (subtype && physTable.subtype && physTable.subtype[subtype]) {
      subtypeTable = physTable.subtype[subtype];
    }

    // 3. NPC-specific overrides
    const npcOverrides = entity.getMeta('anatomy') || {};

    // 4. Merge tables (deep merge)
    const merged = this.mergeAnatomy(physTable, subtypeTable, npcOverrides);

    // 5. Apply size multiplier
    const size = TQ.getSize(entity) || 'medium';
    const multiplier = (physTable.sizeMultiplier && physTable.sizeMultiplier[size]) || 1;

    this.applySizeMultiplier(merged, multiplier);

    // 6. Apply decay/lifecycle modifiers if bundles installed
    this.applyDecayModifiers(entity, merged);
    this.applyLifecycleModifiers(entity, merged);

    return merged;
  }

  /**
   * Deep merge anatomy tables.
   */
  mergeAnatomy(phys, subtype, npc) {
    const out = {
      harvest: [],
      skin: [],
      butcher: []
    };

    const mergeList = (target, source) => {
      if (!source) return;
      if (!Array.isArray(source)) return;
      source.forEach(entry => target.push({ ...entry }));
    };

    mergeList(out.harvest, phys.harvest);
    mergeList(out.harvest, subtype.harvest);
    mergeList(out.harvest, npc.harvest);

    mergeList(out.skin, phys.skin);
    mergeList(out.skin, subtype.skin);
    mergeList(out.skin, npc.skin);

    mergeList(out.butcher, phys.butcher);
    mergeList(out.butcher, subtype.butcher);
    mergeList(out.butcher, npc.butcher);

    return out;
  }

  /**
   * Apply size multiplier to all yields.
   */
  applySizeMultiplier(anatomy, multiplier) {
    const apply = list => {
      list.forEach(entry => {
        entry.base = Math.max(1, Math.round(entry.base * multiplier));
      });
    };

    apply(anatomy.harvest);
    apply(anatomy.skin);
    apply(anatomy.butcher);
  }

  /**
   * Apply decay modifiers if decay bundle is installed.
   */
  applyDecayModifiers(entity, anatomy) {
    if (!entity.hasBehavior('decay')) return;

    const decayState = entity.getMeta('decayState') || 'fresh';

    const decayMultipliers = {
      fresh: 1,
      decayed: 0.5,
      rotted: 0.2,
      composted: 0.1
    };

    const mult = decayMultipliers[decayState] || 1;

    const apply = list => {
      list.forEach(entry => {
        entry.base = Math.max(0, Math.round(entry.base * mult));
      });
    };

    apply(anatomy.harvest);
    apply(anatomy.skin);
    apply(anatomy.butcher);
  }

  /**
   * Apply lifecycle modifiers if lifecycle bundle is installed.
   */
  applyLifecycleModifiers(entity, anatomy) {
    if (!entity.room) return;
    if (!entity.room.getMeta) return;

    const mods = entity.room.getMeta('lifecycle') || {};

    const hungerMod = mods.hungerModifier || 0;
    const regenMod = mods.regenModifier || 0;

    // Example: cold rooms preserve yields, hot rooms spoil yields
    const environmentalMultiplier = 1 + regenMod - hungerMod;

    const apply = list => {
      list.forEach(entry => {
        entry.base = Math.max(0, Math.round(entry.base * environmentalMultiplier));
      });
    };

    apply(anatomy.harvest);
    apply(anatomy.skin);
    apply(anatomy.butcher);
  }
}

module.exports = AnatomyResolver;
