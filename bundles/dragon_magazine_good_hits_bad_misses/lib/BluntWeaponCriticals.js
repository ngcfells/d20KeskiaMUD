/**
 * Blunt Weapon Critical Effects Table. Converted to d20
 * Roll to hit.
 * If a hit, how far beyond the minimum to hit was it?
 * If a 15 was needed to hit, and an adjusted 25 to hit was rolled, there is a 10% chance of a citical.
 * If a natural 20 was rolled double the base chance above.
 * Roll for critical on percentile.
 * Apply normal critical damage for weapon in addition to whatever is shown here.
 * Saves, when allowed, use 10 + 1/2 Attacker's Level/HD + Str Modifier to determine the DC.
 */

const BluntCriticals = [
  { range: [1, 31],  desc: "A powerful strike that finds a weak point in the armor.", effect: 'Double damage (standard critical x2).' },
  { range: [32, 64], desc: "A devastating impact that nearly crushes the life from the foe.", effect: 'Triple damage (standard critical x3).' },
  { range: [65, 66], desc: "The impact splinters the enemy's shield.", effect: 'Shield is destroyed. If no shield, no additional effect.' },
  { range: [67, 68], desc: "Your blow shatters the wood and iron of the enemy's defense.", effect: 'Shield is destroyed. If no shield, roll again on this table.' },
  { range: [69, 70], desc: "The force of the blow deadens the nerves in their shield arm.", effect: 'Target must pass Fort save or lose Shield Bonus to AC for 1d6 rounds.' },
  { range: [71, 72], desc: "A sickening snap echoes as the shield arm gives way.", effect: 'Fort save or shield arm broken; Shield is dropped and cannot be used until magically healed.' },
  { range: [73, 74], desc: "The shock of the impact travels up their weapon arm.", effect: 'Fort save or -2 penalty on attack rolls for the encounter.' },
  { range: [75, 76], desc: "A heavy strike leaves their weapon arm numb and trembling.", effect: 'Fort save or -4 penalty on attack rolls for the encounter.' },
  { range: [77, 78], desc: "The bone in the weapon arm shatters under your blow.", effect: 'Fort save or weapon arm broken; Target drops weapon and cannot attack with that arm.' },
  { range: [79, 80], desc: "The weapon mashes the target\'s fingers against their grip.", effect: '1d5 Dexterity damage. No effect if helm/heavy gauntlets protect (DM discretion).' },
  { range: [81, 82], desc: "A crushing blow to the hand destroys fine motor control.", effect: '1d5 Dexterity damage.' },
  { range: [83, 84], desc: "You catch them square in the chest, knocking the wind out of them.", effect: 'Fort save or Stunned for 1d6 rounds.' },
  { range: [85, 86], desc: "Ribs splinter into the lungs; the target gasps for air that won\'t come.", effect: '1d4 Constitution damage. Fort save or target is Exhausted (half speed) and takes 1d6 bleed/round.' },
  { range: [87, 88], desc: "The sternum collapses, driving bone shards into the heart.", effect: 'Fort save or Death. On success, take 3d6 extra damage and become Exhausted.' },
  { range: [89, 90], desc: "The force of the blow sweeps their leg from under them.", effect: 'Target is knocked Prone. Stability/Size bonuses to save apply.' },
  { range: [91, 92], desc: "A brutal strike to the thigh causes the muscle to seize.", effect: 'Fort save or land speed is halved for the encounter.' },
  { range: [93, 94], desc: "The leg bone snaps cleanly under the weight of the strike.", effect: 'Fort save or land speed 0ft; character is Prone.' },
  { range: [95, 95], desc: "A glancing blow to the head dazes the target.", effect: '1d6 Intelligence damage. No effect if helmed.' },
  { range: [96, 96], desc: "A heavy thud against the cranium causes significant trauma.", effect: '1d6 Intelligence damage.' },
  { range: [97, 97], desc: "The strike rattles the target\'s brain within their skull.", effect: '2d6 Intelligence damage. No effect if helmed.' },
  { range: [98, 98], desc: "A massive impact to the forehead causes immediate cognitive failure.", effect: '2d6 Intelligence damage.' },
  { range: [99, 99], desc: "The skull collapses like an eggshell.", effect: 'Fort save or Death. No effect if helmed.' },
  { range: [100, 100], desc: "A final, crushing blow to the head ends the fight instantly.", effect: 'Fort save or Death.' }
];

class BluntCriticalTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return BluntCriticals.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = BluntCriticalTable;
