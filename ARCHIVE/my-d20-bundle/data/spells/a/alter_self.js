/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Alter Self
 * Source: WotC | Player's Handbook p.197
 * 
 * Logic:
 * - Form: Any creature of your same Type (Humanoid, Outsider, etc.).
 * - Limit: Max HD of the new form cannot exceed 5 or your own CL.
 * - Bonuses: Gain new form's Size, Movement Modes, and Natural Armor.
 * - Stats: Retain own HP, Saves, and Mental Stats (Int/Wis/Cha).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'alter_self',
  name: 'Alter Self',
  level: 2,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Player\'s Handbook p.197',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'personal',
  target: 'self',
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    const formName = ctx.args ? ctx.args.trim().toLowerCase() : null;

    if (!formName) {
      return Broadcast.sayAt(caster, "<cyan>Usage: cast 'alter self' <race_name></cyan>");
    }

    const race = state.RaceManager.getRace(formName);

    // 1. D20 TYPE & HD VALIDATION
    if (!race) {
      return Broadcast.sayAt(caster, `<red>The form of a ${formName} is unknown to you.</red>`);
    }

    if (race.type !== caster.getProperty('creatureType')) {
      return Broadcast.sayAt(caster, `<red>You can only assume forms of your own type: ${caster.getProperty('creatureType')}.</red>`);
    }

    const maxHD = Math.min(cl, 5);
    if ((race.baseHD || 1) > maxHD) {
      return Broadcast.sayAt(caster, `<red>That form is too powerful for your current mastery (Max ${maxHD} HD).</red>`);
    }

    // 2. CREATE TRANSFORMATION EFFECT
    const effect = state.EffectFactory.create('alter_self_active', {
      duration: cl * 600000, // 10 mins per level
      state: {
        originalRace: caster.getProperty('raceName'),
        newRace: race.name,
        naturalArmorBonus: race.naturalArmor || 0
      }
    });

    /**
     * MUD ENGINE HOOKS
     */

    // Physical Modifier: Natural Armor (Max +6 per d20 rules)
    const naBonus = Math.min(race.naturalArmor || 0, 6);
    effect.addModifier('naturalArmor', (curr) => curr + naBonus);

    // Movement Inheritance: Gills, Wings, etc.
    if (race.movementModes) {
      Object.keys(race.movementModes).forEach(mode => {
        effect.addModifier(`speed_${mode}`, () => race.movementModes[mode]);
      });
    }

    // Size Adjustment: Affects Attack/AC modifiers
    if (race.size && race.size !== caster.getProperty('size')) {
       effect.addModifier('sizeCategory', () => race.size);
    }

    caster.addEffect(effect);

    // 3. ROOM EMOTES
    Broadcast.sayAt(caster, `<bold><yellow>Your bones creak and your skin ripples like water as you flow into the form of a ${race.name}!</yellow></bold>`);
    Broadcast.sayAtExcept(caster.room, `<bold><yellow>${caster.name}'s features blur and melt, re-forming into the shape of a ${race.name}.</yellow></bold>`, [caster]);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.95) {
      Broadcast.sayAt(caster, `<white>You flex your ${effect.state.newRace} limbs, feeling the strange anatomy of your assumed form.</white>`);
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<cyan>Your transformation expires. Your body snaps back into its true form.</cyan>");
    Broadcast.sayAtExcept(caster.room, `<cyan>${caster.name}'s ${effect.state.newRace} features revert back to their original appearance.</cyan>`, [caster]);
  }
};
