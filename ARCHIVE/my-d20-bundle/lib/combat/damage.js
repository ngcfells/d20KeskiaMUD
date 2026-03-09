// path: ../bundles/my-d20-bundle/lib/combat/damage.js

'use strict';

const D20Utils = require('../d20/d20Utils');
const MonkTables = require('../classes/monk-tables');

module.exports = {
  calculate(attacker, target, isCrit = false, isOffhand = false) {
    const weapon = isOffhand ? attacker.equipment.get('offhand') : attacker.equipment.get('mainhand');
    
    let dice = '1d3'; // Default base unarmed

    // 1. Check for Monk Unarmed Scaling
    if (!weapon && attacker.getMeta('class') === 'monk') {
      const level = attacker.getMeta('level') || 1;
      const race = attacker.getMeta('race');
      const size = ['halfling', 'gnome'].includes(race) ? 'small' : 'medium';
      
      dice = MonkTables.getUnarmedDice(level, size);
    } else if (weapon) {
      dice = weapon.getMeta('damageDice') || '1d3';
    }

    // 2. Roll the Dice
    let damage = this._rollDice(dice);
    
    // 3. Add Strength Mod
    const strMod = D20Utils.getModifier(attacker.getAttribute('strength') || 10);
    // D20 Rule: Off-hand adds only 1/2 Str, Monk Flurry/Main adds full Str
    damage += isOffhand ? Math.floor(strMod / 2) : strMod;

    // 4. Handle Criticals
    if (isCrit) {
      const mult = weapon ? (weapon.getMeta('critMultiplier') || 2) : 2;
      damage *= mult;
    }

    // 4.5 Sneak Attacks
    if (attacker.hasAbility('sneak_attack_1d6')) {
      // Check if target is vulnerable (Standard D20 rules)
      const isFlatFooted = target.hasEffect('flat_footed');
      const isFlanked = target.hasEffect('flanked');
    
      if (isFlatFooted || isFlanked) {
        const sneakDamage = Math.floor(Math.random() * 6) + 1;
        damage += sneakDamage;
        attacker.say(`<yellow>Sneak Attack! (+${sneakDamage})</yellow>`);
      }
    }

    // 4.7 Paladin Smite Evil
    if (attacker.hasEffect('smite_evil_active') && target.getMeta('alignment').includes('evil')) {
      const paladinLevel = attacker.getMeta('level') || 1;
      damage += paladinLevel;
      attacker.say(`<yellow>Your holy strike punishes ${target.name}! (+${paladinLevel})</yellow>`);
    }

    // 5. Apply Mitigation
    const dmgType = weapon ? (weapon.getMeta('damageType') || 'physical') : 'physical';
    damage = this._applyMitigation(target, damage, dmgType);

    return Math.max(1, damage);
  },

  _rollDice(diceStr) {
    const [count, sides] = diceStr.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
    return total;
  },

  _applyMitigation(target, amount, type) {
    const dr = target.getAttribute('damageReduction') || 0;
    return Math.max(0, amount - dr);
  }
};



