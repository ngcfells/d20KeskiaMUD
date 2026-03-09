/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * The ultimate archival sentence. Utilizing Netherese chronomancy and 
 * High Shou internal alchemy, the caster flattens the victim's 
 * physical and spiritual existence into a two-dimensional state. 
 * The target is literally 'written' into a new volume, where their 
 * life becomes nothing more than a cautionary biography.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'liang_s_narrative_entrapment',
  name: "Liang's Narrative Entrapment",
  level: 9,
  school: 'transmutation',
  subschool: null,
  descriptors: ['evil', 'planar'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 9
   * - Knowledge Domain: 9
   * - Rarity: Artifact (Liang Chou's Personal Sentence)
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'full-round',
  components: ['V', 'S', 'M', 'XP'],
  
  materialComponents: [
    { 
      id: 'blank_tome_dragonhide', 
      quantity: 1, 
      minValue: 500, 
      consumed: true, 
      notes: 'A masterwork blank tome bound in dragonhide.' 
    }
  ],
  xpCost: 1000,

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one living creature',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    if (ctx.savePassed) {
        caster.say(`<white>The target's narrative weight is too great; the pages of your tome refuse to catch their story.</white>`);
        target.say(`<cyan>You feel a terrifying, flat pressure trying to squeeze your very soul into a thin sheet of parchment. You scream and push back against the literalization of your being.</cyan>`);
        return;
    }

    // SUCCESS EMOTES
    caster.say(`<magenta>You slam the blank tome open toward ${target.name}. A vacuum of silver ink erupts from the pages, catching the victim's scream and pulling their physical form into a distorted, two-dimensional spiral.</magenta>`);
    
    target.say(`<red>Reality collapses. Height and depth vanish. Your last sensation is the smell of old paper and the feeling of ink filling your lungs as you are compressed into a single, static image.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} thrusts a book toward ${target.name}. The victim is violently flattened, their body becoming a flickering shadow that is sucked into the book's binding with a thunderous 'SLAM'.</magenta>`);

    // 1. Create the 'Trophy' Item
    const trappedItem = state.ItemFactory.create(
        state.ItemManager.get('folly_tome'),
        { 
            name: `The Folly of ${target.name}`,
            metadata: { 
                isBook: true, 
                originalId: target.id,
                content: `This volume contains the living soul and complete history of ${target.name}, who dared to defy the Liang Archive.`,
                subject: 'Necromantic Entrapment',
                isTrappedSoul: true
            } 
        }
    );

    // 2. Transfer to Caster's Hand and Delete Target
    caster.addItem(trappedItem);
    caster.say(`<yellow>[Archive Update] New volume acquired: ${trappedItem.name}.</yellow>`);

    if (target.isPlayer) {
        // Handle Player Entrapment (Logic for 'Prison' room or total logout)
        target.moveTo(state.RoomManager.getRoom('dimensional_archive_prison'));
    } else {
        target.remove(); // Delete NPC from the world
    }
  }
};
