/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You must succeed on a ranged touch attack to strike your target.
 * A grey beam of crackling energy lances from your finger, 
 * severing the target's connection to the weave of magic.
 */
const Defense = require('../../lib/combat/defense');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'antimagic_ray',
  name: 'Antimagic Ray',
  level: 7,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Spell Compendium | p. 14',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 7
   * - Spell Domain: 7
   * - Rarity: Rare
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'iron_filings', 
      quantity: 1, 
      consumed: true, 
      notes: 'A pinch of iron filings or powdered iron.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', // 25 ft + 5 ft/2 levels
  target: 'creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'will', // Will negates
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Ranged Touch Attack
    const targetAC = Defense.getAC(target, { isTouch: true });
    const dexMod = Math.floor(((caster.getAttribute('dexterity') || 10) - 10) / 2);
    const attackRoll = Math.floor(Math.random() * 20) + 1;
    const totalAttack = attackRoll + (caster.getMeta('bab') || 0) + dexMod;

    if (totalAttack < targetAC) {
      caster.say(`<white>Your grey ray streaks toward ${target.name} but hisses harmlessly into the floor.</white>`);
      target.say(`<white>A pale grey beam flashes past you, leaving a trail of dead-magic ozone.</white>`);
      return;
    }

    // 2. Check Saving Throw (handled by engine ctx)
    if (ctx.savePassed) {
      caster.say(`<white>${target.name} shudders as the ray strikes, but their magical essence remains intact.</white>`);
      target.say(`<cyan>You feel a cold, sucking vacuum claw at your power, but you force your connection to the weave to hold!</cyan>`);
      return;
    }

    // 3. Apply Effect
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 6000; // 1 round (6s) per level

    const suppression = state.EffectFactory.create('antimagic_suppression', {
      config: { 
        name: "Antimagic Suppression",
        duration: durationMs 
      }
    });

    target.addEffect(suppression);
    
    // Narratives
    caster.say(`<cyan>The grey beam strikes ${target.name}, collapsing the magical aura surrounding them!</cyan>`);
    target.say(`<red>The ray hits you like a physical weight, and suddenly the world goes silent. Your magic is GONE.</red>`);
    target.room.broadcastExcept([caster, target], `<white>A beam of absolute grey light connects ${caster.name} to ${target.name}. Upon impact, the magical glow of ${target.name}'s equipment instantly vanishes.</white>`);
  }
};
