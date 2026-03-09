/**
 * Canonical Book Definition Contract
 * ----------------------------------
 * All books in my-d20-bundle must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'unique_book_id',          // required, unique
  title: 'Full Book Title',      // required
  subtitle: null,                // optional
  author: 'Unknown',             // string or array
  publisher: 'SRD',              // Paizo, WotC, Homebrew, etc.
  edition: null,                 // optional
  source: null,                  // optional (e.g., "PF1e Bestiary")

  //
  // ─────────────────────────────────────────────────────────────
  //  CATEGORIZATION
  // ─────────────────────────────────────────────────────────────
  //
  type: 'book',                  // book | scroll | tablet | codex | grimoire
  rarity: 'common',              // common | uncommon | rare | unique
  tags: ['arcana', 'history'],   // searchable tags

  //
  // ─────────────────────────────────────────────────────────────
  //  CONTENT METADATA
  // ─────────────────────────────────────────────────────────────
  //
  description: 'Short description of the book.',
  pages: 120,                    // optional
  wordCount: null,               // optional
  language: 'Common',            // optional
  script: null,                  // optional

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL / RULE CONTENT
  // ─────────────────────────────────────────────────────────────
  //
  containsSpells: false,
  spells: [],                    // array of spell IDs

  containsFeats: false,
  feats: [],                     // array of feat IDs

  containsLore: true,
  loreTopics: ['goblins', 'tribal warfare'],

  //
  // ─────────────────────────────────────────────────────────────
  //  MAGIC PROPERTIES
  // ─────────────────────────────────────────────────────────────
  //
  magical: false,
  aura: null,                    // e.g., 'faint transmutation'
  casterLevel: null,

  //
  // ─────────────────────────────────────────────────────────────
  //  CUSTOM DATA
  // ─────────────────────────────────────────────────────────────
  //
  metadata: {
    // freeform JSON for future expansion
  }
};
