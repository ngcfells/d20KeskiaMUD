/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Baleful Transposition (Cross-Room/LoS Version)
 * Source: WotC | Spell Compendium p.23
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'baleful_transposition',
  name: 'Baleful Transposition',
  level: 2,
  school: 'transmutation',
  subschool: 'teleportation',
  descriptors: [],
  source: 'WotC | Spell Compendium p.23',

  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'two creatures', 
  duration: 'instantaneous',
  savingThrow: 'will negates',
  spellResistance: true,

  onCast(state, caster, targets, ctx) {
    if (!Array.isArray(targets) || targets.length !== 2) {
      return Broadcast.sayAt(caster, "You must select two creatures to swap.");
    }

    const [targetA, targetB] = targets;

    // 1. DISTANCE & LINE OF SIGHT VALIDATION
    // We check if targets are within range and visible to the caster.
    const checkVisibility = (t) => {
        // Caster can see target if in same room or in a scanned line within range
        const inSameRoom = t.room === caster.room;
        const visibleByScan = caster.canSee(t); // Internal engine check for LoS
        return inSameRoom || visibleByScan;
    };

    if (!checkVisibility(targetA) || !checkVisibility(targetB)) {
        return Broadcast.sayAt(caster, "You lose sight of one of your targets and the spell fizzles.");
    }

    // 2. SIZE CATEGORY VALIDATION
    if (targetA.getProperty('size') !== targetB.getProperty('size')) {
      return Broadcast.sayAt(caster, "The targets must be of the same size category.");
    }

    // 3. SAVING THROWS
    const dc = 12 + caster.getAbilityModifier(caster.primaryStat || 'intelligence');
    const saveA = !targetA.isWilling && targetA.savingThrow('will', dc);
    const saveB = !targetB.isWilling && targetB.savingThrow('will', dc);

    if (saveA || saveB) {
      Broadcast.sayAt(caster, "One of the subjects resists the spatial fold, and the spell snaps.");
      return;
    }

    // 4. THE SWAP
    const roomA = targetA.room;
    const roomB = targetB.room;

    // Visuals for the Caster
    Broadcast.sayAt(caster, `<cyan>You twist the threads of space, pulling ${targetA.name} and ${targetB.name} through each other!</cyan>`);

    // Visuals for Target A
    Broadcast.sayAt(targetA, `<magenta>Space collapses! You are suddenly standing where ${targetB.name} was!</magenta>`);
    Broadcast.sayAtExcept(roomA, `<blue>${targetA.name} vanishes in a blur of indigo light!</blue>`, [targetA]);
    
    // Visuals for Target B
    Broadcast.sayAt(targetB, `<magenta>Space folds! You are suddenly standing where ${targetA.name} was!</magenta>`);
    Broadcast.sayAtExcept(roomB, `<blue>${targetB.name} vanishes in a blur of indigo light!</blue>`, [targetB]);

    // Perform the Move
    targetA.moveTo(roomB);
    targetB.moveTo(roomA);

    // Final "Appearance" messages in new rooms
    Broadcast.sayAtExcept(roomB, `<blue>${targetA.name} appears in a crackle of displaced air.</blue>`, [targetA]);
    Broadcast.sayAtExcept(roomA, `<blue>${targetB.name} appears in a crackle of displaced air.</blue>`, [targetB]);
  }
};
