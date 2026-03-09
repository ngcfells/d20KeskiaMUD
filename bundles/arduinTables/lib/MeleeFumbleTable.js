/**
 * Arduin-inspired Melee Fumble Table
 * Percentile results for a natural 1 twice in a row.
 */
const ArduinFumbles = [
  { range: [1, 5],  desc: "Glancing blow! You only do half damage", effect: '.5 to damage roll' },
  { range: [6, 10], desc: "Your grip of the weapon's handle slipped! You'll have to readjust before attacking again.", effect: '.25 to damage roll. Lose next attack with this weapon.' },
  { range: [11, 15], desc: "Everything's a mess! Both parties lose their next attacks. ", effect: 'Both attacker and attacked lose next attack. 25% chance of disarmed to both' },
  { range: [16, 25], desc: "Your weapon goes flying!!! You will need to retrieve it and reequip!", effect: 'DISARM' },
  { range: [26, 30], desc: "Your opponent has grappled you, effectively blocking your attack!", effect: 'GRAPPLED' },
  { range: [31, 35], desc: "With a weird shift, your weapon twists and hits <name>", effect: 'Hit another random target. If no other target, hit self. Must be using a flexible weapon like whip, flail, chain, etc.' },
  { range: [36, 40], desc: "You have managed to tangle your weapon around yourself!", effect: 'Lose next 1d3 attacks' },
  { range: [41, 49], desc: "You somehow hit yourself!", effect: '.5 damage roll, applied to self' },
  { range: [50, 50], desc: "Your <weapon name> has broken!", effect: 'Must be nonmagical, nonmastercrafted weapon. Durability drops to 0.' },
  { range: [51, 55], desc: "You slip!!!", effect: 'Roll on Agility Table' },
  { range: [56, 60], desc: "You have managed to bump <name> messing up both of your actions!", effect: 'Must have an ally present. Both you and they lose next attack. If not apply to enemy engaged.' },
  { range: [61, 65], desc: "You have managed to bump <name> messing up both of your actions!", effect: 'You and your enemy both lose next attack.' },
  { range: [66, 70], desc: "You catch on... something... and you stumble.", effect: 'PRONE. All nearby REF Save DC 15 or PRONE' },
  { range: [71, 75], desc: "You begin to attack and you slip... you try and maintain your balance...", effect: 'REF Save DC 12. On save attack continues, on fail, lose attack.' },
  { range: [76, 80], desc: "You drift into an attack meant for someone else...", effect: 'Take attack meant for someone else. If no others in combat with a target other than you, reroll.  .75 damage taken.' },
  { range: [81, 85], desc: "You have twisted something in a way it was not meant to be twisted...", effect: 'lose next attack. Reduce speed by 1/2 for next five minutes.' },
  { range: [86, 90], desc: "Your attack has hit the wrong target!", effect: 'Randomly select another target. 3/4 damage. If no other target, reroll.' },
  { range: [91, 92], desc: "You have managed to hit yourself!", effect: 'Lose next attack. Take .5 damage rolled.' },
  { range: [93, 94], desc: "Your enchanted weapon has been damaged!", effect: 'Must have enchanted weapon. Durability set to 0 if a +1, -75 durability if +2, -50 durability if +3, -25 durability if +4, -5 if +5. ' },
  { range: [95, 95], desc: "Your enchanted weapon has been damaged!", effect: 'Must have enchanted weapon. Durability set to 0 if a +1, +2, or +3. -75 durability if +4, -50 durability if +5.' },
  { range: [96, 97], desc: "You have stunned your ally!", effect: 'Must have an ally, randomly select which one. .5 damage to ally and STUNNED for 1d10 rounds. If no ally, apply to self' },
  { range: [98, 98], desc: "You have critically hit an ally!", effect: 'Must have an ally. Randomly select which one. If not ally apply to self as if 99 rolled. Roll on Critical Hit Table.' },
  { range: [99, 99], desc: "You have critically hit yourself!", effect: 'Roll critical hit on self.' },
  { range: [100, 100], desc: "", effect: 'Roll three times on Fumble Table' },
];

class FumbleTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return ArduinFumbles.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = FumbleTable;
