/**
 * Fantasy Fumble Effects Table - All Fantasy Weapons. Converted to d20
 * Roll to hit.
 * If a miss, how much was it missed by?
 * If a 16 was needed to hit, and a 6 was rolled, there is a 10% chance of a fumble.
 * If a natural 1 was rolled, double the chance percentage determined above.
 * Roll for fumble on percentile.
 */

const Fumbles = [
  { range: [1, 19],  desc: "slipped", effect: 'Make a DC 15 Reflex save. On a failure, you fall prone and are stunned for 1d4 rounds.' },
  { range: [20, 33], desc: "stumble", effect: 'DC 15 Reflex save or fall prone and be stunned for 1d6 rounds.' },
  { range: [34, 39], desc: "trip and fall", effect: 'fall prone and be stunned for 1d6 rounds.' },
  { range: [40, 44], desc: "off balance", effect: 'DC 15 Reflex save or be dazed for 1 round.' },
  { range: [45, 49], desc: "weapon grip slips slightly", effect: 'DC 15 Reflex save or be dazed for 1 round.' },
  { range: [50, 54], desc: "weapon grip slips majorly", effect: 'DC 15 Reflex save or drop your held weapon.' },
  { range: [55, 59], desc: "weapon grip slips completely", effect: 'drop your held weapon' },
  { range: [60, 61], desc: "shield tangled with opponent", effect: 'DC 15 Reflex save or your shield becomes tangled with your opponent. If tangled: You cannot use that shield to attack (bash) and you take a –2 penalty on attack rolls for 1 round as you struggle to free it. No effect if you are not wielding a shield.' },
  { range: [62, 63], desc: "shield tangled with opponent", effect: 'Both you and your opponent are Dazed for 1 round. Restriction: This only applies if you are wielding a shield. Result: Neither creature can take actions next round while the gear is snagged.' },
  { range: [64, 65], desc: "weapon tangled with opponent", effect: 'Dazed for 1 round' },
  { range: [66, 69], desc: "weapon knocked away", effect: 'Disarmed. Direction: Roll 1d8 to determine the square where it lands (1 = North/Directly In Front, proceeding clockwise). Distance: Roll 2d5 feet.' },
  { range: [70, 74], desc: "weapon is damaged / breaks", effect: handleWeaponDamage },
  { range: [75, 76], desc: "hit self", effect: '1/2 damage' },
  { range: [77, 78], desc: "hit self", effect: 'normal damage' },
  { range: [79, 80], desc: "hit self", effect: 'dobule damage' },
  { range: [81, 82], desc: "hit friend", effect: '1/2 damage, if no friend/companion/ally/servant hit self' },
  { range: [83, 84], desc: "hit friend", effect: 'normal damage, if no friend/companion/ally/servant hit self' },
  { range: [85, 86], desc: "hit friend", effect: 'double damage, if no friend/companion/ally/servant hit self' },
  { range: [87, 88], desc: "critical hit self", effect: 'roll on correct table per weapon type' },
  { range: [89, 90], desc: "critical hit friend", effect: 'roll on correct table per weapon type' },
  { range: [91, 92], desc: "twist ankle", effect: 'Your speed is reduced by half for 1 round. Make a DC 15 Reflex save (or Dexterity check). On a failure, you also fall prone.' },
  { range: [93, 95], desc: "helm slips", effect: 'You take a –6 penalty on all attack rolls and a –2 penalty to AC (due to obscured vision) To Fix: As a Move Action, make a DC 15 Dexterity check. If successful, the helm is adjusted and the penalties end. Requirement: If the character is not wearing a helm, reroll on the fumble/hazard table.' },
  { range: [96, 97], desc: "helm slips", effect: 'Requirement: If you are not wearing a head-slot item, reroll on the table. Effect: Your vision is blocked. You cannot take Attack actions (including Attacks of Opportunity) until the helm is fixed. To Fix: As a Move Action, make a DC 15 Dexterity check. Success means the helm is adjusted and you can attack normally on your next available action.' },
  { range: [98, 98], desc: "distracted", effect: 'Next attack made against you by your current opponent(s) gains a +3 bonus to hit.' },
  { range: [99, 99], desc: "", effect: 'roll twice, ignoring rolls of 99 or 00' },
  { range: [100, 100], desc: "", effect: 'roll thrice, ignoring rolls of 99 or 00' }
];

class FumbleTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return Fumbles.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

/**
 * @param {Item} weapon - The Ranvier Item object
 * @param {number} roll - The d100 roll result
 * @return {string} Result message
 */
function handleWeaponDamage(weapon, roll) {
  // Get enhancement bonus (e.g., +1, +2) from metadata
  const enhancement = weapon.getMeta('enhancement') || 0;
  
  // Calculate break chance: Base 100% - (20% * enhancement)
  // For the 70-74 bracket, we check if the roll hits after modifiers
  const breakChanceReduction = enhancement * 20;
  const isTriggered = (roll >= 70 && roll <= 74);

  if (isTriggered) {
    // Check if the enhancement bonus saves the weapon
    const randomChance = Math.floor(Math.random() * 100);
    
    if (randomChance >= breakChanceReduction) {
      // WEAPON BREAKS
      weapon.setMeta('durability', 0);
      weapon.metadata.name = `Broken ${weapon.name}`; // Visual indicator
      return "Your weapon shatters!";
    } else {
      // WEAPON DAMAGED (Reduced by X)
      const currentDur = weapon.getMeta('durability') || 100;
      const damageAmount = 15; // Your 'X' amount
      const newDurability = currentDur - damageAmount;

      if (newDurability <= 0) {
        // The weapon didn't shatter instantly, but it wore down to nothing
        weapon.setMeta('durability', 0);
        weapon.setMeta('broken', true); // Custom flag for your MUD logic
        return "With a final crack, your weapon yields and breaks from wear.";
      } else {
        weapon.setMeta('durability', newDurability);
        return "Your weapon is battered, but it remains intact.";
      }
    }
}

module.exports = FumbleTable;
