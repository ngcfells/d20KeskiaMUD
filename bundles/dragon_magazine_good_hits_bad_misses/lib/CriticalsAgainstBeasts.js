/**
 * Critical Effects vs. Beasts Table. Converted to d20
 * Roll to hit.
 * If a hit, how far beyond the minimum to hit was it?
 * If a 15 was needed to hit, and an adjusted 25 to hit was rolled, there is a 10% chance of a citical.
 * If a natural 20 was rolled double the base chance above.
 * Roll for critical on percentile.
 * Apply normal critical damage for weapon in addition to whatever is shown here.
 * Saves, when allowed, use 10 + 1/2 Attacker's Level/HD + Str Modifier to determine the DC.
 */

const CriticalsVsBeasts = [
  { range: [1, 29],   desc: "A solid strike to the beast's flank.", effect: "Double damage (standard critical x2)." },
  { range: [30, 58],  desc: "A crushing blow that rattles the creature's core.", effect: "Triple damage (standard critical x3)." },
  { range: [59, 60],  desc: "A limb is severed or mangled at the joint connecting to the body.", effect: "Fort save or limb lost; Speed halved and 1d6 Constitution drain." },
  { range: [61, 62],  desc: "The strike shears through a limb at the midpoint.", effect: "Fort save or limb lost; Speed halved and 1d4 Constitution drain." },
  { range: [63, 64],  desc: "A mid-limb strike renders a paw or claw useless.", effect: "Fort save or limb lost; -2 penalty to attack rolls and 1d4 Constitution drain." },
  { range: [65, 66],  desc: "The primary attacking limb is torn away from the torso.", effect: "Fort save or limb lost; -4 penalty to attack rolls and 1d6 Constitution drain." },
  { range: [67, 68],  desc: "Multiple wounds at the midpoints of the beast's limbs.", effect: "Fort save or limbs lost; Speed halved, -2 attack penalty, and 1d4 Constitution drain." },
  { range: [69, 70],  desc: "The beast is systematically dismantled at the shoulder or hip.", effect: "Fort save or limbs lost; Speed halved, -4 attack penalty, and 1d6 Constitution drain." },
  { range: [71, 72],  desc: "The blade or bludgeon crushes the windpipe or tears the jugular.", effect: "Fort save or immediate death. On success, 2d6 bleed damage/round." },
  { range: [73, 74],  desc: "A clean strike separates the head from the body.", effect: "Immediate death (No save for most biological creatures)." },
  { range: [75, 76],  desc: "A deep puncture or gash spills the creature's vitals.", effect: "Fort save or immediate death. On success, target is Nauseated." },
  { range: [77, 78],  desc: "Internal hemorrhaging begins in the beast's gut.", effect: "1d6 Constitution damage; death in 20-120 rounds (2-12 mins) without DC 20 Heal check." },
  { range: [79, 80],  desc: "A septic wound in the abdomen spells a slow end.", effect: "Target is Nauseated; death in 1-6 days without magical healing (Remove Disease/Heal)." },
  { range: [81, 82],  desc: "The chest cavity is breached, collapsing a critical organ.", effect: "Fort save or immediate death. On success, take 4d6 extra damage." },
  { range: [83, 84],  desc: "Broken ribs pierce the thoracic organs.", effect: "Target is Exhausted; death in 20-80 rounds (2-8 mins) without DC 20 Heal check." },
  { range: [85, 86],  desc: "A lingering chest wound causes the beast to slowly fail.", effect: "1 Con damage per hour; death in 1-4 days without magical healing." },
  { range: [87, 90],  desc: "A painful blow to the sensitive snoot sends the beast into a panic.", effect: "Will save or creature must use all actions to Retreat/Flee for 1d4 rounds." },
  { range: [91, 94],  desc: "The snoot is bloodied, distracting the creature's focus.", effect: "-2 penalty on attack rolls for 1d4 rounds." },
  { range: [95, 98],  desc: "A brutal strike to the snoot ruins the creature's senses.", effect: "-4 penalty on attack rolls for 1d4 rounds; target loses Scent ability." },
  { range: [99, 99],  desc: "The beast's skull is rattled by the force of the blow.", effect: "Target is Stunned for 1d6 rounds." },
  { range: [100, 100], desc: "The brain is destroyed instantly.", effect: "Fort save or immediate death. On success, 3d6 Intelligence damage." }
];

class CriticalVsBeastsTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return CriticalsVsBeasts.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = CriticalVsBeastsTable;
