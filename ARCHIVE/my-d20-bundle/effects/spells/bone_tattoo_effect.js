// path: ./bundles/my-d20-bundle/effects/spells/bone_tattoo_effect.js
'use strict';

module.exports = {
  config: {
    name: "Bone Tattoo",
    description: "SR vs Cold/Polymorph/Mind; perceived as undead; turnable with +4 resistance.",
    type: "condition",
    family: "necromancy",
    tier: 3
  },

  state: {
    srBonus: 11
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('perceived_as_undead');
      target.addTag('turnable_as_undead');
      target.setMeta('turnResistance', (target.getMeta('turnResistance') || 0) + 4);
    },

    /**
     * Logic: Provide Spell Resistance (SR) against specific categories.
     */
    onCheckSR(spell, caster, context) {
      const target = this.target;
      const validDescriptors = ['cold', 'polymorph', 'mind-affecting'];
      
      const isAffectedType = spell.descriptors.some(d => validDescriptors.includes(d)) || 
                             spell.school === 'enchantment';

      if (isAffectedType) {
        context.sr = Math.max(context.sr || 0, this.state.srBonus);
      }
    },

    /**
     * Logic: Mindless undead (Zombies, Skeletons) ignore the target.
     */
    onNpcAggro(npc, context) {
      if (npc.hasTag('mindless_undead')) {
        context.ignore = true;
      }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('perceived_as_undead');
      target.removeTag('turnable_as_undead');
      target.setMeta('turnResistance', Math.max(0, target.getMeta('turnResistance') - 4));
      
      target.say("<yellow>The bone-white markings on your skin fade away, and the warmth of life returns to your senses.</yellow>");
    }
  }
};
