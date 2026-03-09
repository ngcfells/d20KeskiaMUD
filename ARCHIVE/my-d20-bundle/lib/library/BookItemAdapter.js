'use strict';

const Book = require('./Book');

/**
 * Converts between physical items and Book metadata objects.
 */

module.exports = {
  /**
   * Convert an Item instance into a Book metadata object.
   */
  itemToBook(item) {
    return new Book({
      id: item.id,
      title: item.name,
      subtitle: item.metadata?.subtitle || null,
      author: item.metadata?.author || 'Unknown',
      publisher: item.metadata?.publisher || 'Unknown',
      edition: item.metadata?.edition || null,
      source: item.metadata?.source || null,

      type: item.metadata?.bookType || 'book',
      rarity: item.metadata?.rarity || 'common',
      tags: item.metadata?.tags || [],

      description: item.description || '',
      pages: item.metadata?.pages || null,
      wordCount: item.metadata?.wordCount || null,
      language: item.metadata?.language || 'Common',
      script: item.metadata?.script || null,

      containsSpells: item.metadata?.containsSpells || false,
      spells: item.metadata?.spells || [],

      containsFeats: item.metadata?.containsFeats || false,
      feats: item.metadata?.feats || [],

      containsLore: item.metadata?.containsLore || false,
      loreTopics: item.metadata?.loreTopics || [],

      magical: item.metadata?.magical || false,
      aura: item.metadata?.aura || null,
      casterLevel: item.metadata?.casterLevel || null,

      metadata: item.metadata || {}
    });
  },

  /**
   * Convert a Book metadata object into a physical Item instance.
   */
  bookToItem(state, book) {
    const ItemFactory = state.ItemFactory;

    return ItemFactory.create(state, {
      id: book.id,
      name: book.title,
      description: book.description,
      metadata: {
        subtitle: book.subtitle,
        author: book.author,
        publisher: book.publisher,
        edition: book.edition,
        source: book.source,

        bookType: book.type,
        rarity: book.rarity,
        tags: book.tags,

        pages: book.pages,
        wordCount: book.wordCount,
        language: book.language,
        script: book.script,

        containsSpells: book.containsSpells,
        spells: book.spells,

        containsFeats: book.containsFeats,
        feats: book.feats,

        containsLore: book.containsLore,
        loreTopics: book.loreTopics,

        magical: book.magical,
        aura: book.aura,
        casterLevel: book.casterLevel,

        ...book.metadata
      }
    });
  }
};
