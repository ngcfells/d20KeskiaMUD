/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Accuracy / Inaccuracy (Reversible)
 * Source: WotC | Oriental Adventures / Priest's Spell Compendium Vol 1, p.11
 * 
 * Logic:
 * - Target: 1 missile per level (Arrows, bolts, stones, etc.).
 * - Effect: Doubles all range increments for the enchanted missiles.
 * - Constraint: Only affects man-sized thrown/discharged items (No siege/giant weapons).
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'accuracy',
  name: 'Accuracy',
  level: 1,
  school: 'enchantment',
  subschool: 'geometry',
  descriptors: ['oriental'],
  source: "Oriental Adventures / Priest's Spell Compendium Vol 1, p.11",

  /**
   * SPELL LISTS:
   * - Wu Jen: 1
   * - Shugenja: 1 (Air/Wood)
   * - Archer Domain: 1
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'calligraphy_brush', 
      quantity: 1, 
      consumed: false,
      notes: 'A fine brush used to ink mystical characters.' 
    },
    {
      id: 'mystical_ink',
      quantity: 1, // 1 'dose' per casting
      consumed: true,
      notes: 'Dark, enchanted ink.'
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '10 ft.',
  target: '1 missile per level',
  area: 'group of projectiles',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // Find missiles in inventory (Arrows, Bolts, Darts, etc.)
    const missiles = caster.inventory.filter(i => i.hasTag('projectile') || i.hasTag('thrown_weapon')).slice(0, cl);

    if (missiles.length === 0) {
      return B.sayAt(caster, "<yellow>You have no suitable missiles to enchant with the characters of precision.</yellow>");
    }

    B.sayAt(caster, `<cyan>You deftly paint glowing silver characters onto ${missiles.length} of your missiles. They begin to hum with a subtle, aerodynamic frequency.</cyan>`);
    B.sayAtExcept(caster.room, `<cyan>${caster.name} paints glowing glyphs onto their ammunition, which begins to pulse with a faint, steady light.</cyan>`, [caster]);

    missiles.forEach(item => {
      const accuracyEffect = state.EffectFactory.create('accuracy_enchantment', {
        duration: cl * 6000
      });
      item.addEffect(accuracyEffect);
      item.name = `<cyan>Accurate ${item.name}</cyan>`;
    });
  }
};
