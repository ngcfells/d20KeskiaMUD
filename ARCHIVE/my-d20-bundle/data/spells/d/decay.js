/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Decay
 * Source: Adamant Entertainment | Dread Codex p.101
 * 
 * Reduces biological remains to fine, inert dust. Against the living dead, 
 * it acts as a corrosive force of natural entropy. Remains destroyed 
 * by this spell are beyond the reach of standard necromancy.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'decay',
  name: 'Decay',
  level: 2,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.101',

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Ranger: 2
   * - Plant Domain: 2
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'XP'],
  
  materialComponents: [
    {
      id: 'dried_seed_powder',
      quantity: 1,
      consumed: true,
      notes: 'A fine powder made of various dried seeds.'
    }
  ],

  xpCost: 50,

  range: 'touch',
  target: 'one creature or corpse touched',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will partial (see text)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    // 1. DEDUCT XP COST
    const currentXp = caster.getMeta('experience') || 0;
    if (currentXp < this.xpCost) {
      return caster.say("You lack the spiritual essence (XP) to fuel this entropic shift.");
    }
    caster.setMeta('experience', currentXp - this.xpCost);

    // 2. LOGIC: Non-animated Corpse
    if (target.getMeta('isCorpse') && !target.hasTag('undead')) {
      caster.say(`<green>You touch the remains of ${target.name}. They instantly crumble into a fine, scentless grey dust.</green>`);
      target.room.broadcastExcept(caster, `<green>${caster.name} touches the corpse of ${target.name}, which dissolves into dust and blows away.</green>`);
      target.setMeta('cannot_be_animated', true);
      target.destroy();
      return;
    }

    // 3. LOGIC: Undead Target
    if (target.hasTag('undead')) {
      const cl = caster.getMeta('level') || 1;
      const ability = caster.getMeta('spellcastingAbility') || 'wisdom';
      const dc = 10 + 2 + D20Utils.getModifier(caster.getAttribute(ability) || 10);
      const saveRoll = Math.floor(Math.random() * 20) + 1 + (target.getMeta('save_will') || 0);

      // Failed Save: Instant Destruction
      if (saveRoll < dc) {
        caster.say(`<green>Your touch surrenders the ${target.name} back to the earth. It shatters into dust!</green>`);
        target.room.broadcastExcept(caster, `<green>${caster.name} touches the ${target.name}. The undead screeches as its bones turn to powder.</green>`, target);
        target.setMeta('cannot_be_animated', true);
        target.emit('death');
        target.destroy();
      } 
      // Successful Save: 1d4 + 1/level damage
      else {
        const bonus = Math.min(10, cl);
        const damage = (Math.floor(Math.random() * 4) + 1) + bonus;
        
        target.receiveDamage('kinetic', damage, caster);
        caster.say(`<yellow>${target.name} resists the total decay, but its form withers under your touch.</yellow>`);
        
        // If damage kills it, it still turns to dust
        if (target.getAttribute('health') <= 0) {
          target.setMeta('cannot_be_animated', true);
          target.say("<red>Your form collapses into a heap of fine dust.</red>");
        }
      }
    } else {
      caster.say("The spell has no effect on the vibrant energies of the living.");
    }
  }
};
