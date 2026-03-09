/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Affliction (Celestial Scourge)
 * Source: WotC | Book of Exalted Deeds p.90
 * 
 * Logic:
 * - Targets: Evil creatures only.
 * - Instantaneous: No incubation period (unlike mundane disease).
 * - Damage: 1d4 Strength, Dexterity, and Constitution damage.
 * - Save: Fortitude negates (DC = 10 + 3 + Casting Mod).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'affliction',
  name: 'Affliction',
  level: 3,
  school: 'necromancy',
  descriptors: ['good'],
  source: 'WotC | Spell Compendium p.9',

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
  range: 'touch',
  target: 'one evil creature',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    if (!target) return;

    // 1. ALIGNMENT VALIDATION
    // Assumes alignment < 0 is Evil in your d20 multiversal rule-set.
    const alignment = target.getAttribute('alignment') || 0;
    if (alignment >= 0) {
      Broadcast.sayAt(caster, `<yellow>The holy energies of the spell slide harmlessly off ${target.name}'s soul.</yellow>`);
      return;
    }

    // 2. SPELL RESISTANCE
    const cl = caster.getSpellCasterLevel();
    if (target.checkSpellResistance && target.checkSpellResistance(caster, cl)) {
       return Broadcast.sayAt(caster, "The creature's innate resistance deflects your touch.");
    }

    // 3. FORTITUDE SAVE
    const dc = 13 + caster.getAbilityModifier(caster.primaryStat || 'wisdom');
    if (target.savingThrow('fortitude', dc)) {
      Broadcast.sayAt(target, "<cyan>You feel a momentary chill, but your constitution resists the celestial pox.</cyan>");
      Broadcast.sayAt(caster, `<yellow>${target.name} resists the affliction.</yellow>`);
      return;
    }

    // 4. INSTANTANEOUS ABILITY DAMAGE
    // Celestial diseases in d20 deal damage immediately upon a failed save.
    const strDmg = state.Dice.roll('1d4');
    const dexDmg = state.Dice.roll('1d4');
    const conDmg = state.Dice.roll('1d4');

    target.applyAbilityDamage('strength', strDmg, caster);
    target.applyAbilityDamage('dexterity', dexDmg, caster);
    target.applyAbilityDamage('constitution', conDmg, caster);

    // Inside Affliction onCast...
    const poxEffect = state.EffectFactory.create('celestial_pox', { duration: 60000 });
    target.addEffect(poxEffect);

    // ROOM EMOTES
    Broadcast.sayAt(target, "<bold><red>A searing, white-hot pox erupts across your skin as your very blood turns against your wicked soul!</red></bold>");
    Broadcast.sayAt(caster, `<bold><white>You strike ${target.name} and watch as holy sores blossom across their flesh!</white></bold>`);
    Broadcast.sayAtExcept(caster.room, `<white>${caster.name} touches ${target.name}, and holy light erupts into a weeping, celestial pox on the creature's skin.</white>`, [caster, target]);
  }
};
