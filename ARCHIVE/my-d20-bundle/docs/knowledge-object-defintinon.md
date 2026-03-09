/**
 * Canonical Knowledge Object Definition Contract
 * ----------------------------------------------
 * All knowledge objects (books, scrolls, tablets, grimoires, spellbooks,
 * racial tomes, knowledge shards, skill chips, datapads, holocrons, archives)
 * must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'unique_id',
  title: 'Object Title',
  subtitle: null,
  author: 'Unknown',
  publisher: 'Unknown',
  edition: null,
  source: null,

  //
  // ─────────────────────────────────────────────────────────────
  //  TYPE & CATEGORY
  // ─────────────────────────────────────────────────────────────
  //
  type: 'book',
  // Allowed types:
  // 'manuscript' | 'jade_slip' | 'encyclopedia' |
  // 'dictionary' | 'travelogue' | 'compendium' |
  // 'anthology' | 'omnibus' | 'historical_volume' |
  // 'musical_composition' | 'treatise' | 'journal' |
  // 'whitepaper' | 'technical_manual' | 'research_log' |
  // 'field_report' | 'memory_crystal' | 'ai_core_fragment' |
  // 'neural_imprint' | 'book' | 'codex' | 
  // 'scroll' | 'tablet' | 'grimoire' |
  // 'spellbook' | 'racial_tome' | 'knowledge_shard' |
  // 'skill_chip' | 'datapad' | 'holocron' | 
  // 'archive'

  rarity: 'common',
  tags: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  CONTENT METADATA
  // ─────────────────────────────────────────────────────────────
  //
  description: '',
  pages: null,          // books, codices, grimoires, spellbooks
  wordCount: null,

  //
  // Human-readable language fields (flavor)
  //
  language: 'Common',
  script: null,

  //
  // Machine-readable language fields (mechanics)
  //
  languageId: null,            // primary language (e.g., 'elven')
  teachesLanguage: false,      // if true, reading/study grants language exposure
  languagesContained: [],      // [{ id: 'draconic', difficulty: 3 }, ...]

  containsLore: false,
  loreTopics: [],

  containsSpells: false,
  spells: [],          // scrolls, grimoires, spellbooks, shards, holocrons

  containsFeats: false,
  feats: [],

  magical: false,
  aura: null,
  casterLevel: null,

  //
  // ─────────────────────────────────────────────────────────────
  //  TYPE-SPECIFIC EXTENSIONS
  // ─────────────────────────────────────────────────────────────
  //

  // ───── Scrolls (single or multi-spell) ─────
  scrollData: {
    spells: [],            // array of spell IDs
    casterLevels: {},      // { spellId: casterLevel }
    scribingDC: null,
    inkType: null,
    material: 'parchment',
    multiSpell: false      // true if >1 spell
  },

  // ───── Tablets (ancient inscriptions) ─────
  tabletData: {
    material: null,        // stone, obsidian, jade, mithral
    age: null,
    translationDC: null,
    damaged: false,
    scriptStyle: null,     // NEW: script variant (e.g., "High Elven Runes")
    dialect: null          // NEW: dialect identifier
  },

  // ───── Grimoires (dangerous tomes) ─────
  grimoireData: {
    corruption: 0,
    forbiddenRituals: [],
    sanityRisk: 0,
    ritualLanguageId: null // NEW: language required for rituals
  },

  // ───── Spellbooks (arcane books with page limits) ─────
  spellbookData: {
    capacity: 100,               // Standard spellbook: 100 pages
    pagesUsed: 0,
    spells: [],                  // array of { id, pages }
    wards: [],
    scribingDifficulty: null,

    isBlessedBook: false,        // Blessed Book flag
    blessedBookCapacity: 1000,   // Blessed Book: 1,000 pages

    isInfiniteSpellbook: false,  // Artifact: infinite pages

    verbalLanguageId: null,      // NEW: language required to cast from book
    notationStyle: null          // NEW: arcane shorthand variant
  },

  // ───── Racial Tomes (cultural knowledge) ─────
  racialData: {
    race: null,
    dialect: null,
    tradition: null,
    languageId: null             // NEW: racial language
  },

  // ───── Knowledge Shards (crystal memory) ─────
  shardData: {
    medium: 'crystal',
    storedKnowledge: [],
    activationMethod: null,
    languageId: null             // NEW: encoded language
  },

  // ───── Skill Chips (cybernetic skill modules) ─────
  chipData: {
    skill: null,
    rankEquivalent: null,
    compatibility: [],
    installationDC: null,
    imprintLanguageId: null      // NEW: linguistic imprint for comprehension
  },

  // ───── Datapads (modern/sci-fi digital documents) ─────
  datapadData: {
    encryptionLevel: null,
    batteryLife: null,
    fileFormat: null,
    accessProtocol: null,
    encodingLanguageId: null     // NEW: language of stored data
  },

  // ───── Holocrons (soul/force encoded knowledge) ─────
  holocronData: {
    alignment: null,
    gatekeeper: null,
    lessons: [],
    languagesContained: [],      // NEW: holocrons often contain multiple dialects
    gatekeeperLanguageId: null   // NEW: language gatekeeper speaks
  },

  // ───── Archives (multi-volume collections) ─────
  archiveData: {
    volumeCount: null,
    indexTopics: [],
    curator: null,
    languagesContained: [],      // NEW: archives contain many languages
    difficultyProfile: null      // NEW: { easy: [], moderate: [], hard: [] }
  },

  // ───── Manuscripts ─────
  manuscriptData: {
    scribe: null,
    dateWritten: null,
    condition: 'worn', // pristine, worn, damaged
    academicField: null,
    languageId: null
  },

  // ───── Jade Slips ─────
  jadeSlipData: {
    dynasty: null,
    region: null,
    age: null,
    scriptStyle: null,
    languageId: null
  },

  // ───── Encyclopedias ─────
  encyclopediaData: {
    volumes: null,
    subject: null,
    crossReferences: [],
    languagesContained: []       // NEW
  },

  // ───── Dictionaries ─────
  dictionaryData: {
    languagePair: null,          // e.g., "Common–Draconic"
    entriesCount: null,
    primaryLanguageId: null,     // NEW
    secondaryLanguageId: null    // NEW
  },

  // ───── Travelogues ─────
  travelogueData: {
    regionsCovered: [],
    authorPerspective: null, // merchant, explorer, pilgrim
    dangerRating: null,
    dialectsEncountered: []      // NEW
  },

  // ───── Compendiums ─────
  compendiumData: {
    focus: null, // e.g., "monsters", "spells", "plants"
    entriesCount: null,
    languagesContained: []       // NEW
  },

  // ───── Anthologies ─────
  anthologyData: {
    works: [], // list of titles
    editors: [],
    languagesContained: []       // NEW
  },

  // ───── Omnibuses ─────
  omnibusData: {
    collectedWorks: [],
    originalSources: [],
    languagesContained: []       // NEW
  },

  // ───── Historical Volumes ─────
  historicalVolumeData: {
    era: null,
    region: null,
    bias: null,
    primaryLanguageId: null      // NEW
  },

  // ───── Musical Compositions ─────
  musicalCompositionData: {
    composer: null,
    instrumentation: [],
    performanceDifficulty: null,
    lyricalLanguageId: null      // NEW
  },

  // ───── Treatises ─────
  treatiseData: {
    thesis: null,
    field: null,
    citations: [],
    languageId: null             // NEW
  },

  // ───── Whitepapers ─────
  whitepaperData: {
    topic: null,
    institution: null,
    peerReviewed: false,
    languageId: null             // NEW
  },

  // ───── Journals ─────
  journalData: {
    owner: null,
    dateRange: null,
    personal: true,
    languageId: null             // NEW
  },

  // ───── Technical Manuals ─────
  technicalManualData: {
    system: null,
    revision: null,
    safetyWarnings: [],
    languageId: null             // NEW
  },

  // ───── Research Logs ─────
  researchLogData: {
    projectName: null,
    leadResearcher: null,
    phases: [],
    languageId: null             // NEW
  },

  // ───── Field Reports ─────
  fieldReportData: {
    location: null,
    commander: null,
    casualties: null,
    languageId: null             // NEW
  },

  // ───── Memory Crystals ─────
  memoryCrystalData: {
    origin: null,
    memoryCount: null,
    languageId: null             // NEW
  },

  // ───── AI Core Fragments ─────
  aiCoreFragmentData: {
    aiName: null,
    integrity: null,
    riskLevel: null,
    encodingLanguageId: null     // NEW
  },

  // ───── Neural Imprints ─────
  neuralImprintData: {
    donor: null,
    imprintType: null, // skill, memory, personality
    stability: null,
    languageId: null             // NEW
  },

  //
  // ─────────────────────────────────────────────────────────────
  //  CUSTOM METADATA
  // ─────────────────────────────────────────────────────────────
  //
  metadata: {}
};
