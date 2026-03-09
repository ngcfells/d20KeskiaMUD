/**
 * Arduin-inspired Melee Critical Table
 * Adapted mechanical effects for a natural 20 d100 roll.
 */
const ArduinCriticals = [
  { range: [1, 2],   desc: "Critical Head Strike", effect: 'Maximum damage and target is defeated; 4d8 base' },
  { range: [3, 4],   desc: "Neck/Throat Injury", effect: 'Target silenced; 1d8 damage' },
  { range: [5, 6],   desc: "Severed Limb (Hand)", effect: 'Primary hand unusable; 3d6 damage and ongoing bleed' },
  { range: [7, 8],   desc: "Impaling Blow", effect: 'Weapon lodged in target; 3d10 damage' },
  { range: [9, 10],  desc: "Chest Trauma", effect: 'Multiple broken ribs; 1d3 damage per rib affected' },
  { range: [11, 15], desc: "Major Leg Wound", effect: 'Severe movement penalty; 1d8 damage and ongoing bleed' },
  { range: [16, 20], desc: "Major Arm Wound", effect: 'Combat penalty to-hit; 1d6 damage and ongoing bleed' },
  { range: [21, 25], desc: "Tendon Strike", effect: 'Target knocked prone; permanent speed reduction; 1d3 damage' },
  { range: [26, 30], desc: "Hand Injury", effect: 'Loss of digits; 1 damage per digit lost' },
  { range: [31, 32], desc: "Foot Injury", effect: 'Balance and speed penalty; 3 damage' },
  { range: [33, 34], desc: "Ocular Strike", effect: 'Partial blindness; 1d6 damage' },
  { range: [35, 36], desc: "Head Gash", effect: 'Blindness for 1-10 rounds; 1d3 damage' },
  { range: [37, 38], desc: "Torso Trauma", effect: 'Severe shock; incapacitated in 1-4 rounds; 3d6 damage' },
  { range: [39, 40], desc: "Ear/Side of Head Injury", effect: 'Hearing loss and social penalty; 1d3 damage' },
  { range: [41, 42], desc: "Lower Body Trauma", effect: 'Target prone; speed halved; 4d4 damage' },
  { range: [43, 44], desc: "Minor Stun", effect: 'Stunned for 1-10 rounds; 1d2 damage' },
  { range: [45, 46], desc: "Moderate Stun", effect: 'Incapacitated for 1-6 minutes; 1d4 damage' },
  { range: [47, 48], desc: "Dazed", effect: 'Stunned for 1-10 minutes; 1d6 damage' },
  { range: [49, 50], desc: "Major Concussion", effect: 'Unconscious 1-6 rounds; dazed for 1 hour; 1d8 damage' },
  { range: [51, 55], desc: "Severe Head Trauma", effect: 'Unconscious 2-20 minutes; 1d10 damage' },
  { range: [56, 60], desc: "Vitals Strike (Neck)", effect: 'Target defeated in 1-3 rounds; 1d8 damage' },
  { range: [61, 65], desc: "Shattered Arm", effect: 'Arm lost; 4d6 damage and severe bleed' },
  { range: [66, 70], desc: "Shattered Leg", effect: 'Leg lost; 4d12 damage and severe bleed' },
  { range: [71, 75], desc: "Precision Vitals Strike", effect: 'Immediate defeat of target; 1d10 damage' },
  { range: [76, 80], desc: "Spinal Trauma", effect: '1=Full paralysis, 2-5=Partial, 6=Immediate defeat; 2d10 damage' },
  { range: [81, 85], desc: "Total Blindness", effect: 'Target permanently blinded; 2d6 damage' },
  { range: [86, 90], desc: "Facial Trauma", effect: 'Permanent social and breathing penalties; 1d8 damage' },
  { range: [91, 94], desc: "Internal Injury", effect: 'Ongoing internal damage over 1-10 days; 1d2 damage' },
  { range: [95, 95], desc: "Abdominal Strike", effect: 'Movement penalty; 2d8 damage and ongoing bleed' },
  { range: [96, 96], desc: "Major Skull Strike", effect: 'Permanent reduction of mental stats; 2d6 damage' },
  { range: [97, 97], desc: "Punctured Lung", effect: 'Permanent reduction of physical stats; 1d12 damage' },
  { range: [98, 98], desc: "Lethal Strike", effect: 'Immediate defeat of target; 5d10 damage' },
  { range: [99, 99], desc: "Massive Cleave", effect: 'Target bisected; immediate defeat; 10d10 damage' },
  { range: [100, 100], desc: "Total Destruction", effect: 'Irrevocable defeat; total health damage' }
];

class CriticalTable {
  static roll() {
    const rollValue = Math.floor(Math.random() * 100) + 1;
    return ArduinCriticals.find(f => rollValue >= f.range[0] && rollValue <= f.range[1]);
  }
}

module.exports = CriticalTable;
