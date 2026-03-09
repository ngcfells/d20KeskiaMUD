/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/classes/player-events.js
 * PURPOSE: Central event bus for player state changes, combat milestones,
 *          and d20-specific physics/stamina updates.
 */
'use strict';

const Movement = require('../d20/movement');
const DimensionalInventory = require('../d20/dimensional-inventory');
const StaminaEngine = require('../d20/stamina-engine');
const IounResonance = require('../d20/ioun-resonance');

module.exports = srcPath => {
  const { Broadcast: B, Logger } = require(srcPath);

  return {
    listeners: {
      /**
       * Unified Equip Logic: Proficiencies, Ioun Stones, and Weight
       */
      equip: state => function (slot, item) {
        // --- 1. IOUN STONE ORBITAL & RESONANCE LOGIC ---
        if (item.getMeta('isIounStone')) {
          // Ensure orbital array exists
          if (!this.equipment.has('ioun')) {
            this.equipment.set('ioun', []);
          }
          
          const iounStones = this.equipment.get('ioun');
          iounStones.push(item);
        
          // Vision Blur Calculation: 10 + (INT Mod * 2)
          const intScore = this.getAttribute('intelligence') || 10;
          const intMod = Math.floor((intScore - 10) / 2);
          const maxSafeStones = 10 + (intMod * 2);
          const stoneCount = iounStones.length;

          if (stoneCount > maxSafeStones) {
            let blurEffect = this.effects.get('ioun_vision_blur');
            if (!blurEffect) {
              blurEffect = state.EffectFactory.create('ioun_vision_blur', { 
                state: { count: stoneCount, maxSafeStones: maxSafeStones } 
              });
              this.addEffect(blurEffect);
            } else {
              blurEffect.emit('updateIounState', { count: stoneCount, maxSafeStones: maxSafeStones });
            }
            B.sayAt(this, "<magenta>The stones swarm thick around your head, straining your focus...</magenta>");
          }

          // Check for Resonant Harmonies
          const activeHarmonies = IounResonance.calculateResonance(this);
          if (activeHarmonies.length > 0) {
            activeHarmonies.forEach(harmony => {
              const effectId = `resonance_${harmony.name.toLowerCase().replace(/\s/g, '_')}`;
              if (!this.effects.has(effectId)) {
                this.addEffect(state.EffectFactory.create('ioun_resonance_bonus', {
                  id: effectId,
                  state: { name: harmony.name, bonus: harmony.bonus }
                }));
                B.sayAt(this, `<cyan>The stones pulse in harmony: You have achieved ${harmony.name}!</cyan>`);
              }
            });
          }
        }

        // --- 2. ARMOR AND SHIELD PROFICIENCIES ---
        const armorType = item.getMeta('armorType');
        const isShield = item.getMeta('isShield');

        if (armorType) {
          const proficiency = `armor_proficiency_${armorType}`;
          if (!this.hasAbility(proficiency)) {
            B.sayAt(this, `<red>Warning: You are not proficient with ${armorType} armor!</red>`);
            const penalty = Math.abs(item.getMeta('armorCheckPenalty') || 0);
            this.addEffect(state.EffectFactory.create('armor_penalty', { 
              config: { amount: penalty } 
            }));
          }
        }

        if (isShield && !this.hasAbility('shield_proficiency')) {
          B.sayAt(this, "<red>Warning: You are not proficient with shields!</red>");
        }

        // --- 3. PHYSICS UPDATE (Encumbrance Speed) ---
        const currentSpeed = Movement.getEffectiveSpeed(this);
        if (currentSpeed <= 15) {
          B.sayAt(this, "<yellow>You feel the weight of your gear slowing you down.</yellow>");
        }
      },

      /**
       * Handle Stance and Specialization behaviors on login
       */
      login: state => function () {
        if (!this.getMeta('currencies')) {
          this.setMeta('currencies', { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 });
        }
        
        this.addBehavior('stance');
        this.addBehavior('feat-choice');
        this.addBehavior('wizard-specialization');
        this.addBehavior('wizard-spellcasting');
        this.addBehavior('weapon-focus-choice');
        this.addBehavior('armor-focus-choice');
        
        // Start the Stamina Engine heartbeat for this player
        this.emit('staminaUpdate');
      },

      /**
       * Stamina Recovery Engine (Heartbeat)
       */
      staminaUpdate: state => function () {
        const recovery = StaminaEngine.calculateRecovery(this);
        const current = this.getAttribute('stamina');
        const max = this.getMaxAttribute('stamina');

        if (recovery > 0) {
          this.setAttribute('stamina', Math.min(max, current + recovery));
        } else if (current <= 0) {
          // If at 0 and recovery is 0 (due to load), check/apply exhaustion
          StaminaEngine.checkExhaustion(this);
        }
      },

      /**
       * Alignment logic on NPC/Player death
       */
      deathblow: state => function (victim) {
        const AlignLogic = require('../d20/alignment-logic');
        if (victim.getMeta('is_innocent')) {
          B.sayAt(this, "<red>You have committed a cold-blooded murder.</red>");
          AlignLogic.shift(this, 0, -20, state);
        }
        if (victim.getMeta('alignment') === 'chaotic_evil') {
          AlignLogic.shift(this, 0, 1, state);
        }
      },

      /**
       * Currency Gain Utility
       */
      gainCurrency: state => function (amounts) {
        const current = this.getMeta('currencies') || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
        for (const [unit, value] of Object.entries(amounts)) {
          if (current.hasOwnProperty(unit)) current[unit] += value;
        }
        this.setMeta('currencies', current);
        B.sayAt(this, `<yellow>You gained: ${Object.entries(amounts).map(([k, v]) => `${v}${k.toUpperCase()}`).join(', ')}</yellow>`);
      }
    }
  };
};
