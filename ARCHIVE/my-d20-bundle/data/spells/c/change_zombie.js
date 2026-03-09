/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Change Zombie
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * A powerful necromantic catalyst that transforms a mundane zombie into 
 * a more lethal ghoul. The subject retains its existing command link, 
 * allowing a necromancer to refine their horde without re-animating.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'change_zombie',
  name: 'Change Zombie',
  level: 6,
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil'],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Death Domain: 6
   * - Hunger Domain: 5
   */

  castingTime: 'full-round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    {
      id: 'ghoul_bone',
      quantity: 1,
      consumed: true,
      notes: 'A bone taken from a naturally occurring ghoul.'
    },
    {
      id: 'black_onyx',
      quantity: 1,
      minValue: 100,
      consumed: true,
      notes: 'A black onyx gem worth at least 100 gp.'
    }
  ],

  range: 'touch',
  target: 'one zombie touched',
  area: null,
  duration: 'instantaneous', 
  savingThrow: 'will negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    // 1. Target Validation: Must be a Zombie
    if (!target.hasTag('zombie')) {
      return caster.say("This magic only resonates with the sluggish essence of a zombie.");
    }

    // 2. Save Check (Will negates)
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const dc = 10 + 6 + D20Utils.getModifier(caster.getAttribute(ability) || 10);
    const saveRoll = Math.floor(Math.random() * 20) + 1 + (target.getMeta('save_will') || 0);

    if (saveRoll >= dc) {
      caster.say(`<yellow>${target.name}’s dim spirit resists the transformation.</yellow>`);
      return;
    }

    // 3. Transformation Logic
    // Store master/control info to transfer to the new form
    const masterId = target.getMeta('master');
    const targetRoom = target.room;

    // Perspective: Caster
    caster.say(`<red>You press the onyx against the zombie's forehead. The gem dissolves into a black liquid that seeps into its skull, fueling a horrific evolution.</red>`);
    
    // Perspective: Room
    caster.room.broadcastExcept(caster, `<red>${caster.name} touches ${target.name}. The zombie's flesh suddenly begins to tighten and recede, its teeth sharpening into jagged points as its eyes flare with a hungry, feral light.</red>`, target);

    // Transform: In Ranvier, we swap the NPC template
    const ghoul = state.MobFactory.create(state.AreaManager.getArea('limbo'), 'ghoul_standard');
    ghoul.setMeta('master', masterId);
    
    // Transfer any existing equipment or relevant tags
    ghoul.moveTo(targetRoom);
    target.destroy(); // Remove the old zombie
  }
};
