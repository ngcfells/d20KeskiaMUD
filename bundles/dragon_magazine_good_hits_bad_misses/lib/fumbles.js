/**
 * Fumble Effects Table - All Weapons
 * Percentile results for a natural 1
 */
const ArduinFumbles = [
  { range: [1, 19],  desc: "Tripped! You fall prone.", effect: 'PRONE' },
  { range: [11, 30], desc: "Weapon dropped! It flies 1d6 feet away.", effect: 'DISARM' },
  { range: [31, 50], desc: "Muscle strain. -2 to hit for 2 rounds.", effect: 'DEBUFF' },
  { range: [51, 80], desc: "Momentary daze. No action next round.", effect: 'STUN' },
  { range: [81, 100],desc: "Narrowly avoided disaster. No effect.", effect: 'NONE' }
];

class FumbleTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return ArduinFumbles.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = FumbleTable;
