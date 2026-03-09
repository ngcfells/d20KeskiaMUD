/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Anonymity
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 1, p.40
 * 
 * Logic:
 * - Interaction: Caster behaves normally; targets notice nothing during contact.
 * - Post-Interaction: Targets failing a Will save cannot recall description/details.
 * - Mechanics: Blurs "look" descriptions and "who" visibility for the duration.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'anonymity',
  name: 'Anonymity',
  level: 1,
  school: 'illusion',
  subschool: 'phantasm',
  descriptors: ['enchantment', 'charm', 'mind-affecting'],
  source: '& Magazine Issue 1, p.40',

  /**
   * SPELL LISTS:
   * - Illusionist: 1
   * - Magic-User/Witch: 2
   * - Cleric (Deceit/Thievery): 2
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 segment', // ~1 round in d20
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'bit_of_wool', 
      quantity: 1, 
      consumed: true,
      notes: 'A bit of wool to "pull over the eyes" of others.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  duration: '1 turn/level', // 10 mins/level in d20 conversion
  savingThrow: 'will negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, "<cyan>You rub the wool between your fingers and whisper a forgettable phrase. Your features seem to ripple slightly, then settle into a nondescript normalcy.</cyan>");

    const anonymityEffect = state.EffectFactory.create('anonymity_aura', {
      duration: cl * 600000, // 10 minutes per level
    });

    caster.addEffect(anonymityEffect);
  }
};
