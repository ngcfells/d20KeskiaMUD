/**
 * PATH: bundles/my-d20-bundle/lib/resolvers/SpellResolver.js
 * PURPOSE: Grants spells and spell slots from class spellcasting, plus racial spell-likes and feat-based spells.
 */

'use strict';

const { Broadcast } = require('ranvier');
const D20Utils = require('../d20/d20Utils');
const Defense = require('../combat/defense');

/**
 * SpellResolver
 * -------------
 * The central authority for spell management in the d20 bundle.
 */
class SpellResolver {

  // ─────────────────────────────────────────────────────────────
  //  ENTITLEMENT & DISCOVERY
  // ─────────────────────────────────────────────────────────────

  static apply(state, player) {
    const spells = new Set();
    const spellSlots = {};
    let castingAbility = null;

    const classId = player.getMeta('class');
    if (classId && state.ClassManager.has(classId)) {
      const klass = state.ClassManager.get(classId);
      const sc = klass.spellcasting;

      if (sc) {
        castingAbility = sc.ability || null;
        const level = player.level;
        if (sc.spellSlots && sc.spellSlots[level]) {
          spellSlots[level] = sc.spellSlots[level];
        }

        if (sc.spellList) {
          const maxSpellLevel = this._maxSpellLevelForPlayer(sc, level);
          for (const [spellLevel, spellIds] of Object.entries(sc.spellList)) {
            if (Number(spellLevel) <= maxSpellLevel) {
              for (const id of spellIds) {
                spells.add(id);
              }
            }
          }
        }
      }
    }

    const raceId = player.getMeta('race');
    if (raceId && state.RaceManager.has(raceId)) {
      const race = state.RaceManager.get(raceId);
      const racialSpells = race.metadata?.spells || [];
      racialSpells.forEach(id => spells.add(id));
    }

    const traitIds = player.getMeta('traits') || [];
    for (const traitId of traitIds) {
      const trait = state.TraitManager.get(traitId);
      if (trait?.effects?.spells) {
        trait.effects.spells.forEach(id => spells.add(id));
      }
    }

    const feats = player.getMeta('feats') || [];
    for (const featId of feats) {
      const feat = state.FeatManager.get(featId);
      if (feat?.effects?.spells) {
        feat.effects.spells.forEach(id => spells.add(id));
      }
    }

    player.setMeta('spells', Array.from(spells));
    player.setMeta('spellSlots', spellSlots);
    if (castingAbility) {
      player.setMeta('spellcastingAbility', castingAbility);
    }
  }

  static _maxSpellLevelForPlayer(spellcasting, level) {
    const slots = spellcasting.spellSlots[level];
    if (!slots) return 0;
    return Math.max(...Object.keys(slots).map(n => Number(n)));
  }

  // ─────────────────────────────────────────────────────────────
  //  EXECUTION & RESOLUTION
  // ─────────────────────────────────────────────────────────────

  static resolve(state, spell, caster, target, options = {}) {
    if (!options.noCost && spell.materialComponents && spell.materialComponents.length > 0) {
      if (!this.consumeMaterials(state, caster, spell)) {
        return false;
      }
    }

    const castingAbility = caster.getMeta('spellcastingAbility') || 'intelligence';
    const abilityMod = D20Utils.getModifier(caster.getAttribute(castingAbility) || 10);
    const dc = 10 + spell.level + abilityMod + (options.dcBonus || 0);

    if (spell.range === 'touch' && target && !options.isBeneficial) {
      const hit = this.resolveTouchAttack(caster, target);
      if (!hit) {
        Broadcast.sayAt(caster, `<yellow>Your touch misses ${target.name}!</yellow>`);
        return false;
      }
    }

    if (spell.savingThrow !== 'none' && target) {
      const saveResult = this.resolveSave(target, spell.savingThrow, dc);
      
      if (saveResult.success) {
        Broadcast.sayAt(caster, `<yellow>${target.name} resists the effects of ${spell.name}!</yellow>`);
        if (spell.savingThrow.toLowerCase().includes('negates')) {
          return false;
        }
        options.saved = true;
      }
    }

    spell.onCast(state, caster, target, options);
    return true;
  }

  /**
   * RECURSIVE MATERIAL CONSUMPTION
   * Searches player inventory and all nested containers (pouches, packs).
   */
  static consumeMaterials(state, caster, spell) {
    for (const req of spell.materialComponents) {
      // Flatten all items in inventory and sub-containers
      const allHeldItems = this.getAllItemsRecursive(caster.inventory);
      
      const candidates = allHeldItems.filter(item => item.id === req.id);
      
      const validItems = candidates
        .filter(item => !req.minValue || (item.getMeta('cost') || 0) >= req.minValue)
        .sort((a, b) => (a.getMeta('cost') || 0) - (b.getMeta('cost') || 0));

      if (validItems.length < req.quantity) {
        Broadcast.sayAt(caster, `<red>You lack the required materials (${req.id}) for ${spell.name}.</red>`);
        return false;
      }

      if (req.consumed) {
        for (let i = 0; i < req.quantity; i++) {
          const itemToConsume = validItems[i];
          
          // Determine if item is in a container or player root inventory
          const ownerInventory = itemToConsume.inventory || caster.inventory;
          
          Broadcast.sayAt(caster, `<yellow>You reach into your gear and use ${itemToConsume.name}.</yellow>`);
          state.ItemManager.remove(itemToConsume);
        }
      }
    }
    return true;
  }

  /**
   * Helper: Recursively gathers all items from an inventory and its containers.
   */
  static getAllItemsRecursive(inventory) {
    let results = [];
    for (const [uuid, item] of inventory.items) {
      results.push(item);
      if (item.inventory) {
        results = results.concat(this.getAllItemsRecursive(item.inventory));
      }
    }
    return results;
  }

  static resolveTouchAttack(caster, target) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const bab = caster.getMeta('bab') || 0;
    const strMod = D20Utils.getModifier(caster.getAttribute('strength') || 10);
    const attackTotal = roll + bab + strMod;
    const targetAC = Defense.getAC(target, { isTouch: true });

    if (roll === 1) return false;
    if (roll === 20) return true;
    return attackTotal >= targetAC;
  }

  static resolveSave(target, type, dc) {
    const saveMap = { fort: 'fortitude', ref: 'reflex', will: 'will' };
    const shortType = type.toLowerCase().substring(0, 4).trim();
    const attr = saveMap[shortType] || 'will';
    const saveBonus = target.getAttribute(attr) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    
    if (roll === 1) return { success: false, roll };
    if (roll === 20) return { success: true, roll };

    return {
      success: (roll + saveBonus) >= dc,
      total: roll + saveBonus
    };
  }

  static reapply(state, character) {
    this.apply(state, character);
  }
}

module.exports = SpellResolver;
