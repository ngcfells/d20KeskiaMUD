// path: ../bundles/my-d20-bundle/input-events/finish-player.js
'use strict';

const { Config, Logger } = require('ranvier');

module.exports = {
  event: state => {
    return async (socket, args) => {

      // 1. Create the Player
      let player = new state.Player({
        name: args.name,
        account: args.account,
      });

      // Origin must be set early
      player.setMeta('origin', args.origin || 'fantasy');

      // 2. Base Attributes
      if (args.stats) {
        for (const [stat, val] of Object.entries(args.stats)) {
          player.addAttribute(state.AttributeFactory.create(stat, val));
          player.setMeta(`ability_${stat}`, val);
        }
      }

      // 3. Metadata Setup
      const RaceResolver = require('../lib/resolvers/RaceResolver');
      const TraitResolver = require('../lib/resolvers/TraitResolver');
      const ClassResolver = require('../lib/resolvers/ClassResolver');
      const LanguageResolver = require('../lib/resolvers/LanguageResolver');
      const AbilityResolver = require('../lib/resolvers/AbilityResolver');
      const SpellResolver = require('../lib/resolvers/SpellResolver');

      player.setMeta('gender', args.gender);
      player.setMeta('race', args.race);
      player.setMeta('class', args.playerClass);

      // --- APPLY RESOLVERS IN CORRECT ORDER ---
      RaceResolver.apply(state, player);     // racial attributes, metadata, traits
      ClassResolver.apply(state, player);    // class traits, proficiencies, metadata
      TraitResolver.apply(state, player);    // apply all traits (racial + class + physiology)
      LanguageResolver.apply(state, player);
      AbilityResolver.apply(state, player);
      SpellResolver.apply(state, player);

      // Skills & currency
      player.setMeta('skills', args.playerSkills);
      player.setMeta('currencies', { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 });

      // 4. Feats
      if (args.playerFeats) {
        args.playerFeats.forEach(featId => player.addFeat(featId));
      }

      // 5. Level 1 Class Abilities
      const playerClass = player.getClass(state);
      if (playerClass && playerClass.abilities && playerClass.abilities[1]) {
        playerClass.abilities[1].forEach(abilityId => {
          player.addAbility(abilityId);
        });
      }

      // 6. Spellbook
      if (args.selectedSpells) {
        player.setMeta('spellbook', args.selectedSpells);

        const spellcasting = player.getSpellcasting(state);
        if (spellcasting && spellcasting.spellSlots && spellcasting.spellSlots[1]) {
          player.setMeta('spellSlots', spellcasting.spellSlots[1]);
        }
      }

      // 7. Persistence & Room placement
      args.account.addCharacter(args.name);
      args.account.save();
      player.setMeta('genre', args.genre);

      const spawnRef = args.startingRoom || Config.get('startingRoom');
      const spawnRoom = state.RoomManager.getRoom(spawnRef);

      if (!spawnRoom) {
        Logger.error(`Starting room [${spawnRef}] not found! Check ranvier.json.`);
      }

      player.room = spawnRoom;

      await state.PlayerManager.save(player);

      // Reload to attach behaviors
      player = await state.PlayerManager.loadPlayer(state, player.account, player.name);
      player.socket = socket;

      // 8. Class-specific setup (messages, prompts, etc.)
      if (playerClass && typeof playerClass.setup === 'function') {
        playerClass.setup(player);
      }

      socket.emit('done', socket, { player });
    };
  }
};
