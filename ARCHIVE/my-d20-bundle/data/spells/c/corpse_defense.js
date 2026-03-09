/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Corpse Defense
 * Source: Adamant Entertainment | Dread Codex p.98
 * 
 * Draws the life-fluid from the fallen to create lashing tentacles of 
 * clotted gore. These horrors remain tethered to their host corpses, 
 * strangling and drowning any foes who draw near.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'corpse_defense',
  name: 'Corpse Defense',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil', 'blood'], 
  source: 'Adamant Entertainment | Dread Codex p.98',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Death Domain: 5
   * - Hunger Domain: 5
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    {
      id: 'strangled_mans_dirt',
      quantity: 1,
      consumed: true,
      notes: 'A handful of dirt taken from the grave of a man who was strangled.'
    }
  ],

  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'all corpses and dying creatures in range',
  area: 'burst',
  duration: '1 hour/level', 
  savingThrow: 'fortitude negates (dying only)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000;
    const maxTentacles = Math.min(20, cl);
    let createdCount = 0;

    // Scan room for corpses (items with 'isCorpse' flag) and dying NPCs/Players
    const candidates = [
      ...caster.room.items.filter(i => i.getMeta('isCorpse')),
      ...caster.room.npcs.filter(n => n.getAttribute('health') <= 0)
    ];

    for (const body of candidates) {
      if (createdCount >= maxTentacles) break;

      // Dying creatures get a save
      if (body.isCharacter && body.getAttribute('health') <= 0) {
        const dc = 10 + 5 + D20Utils.getModifier(caster.getAttribute('intelligence'));
        const save = Math.floor(Math.random() * 20) + 1 + (body.getMeta('save_fortitude') || 0);
        if (save >= dc) continue;
        
        // Per source: Dying creatures are killed immediately on failed save
        body.setAttribute('health', -10);
        body.emit('death');
      }

      const tentacleEffect = state.EffectFactory.create('blood_tentacle_defense', {
        duration: duration,
        state: { 
          casterId: caster.id,
          sourceName: body.name,
          hp: (body.getMeta('hit_dice') || 1) + Math.floor(cl / 2)
        }
      });

      if (caster.room.addEffect(tentacleEffect)) {
        createdCount++;
      }
    }

    if (createdCount > 0) {
      caster.say(`<red>You cast the grave-dirt into the air. ${createdCount} corpses shudder as their blood erupts in thick, coiling ropes of black ichor!</red>`);
      caster.room.broadcastExcept(caster, `<red>Black, clotted blood geysers out of the fallen, forming rhythmic, lashing tentacles that guard ${caster.name}.</red>`);
    } else {
      caster.say("<yellow>There are no suitable remains here to fuel your defense.</yellow>");
    }
  }
};
