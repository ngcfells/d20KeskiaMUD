/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Bonds two solid surfaces together with supernatural friction. 
 * This can be used to fuse a door to its frame, a sword to its scabbard, 
 * or even a creature's hand to a wall.
 */
module.exports = {
  id: 'adhesion',
  name: 'Adhesion',
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: [], 
  source: 'Polyhedron Newszine | Wizards of the Coast | Uncommon',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Artificer: 1
   * - Greed Domain: 1
   */

  castingTime: 'full-round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'powdered_horse_hoof', 
      name: 'Powdered Horse Hoof',
      quantity: 1, 
      consumed: true 
    }
  ],

  range: 'touch',
  target: 'two solid objects or one creature and an object',
  area: null,
  duration: '1 min./level', // Converted from 1 turn/level
  savingThrow: 'reflex negates (object/creature)', 
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000; // 1 min per level

    // Logic: If the target is an unwilling creature or held item
    if (target.isCharacter && !ctx.savePassed) {
      const adhesionEffect = state.EffectFactory.create('adhesion_effect', {
        duration: duration,
        state: { 
          casterLevel: cl,
          breakDC: 20 + Math.floor(cl / 2) // Scaling Strength DC to break
        }
      });

      if (target.addEffect(adhesionEffect)) {
        // Perspective: Caster
        caster.say(`<yellow>You press your hand against the juncture. As you speak the final syllable, the surfaces fuse as if they were a single piece of stone.</yellow>`);
        
        // Perspective: Target
        target.say("<red>A sudden, unnatural stickiness binds you! You find yourself fused to the surface, your movements jerked to a halt.</red>");

        // Perspective: Room
        caster.room.broadcastExcept(caster, `<yellow>${caster.name} touches the seam between ${target.name} and the surface, which instantly fuses with a dull, grinding sound.</yellow>`, target);
      }
    } else if (target.isItem) {
      // Logic for fusing objects (e.g., a door)
      target.addEffect(state.EffectFactory.create('adhesion_object_effect', { duration }));
      caster.say(`<yellow>The ${target.name} is now supernaturally bonded to its contact point.</yellow>`);
    }
  }
};
