'use strict';

/**
 * Universal dot-notation parser for NPCs, items, and players.
 * Compatible with your current Ranvier distro.
 */
class ArgParser {
  /**
   * Parse "2.rat" or "rat" or "2.sword"
   * @param {string}   search    The search string (e.g. "2.rat")
   * @param {Iterable} list      Array or Map of entities
   * @param {boolean}  returnKey If list is a Map, return [key, entry]
   * @return {*} The matched entry, [key, entry], false, or null
   */
  static parseDot(search, list, returnKey = false) {
    if (!list) {
      return null;
    }

    const parts = search.split('.');
    let findNth = 1;
    let keyword = null;

    if (parts.length > 2) {
      return false;
    }

    if (parts.length === 1) {
      keyword = parts[0];
    } else {
      findNth = parseInt(parts[0], 10);
      keyword = parts[1];
    }

    keyword = keyword.toLowerCase();
    let encountered = 0;

    for (let entity of list) {
      let key, entry;

      // Map support
      if (Array.isArray(entity)) {
        [key, entry] = entity;
      } else {
        entry = entity;
      }

      // Normalize missing fields
      const name = entry.name ? entry.name.toLowerCase() : null;
      const keywords = Array.isArray(entry.keywords)
        ? entry.keywords.map(k => k.toLowerCase())
        : [];

      // Match by keyword (exact or partial)
      if (keywords.length > 0) {
        if (keywords.includes(keyword) || keywords.some(k => k.includes(keyword))) {
          encountered++;
          if (encountered === findNth) {
            return returnKey ? [key, entry] : entry;
          }
          continue;
        }
      }

      // Match by UUID
      if (entry.uuid && entry.uuid === keyword) {
        encountered++;
        if (encountered === findNth) {
          return returnKey ? [key, entry] : entry;
        }
        continue;
      }

      // Match by name (partial)
      if (name && name.includes(keyword)) {
        encountered++;
        if (encountered === findNth) {
          return returnKey ? [key, entry] : entry;
        }
      }
    }

    return false;
  }
}

module.exports = ArgParser;
