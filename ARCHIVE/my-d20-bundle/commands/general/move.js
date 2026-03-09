/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/move.js
 */
'use strict';

const Movement = require('../../lib/d20/movement');
const MovementLogic = require('../../lib/d20/movement-logic');
const TerrainTypes = require('../../data/rules/terrain_types');

module.exports = srcPath => {
  return {
    usage: 'move <direction>',
    command: state => (args, player) => {
      const dir = args.trim().toLowerCase();
      const exit = player.room.getExits().find(e => e.direction === dir);

      if (!exit) return player.say('You cannot go that way.');
      if (player.hasEffect('movement_delay')) return player.say('You are already moving!');

      const terrainKey = player.room.metadata.terrain || 'NONE';
      const currentSpeed = Movement.getEffectiveSpeed(player, terrainKey);
      const staminaCost = MovementLogic.calculateStaminaCost(player, terrainKey);

      // Overburdened check
      if (currentSpeed <= 5 && MovementLogic.calculateStaminaCost(player, 'NONE') > 0) {
        player.say("You are carrying too much weight to move effectively!");
      }

      const moveDelay = Math.max(500, (30 / currentSpeed) * 1000); 

      player.say(`You start moving ${dir}...`);
      
      // Inject the delay effect (standard Ranvier state management)
      player.addEffect(state.EffectFactory.create('movement_delay', { duration: moveDelay }));

      setTimeout(() => {
        player.moveTo(exit.room);
        MovementLogic.applyMovementToll(player, staminaCost);
        player.say(`You arrive at ${exit.room.title}.`);
      }, moveDelay);
    }
  };
};
