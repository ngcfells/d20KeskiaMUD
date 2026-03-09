/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Cone of Stupidity
 * Source: Adamant Entertainment | Dread Codex p.97
 * 
 * Exhales a cloud of necrotic spores that infiltrate the nervous system.
 * Targets suffer immediate and recurring Intelligence loss as the 
 * spores consume brain tissue.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'cone_of_stupidity',
  name: 'Cone of Stupidity',
  level: 6,
  school: 'necromancy',
  subschool: null,
  descriptors: ['poison', 'disease'],
  source: 'Adamant Entertainment | Dread Codex p.97',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Druid: 6
   * - Pestilence Domain: 6
   */
  castingTime: '5 minutes', // Note: High casting time per source
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'plague_flesh',
      quantity: 1,
      consumed: true,
      notes: 'A piece of flesh harvested from a victim of a magical plague.'
    }
  ],

  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'all in cone',
  area: 'cone',
  duration: '1 hour/level (D)',
  savingThrow: 'fortitude negates (recurring)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000; // 1 hour per level
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const dc = 10 + 6 + D20Utils.getModifier(caster.getAttribute(ability) || 10);

    // Perspective: Caster
    caster.say("<green>You inhale deeply, then exhale a thick, grey cloud of microscopic spores that roil forward.</green>");
    
    // Perspective: Room
    caster.room.broadcastExcept(caster, `<green>${caster.name} exhales a cone-shaped cloud of sickly grey spores that fills the air with a sweet, cloying scent of rot.</green>`);

    // Get all targets in the cone area
    const targets = caster.room.getEntitiesInArea('cone', 30);

    targets.forEach(t => {
      if (t === caster) return;

      const saveRoll = Math.floor(Math.random() * 20) + 1 + (t.getMeta('save_fortitude') || 0);
      
      if (saveRoll < dc) {
        const sporeEffect = state.EffectFactory.create('brain_spore_infection', {
          duration: duration,
          state: { 
            dc: dc,
            casterId: caster.id 
          }
        });
        
        if (t.addEffect(sporeEffect)) {
          t.say("<red>The spores burn your throat and nostrils as you inhale them. A strange fog begins to cloud your thoughts.</red>");
        }
      } else {
        t.say("<yellow>You cover your face, managing to cough out the worst of the grey dust.</yellow>");
      }
    });
  }
};
