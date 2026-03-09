// path: bundles/my-d20-bundle/lib/help/Paginator.js

'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  paginate(player, lines, pageSize = 20) {
    const pages = [];
    for (let i = 0; i < lines.length; i += pageSize) {
      pages.push(lines.slice(i, i + pageSize));
    }

    let page = 0;

    const showPage = () => {
      B.sayAt(player, `<yellow>--- Page ${page + 1}/${pages.length} ---</yellow>`);
      pages[page].forEach(line => B.sayAt(player, line));
    };

    showPage();

    if (pages.length <= 1) return;

    const listener = (input) => {
      input = input.trim().toLowerCase();

      if (input === 'next' || input === 'n') {
        if (page < pages.length - 1) {
          page++;
          showPage();
        }
      } else if (input === 'prev' || input === 'p') {
        if (page > 0) {
          page--;
          showPage();
        }
      } else {
        player.removeListener('command', listener);
        B.sayAt(player, "<gray>Exiting help pagination.</gray>");
      }
    };

    player.on('command', listener);
  }
};
