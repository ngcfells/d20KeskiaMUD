// lib/d20/material-components.js
'use strict';

module.exports = {
  consumeMaterials(state, caster, spellDef) {
    if (!spellDef.materialComponents) return true;

    for (const req of spellDef.materialComponents) {
      const needed = req.quantity || 1;
      let remaining = needed;

      for (const item of caster.inventory) {
        if (remaining <= 0) break;

        if (item.metadata?.materialId === req.id &&
            (!req.minValue || (item.metadata.value || 0) >= req.minValue)) {

          if (req.consumed) {
            caster.removeItem(item);
          }

          remaining--;
        }
      }

      if (remaining > 0) {
        caster.say(`<red>You lack the required material component: ${req.id}.</red>`);
        return false;
      }
    }

    return true;
  }
};
