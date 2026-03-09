'use strict';

const { Broadcast: B } = require('ranvier');
const BookItemAdapter = require('../../lib/library/BookItemAdapter');

module.exports = {
  usage: 'library [list|search|add|remove] [args]',
  aliases: ['lib'],
  command: state => (args, player) => {
    const [cmd, ...rest] = args.split(' ');
    const query = rest.join(' ').trim();

    const library = state.LibraryManager.getPersonalLibrary(player);

    switch (cmd) {
      case 'list': {
        const books = library.listBooks();
        if (books.length === 0) {
          return B.sayAt(player, `<yellow>Your pocket library is empty.</yellow>`);
        }
        B.sayAt(player, `<yellow>Your Pocket Library contains:</yellow>`);
        for (const name of books) {
          B.sayAt(player, ` - ${name}`);
        }
        return;
      }

      case 'search': {
        if (!query) {
          return B.sayAt(player, `Search for what?`);
        }
        const found = library.findBook(query);
        if (!found) {
          return B.sayAt(player, `<red>No book named '${query}' found.</red>`);
        }
        return B.sayAt(player, `<green>Found:</green> ${found.name}`);
      }

      case 'add': {
        if (!query) {
          return B.sayAt(player, `Add which item?`);
        }

        const item = player.inventory.find(i => i.name.toLowerCase() === query.toLowerCase());
        if (!item) {
          return B.sayAt(player, `<red>You do not possess '${query}'.</red>`);
        }

        const book = BookItemAdapter.itemToBook(item);
        library.addBook(book);
        player.removeItem(item);

        return B.sayAt(player, `<yellow>You store '${item.name}' in your pocket library.</yellow>`);
      }

      case 'remove': {
        return B.sayAt(player, `<red>Removing books from the pocket library is not yet implemented.</red>`);
      }

      default:
        return B.sayAt(player, `Usage: library [list|search|add|remove]`);
    }
  }
};
