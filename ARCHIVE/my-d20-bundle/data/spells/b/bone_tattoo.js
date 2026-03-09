/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Bone Tattoo
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * Inscribes a spectral, bone-white skull-and-bones pattern onto the skin.
 * The subject gains the cold and mental resilience of the grave, and 
 * mindless undead perceive them as a peer. However, the subject becomes 
 * susceptible to being turned by divine energy.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'bone_tattoo',
  name: 'Bone Tattoo',
  level: 3,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Death Domain: 3
   * - Pale Master: 2
   */
  castingTime: '1 minute', 
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'white_ink_vial',
      quantity: 1,
      consumed: true,
      notes: 'A small vial of white ink mixed with powdered bone.'
    },
    {
      id: 'tattoo_needle',
      quantity: 1,
      consumed: false,
      notes: 'A silver or bone needle used to channel the magic.'
    }
  ],

  range: 'touch',
  target: 'one living creature',
  area: null,
  duration: '1 minute/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000; // 1 minute per level

    const tattooEffect = state.EffectFactory.create('bone_tattoo_effect', {
      duration: duration,
      state: { 
        srBonus: 10 + cl,
        casterId: caster.id 
      }
    });

    if (target.addEffect(tattooEffect)) {
      // Perspective: Caster
      caster.say(`<magenta>You carefully trace the needle across ${target.name}'s flesh. A bone-white pattern of skulls and crossbones seeps into their skin, glowing with a faint, necrotic light.</magenta>`);
      
      // Perspective: Target
      target.say("<magenta>A chilling numbness spreads from the site of the tattoo. Your thoughts grow cold and distant, and your heartbeat feels like a slow, heavy drum.</magenta>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<magenta>${caster.name} tattoos a ghastly bone-white pattern onto ${target.name}. The markings pulse with a rhythmic, pale light.</magenta>`, target);
    }
  }
};
