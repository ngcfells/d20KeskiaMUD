// path: ./bundles/my-d20-bundle/lib/managers/RaceManager.js
'use strict';

class RaceManager {
  constructor() {
    this.races = new Map();

    // Origins that are always visible (e.g., Human)
    this.coreOrigins = ['core', 'common', 'all'];
  }

  // ------------------------------------------------------------
  // BASIC STORAGE
  // ------------------------------------------------------------

  add(race) {
    if (!race || !race.id) {
      throw new Error('Invalid race definition: missing id');
    }
    this.races.set(race.id, race);
  }

  get(id) { return this.races.get(id); }
  has(id) { return this.races.has(id); }
  getAll() { return this.races.values(); }

  getSubRaces(parentId) {
    return Array.from(this.races.values()).filter(r => r.parent === parentId);
  }

  // ------------------------------------------------------------
  // ORIGIN FILTERING (UNCHANGED)
  // ------------------------------------------------------------

  getByOrigin(playerOrigin) {
    return Array.from(this.races.values()).filter(race => {
      if (playerOrigin === 'isekai') return true;

      let effectiveOrigin;

      if (race.parent) {
        const parent = this.get(race.parent);
        effectiveOrigin = parent && parent.metadata ? parent.metadata.origin : 'fantasy';
      } else {
        effectiveOrigin = race.metadata ? race.metadata.origin : 'fantasy';
      }

      return (
        effectiveOrigin === playerOrigin ||
        this.coreOrigins.includes(effectiveOrigin)
      );
    });
  }

  // ------------------------------------------------------------
  // VARIANT SUPPORT
  // ------------------------------------------------------------

  _normalizeVariantTraits(variant) {
    if (!variant || !variant.traits) {
      return { add: [], remove: [] };
    }

    // Simple array → add-only
    if (Array.isArray(variant.traits)) {
      return { add: variant.traits.slice(), remove: [] };
    }

    const add = Array.isArray(variant.traits.add) ? variant.traits.add.slice() : [];
    const remove = Array.isArray(variant.traits.remove) ? variant.traits.remove.slice() : [];

    return { add, remove };
  }

  _getVariantForOrigin(race, origin) {
    if (!race || !race.variants || !origin) return null;
    return race.variants.find(v => v.origin === origin) || null;
  }

  // ------------------------------------------------------------
  // ATTRIBUTE MERGING (3.5e ACCURATE)
  // ------------------------------------------------------------

  _mergeAttributes(baseAttrs = {}, subAttrs = {}) {
    const result = { ...baseAttrs };

    for (const [key, value] of Object.entries(subAttrs)) {
      const baseVal = result[key] || 0;
      result[key] = baseVal + value;
    }

    return result;
  }

  // Attribute source tracking (optional but included)
  _mergeAttributesWithSources(baseAttrs = {}, subAttrs = {}) {
    const result = {};
    const keys = new Set([...Object.keys(baseAttrs), ...Object.keys(subAttrs)]);

    for (const key of keys) {
      const baseVal = baseAttrs[key] || 0;
      const subVal = subAttrs[key] || 0;
      const total = baseVal + subVal;

      result[key] = {
        total,
        sources: {
          base: baseVal,
          subrace: subVal,
        },
      };
    }

    return result;
  }

  // ------------------------------------------------------------
  // TRAIT MERGING (BASE → SUBRACE → VARIANT)
  // ------------------------------------------------------------

  _mergeTraits(baseTraits = [], subTraits = [], variant) {
    let traits = [...(baseTraits || []), ...(subTraits || [])];

    if (variant) {
      const { add, remove } = this._normalizeVariantTraits(variant);

      if (remove.length) {
        traits = traits.filter(t => !remove.includes(t));
      }

      if (add.length) {
        traits.push(...add);
      }
    }

    return traits;
  }

  // ------------------------------------------------------------
  // FULL RACE RESOLUTION
  // ------------------------------------------------------------

  /**
   * Resolve a race into a fully merged view:
   *   base race + subrace + origin variant.
   *
   * @param {string} id       Race or subrace id (e.g., 'frost_dwarf')
   * @param {string} origin   Setting origin (e.g., 'forgotten_realms')
   * @returns {Object|null}   Resolved race view (does not mutate originals)
   */
  getResolvedRace(id, origin = null) {
    const race = this.get(id);
    if (!race) return null;

    // Determine base vs subrace
    let baseRace = race;
    let subRace = null;

    if (race.parent) {
      const parent = this.get(race.parent);
      if (!parent) {
        throw new Error(`Race "${id}" declares parent "${race.parent}" which does not exist.`);
      }
      baseRace = parent;
      subRace = race;
    }

    // Attributes
    const baseAttrs = baseRace.attributes || {};
    const subAttrs = subRace && subRace.attributes ? subRace.attributes : {};

    const mergedAttributesFlat = this._mergeAttributes(baseAttrs, subAttrs);
    const mergedAttributesDetailed = this._mergeAttributesWithSources(baseAttrs, subAttrs);

    // Traits
    const baseTraits = baseRace.traits || [];
    const subTraits = subRace && subRace.traits ? subRace.traits : [];

    const variantSource = subRace || baseRace;
    const variant = this._getVariantForOrigin(variantSource, origin);

    const mergedTraits = this._mergeTraits(baseTraits, subTraits, variant);

    // Build resolved view
    const resolved = {
      id: race.id,
      name: race.name,
      parent: race.parent || null,

      // New schema fields
      family: race.family || baseRace.family || null,
      schema: race.schema || baseRace.schema || 1,

      // Mechanical data
      attributes: mergedAttributesFlat,
      attributesDetailed: mergedAttributesDetailed,
      traits: mergedTraits,

      // Pass-through metadata
      metadata: race.metadata || baseRace.metadata || {},
      variants: race.variants || baseRace.variants || [],
      environments: race.environments || baseRace.environments || [],
      lore: race.lore || baseRace.lore || {},

      // Resolution context
      _resolved: {
        baseId: baseRace.id,
        subraceId: subRace ? subRace.id : null,
        origin: origin || null,
        variantOrigin: variant ? variant.origin : null,
      },
    };

    return resolved;
  }
}

module.exports = RaceManager;
