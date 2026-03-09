/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animate Breath
 * Source: WotC | Spell Compendium p.12
 * 
 * Logic:
 * - Requirement: Caster must have an available Breath Weapon.
 * - Activation: Uses the breath weapon as part of the casting.
 * - Summon: Creates a Small Elemental based on the breath's energy type.
 * - Stats: HP = Caster Level; Uses Caster's BAB and Base Saves.
 * - Duration: 1 round per Caster Level.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'animate_breath',
  name: 'Animate Breath',
  level: 7,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Spell Compendium p.12',

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'personal',
  target: 'self',
  area: 'breath weapon',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    // 1. BREATH WEAPON CHECK
    // Logic: Requires the 'breath_weapon' feature to be off cooldown.
    const breath = caster.getFeature('breath_weapon');
    if (!breath || !breath.isReady()) {
      return Broadcast.sayAt(caster, "<yellow>You do not have a breath weapon ready to animate!</yellow>");
    }

    const energyType = breath.getProperty('energyType') || 'fire';
    const cl = caster.getSpellCasterLevel();

    // 2. EXPEND BREATH & SUMMON
    breath.use(); // Put the breath weapon on cooldown

    // We create a temporary "Living Breath" Mob
    const livingBreath = state.MobFactory.create(caster.room, 'mob_living_breath');
    
    // Scale the construct to the caster
    livingBreath.name = `Living ${energyType.charAt(0).toUpperCase() + energyType.slice(1)} Breath`;
    livingBreath.attributes.health.setBase(cl);
    livingBreath.attributes.hitRoll.setBase(caster.getAttribute('bab'));
    livingBreath.setProperty('energyType', energyType);
    
    // Add follower behavior so it fights for the caster
    livingBreath.addBehavior('follower', { master: caster });
    
    state.MobManager.addMob(livingBreath);

    const effect = state.EffectFactory.create('animate_breath_active', {
      duration: cl * 6000, // 6s per level
      state: { summonUuid: livingBreath.uuid, type: energyType }
    });

    caster.addEffect(effect);

    // 3. ROOM EMOTES
    Broadcast.sayAt(caster, `<bold><magenta>You exhale a torrent of ${energyType}, but instead of a blast, the energy coalesces into a flickering, humanoid shape!</magenta></bold>`);
    Broadcast.sayAtExcept(caster.room, `<bold><magenta>${caster.name} exhales a cloud of ${energyType} that twists and hardens into a living elemental construct!</magenta></bold>`, [caster]);
  },

  onTick(state, caster, effect) {
    const summon = state.MobManager.getMob(effect.state.summonUuid);
    if (!summon) {
      effect.remove();
      return;
    }
    
    if (Math.random() > 0.8) {
      Broadcast.sayAt(caster.room, `<grey>The ${summon.name} crackles with raw ${effect.state.type} energy.</grey>`);
    }
  },

  onEnd(state, caster, effect) {
    const summon = state.MobManager.getMob(effect.state.summonUuid);
    if (summon) {
      Broadcast.sayAt(caster.room, `<grey>The ${summon.name} loses its cohesion and dissipates into a harmless puff of ${effect.state.type}.</grey>`);
      state.MobManager.removeMob(summon);
    }
  }
};
