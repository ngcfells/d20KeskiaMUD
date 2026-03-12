'use strict';

module.exports = src => {
  const { EventManager } = src;

  EventManager.addListener('npc-spawn', npc => {
    if (typeof npc.recalculateDerived === 'function') {
      npc.recalculateDerived();
    }
  });
};
