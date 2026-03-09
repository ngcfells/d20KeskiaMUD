/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Temporarily reanimates every corpse in the vicinity into a mindless 
 * skeletal or zombie legion. These entities are not truly controlled; 
 * they act as a chaotic hazard that lashes out at all life except 
 * for the one who woke them.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'animate_legion',
  name: 'Animate Legion',
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Relics & Rituals | Sword & Sorcery Studio | p.53',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Cleric: 4
   * - War Domain: 4
   */

  castingTime: '1 standard action',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'onyx_dust', 
      quantity: 1, 
      minValue: 100, 
      consumed: true, 
      notes: 'Finely ground onyx worth at least 100 gp, scattered into the air.' 
    }
  ],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'all corpses in area',
  area: '100-ft. radius spread',
  duration: '1 round/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 6000; // 1 round (6s) per level

    // Search room for all corpse items
    const corpses = caster.room.items.filter(i => i.getMeta('isCorpse'));

    if (corpses.length === 0) {
      return caster.say("There are no fallen here to answer your call.");
    }

    caster.say(`<magenta>You scatter the onyx dust. As it touches the ground, the corpses of the fallen begin to twitch and claw their way back to a mockery of life!</magenta>`);
    caster.room.broadcastExcept(caster, `<magenta>${caster.name} scatters dark dust across the battlefield. The dead begin to rise in unison, a silent, skeletal legion forming from the carnage.</magenta>`);

    corpses.forEach(corpse => {
      const legionEffect = state.EffectFactory.create('animate_legion_effect', {
        duration: duration,
        state: { casterId: caster.id }
      });

      // We apply the effect to the "Corpse" which temporarily transforms it into an NPC
      // Or spawn a temporary NPC 'legionnaire' at the corpse's location.
      this.spawnLegionnaire(state, caster, corpse, duration);
    });
  },

  spawnLegionnaire(state, caster, corpse, duration) {
    // Create the NPC from the template defined in NPCs.yml
    const npc = state.MobFactory.create(caster.room.area, 'legionnaire_skeleton');
    
    // Crucial: Set the Master ID so the behavior knows who NOT to kill
    npc.setMeta('master', caster.id);
    npc.setMeta('isTemporary', true);
    
    // Move to the room where the corpse was
    npc.moveTo(caster.room);
    
    // Add the duration effect so it collapses when the spell ends
    const expiry = state.EffectFactory.create('summon_duration', { 
      duration,
      config: { name: "Necrotic Pulse" } 
    });
    npc.addEffect(expiry);

    // Visual: The corpse is gone, the skeleton is here
    corpse.destroy(); 
  }
};
