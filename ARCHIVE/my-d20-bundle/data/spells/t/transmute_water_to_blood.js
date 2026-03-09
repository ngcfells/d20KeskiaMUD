/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Converts a volume of water into fresh, oxygenated humanoid blood.
 * The sudden stench and sight of such gore triggers primal reactions:
 * weaker creatures flee in terror, while mindless carnivores are 
 * driven into a predatory frenzy.
 */
module.exports = {
  id: 'transmute_water_to_blood',
  name: 'Transmute Water to Blood',
  level: 5,
  school: 'transmutation',
  subschool: null,
  descriptors: ['water', 'fear'], 
  source: '& Magazine | Issue 2 | p.63',

  /**
   * SPELL LISTS:
   * - Cleric: 5
   * - Druid: 5
   * - Thirst Domain: 5
   * - Bloodline (Blood): 5
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'drop_of_blood', quantity: 1, consumed: true }
  ],

  range: 'close', 
  target: '1 cubic ft. of water/level',
  area: null,
  duration: 'permanent', 
  savingThrow: 'none (see text)',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    
    // Perspective: Room
    caster.room.broadcastExcept(caster, `<red>The water before ${caster.name} shudders and thickens, turning a deep, iron-scented crimson as it transforms into a pool of fresh blood.</red>`);
    caster.say("<red>You command the elements to shift. The water obeys, taking the form of life's essence.</red>");

    // Trigger Fear/Frenzy check for all in room
    for (const entity of caster.room.npcs) {
      if (entity.hasTag('undead') || entity.hasTag('extraplanar') || entity.getAttribute('intelligence') The scent of fresh blood hits your nostrils, igniting a mindless hunger!</red>");
      } else {
        // Fear Check
        const saveRoll = Math.floor(Math.random() * 20) + 1 + (entity.getMeta('save_will') || 0);
        if (saveRoll < finalDC) {
          const fear = state.EffectFactory.create('frightened', { duration: (Math.floor(Math.random() * 16) + 3) * 6000 });
          entity.addEffect(fear);
        }
      }
    }
  }
};
