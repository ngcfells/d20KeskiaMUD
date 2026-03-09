/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Anger of the Noonday Sun
 * Source: WotC | Spell Compendium p.11
 * 
 * Logic:
 * - Area: 20-ft radius burst (Current MUD Room).
 * - Blindness: All creatures blinded for 1 minute (Reflex negates).
 * - Undead/Light-Vulnerable: Take 6d6 damage (Reflex half).
 * - Special: Sunlight-vulnerable creatures (Vampires, etc.) take damage as if in sunlight.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'anger_of_the_noonday_sun',
  name: 'Anger of the Noonday Sun',
  level: 6,
  school: 'evocation',
  descriptors: ['light'],
  source: 'WotC | Spell Compendium p.11',

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
  range: 'personal',
  target: 'self',
  area: '20-ft radius burst',
  duration: 'instantaneous',
  savingThrow: 'reflex partial',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    const dc = 16 + caster.getAbilityModifier(caster.primaryStat || 'wisdom');
    
    // ROOM EMOTES
    Broadcast.sayAt(caster, "<bold><yellow>You raise your holy symbol and a blinding solar flare erupts from your body!</yellow></bold>");
    Broadcast.sayAtExcept(caster.room, `<bold><yellow>The room vanishes in a flash of brilliant, white-hot solar energy centered on ${caster.name}!</yellow></bold>`, [caster]);

    const targets = [...caster.room.characters];

    targets.forEach(unit => {
      if (unit === caster) return;

      // 1. Spell Resistance
      if (unit.checkSpellResistance && unit.checkSpellResistance(caster, cl)) return;

      const isUndead = unit.getProperty('creatureType') === 'undead';
      const isSunlightVulnerable = unit.hasTag('sunlight_vulnerable');
      const saved = unit.savingThrow('reflex', dc);

      // 2. BLINDNESS LOGIC
      if (!saved) {
        const blindness = state.EffectFactory.create('blinded', {
          duration: 60000, // 1 minute
          state: { source: this.name }
        });
        unit.addEffect(blindness);
        Broadcast.sayAt(unit, "<bold><red>Your vision is seared away by the intense solar brilliance!</red></bold>");
      } else {
        Broadcast.sayAt(unit, "<cyan>You shield your eyes just in time to avoid permanent blindness.</cyan>");
      }

      // 3. DAMAGE LOGIC (Undead or Sunlight Vulnerable)
      if (isUndead || isSunlightVulnerable) {
        const roll = state.Dice.roll('6d6');
        let damage = saved ? Math.floor(roll / 2) : roll;

        // Vampires and specific undead might take additional penalties or be destroyed
        state.Damage.apply({
          amount: damage,
          type: 'sunlight',
          attacker: caster,
          target: unit,
          source: this.name,
          descriptors: ['light', 'sunlight']
        });

        Broadcast.sayAt(unit, `<bold><magenta>The solar energy burns your unnatural flesh for ${damage} damage!</magenta></bold>`);
      }
    });
  }
};
