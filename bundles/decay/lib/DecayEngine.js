// bundles/decay/lib/DecayEngine.js
'use strict';

const resolver = require('./resolvers/decayResolver');

class DecayEngine {
  constructor(state) {
    this.state = state;
  }

  process(entity) {
    const mode = resolver.getDecayMode(entity);
    if (!mode) return;

    switch (mode) {
      case 'rot':
        this._rot(entity);
        break;
      case 'compost':
        this._compost(entity);
        break;
      case 'reform':
        this._reform(entity);
        break;
      case 'dissipate':
        this._dissipate(entity);
        break;
      case 'fade':
        this._fade(entity);
        break;
    }
  }

  _rot(entity) {
    // biological decay → rot → refuse
    entity.setMeta('decayStage', (entity.getMeta('decayStage') || 0) + 1);
  }

  _compost(entity) {
    entity.setMeta('decayStage', (entity.getMeta('decayStage') || 0) + 1);
  }

  _reform(entity) {
    entity.setMeta('reforming', true);
  }

  _dissipate(entity) {
    entity.setMeta('dissipating', true);
  }

  _fade(entity) {
    entity.setMeta('fading', true);
  }
}

module.exports = DecayEngine;
