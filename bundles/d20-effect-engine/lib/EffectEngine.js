'use strict';

const EffectStacking = require('./EffectStacking');
const EffectSerializer = require('./EffectSerializer');
const EffectHooks = require('./EffectHooks');

class EffectEngine {
  constructor(state) {
    this.state = state;

    this.registry = state.EffectRegistry;
    this.serializer = new EffectSerializer(state);
    this.hooks = new EffectHooks(state);
  }

  apply(target, effectId, config = {}) {
    const EffectClass = this.registry.get(effectId);

    if (!EffectClass) {
      throw new Error(`Unknown effect: ${effectId}`);
    }

    const effect = new EffectClass(config, this.state);
    effect.id = effectId;

    const conflict = EffectStacking.resolve(target, effect);

    if (conflict === effect) {
      return null;
    }

    if (conflict) {
      conflict.remove();
    }

    target.effects.add(effect);

    try {
      effect.onApply(target, false);
    } catch (e) {
      console.error(`Effect ${effectId} onApply error:`, e);
    }

    return effect;
  }

  remove(target, effectId) {
    const effect = target.effects.get(effectId);
    if (effect) {
      effect.remove();
    }
  }

  tick(target) {
    if (!target.effects) return;

    for (const effect of [...target.effects]) {
      try {
        effect.onTick(target);
      } catch (e) {
        console.error(`Effect ${effect.id} onTick error:`, e);
      }

      if (effect.isExpired()) {
        effect.remove();
      }
    }
  }

  serialize(target) {
    return this.serializer.serialize(target.effects);
  }

  deserialize(target, savedEffects) {
    this.serializer.deserialize(target, savedEffects);
  }

  dispatchEvent(target, eventName, payload) {
    this.hooks.dispatch(target, eventName, payload);
  }

  onDamage(damage, attacker, defender) {
    return this.hooks.onDamage(damage, attacker, defender);
  }

  onMove(target, fromRoom, toRoom) {
    this.hooks.onMove(target, fromRoom, toRoom);
  }

  onSkillCheck(skillId, rollData, target) {
    return this.hooks.onSkillCheck(skillId, rollData, target);
  }

  onSave(saveType, rollData, target) {
    return this.hooks.onSave(saveType, rollData, target);
  }

  onAttack(attackData, attacker, defender) {
    return this.hooks.onAttack(attackData, attacker, defender);
  }
}

module.exports = EffectEngine;
