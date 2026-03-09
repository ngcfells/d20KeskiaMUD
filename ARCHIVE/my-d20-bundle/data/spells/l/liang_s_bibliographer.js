/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Liang's Automated Bibliographer
 * Source: Homebrew | Author: Chris Fells (2026)
 *
 * Summons three spectral, multi-armed servitors to catalog every
 * piece of written knowledge in the area. They ignore mundane
 * clutter, focusing solely on transcribing titles, authors,
 * and magical auras into a mental ledger for the caster.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  id: 'liang_s_bibliographer',
  name: "Liang's Automated Bibliographer",
  level: 2,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [],
  source: 'Homebrew | Chris Fells | 2026',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Knowledge Domain: 1
   */

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  range: 'close',
  target: 'area',
  area: 'one MUD room',
  duration: '1 hour/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000;

    const bibliographerEffect = state.EffectFactory.create('automated_bibliographer_effect', {
      duration: duration,
      state: { casterId: caster.id }
    });

    if (caster.room.addEffect(bibliographerEffect)) {
      // Perspective: Caster
      caster.say("<cyan>You snap your fingers, and three translucent, multi-armed librarians manifest. They immediately begin floating through the room, their many hands blurring as they pull volumes from shelves.</cyan>");

      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>Three spectral figures with too many limbs manifest around ${caster.name} and begin a frantic, silent cataloging of every book in the vicinity.</cyan>`);

      // 1. Initial Scan Trigger
      bibliographerEffect.emit('performCatalog');
    }
  }
};
