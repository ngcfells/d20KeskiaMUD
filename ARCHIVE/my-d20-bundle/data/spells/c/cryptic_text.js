/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Cryptic Text
 * Source: & Magazine Issue 1, p.40
 * 
 * Logic:
 * - Effect: Caster writes gibberish that only they (or another with the spell) can read.
 * - Security: Immune to 'Comprehend Languages' and 'Read Magic'.
 * - Dispel: Dispel Magic erases the text (destructive).
 */
module.exports = {
  id: 'cryptic_text',
  name: 'Cryptic Text',
  level: 1,
  school: 'illusion',
  subschool: 'phantasm',
  descriptors: ['security'],
  source: '& Magazine Issue 1, p.40',

  /**
   * SPELL LISTS:
   * - Illusionist: 1
   * - Magic-User/Wizard: 2
   */

  castingTime: '1 segment',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'quill', quantity: 1, consumed: false },
    { id: 'mystical_ink', quantity: 1, consumed: true },
    { id: 'paper', quantity: 1, consumed: false }
  ],

  range: '0', 
  target: 'writing surface',
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const wordLimit = cl * 12;

    caster.say(`<cyan>Your hand feels guided by a phantom script. You may now write up to ${wordLimit} words of cryptic text.</cyan>`);

    const writingEffect = state.EffectFactory.create('cryptic_writing_active', {
      duration: 3600000, // 1 hour window to finish the task
      state: { wordLimit, creatorUuid: caster.uuid }
    });
    caster.addEffect(writingEffect);
  }
};
