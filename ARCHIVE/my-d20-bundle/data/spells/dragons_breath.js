module.exports = {
  id: 'dragons_breath',
  name: "Dragon's Breath",
  level: 5,
  school: 'evocation',
  descriptors: ['see text'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'dragon_scale', quantity: 1, consumed: true }],
  range: '60 ft or 30 ft',
  target: 'cone or line',
  duration: '1 round/level',
  savingThrow: 'ref_half',
  spellResistance: true,
  onCast(state, caster, target, ctx) {
    // Logic: Choice of energy type (fire, cold, acid, elec) at casting.
    const energyType = ctx.args || 'fire';
    caster.addEffect(state.EffectManager.create('breath_weapon_stored', { energyType }));
    caster.say(`You channel the fury of a ${energyType} dragon into your lungs.`);
  }
};
