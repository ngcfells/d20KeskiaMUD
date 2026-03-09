// path: ../bundles/my-d20-bundle/input-events/choose-feats.js
'use strict';

const { Broadcast: B, EventUtil } = require('ranvier');
const PrereqEngine = require('../lib/prerequisites/prerequisiteEngine');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    // Initial Feat Pool: Base 1 + Human Bonus (if applicable)
    if (args.featPoints === undefined) {
      args.featPoints = args.race === 'human' ? 2 : 1;
      args.playerFeats = [];
    }

    if (args.featPoints <= 0) {
      say('\r\n<green>Feats finalized.</green>');
      return socket.emit('finish-player', socket, args);
    }

    say(`\r\n<yellow>Feats Remaining: ${args.featPoints}</yellow>`);
    
    // Create the "Actor" object the PrereqEngine expects
    const actor = {
      attributes: args.stats,
      skills: args.playerSkills,
      feats: args.playerFeats,
      race: args.race,
      class: args.playerClass,
      level: 1,
      bab: 0 // Starting BAB for Level 1
    };

    const allFeats = Array.from(state.FeatManager.feats.values());
    const valid = [];
    const locked = [];

    allFeats.forEach(f => {
      if (actor.feats.includes(f.id)) return;
      const result = PrereqEngine.check(actor, f.prerequisites);
      if (result.ok) valid.push(f);
      else locked.push({ feat: f, reason: result.failed.join(', ') });
    });

    say('Available Feats:');
    valid.forEach(f => say(`[<cyan>${f.id}</cyan>] <bold>${f.name}</bold>`));
    
    say('\r\nLocked Feats (Requirements Not Met):');
    locked.slice(0, 10).forEach(l => say(`<black>[${l.feat.id}]</black> - <red>Needs: ${l.reason}</red>`));

    write('\r\nSelection > ');

    socket.once('data', data => {
      const choice = data.toString().trim().toLowerCase();
      const selected = valid.find(f => f.id === choice);

      if (!selected) {
        say('<red>Invalid choice.</red>');
        return socket.emit('choose-feats', socket, args);
      }

      args.playerFeats.push(selected.id);
      args.featPoints--;
      return socket.emit('choose-feats', socket, args);
    });
  }
};
