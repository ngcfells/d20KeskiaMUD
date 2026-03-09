/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/score.js
 * PURPOSE: Comprehensive d20 character sheet including physics, stasis, 
 *          and stamina recovery data.
 */
'use strict';

const sprintf = require('sprintf-js').sprintf;
const { Broadcast: B } = require('ranvier');
const D20Utils = require('../../lib/d20Utils');
const Defense = require('../../lib/combat/defense');
const Movement = require('../../lib/d20/movement');
const DimensionalInventory = require('../../lib/d20/dimensional-inventory');
const StaminaEngine = require('../../lib/d20/stamina-engine');

module.exports = {
  aliases: ['stats', 'attributes'],
  command: (state) => (args, p) => {
    const say = message => B.sayAt(p, message);
    const playerClass = p.getMeta('class') || 'Adventurer';
    const className = playerClass.charAt(0).toUpperCase() + playerClass.slice(1);
    
    // --- DATA RESOLUTION ---
    const training = D20Utils.getArmorTraining(p);
    const currentACP = Defense.getACP(p);
    const currentSpeed = Movement.getEffectiveSpeed(p);
    const weight = DimensionalInventory.getCarriedWeight(p);
    const staminaRecovery = StaminaEngine.calculateRecovery(p);
    const strength = p.getAttribute('strength') || 10;

    // --- HEADER ---
    say('<b>' + B.center(60, `${p.name}, level ${p.level} ${className}`, 'yellow'));
    say('<b>' + B.line(60, '=', 'yellow'));

    // --- ROW 1: VITALS (Health, Stamina, Alignment) ---
    const health = `${p.getAttribute('health') || 0}/${p.getMaxAttribute('health') || 0}`;
    const stamina = `${p.getAttribute('stamina') || 0}/${p.getMaxAttribute('stamina') || 0}`;
    const alignStr = (p.getMeta('alignment') || 'true_neutral').replace('_', ' ').toUpperCase();
    
    say(sprintf(' <bold>HP</bold>: <red>%-12s</red> <bold>ST</bold>: <green>%-12s</green> <white>Align: <cyan>%s</cyan></white>', 
      health, stamina, alignStr));

    say('<b>' + B.line(60, '-', 'yellow'));

    // --- ROW 2: ABILITY SCORES & COMBAT STATS ---
    say('<b><green>' + sprintf('  %-28s %-28s', 'Ability Scores', 'Combat Stats') + '</green></b>');
    
    const coreAttrs = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'appearance'];
    const combatStats = [
      { label: 'Armor Class', val: Defense.getAC(p) },
      { label: 'ACP Penalty', val: currentACP === 0 ? '0' : `<red>${currentACP}</red>` },
      { label: 'Move Speed',  val: `${currentSpeed}ft` },
      { label: 'BAB',         val: p.getMeta('baseAttackBonus') || 1 },
      { label: 'Fortitude',   val: p.getMeta('base_fortitude') || 0 },
      { label: 'Reflex',      val: p.getMeta('base_reflex') || 0 },
      { label: 'Will',        val: p.getMeta('base_will') || 0 }
    ];

    for (let i = 0; i < coreAttrs.length; i++) {
      const attr = coreAttrs[i];
      const score = p.getAttribute(attr) || 10;
      const mod = Math.floor((score - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : mod;

      let out = sprintf(' %-12s: %2s (%3s) ', 
        attr[0].toUpperCase() + attr.slice(1, 4), 
        score, 
        modStr
      );

      if (combatStats[i]) {
        out += sprintf(' | %-16s: <bold>%s</bold>', combatStats[i].label, combatStats[i].val);
      }
      say(out);
    }

    // --- ROW 3: PHYSICS & RECOVERY ---
    say('<b>' + B.line(60, '.', 'yellow'));
    
    const encColor = weight > (strength * 10) ? (weight > (strength * 15) ? 'red' : 'yellow') : 'white';
    const recoveryStr = staminaRecovery > 0 ? `<green>+${staminaRecovery}</green>` : '<red>HALTED</red>';
    
    say(sprintf(' <bold>Load</bold>: <%s>%5s</%s> / %-5s lbs. | <bold>Recovery</bold>: %s per tick', 
      encColor, weight.toFixed(1), encColor, (strength * 15), recoveryStr));

    // --- ROW 4: ARMOR TRAINING PASSIVE ---
    if (training.bonus > 0 || p.hasEffect('resting') || p.hasEffect('meditating')) {
      say('<b>' + B.line(60, '.', 'yellow'));
      
      if (training.bonus > 0) {
        const speedNeg = training.heavySpeed ? 'Heavy' : (training.mediumSpeed ? 'Medium' : 'None');
        say(B.center(60, `<cyan>Armor Training Rank ${training.bonus} (MaxDex/ACP +${training.bonus}, Speed: ${speedNeg})</cyan>`));
      }
      
      if (p.hasEffect('resting')) say(B.center(60, '<green>[ Currently Resting - Double Stamina Recovery ]</green>'));
      if (p.hasEffect('meditating')) say(B.center(60, '<magenta>[ Currently Meditating - Enhanced Mental Focus ]</magenta>'));
    }

    say('<b>' + B.line(60, '-', 'yellow'));

    // --- ROW 5: TREASURY ---
    const cash = p.getMeta('currencies') || {};
    const bank = p.getMeta('bank_ledger') || {};
    
    say('<b><yellow>' + B.center(60, 'Multiversal Ledger') + '</yellow></b>');
    
    const walletKeys = Object.keys(cash).filter(k => cash[k] > 0);
    if (walletKeys.length === 0) {
      say(B.center(60, '<gray>Your wallet is empty.</gray>'));
    } else {
      let walletLine = walletKeys.map(k => {
        const entry = Registry[k] || { name: k };
        return `<white>${entry.name}:</white> <yellow>${cash[k]}</yellow>`;
      }).join('  ');
      say(B.center(60, walletLine));
    }

    // Bank summary (If at a bank or checking remote balance)
    const bankKeys = Object.keys(bank).filter(k => bank[k] > 0);
    if (bankKeys.length > 0) {
      say('<b>' + B.line(60, '.', 'yellow'));
      say(B.center(60, '<cyan>Banked Assets (Safe Storage)</cyan>'));
      let bankLine = bankKeys.map(k => `<white>${k.toUpperCase()}:</white> ${bank[k]}`).join('  ');
      say(B.center(60, bankLine));
    }
  }
};

