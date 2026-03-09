/**
 * Implementation: Abyssal Army
 * Source: WotC | Spell Compendium p.7
 */
'use strict';
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'abyssal_army',
  name: 'Abyssal Army',
  level: 9,
  school: 'conjuration',
  subschool: 'summoning',
  descriptors: ['evil', 'chaotic'],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'full-round',
  components: ['V', 'S'],
  range: 'medium',
  target: 'area',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, args) {
    // 1. ALIGNMENT & PRE-CHECK
    // Using your 'corruption' or 'reputation' attributes if alignment isn't explicit
    if (caster.getAttribute('corruption') < 10 && caster.getAttribute('appearance') > 15) {
        // Flavor check: If they are too 'pure' (High appearance, low corruption)
        return Broadcast.sayAt(caster, "<red>The celestial resonance of your soul rejects the Abyssal tether!</red>");
    }

    // 2. SUMMON SELECTION
    const choice = (args || 'vrock').toLowerCase();
    let mobTemplate, count, spawnMsg;

    switch (choice) {
      case 'dretches':
        mobTemplate = 'dretch';
        count = state.Dice.roll('2d4');
        spawnMsg = "A swarm of bloated, slothful dretches crawls out of a pool of bubbling filth!";
        break;
      case 'babaus':
        mobTemplate = 'babau';
        count = state.Dice.roll('1d4');
        spawnMsg = "Tall, skeletal babaus emerge from the shadows, claws dripping with acidic slime.";
        break;
      case 'vrock':
      default:
        mobTemplate = 'vrock';
        count = 1;
        spawnMsg = "A massive, vulture-headed vrock erupts from a planar rift with a bone-chilling screech!";
        break;
    }

    Broadcast.sayAt(caster, "<magenta>You chant forbidden syllables, ripping a hole into the Abyss!</magenta>");
    Broadcast.sayAtExcept(caster.room, `<magenta>${caster.name}'s voice drops into a guttural tongue. The air grows heavy with the stench of decay.</magenta>`, [caster]);

    // 3. SPAWNING LOGIC
    const summonedUuids = [];
    for (let i = 0; i < count; i++) {
      // Assuming 'demons' bundle exists for these templates
      const demon = state.MobFactory.create(caster.room, `demons:${mobTemplate}`);
      
      // Hooking into Ranvier's behavior system
      demon.addBehavior('follower', { master: caster });
      demon.setMeta('summonedBy', caster.uuid);
      
      state.MobManager.addMob(demon);
      summonedUuids.push(demon.uuid);
    }

    Broadcast.sayAt(caster.room, `<bold><red>${spawnMsg}</red></bold>`);

    // 4. CREATE PERSISTENT EFFECT
    const cl = caster.getAttribute('intelligence'); 
    const effect = state.EffectFactory.create('abyssal_army_active', {
      duration: cl * 6000, // 1 round per level (6s per round)
    }, { 
      summonedUuids, 
      treacheryTriggered: false 
    });

    caster.addEffect(effect);
  },

  onTick(state, caster, effect) {
    if (effect.state.treacheryTriggered) return;

    // TREACHERY CHECK: 20% Health Threshold
    const hp = caster.getAttribute('health');
    const maxHp = caster.getAttribute('maxHealth') || 100; // Fallback
    
    if ((hp / maxHp) < 0.20) {
      effect.state.treacheryTriggered = true;
      
      Broadcast.sayAt(caster, "<bold><red>Your grip on the Abyssal leash slips! The demons sense your weakness!</red></bold>");
      
      effect.state.summonedUuids.forEach(uuid => {
        const demon = state.MobManager.getMob(uuid);
        if (demon) {
          demon.removeBehavior('follower');
          // Trigger combat resolver
          demon.initiateCombat(caster);
          Broadcast.sayAt(caster.room, `<red>${demon.name} snarls and lunges at ${caster.name}!</red>`);
        }
      });
    }
  },

  onEnd(state, caster, effect) {
    const { summonedUuids, treacheryTriggered } = effect.state;

    // If they didn't turn hostile, they vanish. 
    // If they DID turn hostile, they might stay in the room until killed (MUD flavor choice).
    summonedUuids.forEach(uuid => {
      const mob = state.MobManager.getMob(uuid);
      if (mob) {
        if (!treacheryTriggered) {
          Broadcast.sayAt(mob.room, `<grey>${mob.name} is dragged screaming back into a shrinking rift.</grey>`);
          state.MobManager.removeMob(mob);
        } else {
          // They stay, but they are no longer "summoned" (they are now just wild mobs)
          mob.removeMeta('summonedBy');
        }
      }
    });

    Broadcast.sayAt(caster, "<magenta>The Abyssal gateway collapses.</magenta>");
  }
};
