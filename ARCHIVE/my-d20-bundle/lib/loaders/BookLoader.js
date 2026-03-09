'use strict';

const fs = require('fs');
const path = require('path');
const Book = require('../library/Book');

module.exports = {
  loadBooks(bundlePath, libraryManager) {
    const dir = path.join(bundlePath, 'data', 'books');

    if (!fs.existsSync(dir)) return;

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.js')) continue;

      const def = require(path.join(dir, file));
      const book = new Book(def);

      libraryManager.addGlobalBook(book);
    }
  }
};
