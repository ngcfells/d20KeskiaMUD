module.exports = {
  id: 'codex_of_iron',
  title: 'The Codex of Iron',
  subtitle: 'Principles of Metal, Might, and Mastery',
  author: 'Master Artificer Helvar Ironbind',
  publisher: 'd20Ranvier',
  edition: '1st',
  source: 'Homebrew',

  type: 'codex',
  rarity: 'rare',
  tags: ['artifice', 'metallurgy', 'warforged', 'constructs', 'forging'],

  description:
    'A heavy, rune-etched tome bound in blackened steel plates. The Codex of Iron details the ancient metallurgical arts used to craft living constructs, enchanted armor, and self‑repairing war machines.',

  pages: 412,
  wordCount: null,
  language: 'Dwarven',
  script: 'Runic',

  containsLore: true,
  loreTopics: [
    'construct creation',
    'dwarven metallurgy',
    'animated guardians',
    'forging rituals'
  ],

  containsSpells: true,
  spells: [
    'fabricate',
    'iron_body',
    'animate_objects',
    'wall_of_iron'
  ],

  containsFeats: false,
  feats: [],

  magical: true,
  aura: 'moderate transmutation',
  casterLevel: 11,

  metadata: {
    bindingMaterial: 'blackened steel',
    weight: 18,
    protectedAgainstFire: true
  }
};
