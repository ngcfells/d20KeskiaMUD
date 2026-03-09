// path: ../bundles/my-d20-bundle/input-events/choose-spells.js
'use strict';

const { Broadcast: B, EventUtil } = require('ranvier');
const D20Utils = require('../lib/d20/D20Utils');

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    const playerClass = state.ClassManager.get(args.playerClass);
    
    // Only proceed for spellcasters
    if (!playerClass.spellcasting) {
      return socket.emit('finish-player', socket, args);
    }

    // Initialize selection pool based on House Rules
    if (args.selectedSpells === undefined) {
      const intMod = D20Utils.getModifier(args.stats.intelligence);
      
      args.selectedSpells = { 0: [], 1: [] };
      args.pickingLevel = 0; 
      
      // House Rules: 3 + Int for Level 0, 1 + Int for Level 1
      args.spellsToPick = { 
        0: Math.max(1, 3 + intMod), 
        1: Math.max(1, 1 + intMod) 
      }; 
    }

    const level = args.pickingLevel;
    const picked = args.selectedSpells[level];
    const totalToPick = args.spellsToPick[level];
    const remaining = totalToPick - picked.length;

    // Transition between spell levels or finish
    if (remaining <= 0) {
      if (level === 0) {
        args.pickingLevel = 1;
        return socket.emit('choose-spells', socket, args);
      }
      say('\r\n<green>Spellbook initialized with your selections.</green>');
      return socket.emit('finish-player', socket, args);
    }

    say(`\r\n<yellow>Wizard Spell Selection (Level ${level})</yellow>`);
    say(`Remaining picks: <bold>${remaining}</bold> (Total pool: ${totalToPick})`);
    
    const available = playerClass.spellList[level].filter(s => !picked.includes(s));
    
    // Simple 3-column display for the massive spell list
    let row = [];
    available.forEach((s, i) => {
      row.push(s.padEnd(25));
      if (row.length === 3 || i === available.length - 1) {
        say(row.join(''));
        row = [];
      }
    });

    write('\r\nType spell name to learn > ');

    socket.once('data', data => {
      const choice = data.toString().trim().toLowerCase();
      
      if (!available.includes(choice)) {
        say('<red>Invalid spell name or already selected.</red>');
        return socket.emit('choose-spells', socket, args);
      }

      args.selectedSpells[level].push(choice);
      return socket.emit('choose-spells', socket, args);
    });
  }
};
