/**
 * my-d20-bundle index.js
 * -----------------------
 * Initializes all D20 systems, registries, managers, loaders, and rules.
 */

'use strict';

const path = require('path');

// Managers
const TraitManager = require('./lib/managers/TraitManager');
const LanguageManager = require('./lib/managers/LanguageManager');
const RaceManager = require('./lib/managers/RaceManager');
const LibraryManager = require('./lib/managers/LibraryManager');
const AreaEffectManager = require('./lib/managers/AreaEffectManager');
const InventoryManager = require('./lib/managers/InventoryManager');
const LiquidManager = require('./lib/managers/LiquidManager');


// Loaders
const loadTraits = require('./lib/loaders/TraitLoader');
const loadLanguages = require('./lib/loaders/LanguageLoader');
const loadRaces = require('./lib/loaders/RaceLoader');
const BookLoader = require('./lib/library/BookLoader');
const loadMaterials = require('./lib/loaders/MaterialLoader2.js');

// Command-layer utilities
const Msg = require('./lib/commands/Msg');
const Errors = require('./lib/commands/Errors');
const CommandLogger = require('./lib/commands/CommandLogger');

// Prerequisites
const Require = require('./lib/prerequisites/Require');

// Resolvers
const TargetResolver = require('./lib/resolvers/TargetResolver');

// Help 2.0 subsystems
const HelpFuzzy = require('./lib/help/Fuzzy');
const HelpPaginator = require('./lib/help/Paginator');
const HelpRenderer = require('./lib/help/HelpRenderer');
const HelpCategoryBrowser = require('./lib/help/CategoryBrowser');

// Event systems
const PlayerEvents = require('./lib/events/PlayerEvents');
const ItemEvents = require('./lib/events/ItemEvents');
const NpcEvents = require('./lib/events/NpcEvents');
const InventoryEvents = require('./lib/events/InventoryEvents');

module.exports = srcPath => {
  const bundlePath = __dirname;

  return {
    name: 'my-d20-bundle',

    listeners: {
      startup: state => {

        //
        // REGISTER MANAGERS ON STATE
        //
        state.TraitManager = new TraitManager();
        state.LanguageManager = new LanguageManager();
        state.RaceManager = new RaceManager();
        state.LibraryManager = new LibraryManager(state);
        state.AreaEffectManager = new AreaEffectManager(state);
        state.Inventory = InventoryManager;
        state.LiquidManager = new LiquidManager(state);

        //
        // REGISTER COMMAND-LAYER UTILITIES
        //
        state.Msg = Msg;
        state.Errors = Errors;
        state.CommandLogger = CommandLogger;

        //
        // REGISTER PREREQUISITES + RESOLVERS
        //
        state.Require = Require;
        state.TargetResolver = TargetResolver;
        state.LiquidEffects = require('../effects/liquid-effects');


        //
        // REGISTER HELP 2.0 SUBSYSTEMS
        //
        state.HelpFuzzy = HelpFuzzy;
        state.HelpPaginator = HelpPaginator;
        state.HelpRenderer = HelpRenderer;
        state.HelpCategoryBrowser = HelpCategoryBrowser;

        //
        // REGISTER EVENT SYSTEMS
        //
        state.PlayerEvents = PlayerEvents;
        state.ItemEvents = ItemEvents;
        state.NpcEvents = NpcEvents;
        state.InventoryEvents = InventoryEvents;

        //
        // HOOK AREA EFFECTS INTO GAME TICK
        //
        state.CommandManager.on('updateTick', () => state.AreaEffectManager.update());

        //
        // CORE SYSTEMS / REGISTRIES
        //
        require(path.join(bundlePath, 'lib/ArgParser'));
        require(path.join(bundlePath, 'lib/CommandParser'));
        require(path.join(bundlePath, 'lib/CommonFunctions'));
        require(path.join(bundlePath, 'lib/ItemUtil'));
        require(path.join(bundlePath, 'lib/LevelUtil'));
        require(path.join(bundlePath, 'lib/RaceManager'));
        require(path.join(bundlePath, 'lib/anatomy/AnatomyRegistry'));

        //
        // CLASS + FEAT SYSTEMS
        //
        require(path.join(bundlePath, 'lib/classes/class-manager'));
        require(path.join(bundlePath, 'lib/classes/feat-manager'));
        require(path.join(bundlePath, 'lib/classes/player'));
        require(path.join(bundlePath, 'lib/classes/player-events'));

        //
        // RULESETS
        //
        require(path.join(bundlePath, 'rules/armor_groups'));
        require(path.join(bundlePath, 'rules/armor_prefs'));
        require(path.join(bundlePath, 'rules/currency_registry'));
        require(path.join(bundlePath, 'rules/feat_effects'));
        require(path.join(bundlePath, 'rules/feat_prereqs'));
        require(path.join(bundlePath, 'rules/ioun_stones'));
        require(path.join(bundlePath, 'rules/skills_prefs'));
        require(path.join(bundlePath, 'rules/spell_school_prefs'));
        require(path.join(bundlePath, 'rules/terrain_types'));
        require(path.join(bundlePath, 'rules/weapon_groups'));
        require(path.join(bundlePath, 'rules/weapon_prefs'));
        require(path.join(bundlePath, 'rules/wizard_schools'));
        require(path.join(bundlePath, 'rules/wizard_spell_validator'));

        //
        // DATA LOADERS
        //
        require(path.join(bundlePath, 'data/feats'));
        require(path.join(bundlePath, 'data/abilities'));
        require(path.join(bundlePath, 'data/items'));
        require(path.join(bundlePath, 'data/races'));
        require(path.join(bundlePath, 'skills'));
        require(path.join(bundlePath, 'stances'));

        //
        // COMMANDS, BEHAVIORS, CHANNELS, EFFECTS, INPUT EVENTS
        //
        require(path.join(bundlePath, 'commands'));
        require(path.join(bundlePath, 'behaviors'));
        require(path.join(bundlePath, 'channels/channels'));
        require(path.join(bundlePath, 'effects'));
        require(path.join(bundlePath, 'input-events'));

        //
        // NEW INGESTION LOADERS
        //
        loadTraits(state, path.join(bundlePath, 'data/traits'));
        loadLanguages(state, path.join(bundlePath, 'data/languages'));
        loadRaces(state, path.join(bundlePath, 'data/races'));
        loadMaterials(state, path.join(bundlePath, 'data/materials'));

        //
        // LOAD GLOBAL BOOKS
        //
        BookLoader.loadBooks(bundlePath, state.LibraryManager);
      }
    }
  };
};
