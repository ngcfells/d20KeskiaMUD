/**
 * PATH: bundles/my-d20-bundle/lib/library/PersonalLibrary.js
 */

'use strict';

const Book = require('./Book');

class PersonalLibrary {
  constructor(ownerUuid) {
    this.ownerUuid = ownerUuid;
    this.items = [];
  }

  addBook(book) {
    if (book instanceof Book) this.items.push(book);
  }

  findBook(name) {
    const lower = name.toLowerCase();
    return this.items.find(b => b.name.toLowerCase() === lower) || null;
  }

  listBooks() {
    return this.items.map(b => b.name);
  }

  //
  // ─────────────────────────────────────────────────────────────
  //  PERSISTENCE
  // ─────────────────────────────────────────────────────────────
  //

  serialize() {
    return this.items.map(b => b.serialize());
  }

  hydrate(data) {
    if (!Array.isArray(data)) return;
    this.items = data.map(d => Book.fromSerialized(d));
  }
}

module.exports = PersonalLibrary;
