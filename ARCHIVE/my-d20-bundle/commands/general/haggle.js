// path: bundles/my-d20-bundle/commands/general/haggle.js

'use strict';

module.exports = {
  usage: 'haggle <item> <vendor>',
  aliases: ['bargain', 'barter'],
  category: 'social',
  tags: ['trade', 'vendor', 'skill-check'],
  requires: ['room', 'vendor-present', 'social-skill'],
  help: 'haggle',

  command: state => (args, player) => {
    const Msg = state.Msg;
    const Errors = state.Errors;
    const Logger = state.CommandLogger;
    const Resolve = state.TargetResolver;
    const PlayerEvents = state.PlayerEvents;
    const InventoryEvents = state.InventoryEvents;
    const NpcEvents = state.NpcEvents;

    Logger.log(player, 'haggle', { args });

    if (!args || !args.length) {
      return Msg.info(player, "Usage: haggle <item> <vendor>");
    }

    const cleaned = args
      .toLowerCase()
      .replace(/\b(with|at|to|from|for|price|the)\b/g, '')
      .trim()
      .split(/\s+/);

    const itemSearch = cleaned[0];
    const vendorSearch = cleaned.slice(1).join(' ');

    if (!itemSearch || !vendorSearch) {
      return Msg.info(player, "Try: haggle <item> <vendor>");
    }

    const vendor = Resolve.resolve(player, vendorSearch, {
      includeRoomNpcs: true,
      includeRoleAliases: true
    });

    if (!vendor || !vendor.hasBehavior('vendor')) {
      return Msg.info(player, "They aren't interested in bargaining.");
    }

    const repKey = `merchant_rep.${vendor.uuid}`;
    const merchantRep = player.getMeta(repKey) || 0;

    const personality = vendor.getMeta('personality') || 'neutral';
    const personalityMod = {
      grumpy: +5,
      neutral: 0,
      friendly: -5
    }[personality] || 0;

    const rarity = vendor.getMeta(`rarity.${itemSearch}`) || 'common';
    const rarityMod = {
      common: 0,
      uncommon: +2,
      rare: +5,
      legendary: +10
    }[rarity] || 0;

    const vendorWis = vendor.getAttribute('wisdom') || 10;
    const vendorCha = vendor.getAttribute('charisma') || 10;
    const vendorApp = vendor.getAttribute('appearance') || vendorCha;
    const vendorSense = vendor.getMeta('skills.sense_motive') || 0;

    const timeOfDayMod = state.WorldTime ? state.WorldTime.getHaggleModifier() : 0;
    const crowdPressureMod = vendor.getMeta('crowd_pressure') || 0;
    const factionRep = player.getMeta(`faction.${vendor.getMeta('faction') || 'neutral'}`) || 0;

    let dc = 10
      + vendorSense
      + Math.floor((vendorWis - 10) / 2)
      + Math.floor((vendorCha - 10) / 2)
      + Math.floor((vendorApp - 10) / 2)
      + personalityMod
      + rarityMod
      + timeOfDayMod
      + crowdPressureMod
      - merchantRep
      - Math.floor(factionRep / 2);

    const skillId = player.getMeta('config.social_style') || 'diplomacy';
    const specialtyPath = ['barter'];

    const modifiers = { circumstance: 0 };

    if ((player.getSkill('sense_motive')?.rank || 0) >= 5) {
      modifiers.circumstance += 2;
    }
    if ((player.getSkill('barter')?.rank || 0) >= 5) {
      modifiers.circumstance += 2;
    }

    const cha = player.getAttribute('charisma') || 10;
    const app = player.getAttribute('appearance') || cha;
    modifiers.circumstance += Math.floor((cha - 10) / 2);
    modifiers.circumstance += Math.floor((app - 10) / 2);

    const cooldownKey = `haggle:${vendor.uuid}`;
    if (!player.cooldown(cooldownKey, 30000)) {
      return Msg.info(player, "You need a moment before trying to haggle again.");
    }

    const attemptsKey = `haggle_attempts.${vendor.uuid}`;
    const attempts = player.getMeta(attemptsKey) || 0;
    if (attempts >= 5) {
      return Msg.info(player, `${vendor.name} says, "I've given you my best price already."`);
    }

    const result = state.SkillCheck.check(player, skillId, specialtyPath, dc, modifiers);

    player.setMeta(attemptsKey, attempts + 1);

    Msg.info(player, `You attempt to talk ${vendor.name} down on the price...`);
    NpcEvents.emitInteraction(vendor, 'haggle', player);

    const currentMult = vendor.getMeta('vendor_multiplier') || 1.0;

    if (!result.success) {
      Msg.error(player, `${vendor.name} scoffs. "The price is the price, take it or leave it."`);

      if (result.roll === 1) {
        vendor.setMeta('vendor_multiplier', currentMult + 0.1);
        player.setMeta(repKey, merchantRep - 1);
      }

      PlayerEvents.emitAction(player, 'haggle-fail', { vendor, result });
      return;
    }

    const degree = Math.floor((result.total - dc) / 5);
    const discount = 0.05 + (degree * 0.05);
    let newMult = currentMult - discount;

    const minMult = 0.7;
    if (newMult < minMult) {
      newMult = minMult;
    }

    if (result.roll === 20) {
      vendor.setMeta('personality', 'friendly');
      player.setMeta(repKey, merchantRep + 2);
      Msg.success(player, `${vendor.name} beams at you. "For you? A special price!"`);
    } else {
      player.setMeta(repKey, merchantRep + 1);
    }

    const haggleEffect = state.EffectFactory.create('haggled_price', {
      duration: 300000,
      state: { multiplier: newMult, vendorId: vendor.uuid }
    });

    if (player.addEffect(haggleEffect)) {
      Msg.success(
        player,
        `${vendor.name} sighs. "Fine, for you? I'll do it for ${Math.round(newMult * 100)}%."`
      );
    }

    InventoryEvents.emitChange(player, 'price-modified', { vendor, multiplier: newMult });
    PlayerEvents.emitAction(player, 'haggle-success', { vendor, result, multiplier: newMult });
  }
};
