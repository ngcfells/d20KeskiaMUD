/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animalistic Power (Multiversal Expansion)
 * Logic: +2 Enhancement bonus to ONE attribute of the caster's choice.
 * Includes: STR, DEX, CON, INT, WIS, CHA, and APP.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'animalistic_power',
  name: 'Animalistic Power',
  level: 2, // Bumped to 2 to account for the increased versatility
  school: 'transmutation',
  descriptors: [],
  source: 'Custom d20 Multiversal (Expanded from Spell Compendium p.12)',

  castingTime: 'swift',
  components: ['V', 'S'],
  range: 'personal',
  target: 'self',
  duration: '1 min/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    
    // 1. EXPANDED ATTRIBUTE SELECTION
    const validStats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma', 'appearance'];
    const choice = (ctx.args || '').toLowerCase();

    if (!validStats.includes(choice)) {
      return Broadcast.sayAt(caster, "<cyan>Choose your animalistic aspect: strength, dexterity, constitution, intelligence, wisdom, charisma, or appearance.</cyan>");
    }

    const effect = state.EffectFactory.create('animalistic_power_active', {
      duration: cl * 60000,
      state: { stat: choice }
    });

    // Enhancement bonuses do not stack with other spells of the same type (e.g. Owl's Wisdom)
    effect.addModifier(choice, (curr) => curr + 2);
    caster.addEffect(effect);

    // 2. MULTIVERSAL BESTIAL FLAVOR
    const flavorMap = {
      strength:     { animal: "bull",   desc: "muscles swell with bovine power" },
      dexterity:    { animal: "cat",    desc: "movements become lithe and fluid" },
      constitution: { animal: "bear",   desc: "frame becomes rugged and hardy" },
      intelligence: { animal: "fox",    desc: "eyes sparkle with vulpine cunning" },
      wisdom:       { animal: "owl",    desc: "gaze becomes deep and perceptive" },
      charisma:     { animal: "eagle",  desc: "presence becomes regal and commanding" },
      appearance:   { animal: "peacock", desc: "features take on an exotic, striking beauty" }
    };

    const flavor = flavorMap[choice];
    Broadcast.sayAt(caster, `<bold><magenta>You channel the essence of the ${flavor.animal}. Your ${flavor.desc}!</magenta></bold>`);
    Broadcast.sayAtExcept(caster.room, `<magenta>${caster.name}'s features momentarily shift; they look more ${flavor.animal}-like and ${flavor.desc}.</magenta>`, [caster]);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.9) {
       Broadcast.sayAt(caster, `<white>The primal spirit of the ${effect.state.stat} guides your actions.</white>`);
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>The bestial essence leaves you, and your original nature returns.</grey>");
  }
};
Use code with caution.
