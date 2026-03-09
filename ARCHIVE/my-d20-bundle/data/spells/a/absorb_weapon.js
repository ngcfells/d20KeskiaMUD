/**
 * Implementation: Absorb Weapon
 * Source: WotC | Spell Compendium p.7
 */
'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'absorb_weapon',
  name: 'Absorb Weapon',
  level: 2,
  school: 'transmutation',
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'creature', // Targets the caster to absorb a held weapon
  duration: '1 hour/level',
  savingThrow: 'will negates',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // 1. ANATOMY-AWARE SLOT DETECTION
    // We look for 'wield' or 'held' slots. Thri-kreen may have 'wield.2', etc.
    const equip = caster.equipment;
    const weaponSlots = Array.from(equip.keys()).filter(s => s.includes('wield') || s.includes('held'));
    
    // Find the first valid light melee weapon in these slots
    let targetWeapon = null;
    let targetSlot = null;

    for (const slot of weaponSlots) {
      const item = equip.get(slot);
      if (item && item.hasTag('light_weapon') && item.hasTag('melee')) {
        targetWeapon = item;
        targetSlot = slot;
        break; 
      }
    }

    if (!targetWeapon) {
      return Broadcast.sayAt(caster, "You must be wielding a light melee weapon to absorb it.");
    }

    // 2. MAGICAL RESISTANCE
    const cl = caster.getAttribute('intelligence'); // Casting level logic
    const dc = 12 + Math.floor((caster.getAttribute('intelligence') - 10) / 2);

    if (targetWeapon.getMeta('isMagical')) {
      const saved = state.SpellResolver.resolveSave(targetWeapon, 'will', dc);
      if (saved) return Broadcast.sayAt(caster, `The ${targetWeapon.name} resists being absorbed.`);
    }

    // 3. POISON PRESERVATION
    const poisonEffect = targetWeapon.effects.get('poisoned_blade');
    const preservedPoison = poisonEffect ? {
      id: poisonEffect.state.poisonId,
      remaining: poisonEffect.remaining
    } : null;

    // 4. APPLY EFFECT
    const effect = state.EffectFactory.create('absorbed_weapon_effect', {
      duration: cl * 3600000,
    }, {
      weaponRef: targetWeapon,
      sourceSlot: targetSlot,
      preservedPoison: preservedPoison 
    });

    // Handle Ranvier's equipment removal logic
    caster.unequip(targetSlot);
    targetWeapon.hide();
    targetWeapon.moveTo(null); // Void storage
    caster.addEffect(effect);

    Broadcast.sayAt(caster, `<magenta>Your ${targetWeapon.name} dissolves into your ${targetSlot.replace('.', ' ')}.</magenta>`);
  },

  onEnd(state, caster, effect) {
    const { weaponRef, sourceSlot } = effect.state;
    if (weaponRef && weaponRef.isHidden()) {
      weaponRef.unhide();
      weaponRef.moveTo(caster);
      
      // Attempt to return to the original anatomy slot
      if (!caster.equipment.has(sourceSlot)) {
        caster.equip(weaponRef, sourceSlot);
        Broadcast.sayAt(caster, `<yellow>The spell expires; ${weaponRef.name} remanifests in your ${sourceSlot.replace('.', ' ')}.</yellow>`);
      } else {
        // Fallback to inventory if slot is now occupied
        weaponRef.moveTo(caster.inventory);
        Broadcast.sayAt(caster, `<yellow>The spell expires; ${weaponRef.name} returns to your pack as your hand is full.</yellow>`);
      }
    }
  }
};
