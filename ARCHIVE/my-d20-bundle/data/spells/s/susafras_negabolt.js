/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * REVERSE/VARIANT: The caster taps into the Negative Material Plane, 
 * unleashing a stroke of absolute void. It hungers for life, chilling 
 * the soul and snuffing out vitality instantly.
 */
module.exports = {
  id: 'susafras_negabolt',
  name: "Susafras' Negabolt",
  level: 6,
  school: 'conjuration',
  subschool: 'summoning',
  descriptors: ['darkness', 'negative-energy'], 
  source: '& Magazine | Issue 2 | p.63',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'xeg_yi_tentacle', 
      quantity: 1, 
      consumed: true, 
      notes: 'A preserved tentacle from a creature of the Negative Energy Plane.' 
    }
  ],

  range: 'close', 
  target: 'line',
  area: '10ft wide, 20ft long line',
  duration: 'instantaneous', 
  savingThrow: 'reflex half',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const dice = Math.floor(cl / 2);
    
    caster.say("<black>The air freezes as you pull a stroke of the void into existence. Shadows bleed from your fingertips.</black>");
    caster.room.broadcastExcept(caster, `<black>A jagged tear in reality appears before ${caster.name}. A stroke of absolute blackness erupts forward, consuming all light and warmth in its path.</black>`);

    const targets = caster.room.getEntitiesInArea('line', 20, 10);

    for (const entity of targets) {
      let damageRoll = 0;
      for(let i = 0; i The void drinks your life-light! There is no escape from the hunger.</blue>");
        entity.receiveDamage('energy', damageRoll, caster);
      } else {
        const saveDC = 10 + 6 + D20Utils.getModifier(caster.getAttribute('intelligence'));
        const saveRoll = Math.floor(Math.random() * 20) + 1 + (entity.getMeta('save_reflex') || 0);
        
        if (saveRoll >= saveDC) {
          damageRoll = Math.floor(damageRoll / 2);
        }
        entity.receiveDamage('energy', damageRoll, caster);
      }
    }
  }
};
