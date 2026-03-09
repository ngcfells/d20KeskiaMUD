/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Anarchic Water
 * Source: WotC | Spell Compendium p.11
 * 
 * Logic:
 * - Requirement: Caster must be Chaotic.
 * - Casting Time: 1 Minute (Requires out-of-combat state).
 * - Result: Transmutes 1 flask of water into Anarchic Water.
 * - Damage: 2d4 vs Lawful Outsiders (1 splash damage to Lawful within 5ft).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'anarchic_water',
  name: 'Anarchic Water',
  level: 4,
  school: 'transmutation',
  descriptors: ['chaotic'],
  source: 'WotC | Spell Compendium p.11',

  castingTime: 60000, // 1 minute in ms (60 seconds)
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'powdered_silver',
      quantity: 1,
      minValue: 25,
      consumed: true,
      notes: 'Powdered silver worth 25 gp.'
    },
    {
      id: 'water_flask',
      quantity: 1,
      consumed: true,
      notes: 'A standard flask of pure water.'
    }
  ],

  range: 'touch',
  target: 'one flask of water',
  duration: 'instantaneous',
  savingThrow: 'will negates (object)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // 1. ALIGNMENT VALIDATION
    // Standard d20 rule: [Chaotic] spells cannot be cast by Lawful characters.
    const alignLaw = caster.getAttribute('alignment_law') || 0;
    if (alignLaw > 0) {
      return Broadcast.sayAt(caster, "<red>The ordered nature of your soul prevents you from imbuing the water with chaos.</red>");
    }

    // 2. ITEM TRANSFORMATION
    // We check the caster's inventory or the target for a valid water flask.
    const flask = target || caster.inventory.findItem('water_flask');
    if (!flask) {
      return Broadcast.sayAt(caster, "You need a flask of water to imbue.");
    }

    /**
     * Logic: Replace the mundane water with a 'grenade' type item.
     * This item will have a custom 'onUse' or 'onThrow' trigger.
     */
    const anarchicFlask = state.ItemFactory.create(state.AreaManager.getArea('limbo'), 'anarchic_water_flask');
    
    // Transfer ownership
    caster.removeItem(flask);
    caster.addItem(anarchicFlask);

    // 3. ROOM EMOTES
    Broadcast.sayAt(caster, `<bold><magenta>You stir the silver dust into the water. It begins to swirl with erratic, iridescent colors!</magenta></bold>`);
    Broadcast.sayAtExcept(caster.room, `<magenta>${caster.name} chants a discordant litany over a flask, which begins to glow with shifting, chaotic light.</magenta>`, [caster]);
  },

  /**
   * ITEM PROTOTYPE LOGIC (Pseudo-code for the resulting item)
   * This is how the 'anarchic_water_flask' should behave in your engine:
   */
  onThrow(state, thrower, target) {
    if (target.getAttribute('alignment_law') > 0 && target.hasTag('outsider')) {
       const damage = state.Dice.roll('2d4');
       state.Damage.apply({ amount: damage, type: 'chaotic', attacker: thrower, target: target, source: "Anarchic Water" });
       
       // Splash Logic
       target.room.characters.forEach(nearby => {
         if (nearby !== target && nearby.getAttribute('alignment_law') > 0) {
           state.Damage.apply({ amount: 1, type: 'chaotic', attacker: thrower, target: nearby });
         }
       });
    }
  }
};
