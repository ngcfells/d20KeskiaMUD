/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animal Growth
 * Source: WotC | Player's Handbook p.198
 * 
 * Logic:
 * - Requirement: Target must be of the 'Animal' creature type.
 * - Size: Increases by one category (e.g., Medium -> Large).
 * - Stats: +8 Size bonus to Strength, +4 Size bonus to Constitution.
 * - Penalties: -2 Size penalty to Dexterity, -1 Size penalty to Attack/AC.
 * - Defense: +2 Enhancement bonus to Natural Armor and DR 10/Magic.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'animal_growth',
  name: 'Animal Growth',
  level: 5,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Player\'s Handbook p.198',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'up to one animal per 2 levels',
  duration: '1 min/level',
  savingThrow: 'fortitude negates (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, targets, ctx) {
    const cl = caster.getSpellCasterLevel();
    const targetList = Array.isArray(targets) ? targets : [targets];
    
    // Max targets: 1 per 2 levels
    const maxTargets = Math.floor(cl / 2);
    const validTargets = targetList
      .filter(t => t.getProperty('creatureType') === 'animal')
      .slice(0, maxTargets);

    if (validTargets.length === 0) {
      return Broadcast.sayAt(caster, "<yellow>This spell only affects animals.</yellow>");
    }

    validTargets.forEach(target => {
      const effect = state.EffectFactory.create('animal_growth_active', {
        duration: cl * 60000,
        state: { 
          originalSize: target.getProperty('size'),
          drValue: 10,
          drBypass: 'magic'
        }
      });

      /**
       * MUD ENGINE HOOKS: D20 SIZE TRANSFORMATION
       */

      // 1. STAT MODIFIERS (Size bonuses stack with Enhancement)
      effect.addModifier('strength', (curr) => curr + 8);
      effect.addModifier('constitution', (curr) => curr + 4);
      effect.addModifier('dexterity', (curr) => curr - 2);
      effect.addModifier('naturalArmor', (curr) => curr + 2);
      
      // 2. SIZE CATEGORY SHIFT
      // Triggers engine-level changes to Reach, AC (-1), and Attack (-1)
      effect.addModifier('sizeCategory', (curr) => curr + 1);

      // 3. DAMAGE REDUCTION (DR 10/Magic)
      effect.addTrigger('onBeforeDamage', (subject, damageData) => {
        const isPhysical = ['slashing', 'piercing', 'bludgeoning'].includes(damageData.type);
        const isMagic = damageData.descriptors?.includes('magic') || damageData.weapon?.isMagical;

        if (isPhysical && !isMagic) {
          const absorbed = Math.min(damageData.amount, 10);
          damageData.amount -= absorbed;
          Broadcast.sayAt(subject, `<cyan>[Animal Growth] Thick hide absorbs ${absorbed} damage!</cyan>`);
        }
      });

      target.addEffect(effect);

      // 4. ROOM EMOTES
      Broadcast.sayAt(target, "<bold><red>Your muscles surge with primal power as you swell to twice your normal size!</red></bold>");
      Broadcast.sayAtExcept(target.room, `<bold><red>${target.name} swells to enormous proportions, its fur bristling as it becomes a massive engine of destruction!</red></bold>`, [target]);
    });
  },

  onEnd(state, target, effect) {
    Broadcast.sayAt(target, "<yellow>Your massive form shrinks back to its original size.</yellow>");
    Broadcast.sayAtExcept(target.room, `<grey>${target.name} returns to its normal proportions.</grey>`, [target]);
  }
};
