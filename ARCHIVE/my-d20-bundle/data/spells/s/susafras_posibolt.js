/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * The caster acts as a physical conduit to the Positive Material Plane, 
 * discharging a concentrated stroke of raw life-energy. While curative in 
 * diffuse forms, this concentrated bolt overloads living systems and 
 * obliterates necrotic entities.
 */
module.exports = {
  id: 'susafras_posibolt',
  name: "Susafras' Posibolt",
  level: 6,
  school: 'conjuration',
  subschool: 'summoning',
  descriptors: ['light', 'positive-energy'], 
  source: '& Magazine | Issue 2 | p.63',

  /**
   * SPELL LISTS:
   * - Wizard/Sorcerer: 6
   * - Sun Domain: 6
   * - Glory Domain: 6
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'xag_ya_tentacle', 
      quantity: 1, 
      consumed: true, 
      notes: 'A preserved tentacle from a creature of the Positive Energy Plane.' 
    }
  ],

  range: 'close', // Interpreted 1"x2" as a short, wide line (30ft)
  target: 'line',
  area: '10ft wide, 20ft long line',
  duration: 'instantaneous', 
  savingThrow: 'reflex half',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const dice = Math.floor(cl / 2);
    
    // Perspective: Caster
    caster.say("<white>You reach into the blinding heart of the Positive Plane. Your arm becomes a conduit of pure, searing radiance!</white>");
    
    // Perspective: Room
    caster.room.broadcastExcept(caster, `<white>A vertical rift of impossible light tears open before ${caster.name}, discharging a wide stroke of brilliance that thrums with the sound of a thousand suns.</white>`);

    const targets = caster.room.getEntitiesInArea('line', 20, 10);

    for (const entity of targets) {
      let damageRoll = 0;
      for(let i = 0; i The positive energy scours your necrotic essence! You cannot resist the light!</red>");
        entity.receiveDamage('energy', damageRoll, caster);
      } else {
        // Standard Save
        const saveDC = 10 + 6 + D20Utils.getModifier(caster.getAttribute('intelligence'));
        const saveRoll = Math.floor(Math.random() * 20) + 1 + (entity.getMeta('save_reflex') || 0);
        
        if (saveRoll >= saveDC) {
          damageRoll = Math.floor(damageRoll / 2);
          entity.say("<yellow>You dive aside, though the heat of the bolt still blisters your skin.</yellow>");
        } else {
          // Item Destruction Logic (Simplified for MUD: Potential durability loss)
          entity.emit('item_save_check', { type: 'lightning', dc: saveDC });
        }
        entity.receiveDamage('energy', damageRoll, caster);
      }
    }
  }
};
