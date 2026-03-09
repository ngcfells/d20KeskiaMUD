/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Blink (Standard PHB v.3.5)
 * Logic: Rapidly shunting between Material and Ethereal planes.
 * - 50% Miss: Incoming attacks (20% if attacker can see or strike ethereal).
 * - 20% Fail: Caster's own attacks and spells.
 * - 50% Fail: Physical item interactions (pickups/activations).
 * - 50% DR: Half damage from falling and non-Force area effects.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'blink',
  name: 'Blink',
  level: 3,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Player\'s Handbook p.206',

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  range: 'personal',
  target: 'self',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster) {
    const durationInRounds = caster.getSpellCasterLevel();
    const effect = state.EffectFactory.create('blinking_state', {
      duration: durationInRounds * 6000,
    });

    /**
     * OFFENSIVE & INTERACTION PENALTY (20% & 50%)
     * Per 3.5e, you have a 20% miss chance on your own attacks,
     * but a 50% fail chance on physical tasks like picking up items.
     */
    effect.addTrigger('onBeforeAttack', (attacker, defender, attackData) => {
      if (Math.random() < 0.20) {
        attackData.cancelled = true;
        Broadcast.sayAt(attacker, "<yellow>You phase out just as you strike, missing your target!</yellow>");
      }
    });

    effect.addTrigger('onBeforeSpellCast', (spellcaster, castCtx) => {
      if (castCtx.target !== spellcaster && Math.random() < 0.20) {
        castCtx.cancelled = true;
        Broadcast.sayAt(spellcaster, "<yellow>Your spell flickers into the Ethereal Plane and fails to manifest!</yellow>");
      }
    });

    effect.addTrigger('onBeforeItemPickup', (picker, item, pickupCtx) => {
      if (Math.random() < 0.50) {
        pickupCtx.cancelled = true;
        Broadcast.sayAt(picker, "<yellow>Your hand passes through the item as you flicker out of phase.</yellow>");
      }
    });

    /**
     * DEFENSIVE MISS CHANCE (50% / 20%)
     */
    effect.addTrigger('onIncomingAttack', (attacker, subject, attackData) => {
      const canSeeEthereal = attacker.hasEffect('see_invisibility') || attacker.hasEffect('true_seeing');
      const canStrikeEthereal = attackData.descriptors?.includes('force') || (attackData.weapon?.hasProperty('ghost_touch'));

      if (canSeeEthereal && canStrikeEthereal) return;

      const missChance = (canSeeEthereal || canStrikeEthereal) ? 0.20 : 0.50;

      if (Math.random() < missChance) {
        attackData.cancelled = true;
        Broadcast.sayAt(attacker, `<cyan>Your attack passes through ${subject.name}'s flickering form!</cyan>`);
        Broadcast.sayAt(subject, "<white>An attack whistles through your ethereal space.</white>");
        Broadcast.sayAtExcept(subject.room, `<grey>${subject.name} flickers, and the blow misses completely.</grey>`, [subject, attacker]);
      }
    });

    /**
     * AREA EFFECT & FALLING DAMAGE PROTECTION (50% Reduction)
     * You only take half damage because you are only present half the time.
     */
    effect.addTrigger('onBeforeDamage', (subject, damage) => {
      // Force damage and Abjuration [Force] effects deal full damage
      if (damage.type === 'force' || damage.descriptors?.includes('force')) return;

      if (damage.sourceType === 'area' || damage.sourceType === 'falling') {
        damage.amount = Math.floor(damage.amount / 2);
        Broadcast.sayAt(subject, "<cyan>Your flickering form absorbs only half the impact!</cyan>");
      }
    });

    /**
     * MOVEMENT: ETHEREAL STEP
     * While blinking, you can move through solid objects (walls/doors).
     */
    effect.addTrigger('onMove', (subject, moveCtx) => {
        // Implement 50% chance to bypass 'closed/locked' door flags in your MUD engine
        if (moveCtx.door && moveCtx.door.isLocked && Math.random() < 0.5) {
            moveCtx.bypassLocked = true;
            Broadcast.sayAt(subject, "<magenta>You slip through the door like a ghost.</magenta>");
        }
    });

    target.addEffect(effect);
    Broadcast.sayAt(target, "<magenta>You begin rapidly flickering between the Material and Ethereal planes.</magenta>");
    Broadcast.sayAtExcept(target.room, `<grey>${target.name} begins to shimmer and flicker uncontrollably.</grey>`, [target]);
  },

  onTick(state, caster, effect) {
    const subject = effect.target;
    if (Math.random() > 0.8) {
      Broadcast.sayAt(subject, "<white>The world turns into a ghostly, grey mist for a heartbeat.</white>");
      Broadcast.sayAtExcept(subject.room, `<grey>${subject.name} looks momentarily transparent.</grey>`, [subject]);
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(effect.target, "<green>Your physical form stabilizes. The Ethereal Plane recedes.</green>");
  }
};
