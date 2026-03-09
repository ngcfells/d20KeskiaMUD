/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Merging the precision of High Shou calligraphy with Thayan conjuration. 
 * The caster uses their masterwork quill to "write" projectiles into the air. 
 * These quills are not merely wood and feather; they are reinforced with 
 * force-energy and honed to a molecular edge, seeking out the gaps in 
 * an opponent's armor like a scholar seeking a typo.
 */
const DamageTypes = require('../../../lib/combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_quill_barrage',
  name: "Liang's Spectral Quill Barrage",
  level: 3,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['force'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Knowledge Domain: 3
   * - Rarity: Rare (Liang Sect Battle-Scribes)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  focus: {
    id: 'masterwork_quill',
    notes: 'A masterwork quill, often tipped with silver or mythril.'
  },

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium', // 100 ft + 10 ft/level
  target: 'one or more creatures',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'reflex-half',
  spellResistance: false, // Created objects typically ignore SR

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    // 1 quill per 2 levels, minimum 1, maximum 5.
    const quillCount = Math.min(Math.floor(casterLevel / 2) || 1, 5);
    
    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<cyan>You slash your masterwork quill through the air in a series of sharp, punctuated strokes. With every 'click' of the nib, a translucent, ivory-colored quill manifests in the air, vibrating with lethal intent.</cyan>`);
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} executes a rapid sequence of calligraphic gestures. ${quillCount} spectral quills, each as long as a dagger and honed to a wicked point, materialize and hiss toward their target.</cyan>`);

    let totalDamage = 0;
    for (let i = 0; i < quillCount; i++) {
        const roll = Math.floor(Math.random() * 4) + 1;
        totalDamage += (roll + 1);
    }

    // Saving Throw Logic
    const dc = 10 + 3 + Math.floor(((caster.getAttribute('intelligence') || 10) - 10) / 2);
    const roll = Math.floor(Math.random() * 20) + 1;
    const refSave = (target.getAttribute('reflex') || 0) + roll;

    if (refSave >= dc) {
        totalDamage = Math.floor(totalDamage / 2);
        this.emotes.evaded(target, caster);
    } else {
        this.emotes.impact(target, caster);
    }

    // Apply Damage (Piercing subtype of Kinetic)
    if (typeof target.takeDamage === 'function') {
        target.takeDamage(totalDamage, DamageTypes.SUBTYPES.PIERCING, caster);
    }
  },

  emotes: {
    impact: (target, caster) => {
      target.say(`<red>The spectral quills slam into you, piercing leather and mail with the sound of a hot needle through silk. The points break off in your flesh, throbbing with a cold, analytical pain.</red>`);
      target.room.broadcastExcept([caster, target], `<red>The volley of quills strikes ${target.name} with unerring precision, blossoming like a grisly white flower from their chest and shoulders.</red>`);
    },
    evaded: (target, caster) => {
      target.say(`<yellow>You twist violently as the quills whistle past. Several graze your skin, leaving thin, burning lines, but the main barrage thumps harmlessly into the wall behind you.</yellow>`);
      target.room.broadcastExcept([caster, target], `<yellow>${target.name} lunges to the side, narrowy avoiding the full force of the spectral barrage.</yellow>`);
    }
  }
};
