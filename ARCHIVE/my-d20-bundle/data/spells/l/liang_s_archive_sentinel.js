/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Liang's Archive Sentinel
 * Source: Homebrew | Author: Chris Fells (2026)
 * 
 * Binds a lethal abjuration to a specific object or portal. The ward 
 * tracks the object's physical location; if moved without the caster's 
 * blessing, it lashes out with a mental alert and a potent curse.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  id: 'liang_s_archive_sentinel',
  name: "Liang's Archive Sentinel",
  level: 4,
  school: 'abjuration',
  subschool: null,
  descriptors: ['curse', 'mind-affecting'], 
  source: 'Homebrew | Chris Fells | 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Bard: 4
   * - Knowledge Domain: 4
   */

  castingTime: '10 minutes',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'silver_bell', 
      quantity: 1, 
      consumed: false, 
      notes: 'A small silver bell focus.' 
    },
    { 
      id: 'drop_of_blood', 
      quantity: 1, 
      consumed: true, 
      notes: 'A drop of the caster\'s blood to tune the ward.' 
    }
  ],

  range: 'touch',
  target: 'one object (book, shelf, or door)',
  area: null,
  duration: 'permanent', 
  savingThrow: 'none (object)',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const sentinelEffect = state.EffectFactory.create('archive_sentinel_ward', {
      duration: Infinity,
      state: { 
        casterId: caster.id,
        originRoomId: caster.room.id,
        targetName: target.name
      }
    });

    if (target.addEffect(sentinelEffect)) {
      // Perspective: Caster
      caster.say(`<magenta>You mingle your blood with the silver chime. As the sound fades, a web of invisible, jagged lines sinks into ${target.name}. It is now your silent sentinel.</magenta>`);
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<magenta>${caster.name} whispers a harsh command over ${target.name}, and the air around the object briefly turns a bruised purple.</magenta>`);

      target.setMeta('warded_by', caster.id);
      target.setMeta('home_room', caster.room.id);
    }
  }
};
