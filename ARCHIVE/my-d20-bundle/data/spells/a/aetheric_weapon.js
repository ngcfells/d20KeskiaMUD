/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Aetheric Weapon
 * Source: Dungeons Wiki | Luigifan18 | 2012
 * https://dungeons.fandom.com/wiki/Aetheric_Weapon_(3.5e_Spell)
 * 
 * Calls forth a physical replica of a deity's favored weapon. 
 * The caster may 'request' specific enchantments, increasing 
 * the ritual's length and spiritual toll. 
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'aetheric_weapon',
  name: 'Aetheric Weapon',
  level: 9,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [], // Dynamic: Added based on properties
  source: 'Dungeons Wiki | Luigifan18 | 2012',

  /**
   * SPELL LISTS:
   * - Armory: 9
   * - War Domain: 9
   * - Glory Domain: 9
   */

  castingTime: '5 rounds', // Base: 5 rounds + 1 per property
  components: ['V', 'S', 'XP'],
  
  materialComponents: [],

  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 minute/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    
    // 1. DETERMINE PROPERTIES (Placeholder for interactive prompt logic)
    // Example: Holy (+2), Flaming (+1) = Total +3 on top of Base +5
    const requestedBonus = ctx.requestedBonus || 0; 
    
    // 2. XP CALCULATION
    let xpBase = 5000;
    if (caster.hasFeat('craft_magic_arms_armor')) xpBase -= 1000;
    if (caster.hasFeat('craft_epic_arms_armor')) xpBase -= 1000;
    
    const totalXpCost = xpBase + (requestedBonus * 500);
    const currentXp = caster.getMeta('experience') || 0;

    if (currentXp < totalXpCost) {
      caster.setMeta('experience', Math.max(0, currentXp - 3000));
      return caster.say("<red>Your deity rejects your meager offering. The aetheric energies dissipate, scarring your soul.</red>");
    }

    // 3. APPLY COST
    caster.setMeta('experience', currentXp - totalXpCost);

    // 4. GENERATE WEAPON
    // This creates a transient item with a self-destruct timer
    const weapon = state.ItemFactory.create(state.AreaManager.getArea('limbo'), 'aetheric_base_weapon');
    weapon.name = `${caster.getMeta('deity') || 'Aetheric'}'s Wrath`;
    weapon.setMeta('enhancementBonus', 5 + requestedBonus);
    weapon.addTag('epic_strike'); // Overcomes DR/Epic
    
    // Dynamic Duration Logic
    const duration = cl * 60000;
    const expiry = state.EffectFactory.create('aetheric_dissolution', { duration });
    weapon.addEffect(expiry);

    if (caster.addItem(weapon)) {
      caster.say(`<yellow>The heavens part as a beam of pure aether strikes your palm. You grasp the hilt of ${weapon.name}, feeling the weight of divine law.</yellow>`);
      caster.room.broadcastExcept(caster, `<yellow>A blinding pillar of light descends upon ${caster.name}. As it fades, they brandish a weapon of terrifying, celestial perfection.</yellow>`);
      
      // Auto-Equip logic
      caster.equip(weapon);
    }
  }
};
