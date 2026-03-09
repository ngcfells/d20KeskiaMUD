/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Create Sailors
 * Source: Adamant Entertainment | Dread Codex p.98
 * 
 * Summons a spectral, skeletal crew specifically attuned to the 
 * riggings and rhythms of a ship. These servitors are tireless 
 * but require the caster's constant focus to maintain their 
 * maritime efficiency.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'create_sailors',
  name: 'Create Sailors',
  level: 6,
  school: 'necromancy',
  subschool: 'summoning',
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.98',

  /**
   * SPELL LISTS:
   * - Bard: 5 (Sea Shanties Required)
   * - Sorcerer/Wizard: 6
   * - Death Domain: 6
   */
  castingTime: '10 minutes',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'drowned_men_remains',
      quantity: 5,
      consumed: true,
      notes: 'The bones or remains of 5 men who died by drowning.'
    }
  ],

  range: 'close', 
  target: 'one ship',
  area: null,
  duration: '1 hour/level, concentration discharge (D)',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000;
    const crewCount = cl * 5;

    const crewEffect = state.EffectFactory.create('undead_crew_effect', {
      duration: duration,
      state: { 
        casterId: caster.id,
        crewCount: crewCount
      }
    });

    if (target.addEffect(crewEffect)) {
      // Perspective: Caster
      if (caster.getMeta('class') === 'bard') {
        caster.say("<cyan>You begin a low, haunting sea shanty. From the deck planks and the sea foam, the skeletal remains of drowned sailors pull themselves upright.</cyan>");
      } else {
        caster.say("<cyan>You command the spirits of the deep. Skeletal sailors manifest across the deck, awaiting your mental direction.</cyan>");
      }
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>The ship groans as ${crewCount} skeletal sailors manifest from the shadows of the mast and the bilge, immediately taking their stations.</cyan>`);
    }
  },

  onTick(state, caster, effect) {
    // Concentration Check: If caster moves or performs other actions, crew fails
    if (!caster.getMeta('isConcentrating')) {
      state.Broadcast.sayAt(effect.target, "The skeletal crew goes limp, hanging from the riggings like marionettes with cut strings.");
    }
  }
};
