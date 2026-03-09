/**
 * Piercing Weapon Critical Effects. Converted to d20
 * Roll to hit.
 * If a hit, how far beyond the minimum to hit was it?
 * If a 15 was needed to hit, and an adjusted 25 to hit was rolled, there is a 10% chance of a citical.
 * If a natural 20 was rolled double the base chance above.
 * Roll for critical on percentile.
 * Apply normal critical damage for weapon in addition to whatever is shown here.
 * Saves, when allowed, use 10 + 1/2 Attacker's Level/HD + Str Modifier to determine the DC.
 */

const PiercingCriticals = [
  { range: [1, 34],   desc: "A precise strike into a gap in defenses.", effect: "Double damage (standard critical x2)." },
  { range: [35, 70],  desc: "A powerful thrust that bypasses major resistance.", effect: "Triple damage (standard critical x3)." },
  { range: [71, 72],  desc: "The strike impacts the shield arm's defenses.", effect: "Shield arm struck; -2 penalty to AC. No effect if using a shield (Shield absorbs the impact)." },
  { range: [73, 74],  desc: "An impact to the secondary arm's structure.", effect: "Shield arm struck; target drops any held shield and takes -2 to AC." },
  { range: [75, 76],  desc: "A strike to the primary arm disrupts the target's aim.", effect: "Weapon arm struck; -2 penalty on attack rolls." },
  { range: [77, 78],  desc: "A deep strike to the primary arm's joint.", effect: "Weapon arm struck; -4 penalty on attack rolls." },
  { range: [79, 80],  desc: "Significant impact renders the primary arm unusable.", effect: "Weapon arm struck; target drops held items and cannot attack with that arm until restored." },
  { range: [81, 82],  desc: "A strike to the midsection causing internal strain.", effect: "Struck in abdomen; target is Sickened and loses 1 HP per hour for 1d6 days without a successful Medicine check." },
  { range: [83, 84],  desc: "A strike to the torso causing respiratory distress.", effect: "Struck in chest; target is Fatigued and loses 1 HP per hour for 1d4 days without a successful Medicine check." },
  { range: [85, 86],  desc: "Severe trauma to the midsection.", effect: "Struck in abdomen; target is reduced to 0 Hit Points in 2d6 rounds without immediate medical stabilization (DC 20)." },
  { range: [87, 88],  desc: "Severe trauma to the torso.", effect: "Struck in chest; target is reduced to 0 Hit Points in 2d4 rounds without immediate medical stabilization (DC 20)." },
  { range: [89, 90],  desc: "A critical hit to vital abdominal structures.", effect: "Struck in abdomen; target is reduced to 0 Hit Points. Successful Fortitude save: 1d8 Constitution damage instead." },
  { range: [91, 92],  desc: "A critical hit to vital torso structures.", effect: "Struck in chest; target is reduced to 0 Hit Points. Successful Fortitude save: 1d8 Constitution damage instead." },
  { range: [93, 93],  desc: "A projectile grazes the ocular area.", effect: "Partial blindness (-2 to Ranged Attacks/Perception). No effect if helmed." },
  { range: [94, 94],  desc: "A strike impacts the ocular area directly.", effect: "Partial blindness (-2 to Ranged Attacks/Perception)." },
  { range: [95, 95],  desc: "Impact to the neck area.", effect: "Vocal structures affected; cannot speak or use verbal components. No effect if helmed." },
  { range: [96, 96],  desc: "Direct impact to the throat.", effect: "Vocal structures affected; cannot speak or use verbal components." },
  { range: [97, 97],  desc: "A glancing blow to the head.", effect: "Head struck; 1d6 Intelligence damage. No effect if helmed." },
  { range: [98, 98],  desc: "A direct hit to the skull.", effect: "Head struck; 1d6 Intelligence damage." },
  { range: [99, 99],  desc: "A catastrophic hit to the head.", effect: "Head struck; target is reduced to 0 Hit Points. No effect if helmed." },
  { range: [100, 100], desc: "A catastrophic hit to the cranium.", effect: "Head struck; target is reduced to 0 Hit Points." }
];

class PiercingCriticalsTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return PiercingCriticals.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = PiercingCriticalsTable;

