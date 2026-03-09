'use strict';

/**
 * Book metadata object used by the Library subsystem.
 * Books are NOT physical items. They are metadata-only.
 */

class Book {
  constructor(def) {
    this.id = def.id;
    this.title = def.title;
    this.subtitle = def.subtitle || null;
    this.author = def.author || 'Unknown';
    this.publisher = def.publisher || 'Unknown';
    this.edition = def.edition || null;
    this.source = def.source || null;

    this.type = def.type || 'book';
    this.rarity = def.rarity || 'common';
    this.tags = def.tags || [];

    this.description = def.description || '';
    this.pages = def.pages || null;
    this.wordCount = def.wordCount || null;
    this.language = def.language || 'Common';
    this.script = def.script || null;

    this.containsSpells = def.containsSpells || false;
    this.spells = def.spells || [];

    this.containsFeats = def.containsFeats || false;
    this.feats = def.feats || [];

    this.containsLore = def.containsLore || false;
    this.loreTopics = def.loreTopics || [];

    this.magical = def.magical || false;
    this.aura = def.aura || null;
    this.casterLevel = def.casterLevel || null;

    this.metadata = def.metadata || {};
  }
}

module.exports = Book;
