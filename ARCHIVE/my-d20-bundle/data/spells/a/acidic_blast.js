/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acidic Blast
 * Source: WotC | Planescape: The Planewalker's Handbook / Hellbound
 * 
 * Logic:
 * - Material: Consumes 1 CP from the player's currency wallet and a vial of acid.
 * - Damage: 1d4 per level (Max 10d4) Acid damage.
 * - Target: Direct line to target + 5-ft splash.
 */

const { ACID } = require('../../lib/combat/damage-types');
const { Broadcast: B } = require('ranvier');

module.exports = {
  id: 'acidic_blast',
  name: 'Acidic Blast',
  level: 3,
  school: 'evocation',
  subschool: null,
  descriptors: [ACID],
  source: "Planescape: The Planewalker's Handbook",

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Specialist Wizard (Evoker): 3
   * - Sha'ir: 3 (Exotic/Planar)
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'digestive_acid_vial', 
      quantity: 1, 
      consumed: true 
    }
    // Copper is handled via wallet logic in onCast
  ],

  range: 'long', 
  target: 'one creature or point',
  area: 'line with 5-ft. splash',
  duration: 'instantaneous',
  savingThrow: 'none (direct hit) / reflex half (splash)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // WALLET LOGIC: Verify and deduct 1 Copper Piece (cp)
    const wallet = caster.getMeta('currencies') || { cp: 0 };
    if (wallet.cp < 1) {
      return B.sayAt(caster, "<red>You lack even a single copper piece to catalyze the blast!</red>");
    }

    // Deduct currency
    wallet.cp -= 1;
    caster.setMeta('currencies', wallet);

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const damageDice = Math.min(cl, 10);
    const damageRoll = state.Dice.roll(`${damageDice}d4`);

    B.sayAt(caster, `<bold><green>You flick a copper coin into the air and douse it with digestive acid; it dissolves instantly into a shrieking torrent of green fire!</green></bold>`);
    caster.room.emitExcept(caster, `<bold><green>${caster.name} unleashes a violent torrent of green fluid that streaks across the distance!</green></bold>`, [caster]);

    if (target) {
      B.sayAt(target, `<bold><red>The acidic blast slams into you, dissolving flesh and equipment alike!</red></bold>`);
      state.Damage.apply({
        amount: damageRoll,
        type: ACID,
        attacker: caster,
        target: target,
        source: this.name
      });
      
      // Object Corrosion (As per Planescape rules)
      target.equipment.forEach(item => {
        if (item.applyDamage) {
           item.applyDamage(1, ACID);
        }
      });
    }

    // Splash Damage to others in room
    const splashTargets = caster.room.characters.filter(c => c !== caster && c !== target);
    splashTargets.forEach(neighbor => {
        const splashDamage = Math.floor(damageRoll / 4);
        state.Damage.apply({
            amount: splashDamage,
            type: ACID,
            attacker: caster,
            target: neighbor,
            source: "Acidic Blast (Splash)"
        });
        B.sayAt(neighbor, "<green>You are splattered by the caustic residue of the blast!</green>");
    });
  }
};
