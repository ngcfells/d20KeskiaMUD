/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animate Dead
 * Source: WotC | Player's Handbook p.198
 * 
 * Logic:
 * - Requirement: A corpse of a creature with a skeletal or fleshy remains.
 * - Cost: Onyx gems worth 25gp per Hit Die (HD) of the undead created.
 * - Control Pool: You can control 4 HD of undead per Caster Level (CL).
 * - Result: Creates a Skeleton (from bones) or a Zombie (from flesh).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'animate_dead',
  name: 'Animate Dead',
  level: 3, // Cleric 3, Sorc/Wiz 4 (d20 standard)
  school: 'necromancy',
  descriptors: ['evil'],
  source: 'WotC | Player\'s Handbook p.198',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'black_onyx',
      quantity: 1, // Quantity handled dynamically in onCast based on HD
      minValue: 25,
      consumed: true,
      notes: 'Onyx gems worth 25gp per HD of the target.'
    }
  ],

  range: 'touch',
  target: 'one or more corpses',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    // 1. CORPSE VALIDATION
    // Target must be a 'corpse' item in the room or inventory
    const corpse = target || caster.room.items.find(i => i.hasTag('corpse'));
    if (!corpse) {
      return Broadcast.sayAt(caster, "<yellow>There are no suitable remains here to animate.</yellow>");
    }

    const cl = caster.getSpellCasterLevel();
    const targetHd = corpse.getMeta('original_hd') || 1;
    const isSkeleton = corpse.hasTag('bones');

    // 2. CONTROL POOL CHECK
    const currentControlledHd = (caster.getMeta('controlled_undead_hd') || 0);
    const maxControlHd = cl * 4;

    if (currentInternalHd + targetHd > maxControlHd) {
      return Broadcast.sayAt(caster, `<red>You lack the necromantic will to control more than ${maxControlHd} HD of undead.</red>`);
    }

    // 3. MATERIAL COST CHECK (25gp per HD)
    const requiredOnyxValue = targetHd * 25;
    const onyx = caster.inventory.findItem('onyx_gem');
    if (!onyx || onyx.getAttribute('value') < requiredOnyxValue) {
       return Broadcast.sayAt(caster, `<red>You need an onyx gem worth at least ${requiredOnyxValue}gp to animate this creature.</red>`);
    }

    // 4. ANIMATION
    const mobId = isSkeleton ? 'skeleton_minion' : 'zombie_minion';
    const undead = state.MobFactory.create(caster.room, mobId);
    
    // Inherit stats from corpse
    undead.name = `${isSkeleton ? 'Skeleton' : 'Zombie'} of ${corpse.getMeta('creatureName')}`;
    undead.attributes.health.setBase(targetHd * 8); // Roughly d8 per HD
    undead.addBehavior('follower', { master: caster });
    undead.setProperty('hd', targetHd);

    state.MobManager.addMob(undead);
    caster.setMeta('controlled_undead_hd', currentControlledHd + targetHd);
    state.ItemManager.remove(corpse);
    onyx.consume(); // Custom consumption logic for valued components

    // 5. ROOM EMOTES
    Broadcast.sayAt(caster, `<bold><magenta>You plunge your hand into the remains, infusing ${corpse.name} with a spark of pure, dark malice!</magenta></bold>`);
    Broadcast.sayAtExcept(caster.room, `<magenta>${caster.name} chants a foul litany. Shadows coil around ${corpse.name} as it begins to twitch and rise...</magenta>`, [caster]);
    Broadcast.sayAt(caster.room, `<bold><red>The ${undead.name} stands up, its hollow eyes glowing with baleful light!</red></bold>`);
  }
};
