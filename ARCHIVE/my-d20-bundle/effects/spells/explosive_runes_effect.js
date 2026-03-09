'use strict';

/**
 * Explosive Runes Effect
 * ---------------------
 * A magical trap that detonates upon being read. 
 * Deals 6d6 force damage; no save for the reader, Reflex half for others within 10ft.
 */
module.exports = {
  config: {
    name: "Explosive Runes",
    description: "Magical runes that detonate when read.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    casterId: null,
    damage: '6d6',
    dc: 15
  },
  listeners: {
    /**
     * Triggered when a player uses the 'read' command on the object.
     */
    onRead: state => function (reader, result) {
      const spellDef = state.SpellManager.get('explosive_runes');

      // Caster and those instructed can read safely
      if (reader.id === this.state.casterId || reader.getMeta('authorized_reader')) {
        return; 
      }

      // Detonate!
      if (spellDef.emotes.trigger) spellDef.emotes.trigger(reader, this.target);
      this.emit('detonate', reader);
      
      // Prevent the actual text from being read (if it wasn't destroyed)
      result.cancel = true;
    },

    /**
     * Detonation Logic
     */
    detonate: state => function (reader) {
      const room = reader.room;
      const DamageTypes = require('../../lib/combat/damage-types');
      
      // Calculate Damage (6d6 Force)
      let totalDamage = 0;
      for (let i = 0; i < 6; i++) {
        totalDamage += Math.floor(Math.random() * 6) + 1;
      }

      // 1. Reader takes full damage, no save
      reader.takeDamage(totalDamage, DamageTypes.FORCE, this.state.casterId);

      // 2. Area effect for others within 10ft (same room in MUD)
      const others = room.players.concat(room.npcs).filter(e => e.id !== reader.id);
      others.forEach(entity => {
          const roll = Math.floor(Math.random() * 20) + 1;
          const refSave = (entity.getAttribute('reflex') || 0) + roll;
          
          let finalDamage = totalDamage;
          if (refSave >= this.state.dc) {
              finalDamage = Math.floor(totalDamage / 2);
              entity.say("<yellow>You dive for cover as the blast erupts, shielding yourself from the brunt of the force.</yellow>");
          } else {
              entity.say("<red>The concussive wave of the blast slams into you!</red>");
          }
          entity.takeDamage(finalDamage, DamageTypes.FORCE, this.state.casterId);
      });

      // 3. Destroy the object (unless it's an artifact)
      if (!this.target.getMeta('indestructible')) {
        room.broadcast(`<grey>${this.target.name} is shredded into a cloud of useless confetti and splinters.</grey>`);
        this.target.remove();
      }
      
      this.remove(); // The trap is spent
    }
  }
};
