'use strict';

/**
 * LiquidEffects.js
 * Defines effect logic for all mundane liquids.
 * Loaded by LiquidManager at startup.
 */

module.exports = {
  // ---------------------------------------------------------
  // WATER EFFECTS
  // ---------------------------------------------------------
  'fresh-water': {
    hydration: 10,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('hydrated', {
        duration: 600000, // 10 minutes
        state: { hydration: 10 }
      }));
    }
  },

  'mineral-water': {
    hydration: 12,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('hydrated', {
        duration: 720000,
        state: { hydration: 12 }
      }));
    }
  },

  'sparkling-water': {
    hydration: 8,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('hydrated', {
        duration: 480000,
        state: { hydration: 8 }
      }));
    }
  },

  'lemon-water': {
    hydration: 10,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('refreshed', {
        duration: 300000,
        state: { morale: +1 }
      }));
    }
  },

  'berry-water': {
    hydration: 10,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('refreshed', {
        duration: 300000,
        state: { morale: +1 }
      }));
    }
  },

  // ---------------------------------------------------------
  // JUICES
  // ---------------------------------------------------------
  'apple-juice': {
    hydration: 8,
    sugar: 5,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('sugar-rush', {
        duration: 180000,
        state: { energy: +1 }
      }));
      player.addEffect(state.EffectFactory.create('sugar-crash', {
        duration: 180000,
        hidden: true,
        state: { energy: -1 }
      }));
    }
  },

  'orange-juice': {
    hydration: 8,
    sugar: 5,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('vitamin-boost', {
        duration: 300000,
        state: { fortitude: +1 }
      }));
    }
  },

  'grape-juice': {
    hydration: 8,
    sugar: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('sugar-rush', {
        duration: 180000,
        state: { energy: +1 }
      }));
    }
  },

  'tomato-juice': {
    hydration: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('restored', {
        duration: 300000,
        state: { stamina: +1 }
      }));
    }
  },

  'pineapple-juice': {
    hydration: 8,
    sugar: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('tropical-boost', {
        duration: 240000,
        state: { morale: +2 }
      }));
    }
  },

  // ---------------------------------------------------------
  // SODAS
  // ---------------------------------------------------------
  'cola': {
    hydration: 4,
    sugar: 8,
    caffeine: 4,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('caffeinated', {
        duration: 300000,
        state: { initiative: +1 }
      }));
    }
  },

  'root-beer': {
    hydration: 4,
    sugar: 7,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('sugar-rush', {
        duration: 180000,
        state: { energy: +1 }
      }));
    }
  },

  'ginger-ale': {
    hydration: 4,
    sugar: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('soothed-stomach', {
        duration: 300000,
        state: { nausea_resist: +2 }
      }));
    }
  },

  'lemon-lime-soda': {
    hydration: 4,
    sugar: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('refreshed', {
        duration: 240000,
        state: { morale: +1 }
      }));
    }
  },

  // ---------------------------------------------------------
  // MILKS
  // ---------------------------------------------------------
  'milk': {
    hydration: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('nourished', {
        duration: 600000,
        state: { fortitude: +1 }
      }));
    }
  },

  'goat-milk': {
    hydration: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('rich-nourishment', {
        duration: 600000,
        state: { fortitude: +1, stamina: +1 }
      }));
    }
  },

  'almond-milk': {
    hydration: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('smooth-energy', {
        duration: 300000,
        state: { energy: +1 }
      }));
    }
  },

  'soy-milk': {
    hydration: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('balanced-nutrition', {
        duration: 600000,
        state: { fortitude: +1 }
      }));
    }
  },

  // ---------------------------------------------------------
  // TEAS & COFFEES
  // ---------------------------------------------------------
  'black-tea': {
    hydration: 6,
    caffeine: 3,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('focused', {
        duration: 300000,
        state: { perception: +1 }
      }));
    }
  },

  'green-tea': {
    hydration: 6,
    caffeine: 2,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('calm-focus', {
        duration: 300000,
        state: { willpower: +1 }
      }));
    }
  },

  'herbal-tea': {
    hydration: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('soothed', {
        duration: 300000,
        state: { stress_resist: +2 }
      }));
    }
  },

  'coffee': {
    hydration: 4,
    caffeine: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('caffeinated', {
        duration: 600000,
        state: { initiative: +2, energy: +1 }
      }));
    }
  },

  'iced-coffee': {
    hydration: 4,
    caffeine: 5,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('chilled-caffeine', {
        duration: 600000,
        state: { initiative: +1, energy: +1 }
      }));
    }
  },

  // ---------------------------------------------------------
  // ALCOHOLIC DRINKS
  // ---------------------------------------------------------
  'ale': {
    hydration: -2,
    alcohol: 3,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('tipsy', {
        duration: 600000,
        state: { morale: +1, dexterity_penalty: -1 }
      }));
    }
  },

  'beer': {
    hydration: -2,
    alcohol: 3,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('tipsy', {
        duration: 600000,
        state: { morale: +1 }
      }));
    }
  },

  'red-wine': {
    hydration: -2,
    alcohol: 4,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('relaxed', {
        duration: 600000,
        state: { willpower: -1, morale: +2 }
      }));
    }
  },

  'white-wine': {
    hydration: -2,
    alcohol: 4,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('relaxed', {
        duration: 600000,
        state: { willpower: -1, morale: +2 }
      }));
    }
  },

  'whiskey': {
    hydration: -3,
    alcohol: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('drunk', {
        duration: 900000,
        state: { strength: +1, dexterity_penalty: -2, willpower: -2 }
      }));
    }
  },

  'rum': {
    hydration: -3,
    alcohol: 5,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('drunk', {
        duration: 900000,
        state: { morale: +2, dexterity_penalty: -2 }
      }));
    }
  },

  'vodka': {
    hydration: -3,
    alcohol: 6,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('drunk', {
        duration: 900000,
        state: { willpower: -2, dexterity_penalty: -2 }
      }));
    }
  },

  // ---------------------------------------------------------
  // BROTHS / SOUPS
  // ---------------------------------------------------------
  'chicken-broth': {
    hydration: 8,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('warmth', {
        duration: 600000,
        state: { cold_resist: +2 }
      }));
      player.addEffect(state.EffectFactory.create('minor-healing', {
        duration: 1,
        state: { heal: 2 }
      }));
    }
  },

  'vegetable-broth': {
    hydration: 8,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('warmth', {
        duration: 600000,
        state: { cold_resist: +1 }
      }));
    }
  },

  'bone-broth': {
    hydration: 8,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('rich-healing', {
        duration: 1,
        state: { heal: 4 }
      }));
    }
  },

  // ---------------------------------------------------------
  // OILS / SYRUPS
  // ---------------------------------------------------------
  'olive-oil': {
    hydration: -4,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('stomach-upset', {
        duration: 300000,
        state: { dexterity_penalty: -1 }
      }));
    }
  },

  'honey': {
    hydration: 2,
    sugar: 8,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('sweet-energy', {
        duration: 240000,
        state: { energy: +1 }
      }));
    }
  },

  'maple-syrup': {
    hydration: 2,
    sugar: 10,
    onDrink: ({ state, player }) => {
      player.addEffect(state.EffectFactory.create('sugar-rush', {
        duration: 180000,
        state: { energy: +2 }
      }));
      player.addEffect(state.EffectFactory.create('sugar-crash', {
        duration: 180000,
        hidden: true,
        state: { energy: -2 }
      }));
    }
  }
};
