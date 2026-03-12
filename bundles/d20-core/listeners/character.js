'use strict';

module.exports = src => {
  const { EventManager } = src;

  // Example: recompute derived stats on login and level up.
  EventManager.addListener('player-login', player => {
    if (typeof player.recalculateDerived === 'function') {
      player.recalculateDerived();
    }
  });

  EventManager.addListener('player-levelup', player => {
    if (typeof player.recalculateDerived === 'function') {
      player.recalculateDerived();
    }
  });
};
