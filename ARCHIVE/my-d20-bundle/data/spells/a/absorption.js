/**
 * Implementation: Absorption
 * Source: WotC | Spell Compendium p.7
 */
'use strict';
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'absorption',
  name: 'Absorption',
  level: 9,
  school: 'abjuration',
  descriptors: ['force'],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'personal',
  target: 'self',
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. FEEDBACK LOOP CHECK
    const existingEffect = caster.effects.get('absorption_active');
    
    if (existingEffect) {
      // Using d20Utils/Dice logic for the 10d6 feedback
      const explosionDamage = state.Dice.roll('10d6');
      
      Broadcast.sayAt(caster, "<bold><red>!! INTERNAL ARCANE COLLAPSE !!</red></bold>");
      Broadcast.sayAt(caster, "<magenta>The new absorption field implodes against the old one!</magenta>");
      Broadcast.sayAtExcept(caster.room, `<bold><magenta>The air around ${caster.name} erupts in a massive shockwave of pure force!</magenta></bold>`, [caster]);

      // Apply damage via your damage-types system
      caster.receiveDamage({
        metadata: {
          amount: explosionDamage,
          type: 'force',
          source: "Absorption Feedback Loop"
        }
      }, caster);

      existingEffect.remove();
      return; 
    }

    // 2. CAPACITY ROLL (1d4+6)
    const cl = caster.getAttribute('intelligence'); // Placeholder for CL logic
    const capacity = state.Dice.roll('1d4+6');
    
    const effect = state.EffectFactory.create('absorption_active', {
      duration: cl * 600000,
    }, { 
      remainingCapacity: capacity, 
      storedLevels: 0 
    });

    // 3. CAPTURE SPELLS (Hooked into SpellResolver)
    // Note: This logic assumes your SpellResolver checks for 'onIncomingSpell' triggers.
    effect.addTrigger('onIncomingSpell', (attacker, subject, spellData) => {
      // Area, Touch, and certain Descriptors bypass this per SRD
      if (spellData.range === 'touch' || spellData.area || spellData.descriptors.includes('bypass_absorption')) {
        return; 
      }

      const spellLevel = spellData.level;
      const { remainingCapacity } = effect.state;

      if (remainingCapacity >= spellLevel) {
        effect.state.remainingCapacity -= spellLevel;
        effect.state.storedLevels += spellLevel;
        spellData.cancelled = true;

        Broadcast.sayAt(subject, `<cyan>Your aura flares! You have swallowed the ${spellLevel}-level magic of ${spellData.name}.</cyan>`);
        Broadcast.sayAt(attacker, `<white>Your ${spellData.name} vanishes into ${subject.name}'s shimmering void!</white>`);
        Broadcast.sayAtExcept(subject.room, `<grey>The magic from ${attacker.name} is sucked into a distortion around ${subject.name}.</grey>`, [subject, attacker]);
        
        if (effect.state.remainingCapacity <= 0) effect.remove();
      } else if (remainingCapacity > 0) {
        // Partial Absorption Overflow
        effect.state.storedLevels += remainingCapacity;
        effect.state.remainingCapacity = 0;
        spellData.cancelled = true;

        Broadcast.sayAt(subject, "<red>Your absorption aura shatters as it consumes the incoming spell!</red>");
        Broadcast.sayAt(attacker, `<bold><white>Your ${spellData.name} is snuffed out, but the void around ${subject.name} shatters!</white></bold>`);
        
        effect.remove();
      }
    });

    caster.addEffect(effect);
    Broadcast.sayAt(caster, "<cyan>A shimmering distortion of space wraps around you, hungry for magic.</cyan>");
    Broadcast.sayAtExcept(caster.room, `<grey>The light around ${caster.name} begins to bend and warp.</grey>`, [caster]);
  },

  onTick(state, caster, effect) {
    if (effect.state.storedLevels > 0 && Math.random() > 0.9) {
      Broadcast.sayAt(caster, `<blue>Stored Arcane Levels: [${effect.state.storedLevels}]</blue>`);
    }
  }
};
