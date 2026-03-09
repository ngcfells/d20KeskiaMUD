/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A pinnacle of necromantic malice. You manifest a blade of pure void 
 * that not only flays the soul but binds the remains into a mindless 
 * husk of undeath upon the victim's demise.
 */
const Defense = require('../../lib/combat/defense');
const DamageTypes = require('../../lib/combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'dread_blade',
  name: 'Dread Blade',
  level: 9,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Dread Codex | p. 15',

  /**
   * SPELL LISTS:
   * - Cleric: 9
   * - Sorcerer/Wizard: 9
   * - Death Domain: 9
   * - Undeath Domain: 9
   * - Rarity: Rare / Artifact-Level
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  
  materialComponents: [
    { 
      id: 'bloodied_paladin_dagger', 
      quantity: 1, 
      consumed: true, 
      notes: 'A dagger that has drawn a paladin’s blood.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium', // 100 ft + 10 ft/level
  target: 'one creature',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-partial', // Save vs Transformation only
  spellResistance: true,

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
    // 1. Ranged Touch Attack
    const targetAC = Defense.getAC(target, { isTouch: true });
    const dexMod = Math.floor(((caster.getAttribute('dexterity') || 10) - 10) / 2);
    const attackRoll = Math.floor(Math.random() * 20) + 1;
    const totalAttack = attackRoll + (caster.getMeta('bab') || 0) + dexMod;

    if (totalAttack < targetAC) {
      caster.say(`<white>The dagger of dark energy streaks toward ${target.name} but shatters against the floor into a thousand obsidian shards.</white>`);
      target.room.broadcastExcept(caster, `<white>A blade of shimmering shadow hisses through the air, narrowly missing ${target.name}.</white>`);
      return;
    }

    // 2. Damage Calculation: 1d4/level (max 20d4)
    const casterLevel = caster.getMeta('level') || 1;
    const diceCount = Math.min(casterLevel, 20);
    let damage = 0;
    for (let i = 0; i < diceCount; i++) {
      damage += Math.floor(Math.random() * 4) + 1;
    }

    // EMOTES: IMPACT
    caster.say(`<magenta>The Dread Blade sinks deep into ${target.name}'s chest, the dark energy drinking greedily of their life force.</magenta>`);
    target.say(`<red>A coldness unlike anything you have ever felt pierces your heart. Your soul feels as though it is being pulled through a needle's eye.</red>`);
    target.room.broadcastExcept([caster, target], `<magenta>A dagger of oily, shimmering darkness plunges into ${target.name}. A sickening silence follows the strike.</magenta>`);

    // Apply Damage
    const isDead = target.takeDamage(damage, DamageTypes.FORCE, caster);

    // 3. Transformation Check (If Slain)
    if (target.getAttribute('health') <= 0) {
      const dc = 10 + 9 + Math.floor(((caster.getAttribute('intelligence') || caster.getAttribute('wisdom') || 10) - 10) / 2);
      const roll = Math.floor(Math.random() * 20) + 1;
      const willSave = (target.getAttribute('will') || 0) + roll;

      if (willSave < dc) {
        this.emotes.transform(target, caster);
        this._raiseAsUndead(state, target, caster);
      } else {
        target.say("<cyan>Your spirit breaks free of the dark pull, escaping into the afterlife before the blade can bind you.</cyan>");
      }
    }
  },

  _raiseAsUndead(state, victim, caster) {
    // Logic to strip life-metas and apply the Undead Type
    victim.setMeta('isUndead', true);
    victim.setMeta('creatureType', 'undead');
    victim.setMeta('masterId', caster.id);
    
    // Attribute wipes as per d20 Undead traits
    victim.setAttribute('intelligence', 0);
    victim.setAttribute('constitution', 0);
    victim.setAttribute('alignment', 'neutral');
    
    // Apply the permanent Undead Trait effect
    const undeadTrait = state.EffectFactory.create('undead_traits', {
      config: { duration: -1 }
    });
    victim.addEffect(undeadTrait);
  },

  emotes: {
    transform: (target, caster) => {
      target.room.broadcastExcept(null, `<red>The corpse of ${target.name} convulses violently. The grey energy of the Dread Blade knits flesh and bone back together into a pale, mindless mockery of life.</red>`);
      target.room.broadcastExcept(null, `<white>The newly risen horror stands motionless, its eyes vacant, awaiting ${caster.name}'s command.</white>`);
    }
  }
};
