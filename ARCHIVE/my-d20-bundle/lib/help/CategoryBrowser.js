// path: bundles/my-d20-bundle/lib/help/CategoryBrowser.js

'use strict';

const { Broadcast: B } = require('ranvier');
const Paginator = require('./Paginator');

module.exports = {
  browseCategory(state, player, category) {
    const matches = [];

    for (const [name, hfile] of state.HelpManager.helpfiles) {
      if (hfile.category?.toLowerCase() === category.toLowerCase()) {
        matches.push(name);
      }
    }

    if (!matches.length) {
      return B.sayAt(player, `<red>No help entries found in category:</red> ${category}`);
    }

    const lines = matches.map(n => `<cyan>${n}</cyan>`);
    Paginator.paginate(player, lines);
  }
};
