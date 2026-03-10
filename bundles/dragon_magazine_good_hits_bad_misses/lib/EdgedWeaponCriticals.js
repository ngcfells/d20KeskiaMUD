/**
 * Edged Weapon Critical Effects. Converted to d20
 * Roll to hit.
 * If a hit, how far beyond the minimum to hit was it?
 * If a 15 was needed to hit, and an adjusted 25 to hit was rolled, there is a 10% chance of a citical.
 * If a natural 20 was rolled double the base chance above.
 * Roll for critical on percentile.
 * Apply normal critical damage for weapon in addition to whatever is shown here.
 * Saves, when allowed, use 10 + 1/2 Attacker's Level/HD + Str Modifier to determine the DC.
 */

const EdgedCriticals = [
  { range: [1, 31], desc: "Your blade bites deep into the foe's armor.", effect: "Double damage (standard critical x2)." },
  { range: [32, 62], desc: "A devastating slash tears through flesh and bone alike.", effect: "Triple damage (standard critical x3)." },
  { range: [63, 63], desc: "Your blow shatters the wood and iron of the enemy's defense.", effect: "Shield is destroyed. If no shield, no additional effect." },
  { range: [64, 64], desc: "With a violent strike, you hack through their guard.", effect: "Shield is destroyed. If no shield, roll again on this table." },
  { range: [65, 65], desc: "Your blade catches the rim of their helmet, wrenching it free.", effect: "Helm removed. If no helm: Target loses an ear (1d2 Cha damage) and is Stunned for 1d6 rounds." },
  { range: [66, 66], desc: "A brutal strike upwards shears the helmet away and clips the skull.", effect: "Helm removed; target loses an ear (1d2 Cha damage) and is Stunned for 1d6 rounds." },
  { range: [67, 67], desc: "A precise thrust pierces the soft tissue of the neck.", effect: "Voicebox punctured; target cannot speak or cast spells with verbal components. No effect if helmed." },
  { range: [68, 69], desc: "The edge of your blade slices clean through the side of their head.", effect: "Ear removed (1d2 Cha damage). No effect if helmed." },
  { range: [70, 70], desc: "Your swing knocks the helmet loose before slicing into the ear.", effect: "Ear removed; helm is removed if the target was wearing one." },
  { range: [71, 72], desc: "The tip of your weapon finds the narrow slit of the visor.", effect: "Eye removed (-2 penalty to ranged attacks and Search/Spot). No effect if helmed." },
  { range: [73, 73], desc: "A cruel slash across the face claims an eye.", effect: "Eye removed (-2 penalty to ranged attacks and Search/Spot)." },
  { range: [74, 74], desc: "You hack into the side of the knee, severing tendons.", effect: "Knee split; land speed is halved." },
  { range: [75, 75], desc: "A heavy blow shatters the kneecap completely.", effect: "Knee split; land speed reduced to 0ft (Target is Prone)." },
  { range: [76, 76], desc: "A glancing blow across the knuckles shears off digits.", effect: "Fingers removed; 1d5 Dexterity damage." },
  { range: [77, 77], desc: "Your blade sweeps low, severing the foot at the joint.", effect: "Leg removed at ankle; speed 0ft, 1d4 Con damage, and target is Prone." },
  { range: [78, 78], desc: "A powerful swing hacks through the leg at the knee.", effect: "Leg removed at knee; speed 0ft, 1d6 Con damage, and target is Prone." },
  { range: [79, 79], desc: "With a terrifying display of strength, you sever the leg at the hip.", effect: "Leg removed at hip; speed 0ft, 2d4 Con damage, and target is Prone." },
  { range: [80, 80], desc: "You hack through the wrist of the hand holding the shield.", effect: "Shield arm removed at wrist. No effect if using a shield (Shield takes damage instead)." },
  { range: [81, 81], desc: "The blade shears through the forearm of the shield arm.", effect: "Shield arm removed at elbow. No effect if using a shield." },
  { range: [82, 82], desc: "A heavy blow removes the shield arm above the elbow.", effect: "Shield arm removed at elbow. No effect if using a shield." },
  { range: [83, 83], desc: "You slice through the wrist, sending the shield hand flying.", effect: "Shield arm removed at wrist; shield and hand are dropped." },
  { range: [84, 84], desc: "A mid-arm strike severs the shield arm entirely.", effect: "Shield arm removed at elbow; shield and arm are dropped." },
  { range: [85, 85], desc: "Your blade removes the shield arm at the shoulder joint.", effect: "Shield arm removed at shoulder; 1d6 Con damage." },
  { range: [86, 86], desc: "A quick slash severs the weapon hand at the wrist.", effect: "Weapon arm removed at wrist; weapon is dropped." },
  { range: [87, 87], desc: "You hack through the forearm of the weapon arm.", effect: "Weapon arm removed at elbow; weapon is dropped." },
  { range: [88, 88], desc: "A massive strike severs the weapon arm at the shoulder.", effect: "Weapon arm removed at shoulder; weapon dropped and 1d6 Con damage." },
  { range: [89, 89], desc: "A deep gut wound leaves the foe staggering and clutching their vitals.", effect: "Abdominal injury; target's carrying capacity is halved." },
  { range: [90, 90], desc: "A heavy strike to the ribs leaves the foe struggling to breathe.", effect: "Chest injury; target's carrying capacity is halved." },
  { range: [91, 91], desc: "Your blade opens a septic wound in the abdomen.", effect: "Abdominal injury; target dies in 1d6 days without magical healing." },
  { range: [92, 92], desc: "A punctured lung or chest wall causes a slow decline.", effect: "Chest injury; target dies in 1d4 days without magical healing." },
  { range: [93, 93], desc: "Internal organs are shredded; the foe's life begins to ebb.", effect: "Abdominal injury; target dies in 2d6 rounds (approx 2-12 turns) without a DC 20 Heal check." },
  { range: [94, 94], desc: "Blood fills the lungs; the end is near.", effect: "Chest injury; target dies in 2d4 rounds (approx 2-8 turns) without a DC 20 Heal check." },
  { range: [95, 95], desc: "A horrific disembowelment ends the fight immediately.", effect: "Abdominal injury; Fort save or immediate death. Success: 1d8 Con damage." },
  { range: [96, 96], desc: "The blade pierces the heart through the chest wall.", effect: "Chest injury; Fort save or immediate death. Success: 1d8 Con damage." },
  { range: [97, 97], desc: "A lightning-fast slash opens the throat.", effect: "Throat cut; Fort save or immediate death. No effect if helmed." },
  { range: [98, 98], desc: "The edge finds the neck, spraying blood across the field.", effect: "Throat cut; Fort save or immediate death." },
  { range: [99, 99], desc: "A clean stroke separates the head from the shoulders.", effect: "Decapitated; immediate death. No effect if helmed." },
  { range: [100, 100], desc: "The head falls as the body collapses.", effect: "Decapitated; immediate death." }
];

class EdgedCriticalsTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return EdgedCriticals.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = EdgedCriticalsTable;

