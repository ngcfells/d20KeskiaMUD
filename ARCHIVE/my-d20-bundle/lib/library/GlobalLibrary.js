/**
 * PATH: bundles/my-d20-bundle/lib/library/GlobalLibrary.js
 */

'use strict';

const Book = require('./Book');

class GlobalLibrary {
  constructor() {
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

  serialize() {
    return this.items.map(b => b.serialize());
  }

  hydrate(data) {
    if (!Array.isArray(data)) return;
    this.items = data.map(d => Book.fromSerialized(d));
  }
}

module.exports = GlobalLibrary;
