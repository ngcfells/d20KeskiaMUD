/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animal Trance
 * Source: WotC | Player's Handbook p.198
 * 
 * Logic:
 * - Target: Animals and Magical Beasts with Intelligence 1 or 2.
 * - Capacity: 2d6 total Hit Dice (HD) of creatures.
 * - Condition: Fascinated (Stands quietly, -4 penalty on reaction skills).
 * - Break: Any potential threat or obvious danger ends the effect.
 * - Duration: Concentration (Up to 1 round/level in some variants).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'animal_trance',
  name: 'Animal Trance',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting', 'sonic'],
  source: 'WotC | Player\'s Handbook p.198',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'animals and magical beasts',
  duration: 'concentration',
  savingThrow: 'will negates',
  spellResistance: true,

  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getSpellCasterLevel();
    const dc = 12 + caster.getAbilityModifier(caster.primaryStat || 'charisma');
    
    // 1. ROLL HD POOL (2d6 HD total)
    const hdPool = state.Dice.roll('2d6');
    let remainingHd = hdPool;

    // 2. TARGET SELECTION (Room-wide, closest first)
    const potentialTargets = caster.room.characters
      .filter(char => char !== caster && (char.getProperty('creatureType') === 'animal' || 
             (char.getProperty('creatureType') === 'magical_beast' && char.getAttribute('intelligence') <= 2)))
      .sort((a, b) => (a.getProperty('hd') || 1) - (b.getProperty('hd') || 1));

    const charmedUuids = [];

    for (const unit of potentialTargets) {
      const unitHd = unit.getProperty('hd') || 1;
      if (unitHd > remainingHd) continue;

      // 3. SAVING THROW
      if (unit.savingThrow('will', dc)) {
        Broadcast.sayAt(caster, `<yellow>${unit.name} resists your rhythmic swaying.</yellow>`);
        continue;
      }

      // 4. APPLY FASCINATED CONDITION
      const effect = state.EffectFactory.create('fascinated_trance', {
        duration: cl * 6000, // Safety duration if concentration slips
        state: { casterUuid: caster.uuid }
      });

      /**
       * MUD ENGINE HOOKS: FASCINATED
       * Subject takes -4 to Spot/Listen and cannot take actions.
       * Any hostile action from anyone in the room breaks the effect immediately.
       */
      effect.addModifier('canAct', () => false);
      effect.addModifier('spot', (curr) => curr - 4);
      effect.addModifier('listen', (curr) => curr - 4);

      effect.addTrigger('onIncomingAttack', () => {
        Broadcast.sayAt(unit, "<red>The shock of combat snaps you out of your trance!</red>");
        effect.remove();
      });

      unit.addEffect(effect);
      charmedUuids.push(unit.uuid);
      remainingHd -= unitHd;

      Broadcast.sayAt(unit, "<bold><cyan>You are mesmerized by the rhythmic motions and soothing sounds of the spell.</cyan></bold>");
      Broadcast.sayAtExcept(caster.room, `<cyan>${unit.name} stops and stares at ${caster.name} with glazed, peaceful eyes.</cyan>`, [unit, caster]);
    }

    if (charmedUuids.length === 0) {
      return Broadcast.sayAt(caster, "<yellow>Your trance fails to capture any minds.</yellow>");
    }

    Broadcast.sayAt(caster, `<magenta>You begin a rhythmic sway, holding ${charmedUuids.length} creatures in a peaceful daze.</magenta>`);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.8) {
      Broadcast.sayAt(caster.room, "<grey>The rhythmic drone of the spell continues to hold the beasts in a quiet stupor.</grey>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>You stop your rhythmic movements, and the trance is broken.</grey>");
  }
};
