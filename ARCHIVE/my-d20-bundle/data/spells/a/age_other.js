/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Age Other
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * A horrific crossing of Transmutation and Necromancy. The caster 
 * forcibly accelerates the target's entropy. Unlike lesser illusions, 
 * this change is physical and instantaneous.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'age_other',
  name: 'Age Other',
  level: 6,
  // Dual-School Logic: Primary Transmutation, Secondary Necromancy
  school: 'transmutation',
  subschool: 'chronomancy',
  secondarySchool: 'necromancy', 
  descriptors: ['evil'],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Chronomancer: 4
   * - Cleric: 6 (Entropy/Time Domains)
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'lock_of_elderly_hair',
      quantity: 1,
      consumed: true,
      notes: 'A lock of hair from a creature that died of natural old age.'
    }
  ],

  range: 'touch', // Original Dread Codex spec is touch
  target: 'one living creature',
  area: null,
  duration: 'instantaneous', // True age cannot be "dispelled"
  savingThrow: 'fortitude negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const dc = 10 + 6 + D20Utils.getModifier(caster.getAttribute(ability) || 10);

    if (ctx.savePassed) {
      caster.say(`<yellow>${target.name}’s vitality flares, rejecting the entropic touch.</yellow>`);
      return;
    }

    // Determine target age category shift
    const categories = ['adult', 'middle-age', 'old', 'venerable'];
    const currentAge = target.getMeta('ageCategory') || 'adult';
    const currentIdx = categories.indexOf(currentAge);
    const targetIdx = Math.min(currentIdx + 1, categories.length - 1);
    
    // Physical Penalties (Dread Codex scaling)
    const penaltyTable = [0, -1, -3, -6]; 
    const netPenalty = penaltyTable[targetIdx] - penaltyTable[currentIdx];

    // Since duration is instantaneous, we apply permanent modifiers 
    // rather than an effect that ticks/ends.
    target.addModifier('strength', netPenalty);
    target.addModifier('dexterity', netPenalty);
    target.addModifier('constitution', netPenalty);
    target.addModifier('appearance', netPenalty * 2);
    target.setMeta('ageCategory', categories[targetIdx]);

    // Perspective: Caster
    caster.say(`<red>You press the lock of hair against ${target.name}. As it withers to ash, you feel the target's years rushing through your fingertips and into their soul.</red>`);
    
    // Perspective: Target
    target.say("<bold><red>Your heart stutters as your skin thins and your joints turn to glass. You have been robbed of your prime!</red></bold>");
    
    // Perspective: Room
    caster.room.broadcastExcept(caster, `<red>${caster.name} touches ${target.name}, whose face collapses into a mask of deep wrinkles and age-spots in a terrifying blur.</red>`, target);

    // Engine Hook: Check if the CON drop kills them
    if (target.getAttribute('health') <= 0) {
       target.emit('death');
    }
  }
};
