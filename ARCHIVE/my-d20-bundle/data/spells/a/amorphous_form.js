/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Amorphous Form
 * Source: WotC | Spell Compendium p.10
 * 
 * Logic:
 * - Form: Subject becomes a translucent, jelly-like mass.
 * - Defense: Immune to Critical Hits, Sneak Attacks, and further Polymorphing.
 * - Utility: Can pass through any opening a liquid could (cracks under doors, etc.).
 * - Restrictions: Cannot attack, cast spells (V, S, or M), or use items.
 * - Movement: 10 ft. swim speed; cannot fly.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'amorphous_form',
  name: 'Amorphous Form',
  level: 3,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Spell Compendium p.10',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'spark_of_ooze',
      quantity: 1,
      consumed: true,
      notes: 'A small bit of jelly or Ooze.'
    }
  ],

  range: 'touch',
  target: 'willing living creature touched',
  duration: '1 min/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    if (!target) return;

    const cl = caster.getSpellCasterLevel();
    const effect = state.EffectFactory.create('amorphous_form_active', {
      duration: cl * 60000,
      state: { originalName: target.name }
    });

    /**
     * MUD ENGINE HOOKS
     */

    // 1. CRITICAL HIT & SNEAK ATTACK IMMUNITY
    // Oozes and amorphous beings lack discernable anatomy.
    effect.addTrigger('onIncomingDamage', (attacker, subject, damage) => {
      if (damage.isCritical || damage.isSneakAttack) {
        damage.isCritical = false;
        damage.isSneakAttack = false;
        Broadcast.sayAt(subject, "<cyan>Your liquid form flows around the strike, negating the precision damage!</cyan>");
      }
    });

    // 2. PERMEABILITY: Door/Exit Logic
    // Allows the player to move through 'locked' or 'closed' exits if there is a gap.
    effect.addTrigger('onCheckMovement', (moveData) => {
      if (moveData.exit.hasTag('crack') || moveData.exit.hasTag('small_opening')) {
        moveData.canPass = true;
        Broadcast.sayAt(target, "<blue>You flow effortlessly through the narrow opening.</blue>");
      }
    });

    // 3. RESTRICTIONS
    // Disables combat and spellcasting for the duration.
    effect.addModifier('canAttack', () => false);
    effect.addModifier('canCast', () => false);
    effect.addModifier('speed_swim', () => 10);
    effect.addModifier('speed_fly', () => 0); // Cannot fly

    target.addEffect(effect);

    // ROOM EMOTES
    Broadcast.sayAt(target, "<bold><white>Your bones melt into jelly and your skin turns into a translucent, shimmering slime!</white></bold>");
    Broadcast.sayAtExcept(target.room, `<white>${target.name}'s body collapses into a quivering, amorphous mass of translucent jelly.</white>`, [target]);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.9) {
      Broadcast.sayAt(effect.target, "<blue>You ripple and flow across the ground, your form ever-shifting.</blue>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(effect.target, "<cyan>Your body solidifies, bones and skin snapping back into their rigid, mortal state.</cyan>");
    Broadcast.sayAtExcept(effect.target.room, `<grey>The quivering mass of ${effect.target.name} flows upward, reshaping into their true form.</grey>`, [effect.target]);
  }
};
