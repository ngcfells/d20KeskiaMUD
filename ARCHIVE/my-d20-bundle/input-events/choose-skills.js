// path: ../bundles/my-d20-bundle/input-events/choose-skills.js
'use strict';

const { Broadcast: B, EventUtil } = require('ranvier');
const SkillManager = require('../lib/skills/skill-manager');
const D20Utils = require('../lib/d20/D20Utils');

/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/input-events/choose-skills.js
 * PURPOSE: Recursive d20 skill selection handling Class vs Cross-Class costs.
 */

module.exports = {
  event: state => (socket, args) => {
    const say = EventUtil.genSay(socket);
    const write = EventUtil.genWrite(socket);

    // Ensure we have the class definition to check for Class Skills
    const playerClass = state.ClassManager.get(args.playerClass);

    // --- 1. INITIALIZATION ---
    if (args.skillPoints === undefined) {
      const intMod = D20Utils.getModifier(args.stats.intelligence);
      
      // D20 Rule: (Base Class Points + Int Mod) * 4 at Level 1
      // For Rogue, this will be (8 + Int Mod) * 4
      const basePool = (playerClass.skillPoints || 2) + intMod;
      const raceBonus = args.race === 'human' ? 1 : 0;
      
      args.skillPoints = Math.max(1, basePool + raceBonus) * 4;
      args.playerSkills = {}; 
      args.currentUmbrella = null;
      args.path = [];
    }

    B.sayAt(socket, `\r\n<yellow>Skill Points Remaining: <bold>${args.skillPoints}</bold></yellow>`);

    // --- 2. MAIN MENU (Umbrellas & Standalones) ---
    if (!args.currentUmbrella) {
      say('Select a category or standalone skill:');
      say('<green>[Class Skills cost 1]</green> <white>[Cross-Class cost 2]</white>');
      say('------------------------------------------------------------');
      
      Array.from(SkillManager.skills.values()).forEach(s => {
        const ranks = args.playerSkills[s.id] || 0;
        
        // Check if this specific skill (or umbrella) is in the class list
        const isClass = playerClass.classSkills.includes(s.id);
        const cost = isClass ? 1 : 2;
        const color = isClass ? 'green' : 'white';
        
        const typeLabel = s.hasSpecialties ? '[U]' : '[S]';
        
        say(`[<bold>${s.id.padEnd(15)}</bold>] <${color}>${s.name.padEnd(20)}</${color}> Cost: ${cost} ${ranks > 0 ? `(Ranks: ${ranks})` : ''}`);
      });

      say('------------------------------------------------------------');
      say('[<bold>done</bold>] Finish skill selection');
      write('> ');

      socket.once('data', data => {
        const choice = data.toString().trim().toLowerCase();
        if (choice === 'done') return socket.emit('choose-feats', socket, args);

        const skill = SkillManager.getSkill(choice);
        if (!skill) {
          say('<red>Invalid skill choice.</red>');
          return socket.emit('choose-skills', socket, args);
        }

        const cost = playerClass.classSkills.includes(choice) ? 1 : 2;

        // If it's a standalone skill, buy it immediately
        if (!skill.hasSpecialties) {
          if (args.skillPoints < cost) {
            say('<red>Not enough points!</red>');
          } else {
            args.playerSkills[choice] = (args.playerSkills[choice] || 0) + 1;
            args.skillPoints -= cost;
            say(`<green>Increased ${skill.name} to ${args.playerSkills[choice]}.</green>`);
          }
          return socket.emit('choose-skills', socket, args);
        }

        // If it's an umbrella, enter the drill-down menu
        args.currentUmbrella = choice;
        args.path = [];
        return socket.emit('choose-skills', socket, args);
      });

    // --- 3. RECURSIVE SPECIALTY MENU ---
    } else {
      const umbrella = SkillManager.getSkill(args.currentUmbrella);
      const currentNode = SkillManager.resolveSpecialty(args.currentUmbrella, args.path);
      const options = Object.keys(currentNode);
      
      // Umbrellas share the cost of the base skill
      const isClass = playerClass.classSkills.includes(args.currentUmbrella);
      const cost = isClass ? 1 : 2;

      say(`\r\nBrowsing Category: <bold>${[umbrella.name, ...args.path].join(' > ')}</bold>`);
      say(`Cost per rank: <yellow>${cost}</yellow>`);

      if (options.length > 0) {
        say('Available Specialties:');
        options.forEach(opt => say(`[<bold>${opt}</bold>]`));
      }

      // Generate the canonical key used by SkillManager (e.g., craft_gunsmithing)
      const key = [args.currentUmbrella, ...args.path].join('_');
      const currentRanks = args.playerSkills[key] || 0;
      
      say(`\r\nCurrent Ranks in this specialty: <cyan>${currentRanks}</cyan>`);
      say('[<bold>add</bold>] Put 1 rank here');
      say('[<bold>back</bold>] Go back');
      write('> ');

      socket.once('data', data => {
        const choice = data.toString().trim().toLowerCase();

        if (choice === 'back') {
          if (args.path.length === 0) args.currentUmbrella = null;
          else args.path.pop();
          return socket.emit('choose-skills', socket, args);
        }

        if (choice === 'add') {
          if (args.skillPoints < cost) {
            say('<red>Not enough points!</red>');
          } else {
            args.playerSkills[key] = (args.playerSkills[key] || 0) + 1;
            args.skillPoints -= cost;
            say(`<green>Increased specialty to ${args.playerSkills[key]}.</green>`);
          }
          return socket.emit('choose-skills', socket, args);
        }

        // Navigate deeper into the tree
        if (options.includes(choice)) {
          args.path.push(choice);
          return socket.emit('choose-skills', socket, args);
        }

        say('<red>Invalid option.</red>');
        return socket.emit('choose-skills', socket, args);
      });
    }
  }
};
