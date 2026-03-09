// path: bundles/my-d20-bundle/lib/help/HelpRenderer.js

'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  render(state, hfile) {
    const width = 80;
    const bar = B.line(width, '-', 'yellow') + '\r\n';

    let header = bar + B.center(width, hfile.name, 'white') + '\r\n' + bar;

    const formatHeaderItem = (item, value) => `${item}: ${value}\r\n\r\n`;

    if (hfile.command) {
      const actualCommand = state.CommandManager.get(hfile.command);
      header += formatHeaderItem('Syntax', actualCommand.usage);

      if (actualCommand.aliases?.length > 0) {
        header += formatHeaderItem('Aliases', actualCommand.aliases.join(', '));
      }

    } else if (hfile.channel) {
      header += formatHeaderItem('Syntax', state.ChannelManager.get(hfile.channel).getUsage());
    }

    let footer = bar;

    if (hfile.related.length) {
      footer = B.center(width, 'RELATED', 'yellow', '-') + '\r\n';
      footer += B.center(width, hfile.related.join(', ')) + '\r\n';
      footer += bar;
    }

    return header + B.wrap(hfile.body, width) + footer;
  }
};
