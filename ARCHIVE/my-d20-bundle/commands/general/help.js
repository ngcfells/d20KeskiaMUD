/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/help.js
 * PURPOSE: get the help files (fuzzy, categories, pagination).
 */

'use strict';

const { Broadcast: B, Logger } = require('ranvier');

module.exports = {
  usage: 'help [topic] | help search <term> | help category <name>',
  category: 'system',
  tags: ['help', 'documentation', 'ui'],
  requires: [],

  command: state => (args, player) => {
    const LoggerCmd = state.CommandLogger;
    const HelpFuzzy = state.HelpFuzzy;
    const HelpRenderer = state.HelpRenderer;
    const HelpCategoryBrowser = state.HelpCategoryBrowser;

    LoggerCmd.log(player, 'help', { args });

    // No args → show help for "help"
    if (!args.length) {
      return state.CommandManager.get('help').execute('help', player);
    }

    const cleaned = args
      .toLowerCase()
      .replace(/\b(about|on|for|topic|\?)\b/g, '')
      .trim();

    // Category browsing
    if (cleaned.startsWith('category ')) {
      const category = cleaned.replace('category ', '').trim();
      return HelpCategoryBrowser.browseCategory(state, player, category);
    }

    // Search mode
    if (
      cleaned.startsWith('search ') ||
      cleaned.startsWith('find ') ||
      cleaned.startsWith('lookup ')
    ) {
      return searchHelpfiles(cleaned, player, state);
    }

    // Direct lookup
    const hfile = state.HelpManager.get(cleaned);

    if (!hfile) {
      const fuzzy = HelpFuzzy.fuzzyMatch(state.HelpManager, cleaned);
      if (fuzzy) {
        B.sayAt(player, `<yellow>Did you mean:</yellow> <cyan>${fuzzy}</cyan>?`);
        const file = state.HelpManager.get(fuzzy);
        return B.sayAt(player, HelpRenderer.render(state, file));
      }

      Logger.error(`MISSING-HELP: [${cleaned}]`);
      return B.sayAt(player, "Sorry, I couldn't find an entry for that topic.");
    }

    try {
      B.sayAt(player, HelpRenderer.render(state, hfile));
    } catch (e) {
      Logger.warn(`UNRENDERABLE-HELP: [${cleaned}]`);
      Logger.warn(e);
      B.sayAt(player, `Invalid help file for ${cleaned}.`);
    }
  }
};

function searchHelpfiles(args, player, state) {
  const { Broadcast: B } = require('ranvier');
  const HelpFuzzy = state.HelpFuzzy;
  const HelpRenderer = state.HelpRenderer;
  const HelpPaginator = state.HelpPaginator;

  const term = args.split(' ').slice(1).join(' ').trim();

  if (!term.length) {
    return state.CommandManager.get('help').execute('help', player);
  }

  const results = state.HelpManager.find(term);

  if (!results.size) {
    const fuzzy = HelpFuzzy.fuzzyMatch(state.HelpManager, term);
    if (fuzzy) {
      const file = state.HelpManager.get(fuzzy);
      return B.sayAt(player, HelpRenderer.render(state, file));
    }
    return B.sayAt(player, "Sorry, no results were found for your search.");
  }

  if (results.size === 1) {
    const [_, hfile] = [...results][0];
    return B.sayAt(player, HelpRenderer.render(state, hfile));
  }

  const lines = [];
  for (const [name] of results) {
    lines.push(`<cyan>${name}</cyan>`);
  }

  HelpPaginator.paginate(player, lines);
}
