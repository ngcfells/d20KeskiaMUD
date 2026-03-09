/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Angelskin
 * Source: WotC | Spell Compendium p.11
 * 
 * Logic:
 * - Requirement: Target must be Lawful Good (or at least Good, per MUD alignment).
 * - Buff: Grants Damage Reduction (DR) 5/Evil.
 * - Visual: Subject's skin takes on a pearly, opalescent glow.
 * - Stacking: DR from different sources typically does not stack (highest applies).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'angelskin',
  name: 'Angelskin',
  level: 2,
  school: 'abjuration',
  descriptors: ['good'],
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
  range: 'touch',
  target: 'one willing good creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    if (!target) return;

    // 1. ALIGNMENT VALIDATION
    // Standard d20 rule: Paladin spells often require a Good-aligned target.
    const alignGood = target.getAttribute('alignment_good') || 0;
    if (alignGood <= 0) {
      return Broadcast.sayAt(caster, `<yellow>The holy magic refuses to take root; ${target.name}'s soul lacks the required purity.</yellow>`);
    }

    const cl = caster.getSpellCasterLevel();
    const effect = state.EffectFactory.create('angelskin_active', {
      duration: cl * 6000, // 6 seconds (1 round) per level
      state: { drValue: 5, bypass: 'evil' }
    });

    /**
     * MUD ENGINE HOOK: Damage Reduction
     * Intercepts physical damage and reduces it by 5 unless the 
     * damage carries the 'evil' descriptor.
     */
    effect.addTrigger('onBeforeDamage', (subject, damageData) => {
      // DR only applies to physical damage (slashing, piercing, bludgeoning)
      const isPhysical = ['slashing', 'piercing', 'bludgeoning', 'physical'].includes(damageData.type);
      const isEvil = damageData.descriptors && damageData.descriptors.includes('evil');

      if (isPhysical && !isEvil) {
        const absorbed = Math.min(damageData.amount, 5);
        damageData.amount -= absorbed;
        
        Broadcast.sayAt(subject, `<cyan>[Angelskin] Your pearly skin deflects ${absorbed} damage!</cyan>`);
      } else if (isPhysical && isEvil) {
        Broadcast.sayAt(subject, "<red>The unholy strike cuts right through your pearly protection!</red>");
      }
    });

    target.addEffect(effect);

    // 2. ROOM EMOTES
    Broadcast.sayAt(target, "<bold><white>Your skin takes on a beautiful, opalescent sheen, shimmering like a polished pearl.</white></bold>");
    Broadcast.sayAtExcept(target.room, `<white>${target.name}'s skin begins to glow with a soft, pearly light as ${caster.name} finishes the prayer.</white>`, [target, caster]);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.9) {
      Broadcast.sayAt(effect.target, "<white>Your skin continues to shimmer with holy protection.</white>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(effect.target, "<grey>The opalescent glow fades, leaving your skin mortal once more.</grey>");
    Broadcast.sayAtExcept(effect.target.room, `<grey>The pearly sheen on ${effect.target.name}'s skin vanishes.</grey>`, [effect.target]);
  }
};
