'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Creates a ghostly hand to deliver touch spells up to 6th level.
 * Caster loses 1d8 HP (returned on end, unless hand is destroyed).
 * Hand AC: 24 + Int Mod. Saves: Caster's saves + 2.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'ghostly_deliverer',
  name: 'Ghostly Deliverer',
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'medium',
  target: 'one ghostly hand',
  area: null,
  duration: '1 minute/level',
  savingThrow: 'none',
  spellResistance: false,

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
    // 1. HP Sacrifice Logic
    const lostHP = state.Dice.roll('1d8').total;
    if (caster.getAttribute('health') <= lostHP) {
      return caster.say("<red>You do not have enough life force to sustain the deliverer.</red>");
    }

    caster.applyDamage(lostHP, 'untyped', { source: this.id, isSacrifice: true });
    caster.say(`<magenta>A translucent, oversized hand detaches from your shadow, draining ${lostHP} hit points from your essence.</magenta>`);

    // 2. Hand Creation
    const hand = state.MobFactory.create(caster.area, 'ghostly_deliverer_npc');
    hand.name = `Ghostly Deliverer (${caster.name})`;
    
    // Attributes: AC 24 + Int Mod
    const intMod = Math.floor(((caster.getAttribute('intelligence') || 10) - 10) / 2);
    hand.setAttributeBase('armorKinetic', 24 + intMod);
    hand.setAttributeBase('health', lostHP);
    
    // Saves: Caster's saves + 2
    hand.setAttributeBase('fortitude', (caster.getAttribute('fortitude') || 0) + 2);
    hand.setAttributeBase('reflex', (caster.getAttribute('reflex') || 0) + 2);
    hand.setAttributeBase('will', (caster.getAttribute('will') || 0) + 2);

    hand.setMeta('ownerId', caster.id);
    hand.setMeta('maxSpellLevel', 6);
    hand.setMeta('sacrificeAmount', lostHP);

    state.MobManager.addMob(hand);
    hand.moveTo(caster.room);

    // 3. Track the effect for HP return logic
    const effect = state.EffectFactory.create('ghostly_deliverer_active', caster, {
      duration: (1 * 60000) * caster.level,
      state: { handId: hand.uuid, sacrificeAmount: lostHP }
    });
    caster.addEffect(effect);
  }
};
