/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/polymorph-forms.js
 * PURPOSE: Minimal polymorph form database for Beast Shape / Polymorph stack.
 */

'use strict';

module.exports = {
  animals: {
    wolf: {
      size: 'medium',
      bonuses: {
        naturalArmor: 2,
        abilityMods: { str: +2, dex: +2 }
      }
    },
    eagle: {
      size: 'small',
      bonuses: {
        naturalArmor: 1,
        abilityMods: { dex: +4 }
      }
    },
    bear: {
      size: 'large',
      bonuses: {
        naturalArmor: 4,
        abilityMods: { str: +6, con: +4 }
      }
    },
    cat: {
      size: 'tiny',
      bonuses: {
        naturalArmor: 1,
        abilityMods: { dex: +4 }
      }
    }
  },

  magicalBeasts: {
    griffon: {
      size: 'large',
      bonuses: {
        naturalArmor: 6,
        abilityMods: { str: +6, dex: +4, con: +4 }
      }
    },
    displacer_beast: {
      size: 'large',
      bonuses: {
        naturalArmor: 5,
        abilityMods: { dex: +4, con: +4 }
      }
    }
  },

  vermin: {
    spider: {
      size: 'small',
      bonuses: {
        naturalArmor: 1,
        abilityMods: { dex: +4 }
      }
    }
  },

  elementals: {
    small_fire_elemental: {
      size: 'small',
      bonuses: {
        naturalArmor: 2,
        abilityMods: { dex: +4 }
      }
    },
    medium_air_elemental: {
      size: 'medium',
      bonuses: {
        naturalArmor: 3,
        abilityMods: { dex: +4 }
      }
    }
  },

  dragons: {
    young_red_dragon: {
      size: 'large',
      bonuses: {
        naturalArmor: 8,
        abilityMods: { str: +8, con: +6 }
      }
    }
  }
};
