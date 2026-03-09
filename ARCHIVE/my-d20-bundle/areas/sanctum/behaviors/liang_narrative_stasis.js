'use strict';

const { Broadcast } = require('ranvier');

/**
 * Behavior: Narrative Stasis (The Infinite Margin)
 * ----------------------------------------------
 * Manages the literalization of reality into ink.
 * Handles automatic redaction, environmental sickness, 
 * and Liang Chou's automated "Mind-Edit" release protocol.
 */
module.exports = {
  listeners: {
    /**
     * Instantly apply 'Redacted' status upon entry.
     */
    playerEnter: state => function (player) {
      if (player.isNpc) return;

      if (!player.effects.has('redacted')) {
        const redactedEffect = state.EffectFactory.create('redacted', player);
        player.addEffect(redactedEffect);
        
        player.say("<magenta>The moment you step into the margin, the world flattens. You feel the weight of a thousand chapters pressing against your soul.</magenta>");
      }
    },

    /**
     * Transmute all speech into flowing ink.
     */
    playerSpeech: state => function (player, message) {
      player.say(`<magenta>As you speak, the words do not echo; they spill from your mouth as thick, obsidian ink, crawling across the floor in elegant High Shou script before sinking into the parchment beneath your feet.</magenta>`);
      
      player.room.broadcastExcept(player, `<magenta>The words of ${player.name} manifest as physical lines of text that spiral through the air, weaving themselves into the infinite margins of the room.</magenta>`);
    },

    /**
     * Block all non-sensory commands and narrate the failure.
     */
    command: state => function (player, commandName, args) {
      const allowedSensory = ['look', 'examine', 'score', 'inventory', 'chat', 'say'];
      
      if (!allowedSensory.includes(commandName)) {
        player.say(`<red>You attempt to ${commandName}, but your momentum is siphoned away. Your effort becomes a single, beautifully penned sentence that appears on the wall: "${player.name} struggled against the inevitable, but the ink held firm."</red>`);
        
        player.room.broadcastExcept(player, `<grey>A new line of text carves itself into the floor near ${player.name}, describing their failed attempt to ${commandName} in clinical detail.</grey>`);
        
        return false; // Blocks the command
      }
    },

    /**
     * Progression Logic: Ink-Lung and Automated Release.
     */
    updateTick: state => function () {
      const players = this.players;
      if (players.size === 0) return;

      players.forEach(player => {
        let exposure = player.getMeta('archive_exposure') || 0;
        exposure += 1;
        player.setMeta('archive_exposure', exposure);

        // --- EFFECT: Ink-Lung (Approx 1 hour exposure) ---
        if (exposure === 120 && !player.effects.has('ink_lung')) {
          const inkLung = state.EffectFactory.create('ink_lung', player);
          player.addEffect(inkLung);
          player.say("<red>The particulate ink in the air has finally settled in your chest. Every breath is a scratch on vellum.</red>");
        }

        // --- EVENT: Liang's Review & Automated Release (Approx 2 hours exposure) ---
        if (exposure >= 240) {
          this.broadcast("<magenta>The swirling ink in the room freezes in reverence as Liang Chou steps into the Margin. The text at his feet rearranges itself into a welcoming carpet of obsidian prose.</magenta>");
          
          player.say("<magenta>Liang Chou leans close, his fingers tracing a precise 'delete' sigil before your brow. Your pupils dilate... the world goes flatly blank.</magenta>");
          
          // Execute Canonical Mind-Edit
          const mindEdit = state.SpellManager.get('liang_s_mind_edit');
          if (mindEdit) {
            mindEdit.onCast(state, { name: 'Liang Chou', id: 'liang_npc' }, player, { savePassed: false });
          }

          // Mechanical Retrieval
          player.say("<cyan>You are 'read' back into reality. The yellowed parchment dissolves into the light of the material plane.</cyan>");
          
          const exitRoom = state.RoomManager.getRoom('sanctum_entrance'); 
          if (exitRoom) {
            player.moveTo(exitRoom, () => {
              player.removeEffect('redacted');
              player.setMeta('archive_exposure', 0);
              state.CommandManager.get('look').execute('', player);
            });
          }
        }

        // Random Sensory Fluff
        const roll = Math.floor(Math.random() * 100);
        if (roll > 98) {
          player.say("<cyan>You feel a strange, flat pressure against your skin. You realize you are being 'read' by an entity far above this plane.</cyan>");
        }
      });
    }
  }
};
