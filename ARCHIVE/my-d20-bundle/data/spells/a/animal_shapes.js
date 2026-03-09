/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animal Shapes (Mass Polymorph)
 * Source: WotC | Player's Handbook p.198
 * 
 * Logic:
 * - Target: Up to one willing creature per level, all within 30 ft.
 * - Form: Any Animal from Diminutive to Huge size.
 * - HD Limit: Form cannot exceed 20 HD.
 * - Buff: Caster can change the forms of all affected as a standard action.
 * - Persistence: Each subject retains its own Mind (Int/Wis/Cha) but adopts 
 *   the physical stats (Str/Dex/Con) and natural armor of the chosen animal.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'animal_shapes',
  name: 'Animal Shapes',
  level: 8,
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],
  source: 'WotC | Player\'s Handbook p.198',

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one willing creature per level',
  area: '30-ft.-radius spread',
  duration: '1 hour/level',
  savingThrow: 'none (harmless)',
  spellResistance: true,          // Yes (harmless)

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    const formName = ctx.args ? ctx.args.trim().toLowerCase() : 'dire_bear';

    // 1. FORM VALIDATION
    const race = state.RaceManager.getRace(formName);
    if (!race || race.type !== 'animal') {
      return Broadcast.sayAt(caster, "<yellow>You must choose a valid Animal form (e.g., dire_bear, tiger, elephant).</yellow>");
    }

    if (race.baseHD > 20) {
      return Broadcast.sayAt(caster, "<red>That animal form is too powerful even for this spell (Max 20 HD).</red>");
    }

    // 2. MULTI-TARGET SELECTION
    // In a MUD, we target allies in the current room up to CL.
    const allies = caster.room.characters.filter(char => 
      (char.isAllyOf(caster) || char === caster) && !char.isNPC()
    ).slice(0, cl);

    Broadcast.sayAt(caster, `<bold><green>You weave a massive translocation of form, shifting your allies into ${race.name}s!</green></bold>`);
    Broadcast.sayAtExcept(caster.room, `<bold><green>${caster.name} gestures, and a ripple of primal energy transforms their allies into massive beasts!</green></bold>`, [caster]);

    allies.forEach(ally => {
      const effect = state.EffectFactory.create('animal_shapes_active', {
        duration: cl * 3600000, // 1 hour per level
        state: { 
          originalRace: ally.getProperty('raceName'),
          currentForm: race.name 
        }
      });

      /**
       * MUD ENGINE HOOKS: PHYSICAL OVERWRITE
       * Mental stats (Int, Wis, Cha) are retained.
       * Physical stats (Str, Dex, Con) are replaced by the Animal's base.
       */
      effect.addModifier('strength', () => race.strength);
      effect.addModifier('dexterity', () => race.dexterity);
      effect.addModifier('constitution', () => race.constitution);
      effect.addModifier('naturalArmor', () => race.naturalArmor || 0);
      effect.addModifier('sizeCategory', () => race.size);

      // Inherit Movement (Fly, Swim, Climb)
      if (race.movementModes) {
        Object.keys(race.movementModes).forEach(mode => {
          effect.addModifier(`speed_${mode}`, () => race.movementModes[mode]);
        });
      }

      // Disable equipment benefits if the form cannot wear them (d20 Polymorph rules)
      effect.addModifier('equipmentStatBonus', () => 0);

      ally.addEffect(effect);

      // TARGET EMOTES
      Broadcast.sayAt(ally, `<bold><magenta>Your body stretches and fur sprouts as you become a ${race.name}!</magenta></bold>`);
      if (ally !== caster) {
        Broadcast.sayAtExcept(ally.room, `<magenta>${ally.name} has transformed into a ${race.name}!</magenta>`, [ally, caster]);
      }
    });
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.98) {
      Broadcast.sayAt(caster.room, "<green>The pack of magically shifted beasts snarls with primal hunger.</green>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(effect.target, "<cyan>The 8th-level transmutation expires. You revert to your true form.</cyan>");
  }
};
