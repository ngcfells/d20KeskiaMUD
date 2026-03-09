/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Dark Channeling
 * Source: Adamant Entertainment | Dread Codex p.100
 * 
 * Projects the caster's psyche into a corporeal undead host. The caster 
 * commands the vessel's physical form and special abilities, while 
 * their own body remains in a vulnerable, suspended state.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'dark_channeling',
  name: 'Dark Channeling',
  level: 8,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil', 'mind-affecting'],
  source: 'Adamant Entertainment | Dread Codex p.100',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 8
   * - Death Domain: 8
   */
  castingTime: '1 minute',
  components: ['V', 'S', 'F'],
  
  focusComponents: [
    {
      id: 'bronze_brazier',
      name: 'Bronze Brazier',
      notes: 'Requires 1,000gp worth of incense burned within.'
    },
    {
      id: 'sentient_flesh_cap',
      name: 'Cap of Sentient Flesh',
      notes: 'Must be worn during the casting.'
    }
  ],

  range: 'long', // 400 ft. + 40 ft./level
  target: 'one corporeal undead creature',
  area: null,
  duration: '10 minutes/level (D)',
  savingThrow: 'will negates (see text)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. Requirement: Line of Sight and Corporeal Undead
    if (!target.hasTag('undead') || target.hasTag('incorporeal')) {
      return caster.say("Your psyche can only anchor to a physical vessel of the dead.");
    }

    // 2. Intelligent Undead Save
    if (target.getAttribute('intelligence') >= 3 && ctx.savePassed) {
       return caster.say("<red>The undead's will is a fortress; your psyche is rebuffed!</red>");
    }

    const cl = caster.getMeta('level') || 1;
    const duration = cl * 600000; // 10 mins per level

    const channelEffect = state.EffectFactory.create('dark_channeling_effect', {
      duration: duration,
      state: { 
        casterId: caster.id,
        originalRoomId: caster.room.id,
        rangeLimit: 400 + (40 * cl)
      }
    });

    if (target.addEffect(channelEffect)) {
      caster.addTag(' psyche_projected');
      caster.say("<magenta>Your vision blurs as your soul is pulled from your marrow and thrust into the cold, dead meat of the host.</magenta>");
      target.say(`<magenta>Your consciousness floods with the memories and power of ${caster.name}!</magenta>`);
    }
  }
};
