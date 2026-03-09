/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Forensically analyzes a biological remain (bone, organ, etc.).
 * Reveals the original race, age at death, and time since death.
 *
 * Implementation Logic & Metadata
 * To ensure this spell works automatically, your item generation for "bones" or "corpses"
 * should include the following metadata in their .yml or .js definitions:
 *    originalRace: The race of the NPC/PC the remains came from.
 *    genderAtDeath: The gender of the NPC/PC at time of death that the remains came from.
 *    ageAtDeath: The age attribute of the creature when it died.
 *    timestampDeath: The Date.now() value recorded when the creature's die() method was called.
 *    isRemain: A boolean flag identifying the item as a valid target for necro-forensics.
 */
module.exports = {
  id: 'analyze_remains',
  name: 'Analyze Remains',
  level: 2,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'Homebrew. Author: Chris Fells 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Cleric: 2
   * - Druid: 2
   * - Death Domain: 1
   * - Rarity: Common (Standard for investigators and necromancers)
   */

  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'magnifying_glass_lens', 
      quantity: 1, 
      consumed: false, 
      notes: 'A small glass lens or magnifying glass.' 
    }
  ],

  range: 'touch',
  target: 'one biological remain (bone, organ, etc.)',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    // 1. Verify Target: Must be biological matter/remains
    const isBiological = target.getMeta('isRemain') || target.getMeta('creatureType') === 'undead' || target.id.includes('bone');
    
    if (!isBiological) {
      caster.say("<red>The spell finds no biological history to unravel within that object.</red>");
      return;
    }

    // 2. Extract Metadata
    const originalRace = target.getMeta('originalRace') || 'Unknown';
    const genderAtDeath = target.getMeta('genderAtDeath') || 'Unknown';
    const ageAtDeath = target.getMeta('ageAtDeath') || 'Unknown';
    const timeOfDeath = target.getMeta('timestampDeath') || 0; 
    
    // Calculate time since death
    const currentTime = Date.now();
    const timeSinceDeathMs = currentTime - timeOfDeath;
    const daysSinceDeath = Math.floor(timeSinceDeathMs / (1000 * 60 * 60 * 24));

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<cyan>You peer through the lens, chanting a soft, analytical mantra. The remains begin to glow with a faint, spectral blueprint of their former self.</cyan>`);
    
    // Results
    caster.say(`<white>--- Forensic Report ---</white>`);
    caster.say(`<white>Original Race:</white> <yellow>${originalRace}</yellow>`);
    caster.say(`<white>Gender at Death:</white> <yellow>${genderAtDeath}</yellow>`);
    caster.say(`<white>Age at Death:</white> <yellow>${ageAtDeath} years</yellow>`);
    caster.say(`<white>Time Since Death:</white> <yellow>${daysSinceDeath} days</yellow>`);

    target.room.broadcastExcept(caster, `<cyan>${caster.name} examines ${target.name} through a lens, whispering incantations as a ghostly image of a ${originalRace} flickers briefly over the remains.</cyan>`);
  }
};
