'use strict';

class EffectBase {
  constructor(config, state) {
    this.state = state;
    this.config = config;

    this.id = config.id;
    this.duration = config.duration || null;
    this.category = config.category || 'untyped';
    this.magnitude = config.magnitude || 0;
    this.startTime = Date.now();
  }

  stacksWith(other) {
    return this.category === 'untyped' || this.category !== other.category;
  }

  isExpired() {
    if (!this.duration) return false;
    return (Date.now() - this.startTime) >= this.duration;
  }

  onApply(target) {}
  onRemove(target) {}
  onTick(target) {}
}

module.exports = EffectBase;
