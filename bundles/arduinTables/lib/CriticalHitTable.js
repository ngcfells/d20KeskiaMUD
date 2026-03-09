/**
 * Arduin-inspired Melee Critical Table
 * Percentile results for a natural 20.
 */
const ArduinCriticals = [
  { range: [1, 2],  desc: "", effect: '' },
  { range: [3, 4],  desc: "", effect: '' },
  { range: [5, 6],  desc: "", effect: '' },
  { range: [7, 8],  desc: "", effect: '' },
  { range: [9, 10],  desc: "", effect: '' },
  { range: [11, 15],  desc: "", effect: '' },
  { range: [16, 20],  desc: "", effect: '' },
  { range: [21, 25],  desc: "", effect: '' },
  { range: [26, 30],  desc: "", effect: '' },
  { range: [31, 32],  desc: "", effect: '' },
  { range: [33, 34],  desc: "", effect: '' },
  { range: [35, 36],  desc: "", effect: '' },
  { range: [37, 38],  desc: "", effect: '' },
  { range: [39, 40],  desc: "", effect: '' },
  { range: [41, 42],  desc: "", effect: '' },
  { range: [43, 44],  desc: "", effect: '' },
  { range: [45, 46],  desc: "", effect: '' },
  { range: [47, 48],  desc: "", effect: '' },
  { range: [49, 50],  desc: "", effect: '' },
  { range: [51, 55],  desc: "", effect: '' },
  { range: [56, 60],  desc: "", effect: '' },
  { range: [61, 65],  desc: "", effect: '' },
  { range: [66, 70],  desc: "", effect: '' },
  { range: [71, 75],  desc: "", effect: '' },
  { range: [76, 80],  desc: "", effect: '' },
  { range: [81, 85],  desc: "", effect: '' },
  { range: [86, 90],  desc: "", effect: '' },
  { range: [91, 94],  desc: "", effect: '' },
  { range: [95, 95],  desc: "", effect: '' },
  { range: [96, 96],  desc: "", effect: '' },
  { range: [97, 97],  desc: "", effect: '' },
  { range: [98, 98],  desc: "", effect: '' },
  { range: [99, 99],  desc: "", effect: '' },
  { range: [100, 100],  desc: "", effect: '' }
  
];

class CriticalTable {
  static roll() {
    const roll = Math.floor(Math.random() * 100) + 1;
    return ArduinCriticals.find(f => roll >= f.range[0] && roll <= f.range[1]);
  }
}

module.exports = CriticalTable;
