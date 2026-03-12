'use strict';

module.exports = [
  // --- CORE 7 ATTRIBUTES ---
  { name: 'strength', base: 10 },
  { name: 'dexterity', base: 10 },
  { name: 'constitution', base: 10 },
  { name: 'intelligence', base: 10 },
  { name: 'wisdom', base: 10 },
  { name: 'charisma', base: 10 },
  { name: 'appearance', base: 10 }, // BoEF base

  // --- CORE VITALS ---
  {
    name: 'health',
    base: 0,
    formula: {
      requires: ['constitution'],
      fn: function (character, base) {
        const conMod = Math.floor((character.getAttribute('constitution') - 10) / 2);
        const hitDie = character.getMeta('hitDie') || 8;
        const level = character.getMeta('level') || 1;
        // Standard 3.5e: Max at Lvl 1 + (HD/2 + 1 * levels) + (Con * levels)
        return base + hitDie + conMod + ((level - 1) * (hitDie / 2 + 1 + conMod));
      },
    },
  },

  // --- DERIVED SAVES ---
  { 
    name: 'fortitude', 
    base: 0,
    formula: {
      requires: ['constitution'],
      fn: (char, base) => base + Math.floor((char.getAttribute('constitution') - 10) / 2)
    }
  },
  { 
    name: 'reflex', 
    base: 0, 
    formula: {
      requires: ['dexterity'],
      fn: (char, base) => base + Math.floor((char.getAttribute('dexterity') - 10) / 2)
    }
  },
  { 
    name: 'will', 
    base: 0,
    formula: {
      requires: ['wisdom'],
      fn: (char, base) => base + Math.floor((char.getAttribute('wisdom') - 10) / 2)
    }
  },

  // --- MOVEMENT & SCALE ---
  {
    name: 'speed',
    base: 0,
    formula: {
      requires: ['dexterity'],
      fn: function (character, base) {
        // Pulls from a 'size' meta property (Fine to Colossal)
        const sizes = { fine: 5, dim: 10, tiny: 15, small: 20, med: 30, lg: 40, hu: 50, gar: 60, col: 80 };
        const sizeKey = character.getMeta('size') || 'med';
        return base || sizes[sizeKey] || 30;
      },
    },
  },

  // --- POOLS & LIMITERS ---
  // Cyberpunk - 1 + CON mod (or CHA for Undead). 
  { 
    name: 'cyberTolerance', 
    base: 0,
    formula: {
      requires: ['constitution', 'charisma'],
      fn: function(character, base) {
        const isUndead = character.getMeta('type') === 'undead';
        const primaryStat = isUndead ? 'charisma' : 'constitution';
        
        const statScore = character.getAttribute(primaryStat) || 10;
        const statMod = Math.floor((statScore - 10) / 2);
        
        return Math.max(0, 1 + statMod);
      }
    }
  },
  // --- IDENTITY & SOCIAL TETHER ---
  {
    name: 'cohesion',
    base: 0,
    formula: {
      requires: ['charisma', 'wisdom'],
      fn: function (character, base) {
        const chaScore = character.getAttribute('charisma') || 10;
        const wisScore = character.getAttribute('wisdom') || 10;
        const chaMod = Math.floor((chaScore - 10) / 2);
        const wisMod = Math.floor((wisScore - 10) / 2);
        
        // Base 10 + Average of Force of Personality (CHA) and Self-Awareness (WIS)
        // This makes it harder for 'optimized' combat builds to ignore social/mental health
        const baseCohesion = 10 + Math.floor((chaMod + wisMod) / 2);
        
        // Subtract penalties from Cyberware or Corruption here in the future
        const cyberStrain = character.getMeta('cyberStrain') || 0;
        const corruption = character.getAttribute('corruption') || 0;
        
        return Math.max(0, baseCohesion - cyberStrain - Math.floor(corruption / 2));
      },
    },
  },
  { 
    name: 'resolve', 
    base: 0,
    formula: {
      requires: ['constitution', 'intelligence', 'wisdom', 'charisma'],
      fn: function(char, base) {
        const level = char.getMeta('level') || 1;
        const mainStat = char.getMeta('primaryAttribute') || 'wisdom';
        const statMod = Math.floor((char.getAttribute(mainStat) - 10) / 2);
        return Math.floor(level / 2) + statMod;
      }
    }
  },
  
  // --- DEFENSES ---
  { name: 'armorKinetic', base: 0 },   // Modern/Future ballistic
  { name: 'armorBallistic', base: 0 }, // Modern Kevlar
  { name: 'armorEnergy', base: 0 },    // Sci-fi
  { name: 'naturalArmor', base: 0 },   // Fantasy/Mutant
  { name: 'damageReduction', base: 0 },
  { name: 'shielding', base: 0 },      // Force fields / Cybernetics

  // --- GENRE SPECIFIC ---
  { name: 'sanity', base: 100 },       // Horror
  { name: 'powerPoints', base: 0 },    // Psionics
  { name: 'stamina', base: 10 },       // Combat pacing
  { name: 'tech', base: 0 },           // Skill-gate attribute
  { name: 'radiationResist', base: 0 },
  { name: 'grit', base: 0 },           // Western/Pulp
  { name: 'luck', base: 0 },           // Fallout/Pulp
  { name: 'reputation', base: 0 },     // Social/Noir
  { name: 'forcePoints', base: 0 },    // Space Opera
  { name: 'destinyPoints', base: 0 },
  { name: 'corruption', base: 0 },     // Dark Fantasy/Grimdark

  // --- MUD ENGINE SPECIFIC ---
  {
    name: 'massiveDamageThreshold',
    base: 0,
    formula: {
      requires: ['constitution'],
      fn: (char) => char.getAttribute('constitution') || 10
    }
  },
  {
    name: 'carryCapacity',
    base: 0,
    formula: {
      requires: ['strength'],
      fn: function(char) {
        const str = char.getAttribute('strength') || 10;
        const sizeMult = { fine: 0.125, dim: 0.25, tiny: 0.5, small: 0.75, med: 1, lg: 2, hu: 4, gar: 8, col: 16 };
        const size = char.getMeta('size') || 'med';
        // 3.5e Math: Light load is roughly Str * 10 lbs (scaled by size)
        return str * 10 * (sizeMult[size] || 1);
      }
    }
  },
  {
    name: 'wealth',
    base: 8, // Average starting "Living Standard"
    formula: {
      requires: ['reputation'],
      fn: (char, base) => {
        const repBonus = Math.floor((char.getAttribute('reputation') || 0) / 5);
        const debt = char.getMeta('debt') || 0;
        return base + repBonus - debt;
      }
    }
  },
  {
    name: 'liquidity', // This tracks "On-hand" physical spending power
    base: 0,
    formula: {
       fn: (char) => char.getMeta('cashValue') || 0 // Sum of gold/credits in inventory
    }
  }
  
  // --- LEGACY ---
  { name: 'critical', base: 0 }        // Critical threat multiplier/bonus
];
