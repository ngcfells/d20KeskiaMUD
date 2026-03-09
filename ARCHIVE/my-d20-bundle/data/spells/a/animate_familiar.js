/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Animate Familiar
 * Source: & Magazine Issue 2, p.7
 * 
 * Logic:
 * - Requirement: Must be cast on a currently bonded living familiar.
 * - Ritual: Familiar is slain and animated; master is protected from death-penalty during ritual.
 * - Traits: Familiar becomes Undead; gains immunity to sleep, charm, cold, poison.
 * - Combat: Resistant to normal weapons (Silver/Magic required); 1/2 damage from piercing.
 * - HP Scaling: Familiar gains +1 HP per 3 CL.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'animate_familiar',
  name: 'Animate Familiar',
  level: 3,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil', 'undead', 'ritual'],
  source: '& Magazine Issue 2, p.7',

  /**
   * SPELL LISTS:
   * - Magic-User/Wizard: 3 (Necromancy Specialist preferred)
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 day',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'obsidian_knife', 
      quantity: 1, 
      consumed: false, 
      notes: 'Tainted by the ritual.' 
    },
    { 
      id: 'ceremonial_bowl', 
      quantity: 1, 
      consumed: false 
    },
    { 
      id: 'black_silk_sheet', 
      quantity: 1, 
      consumed: false 
    }
  ],
  
  focus: {
    id: 'evil_altar',
    name: 'Consecrated Evil Altar',
    minValue: 250,
    consumed: false
  },

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '0',
  target: 'one bonded familiar',
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster) {
    const familiar = caster.getFollower('familiar');
    
    if (!familiar || familiar.hasTag('undead')) {
      return B.sayAt(caster, "<red>You must have a living, bonded familiar to perform this ritual.</red>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const hpBonus = Math.floor(cl / 3);

    B.sayAt(caster, `<bold><magenta>You lay your familiar upon the altar and plunge the obsidian knife into its heart. As its life fades, you catch the soul in the ceremonial bowl and pour it back into the cooling corpse.</magenta></bold>`);
    
    // Transform Familiar
    familiar.addTag('undead');
    familiar.setMeta('type', 'undead');
    familiar.addTag('unnatural_aura'); // Unnerves normal animals
    
    // HP Scaling
    const baseHealth = familiar.getAttribute('health');
    familiar.setAttribute('health', baseHealth + hpBonus);
    
    // Apply the permanent Undead Familiar effect
    const undeadEffect = state.EffectFactory.create('undead_familiar_traits', {
      duration: 0, // Permanent
      state: { 
        masterUuid: caster.uuid,
        masterLevel: cl 
      }
    });
    
    familiar.addEffect(undeadEffect);
    
    B.sayAt(caster, `<bold><white>${familiar.name} opens its eyes—dull, lifeless, and fixed upon you with eternal loyalty.</white></bold>`);
  }
};
