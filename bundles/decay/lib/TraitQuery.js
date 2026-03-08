// bundles/decay/lib/TraitQuery.js
'use strict';

module.exports = {
  hasTrait(entity, prefix) {
    const traits = entity.getMeta('traits') || [];
    return traits.some(t => t.startsWith(prefix));
  },

  any(entity, prefixes) {
    const traits = entity.getMeta('traits') || [];
    return prefixes.some(prefix => traits.some(t => t.startsWith(prefix)));
  },

  none(entity, prefixes) {
    const traits = entity.getMeta('traits') || [];
    return prefixes.every(prefix => !traits.some(t => t.startsWith(prefix)));
  }
};
