/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/identify_resonance.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');
const IounResonance = require('../../lib/d20/ioun-resonance');
const IounData = require('../../data/rules/ioun_stones');
const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: 'identify resonance',
  command: state => (args, player) => {
    const skillId = 'spellcraft'; // or 'occultism'
    const playerSkill = player.getSkill(skillId);

    if (!playerSkill || playerSkill.rank <= 0) {
      return B.sayAt(player, "You lack the mystical knowledge to identify ioun resonances.");
    }

    // 1. Check "One check per rank" restriction
    if (!IounResonance.canAttemptIdentify(player, skillId)) {
      return B.sayAt(player, "You have already exhausted your current knowledge. You must improve your " + skillId + " before trying again.");
    }

    // 2. Perform the Check (DC 20 for basic resonance, 25 for complex)
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + playerSkill.rank + (player.getAttribute('intelligence') || 10 - 10) / 2;
    const dc = 20;

    B.sayAt(player, `<magenta>You spread your stones before you and focus your mind...</magenta>`);
    
    // Record the attempt immediately so they can't spam
    IounResonance.recordAttempt(player, skillId);

    if (total < dc) {
      return B.sayAt(player, "<red>The patterns remain elusive. Perhaps with further study you will see the connection.</red>");
    }

    // 3. Success! Reveal possible harmonies in the stash/orbit
    const orbiting = player.equipment.get('ioun') || [];
    const stashed = [...player.inventory].filter(([, i]) => i.getMeta('isIounStone')).map(([, i]) => i);
    const allStones = [...orbiting, ...stashed];
    const allIds = allStones.map(s => s.metadata.iounId);

    let discoveredCount = 0;
    B.sayAt(player, `<cyan>Success! You discover the following potential harmonies:</cyan>`);

    for (const harmony of IounData.harmonies) {
      const hasMaterials = harmony.required.every(req => allIds.includes(req));
      if (hasMaterials) {
        discoveredCount++;
        B.sayAt(player, `<b><yellow>- ${harmony.name}:</yellow></b> Requires ${harmony.required.join(' and ')}.`);
        
        // Save to player metadata so 'inventory' can show it permanently
        let discovered = player.getMeta('discovery.resonances') || [];
        if (!discovered.includes(harmony.name)) {
          discovered.push(harmony.name);
          player.setMeta('discovery.resonances', discovered);
        }
      }
    }

    if (discoveredCount === 0) {
      B.sayAt(player, "You realize your current stones have no resonant potential.");
    }
  }
};
