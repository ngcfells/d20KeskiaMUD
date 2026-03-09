/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/training.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const TrainingLogic = require('../../lib/d20/training-logic');

module.exports = {
  usage: 'practice <skill/attribute>',
  aliases: ['train', 'study'],
  command: state => (args, player) => {
    if (!args.length) {
      // If no args, show the progress bars (from our previous step)
      return state.CommandManager.get('training').execute('', player);
    }

    const target = args.toLowerCase().trim();
    const stamina = player.getAttribute('stamina');

    if (stamina < 10) {
      return B.sayAt(player, "<red>You are too exhausted to practice effectively.</red>");
    }

    // Find if it's a skill or attribute
    let type = null;
    if (player.getSkill(target)) type = 'skills';
    else if (player.hasAttribute(target)) type = 'attributes';

    if (!type) {
      return B.sayAt(player, `You aren't sure how to practice '${target}'.`);
    }

    // Active Practice: Spend 10 Stamina for a guaranteed chunk of progress
    player.setAttribute('stamina', stamina - 10);
    
    // DC 20 equivalent for "Focused Study"
    TrainingLogic.practice(player, type, target, 20);

    B.sayAt(player, `<yellow>You spend some time focused on your ${target}...</yellow>`);
    
    // 5% chance of a "Eureka" moment (Double gain)
    if (Math.random() < 0.05) {
      TrainingLogic.practice(player, type, target, 40);
      B.sayAt(player, "<cyan>A sudden flash of insight speeds your progress!</cyan>");
    }
  }
};
