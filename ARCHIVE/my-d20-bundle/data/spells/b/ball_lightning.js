'use strict';

/**
 * Canonical Spell Definition: Ball Lightning
 * -----------------------------------
 * Source: Spell Compendium p.24
 * School: Evocation [Electricity]
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'ball_lightning',
  name: 'Ball Lightning',
  level: 4,
  school: 'evocation',
  subschool: null,
  descriptors: ['electricity'],
  source: 'Spell Compendium p.24',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    wizard: 4,
    sorcerer: 4,
    druid: 4,
    wu_jen: 4, //(Fire/Energy)
    arcane_artificer: 4,
    sha_ir: 4,
    shugenja: 4, //(Order of the Thunderer)
    cleric_domains: { 'air': 4, 'storm': 4, 'oracle': 4 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY (Subset)
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Uncommon', zakhara: 'Common' },
    oerth: { flaness: 'Common (Heironeous/Procan)', oerik: 'Common' },
    krynn: { ansalon: 'Common (Habbakuk/Zeboim)', taladas: 'Uncommon' },
    eberron: { khorvaire: 'Common (House Lyrandar)', xen_drik: 'Uncommon' },
    athas: 'Rare (Elemental Air focus)',
    sigil: 'Common',
    starfinder: 'Common (Electric burst variant)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'amber_rod',
      quantity: 1,
      consumed: false,
      notes: 'A small glass or amber rod.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium', 
  target: 'area',
  area: '1-4 spheres',
  duration: '1 round/level',
  savingThrow: 'reflex half',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const numGlobes = Math.min(4, Math.floor(cl / 4) || 1);
    const diceCount = Math.min(15, cl);
    
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const mod = Math.floor(((caster.getAttribute(ability) || 10) - 10) / 2);
    const dc = 10 + this.level + mod;

    B.sayAt(caster.room, "<blue>A sharp, acrid scent of ozone fills the air as static begins to make your hair stand on end.</blue>");
    B.sayAt(caster, `<yellow>You manifest ${numGlobes} crackling globes of electricity that hover around you!</yellow>`);
    B.sayAtExcept(caster.room, `<blue>${caster.name} conjures several spheres of humming blue energy that circle them like angry hornets.</blue>`, [caster]);

    // Controller effect to manage the globes
    const controlEffect = state.EffectFactory.create('ball_lightning_control', {
      duration: cl * 6000,
    }, { 
      cl, 
      dc,
      diceCount,
      globesAvailable: numGlobes
    });

    /**
     * Engine Hook: 'direct <target>'
     * This logic allows the caster to send globes to specific targets.
     */
    controlEffect.addTrigger('onCommand', (subject, commandName, args) => {
      if (commandName !== 'direct' || !args) return;
      if (controlEffect.state.globesAvailable <= 0) {
        return B.sayAt(subject, "You have no more globes to direct.");
      }

      const targetEntity = subject.room.findCharacter(args);
      if (!targetEntity) return B.sayAt(subject, "Direct the globes at whom?");

      controlEffect.state.globesAvailable--;

      const isImmune = targetEntity.getMeta('immunities')?.includes('electricity');
      
      const hazard = state.EffectFactory.create('ball_lightning_hazard', {
        duration: controlEffect.remaining,
      }, { 
        dc, 
        diceCount, 
        caster: subject, 
        isImmune 
      });

      targetEntity.addEffect(hazard);

      B.sayAt(subject, `<yellow>You gesture toward ${targetEntity.name}, and a globe of lightning darts forward to strike!</yellow>`);
      B.sayAt(targetEntity, `<cyan>A sphere of crackling electricity pins itself to your aura!</cyan>`);
      B.sayAtExcept(subject.room, `<blue>A sphere of lightning zips from ${subject.name} and begins orbiting ${targetEntity.name}.</blue>`, [subject, targetEntity]);
    });

    caster.addEffect(controlEffect);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.8) {
      B.sayAt(caster.room, "<blue>Tiny sparks of blue light dance across the metal surfaces in the room.</blue>");
    }
  },

  onEnd(state, caster, effect) {
    B.sayAt(caster.room, "<grey>The static discharge fades, and the scent of ozone slowly dissipates.</grey>");
    B.sayAt(caster, "Your lightning globes flicker and vanish.");
  }
};
