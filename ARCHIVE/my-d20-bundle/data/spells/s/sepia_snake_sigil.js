/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You create a small, shimmering brown symbol in the midst of a text.
 * When a reader begins to scan the text, the sigil transforms into a 
 * shimmering amber snake that strikes the reader, encasing them in a 
 * field of suspended animation.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'sepia_snake_sigil',
  name: 'Sepia Snake Sigil',
  level: 3,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['force'],
  source: 'PHB | p. 276',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Bard: 3
   * - Rarity: Uncommon
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'amber_powder', 
      quantity: 1, 
      minValue: 500, 
      consumed: true, 
      notes: '500 gp worth of powdered amber.' 
    },
    {
      id: 'snake_scale',
      quantity: 1,
      consumed: true,
      notes: 'A piece of dried snake skin.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one touched object weighing no more than 10 lbs.',
  area: null,
  duration: 'permanent until discharged',
  savingThrow: 'reflex-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<magenta>You sprinkle the amber dust over ${target.name}, chanting a low, hissing incantation. A faint brown symbol, coiled like a serpent, etches itself into the surface before fading into the text.</magenta>`);
    caster.room.broadcastExcept(caster, `<magenta>${caster.name} traces a flickering, sepia-toned rune onto ${target.name}. A sharp, reptilian hiss echoes briefly before the mark vanishes.</magenta>`);

    const effect = state.EffectFactory.create('sepia_snake_trap', {
      config: { 
        name: "Sepia Snake Sigil",
        duration: -1 
      },
      state: {
        casterId: caster.id,
        casterName: caster.name,
        dc: 10 + 3 + Math.floor(((caster.getAttribute('intelligence') || 10) - 10) / 2)
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    trigger: (reader) => {
      reader.say(`<yellow>As you scan the writing, a shimmering brown line of text suddenly leaps from the page, coiling and expanding into a translucent amber serpent!</yellow>`);
      reader.room.broadcastExcept(reader, `<yellow>A line of text on the object held by ${reader.name} erupts into a shimmering, sepia-toned snake that lunges at their face!</yellow>`);
    },
    success: (reader) => {
      reader.say(`<red>The amber snake strikes your chest and explodes into a cocoon of shimmering force! Time itself seems to slow to a crawl, then stop.</red>`);
      reader.room.broadcastExcept(reader, `<orange>${reader.name} is instantly encased in a translucent, amber-colored field of force. They stand frozen like a statue, suspended in time.</orange>`);
    }
  }
};
