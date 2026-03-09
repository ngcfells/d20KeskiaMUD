'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Awakens an animal or tree to human-like sentience. 
 * Increases Intelligence, Charisma, and Hit Dice permanently.
 */
module.exports = {
  id: 'awaken',
  name: 'Awaken',
  level: 5,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Standard',

  castingTime: '24 hours',
  components: ['V', 'S', 'M', 'DF'],
  
  materialComponents: [
    { id: 'herbs_and_oils', quantity: 1, minValue: 250, consumed: true }
  ],

  range: 'touch',
  target: 'animal or tree',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    // Validation: Target must be a non-sentient animal or plant
    const isAnimal = target.getMeta('race_type') === 'animal';
    const isPlant = target.getMeta('race_type') === 'plant';

    if (!isAnimal && !isPlant) {
      return caster.say("<yellow>You can only awaken animals or trees.</yellow>");
    }

    caster.say(`<cyan>You conclude the 24-hour ritual. A spark of true consciousness ignites within ${target.name}.</cyan>`);
    
    // Logic: Intelligence = 3d6, Charisma += 1d3, HD += 2
    const newInt = state.Dice.roll('3d6').total;
    const chaBonus = state.Dice.roll('1d3').total;
    
    target.setAttributeBase('intelligence', newInt);
    target.addModifier({ stat: 'charisma', value: chaBonus, type: 'untyped' });
    
    if (target.gainHitDice) {
      target.gainHitDice(2);
    }

    target.setMeta('isAwakened', true);
    target.setMeta('sentient', true);
    
    target.say("<white>The fog in your mind clears. For the first time, you understand the world around you.</white>");
    target.room.broadcastExcept([caster, target], `<white>${target.name} blinks with a newfound, startling intelligence.</white>`);
  }
};
