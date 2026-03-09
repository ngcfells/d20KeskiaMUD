/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Analyze Portal
 * Source: WotC | Spell Compendium p.10
 * 
 * Logic:
 * - Requirement: Caster must be within 60 ft of a portal or vortex.
 * - Concentration: Each round reveals more data:
 *   - Round 1: Existence and active/inactive status.
 *   - Round 2: Destination (Area/Room Name).
 *   - Round 3: Key requirements (Item/Alignment/Level).
 *   - Round 4+: Stability and special properties.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'analyze_portal',
  name: 'Analyze Portal',
  level: 3,
  school: 'divination',
  descriptors: [],
  source: 'WotC | Spell Compendium p.10',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'crystal_lens',
      quantity: 1,
      consumed: true,
      notes: 'A crystal lens worth 50 gp.'
    }
  ],

  range: 'close',
  target: 'one portal',
  duration: 'concentration, up to 1 min/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. TARGET VALIDATION
    // MUDs often treat portals as Items or Room Exits with special properties.
    const portal = caster.room.items.find(i => i.hasTag('portal')) || 
                   caster.room.getExit(ctx.args);

    if (!portal || (!portal.getMeta('destination') && !portal.targetRoom)) {
      return Broadcast.sayAt(caster, "<yellow>There are no active portals or planar rifts here to analyze.</yellow>");
    }

    const cl = caster.getSpellCasterLevel();
    const effect = state.EffectFactory.create('analyzing_portal', {
      duration: cl * 60000,
      state: { 
        portalRef: portal,
        roundsConcentrated: 0 
      }
    });

    caster.addEffect(effect);

    Broadcast.sayAt(caster, `<bold><white>You peer through your crystal lens, watching the invisible ley-lines of the ${portal.name || 'gateway'} coalesce.</white></bold>`);
    Broadcast.sayAtExcept(caster.room, `<white>${caster.name} holds a crystal lens to their eye, staring intently at the space around the ${portal.name || 'gateway'}.</white>`, [caster]);
  },

  onTick(state, caster, effect) {
    const portal = effect.state.portalRef;
    effect.state.roundsConcentrated++;

    switch (effect.state.roundsConcentrated) {
      case 1:
        const status = portal.getMeta('inactive') ? "dormant" : "active";
        Broadcast.sayAt(caster, `<cyan>[Round 1] This is a ${status} planar gateway.</cyan>`);
        break;
      case 2:
        const dest = portal.targetRoom ? state.RoomManager.getRoom(portal.targetRoom).title : "An unknown plane";
        Broadcast.sayAt(caster, `<cyan>[Round 2] The portal is anchored to: ${dest}.</cyan>`);
        break;
      case 3:
        const key = portal.getMeta('key_item') || "None";
        const req = portal.getMeta('requirement') || "None";
        Broadcast.sayAt(caster, `<cyan>[Round 3] Activation Requirements: Key [${key}], Criteria [${req}].</cyan>`);
        break;
      case 4:
        const isTwoWay = portal.getMeta('two_way') ? "Two-way" : "One-way";
        const stability = portal.getMeta('unstable') ? "Unstable" : "Solid";
        Broadcast.sayAt(caster, `<cyan>[Round 4] Dimensional Stability: ${stability} (${isTwoWay}).</cyan>`);
        effect.remove(); // Analysis complete
        break;
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>You lower your lens; the planar threads fade from view.</grey>");
  }
};
