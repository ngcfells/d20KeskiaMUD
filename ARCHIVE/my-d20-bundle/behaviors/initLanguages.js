// path: c:\ranviermud\bundles\my-d20-bundle\behaviors\initLanguages.js

'use strict';

module.exports = srcPath => {
  return {
    listeners: {
      startup: state => function () {
        const LanguageManager = require('../lib/managers/LanguageManager');
        const ScriptRegistry = require('../lib/managers/ScriptRegistry');
        const LanguageRelations = require('../lib/managers/LanguageRelations');

        state.LanguageManager = new LanguageManager(state);
        state.ScriptRegistry = new ScriptRegistry();
        state.LanguageRelations = new LanguageRelations();

        const register = lang => state.LanguageManager.registerLanguage(lang);
        

        // ───────────────────────────────────────────────
        //  CORE & RACIAL LANGUAGES
        // ───────────────────────────────────────────────
        register({ id: 'common', name: 'Common', family: 'human', script: 'thorass', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'dwarvish', name: 'Dwarvish', family: 'dwarf', script: 'dethek', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'elvish', name: 'Elvish', family: 'elf', script: 'espruar', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'giant', name: 'Giant', family: 'giant', script: 'dethek', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'gnomish', name: 'Gnomish', family: 'gnome', script: 'dethek', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'goblin', name: 'Goblin', family: 'goblinoid', script: 'dethek', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'halfling', name: 'Halfling', family: 'halfling', script: 'thorass', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'orc', name: 'Orc', family: 'orc', script: 'dethek', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });
        register({ id: 'ogre', name: 'Ogre', family: 'ogre', script: 'ogre', settings: ['birthright', 'dragonlance', 'eberron','fr', 'greyhawk', 'kalamar', 'mystara', 'planescape', 'ravenloft'] });

        // ───────────────────────────────────────────────
        //  EXOTIC & RARE LANGUAGES
        // ───────────────────────────────────────────────
        register({ id: 'abyssal', name: 'Abyssal', family: 'fiend', script: 'barazhad', rarity: 'rare', settings: ['fr'] });
        register({ id: 'celestial', name: 'Celestial', family: 'celestial', script: 'celestial', rarity: 'rare', settings: ['fr'] });
        register({ id: 'draconic', name: 'Draconic', family: 'dragon', script: 'iokharic', rarity: 'rare', settings: ['fr'] });
        register({ id: 'deep_speech', name: 'Deep Speech', family: 'aberration', script: 'none', rarity: 'rare', settings: ['fr'] });
        register({ id: 'infernal', name: 'Infernal', family: 'fiend', script: 'infernal', rarity: 'rare', settings: ['fr'] });
        register({ id: 'primordial', name: 'Primordial', family: 'elemental', script: 'barazhad', rarity: 'rare', settings: ['fr'] });
        register({ id: 'sylvan', name: 'Sylvan', family: 'fey', script: 'espruar', rarity: 'rare', settings: ['fr'] });
        register({ id: 'undercommon', name: 'Undercommon', family: 'underdark', script: 'espruar', rarity: 'rare', settings: ['fr'] });
        register({ id: 'saurial', name: 'Saurial', family: 'draconic', script: 'none', settings: ['fr'] });
        register({ id: 'druidic', name: 'Druidic', family: 'nature', script: 'hieroglyphs', settings: ['fr', 'greyhawk', 'eberron'] }); // (Coded symbols/sounds)
        register({ id: 'thieves-cant', name: 'Thieves\' Cant', family: 'argot', script: 'none', settings: ['fr', 'greyhawk', 'eberron'] }); // (Slang and gestures)
        register({ id: 'dvati', name: 'Dvati', family: 'racial', script: 'none', settings: ['dragon-magazine'] }); // (Requires two speakers to produce harmonic sounds)
        register({ id: 'grell', name: 'Grell', family: 'aberration', script: 'none', settings: ['fr', 'greyhawk'] }); // (Vocalizations and electrical impulses) 
        
        // ───────────────────────────────────────────────
        //  REGIONAL LANGUAGES (FAERÛN)
        // ───────────────────────────────────────────────
        register({ id: 'aglarondan', name: 'Aglarondan', family: 'human', script: 'espruar', settings: ['fr'] });
        register({ id: 'alzhedo', name: 'Alzhedo', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'arkhaic', name: 'Arkhaic', family: 'human', script: 'thorass', settings: ['fr'] }); // (Ancient North-speech)
        register({ id: 'chessentan', name: 'Chessentan', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'chondathan', name: 'Chondathan', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'chuchian', name: 'Chuchian', family: 'eastern-imaskari', script: 'imaskari', settings: ['fr'] });
        register({ id: 'chultan', name: 'Chultan', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'd_tarig', name: 'D\'tarig', family: 'uluo', script: 'thorass', settings: ['fr'] });
        register({ id: 'damaran', name: 'Damaran', family: 'human', script: 'dethek', settings: ['fr'] });
        register({ id: 'dambrathan', name: 'Dambrathan', family: 'human', script: 'espruar', settings: ['fr'] });
        register({ id: 'darastrix', name: 'Ancient Draconic', family: 'draconic', script: 'iokharic', settings: ['fr'] });
        register({ id: 'halruaan', name: 'Halruaan', family: 'human', script: 'draconic', settings: ['fr'] });
        register({ id: 'han-shou', name: 'Old Shou', family: 'shou', script: 'han', settings: ['fr'] }); // (Kara-Tur precursor)
        register({ id: 'harpspeak', name: 'Harpspeak', family: 'sign', script: 'none', settings: ['fr'] }); // (Silent signs used by the Harpers)
        register({ id: 'illuskan', name: 'Illuskan', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'imaskari', name: 'Imaskari', family: 'human', script: 'imaskari', settings: ['fr'] }); // (Empire of the Artificers)
        register({ id: 'koryo', name: 'Koryo', family: 'han', script: 'han', settings: ['fr'] }); // (Spoken in Koryo/Choson)
        register({ id: 'kozakuran', name: 'Kozakuran', family: 'han', script: 'han', settings: ['fr'] });
        register({ id: 'kuong', name: 'Kuong', family: 'malatran', script: 'none', settings: ['fr'] });
        register({ id: 'laothan', name: 'Laothan', family: 'malatran', script: 'none', settings: ['fr'] });
        register({ id: 'midani', name: 'Midani', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'mulhorandi', name: 'Mulhorandi', family: 'human', script: 'celestial', settings: ['fr'] });
        register({ id: 'netherese', name: 'Netherese', family: 'human', script: 'draconic', rarity: 'rare', settings: ['fr'] }); //(High Magic era of Netheril)
        register({ id: 'rashemi', name: 'Rashemi', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'roumloen', name: 'Roumloen', family: 'human', script: 'thorass', settings: ['fr'] }); // (Language of the lost Jhaamdath empire)
        register({ id: 'sempari', name: 'Sempari', family: 'human', script: 'thorass', settings: ['fr'] }); // (Ancient Mulhorandi/Untheric root)
        register({ id: 'shou', name: 'High Shou', family: 'human', script: 'shou', settings: ['fr'] });
        register({ id: 'spell-cant', name: 'Spell Cant', family: 'sign', script: 'none', settings: ['fr'] }); // (Knights of the Mystic Flame) 
        register({ id: 'tabotan', name: 'Tabotan', family: 'tabot', script: 'shou', settings: ['fr'] });
        register({ id: 'tel_quessir', name: 'Arselu\'tel\'quess', family: 'elvish', script: 'hamarfae', settings: ['fr'] }); // (High Elven ritual language)
        register({ id: 'thayan', name: 'Thayan', family: 'human', script: 'infernal', settings: ['fr'] });
        register({ id: 'tu_lung', name: 'T\'u Lung', family: 'shou-chiang', script: 'shou', settings: ['fr'] });
        register({ id: 'tuigan', name: 'Tuigan', family: 'human', script: 'thorass', settings: ['fr'] }); 
        register({ id: 'turmic', name: 'Turmic', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'untheric', name: 'Untheric', family: 'human', script: 'dethek', settings: ['fr'] });
        register({ id: 'wa_an', name: 'Wa-an', family: 'han', script: 'han', settings: ['fr'] }); // (Spoken in Wa)
        register({ id: 'yoritomo', name: 'Bavanese', family: 'island-kingdoms', script: 'wa-an', settings: ['fr'] });
        register({ id: 'zhentarim_argot', name: 'Zhentarim Argot', family: 'thorass', script: 'thorass', settings: ['fr'] }); // (Network of spies/mercenaries)
        register({ id: 'ulutiun', name: 'Ulutiun', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'rauthen', name: 'Rauthen', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'bedine', name: 'Bedine', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'shaaran', name: 'Shaaran', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'uthgardt', name: 'Uthgardt', family: 'human', script: 'thorass', settings: ['fr'] });
        register({ id: 'illithid_qualith', name: 'Qualith', family: 'aberration', script: 'qualith', rarity: 'rare', settings: ['fr'] });
        register({ id: 'aarakocra', name: 'Aarakocra', family: 'aarakocra', script: 'aarakocra', settings: ['fr'] });
        register({ id: 'lizardfolk', name: 'Lizardfolk', family: 'lizardfolk', script: 'none', settings: ['fr'] });
        register({ id: 'tabaxi', name: 'Tabaxi', family: 'tabaxi', script: 'none', settings: ['fr'] });
        register({ id: 'grung', name: 'Grung', family: 'grung', script: 'none', settings: ['fr'] });

        // ───────────────────────────────────────────────
        // GREYHAWK
        // ───────────────────────────────────────────────
        register({ id: 'baklunish', name: 'Baklunish', family: 'human', script: 'baklunish', settings: ['greyhawk'] });
        register({ id: 'flan', name: 'Flan', family: 'human', script: 'flannae', settings: ['greyhawk'] });
        register({ id: 'keolandish', name: 'Keolandish', family: 'human', script: 'keoish', settings: ['greyhawk'] });
        register({ id: 'olman', name: 'Olman', family: 'human', script: 'olman', settings: ['greyhawk'] });
        register({ id: 'suloise', name: 'Suloise', family: 'human', script: 'suel', settings: ['greyhawk'] });
        register({ id: 'ur_flannae', name: 'Ur-Flannae', family: 'human', script: 'flannae', rarity: 'rare', settings: ['greyhawk'] });
        register({ id: 'lendorian_elvish', name: 'Lendorian Elvish', family: 'elvish', script: 'elvish', settings: ['greyhawk'] });
        register({ id: 'rhenee_cant', name: 'Rhenee Cant', family: 'argot', script: 'none', settings: ['greyhawk'] });
        register({ id: 'ferral', name: 'Ferral', family: 'oeridian', script: 'common', settings: ['greyhawk'] }); // (Coded military language)
        register({ id: 'ancient-baklunish', name: 'Ancient Baklunish', family: 'baklunish', script: 'baklunish', settings: ['greyhawk'] });
        register({ id: 'suloise', name: 'Suloise', family: 'suel', script: 'suel-alphabet', settings: ['greyhawk'] }); // (Rarely spoken, used for magic/scholarly work)
        register({ id: 'old_oeridian', name: 'Old Oeridian', family: 'oeridian', script: 'common', settings: ['greyhawk'] });
        register({ id: 'flan', name: 'Ancient Flan', family: 'flannae', script: 'none', settings: ['greyhawk'] });
        register({ id: 'oeridian', name: 'Oeridian', family: 'human', script: 'common', settings: ['greyhawk'] });
        register({ id: 'old_keolandish', name: 'Old Keolandish', family: 'human', script: 'keoish', settings: ['greyhawk'] });
        register({ id: 'touv', name: 'Touv', family: 'human', script: 'touv', settings: ['greyhawk'] });
        register({ id: 'flan_root', name: 'Flan Root', family: 'flannae', script: 'none', settings: ['greyhawk'] });

        // ───────────────────────────────────────────────
        // DRAGONLANCE
        // ───────────────────────────────────────────────
        register({ id: 'kenderspeak', name: 'Kenderspeak', family: 'kender', script: 'common', settings: ['dragonlance'] });
        register({ id: 'ergothian', name: 'Ergothian', family: 'human', script: 'ergothian', settings: ['dragonlance'] });
        register({ id: 'khur', name: 'Khur', family: 'human', script: 'khur', settings: ['dragonlance'] });
        register({ id: 'dargonesti', name: 'Dargonesti', family: 'elf', script: 'espruar', settings: ['dragonlance'] });
        register({ id: 'qualinesti', name: 'Qualinesti', family: 'elf', script: 'espruar', settings: ['dragonlance'] });
        register({ id: 'silvanesti', name: 'Silvanesti', family: 'elf', script: 'espruar', settings: ['dragonlance'] });
        register({ id: 'ishtarish', name: 'Istarian', family: 'human', script: 'istarian', settings: ['dragonlance'] }); // (Pre-Cataclysm holy tongue)
        register({ id: 'old_ergot', name: 'Old Ergot', family: 'human', script: 'ergot', settings: ['dragonlance'] });
        register({ id: 'minotaur', name: 'Minotaur', family: 'minotaur', script: 'minotaur', settings: ['dragonlance'] });
        register({ id: 'dwarvish_hylar', name: 'Hylar Dwarvish', family: 'dwarf', script: 'dethek', settings: ['dragonlance'] });
        register({ id: 'dwarvish_neidar', name: 'Neidar Dwarvish', family: 'dwarf', script: 'dethek', settings: ['dragonlance'] });

        // ───────────────────────────────────────────────
        // EBERRON
        // ───────────────────────────────────────────────
        register({ id: 'rorlak', name: 'Rorlak', family: 'orc', script: 'dethek', settings: ['eberron'] });
        register({ id: 'quori', name: 'Quori', family: 'quori', script: 'quori', rarity: 'rare', settings: ['eberron'] });
        register({ id: 'daelkyr', name: 'Daelkyr', family: 'aberration', script: 'daelkyr', rarity: 'rare', settings: ['eberron'] });
        register({ id: 'giant_xen', name: "Xen'drik Giant", family: 'giant', script: 'dethek', settings: ['eberron'] });
        register({ id: 'quori', name: 'Quori', family: 'planar', script: 'quori', settings: ['eberron'] }); // (Spoken by Kalashtar and Inspired)
        register({ id: 'riedran', name: 'Riedran', family: 'human', script: 'common', settings: ['eberron'] }); // (Common speech of Sarlona)
        register({ id: 'zilargish', name: 'Zil', family: 'gnomish', script: 'dwarvish', settings: ['eberron'] });
        register({ id: 'valenarian', name: 'Valenarian', family: 'elvish', script: 'elvish', settings: ['eberron'] }); // (Aerenal and Valenar dialect)
        register({ id: 'dakaani', name: 'Dhakaani', family: 'goblinoid', script: 'goblin', settings: ['eberron'] });
        register({ id: 'cul_sir', name: 'cul\'sir', family: 'giant', script: 'giant', settings: ['eberron'] }); // (Language of the Age of Giants)
        register({ id: 'khyber_speech', name: 'Khyber Speech', family: 'planar', script: 'abyssal', settings: ['eberron'] });
        register({ id: 'kalashtar', name: 'Kalashtar', family: 'quori', script: 'quori', settings: ['eberron'] });
        register({ id: 'dal_quor', name: 'Dal Quor', family: 'planar', script: 'quori', rarity: 'rare', settings: ['eberron'] });
        register({ id: 'mror', name: 'Mror', family: 'dwarf', script: 'dethek', settings: ['eberron'] });
        register({ id: 'talenta', name: 'Talenta Halfling', family: 'halfling', script: 'thorass', settings: ['eberron'] });
        register({ id: 'seren', name: 'Seren', family: 'human', script: 'draconic', settings: ['eberron'] });
        register({ id: 'valenar', name: 'Valenar', family: 'elf', script: 'espruar', settings: ['eberron'] });


        // ───────────────────────────────────────────────
        // MYSTARA
        // ───────────────────────────────────────────────
        register({ id: 'thyatian', name: 'Thyatian', family: 'human', script: 'thyatian', settings: ['mystara'] });
        register({ id: 'alasyian', name: 'Alasyian', family: 'human', script: 'alasyian', settings: ['mystara'] });
        register({ id: 'ethengarian', name: 'Ethengarian', family: 'human', script: 'ethengarian', settings: ['mystara'] });
        register({ id: 'traldaran', name: 'Traldaran', family: 'human', script: 'traldaran', settings: ['mystara'] });
        register({ id: 'elvish_callarii', name: 'Callarii Elvish', family: 'elf', script: 'espruar', settings: ['mystara'] });
        register({ id: 'aengmorian', name: 'Aengmorian', family: 'elvish', script: 'elvish', settings: ['mystara'] });
        register({ id: 'lalor', name: 'Lalor', family: 'hin', script: 'none', settings: ['mystara'] }); // (Ancient Halfling)
        register({ id: 'neathar', name: 'Neathar', family: 'human', script: 'none', settings: ['mystara'] }); // (Prehistoric root language)
        register({ id: 'minrothad', name: 'Minrothad', family: 'human', script: 'minrothad', settings: ['mystara'] });
        register({ id: 'ylaruam', name: 'Ylaruam', family: 'human', script: 'ylaruam', settings: ['mystara'] });
        register({ id: 'glantrian', name: 'Glantrian', family: 'human', script: 'glantrian', settings: ['mystara'] });
        register({ id: 'shadowelf', name: 'Shadow Elf', family: 'elf', script: 'shadowelf', settings: ['mystara'] });

        // ───────────────────────────────────────────────
        //  RAVENLOFT (THE DOMAINS OF DREAD)
        // ───────────────────────────────────────────────
        register({ id: 'balok', name: 'Balok', family: 'human', script: 'luktar', settings: ['ravenloft'] });
        register({ id: 'darkonese', name: 'Darkonese', family: 'human', script: 'darkonese', settings: ['ravenloft'] });
        register({ id: 'falkovnian', name: 'Falkovnian', family: 'human', script: 'falkovnian', settings: ['ravenloft'] });
        register({ id: 'mordentish', name: 'Mordentish', family: 'human', script: 'mordentish', settings: ['ravenloft'] });
        register({ id: 'vaasi', name: 'Vaasi', family: 'human', script: 'vaasi', settings: ['ravenloft'] });
        register({ id: 'vistani', name: 'Patterna', family: 'vistani', script: 'none', rarity: 'rare', settings: ['ravenloft'] });

        // ───────────────────────────────────────────────
        // PLANESCAPE
        // ───────────────────────────────────────────────
        register({ id: 'cant', name: 'Sigil Cant', family: 'planar', script: 'common', settings: ['planescape'] });
        register({ id: 'modron', name: 'Modron', family: 'construct', script: 'binary', settings: ['planescape'] });
        register({ id: 'rilmani', name: 'Rilmani', family: 'outsider', script: 'rilmani', settings: ['planescape'] });
        register({ id: 'slaad', name: 'Slaad', family: 'chaos', script: 'chaos', settings: ['planescape'] });
        register({ id: 'baatorian', name: 'Baatorian', family: 'fiend', script: 'infernal', settings: ['planescape'] });
        register({ id: 'yugoloth', name: 'Yugoloth', family: 'fiend', script: 'infernal', settings: ['planescape'] });
        register({ id: 'archon', name: 'Archon', family: 'celestial', script: 'celestial', settings: ['planescape'] });
        register({ id: 'protean', name: 'Protean', family: 'chaos', script: 'chaos', settings: ['planescape'] });
        register({ id: 'rilmani_high', name: 'High Rilmani', family: 'outsider', script: 'rilmani', settings: ['planescape'] });


        // ───────────────────────────────────────────────
        // BIRTHRIGHT
        // ───────────────────────────────────────────────
        register({ id: 'anuriean', name: 'Anuriean', family: 'human', script: 'anuriean', settings: ['birthright'] });
        register({ id: 'rjurik', name: 'Rjurik', family: 'human', script: 'rjurik', settings: ['birthright'] });
        register({ id: 'vos', name: 'Vos', family: 'human', script: 'vos', settings: ['birthright'] });
        register({ id: 'sidhelien', name: 'Sidhelien', family: 'elf', script: 'sidhelien', settings: ['birthright'] });
        register({ id: 'brecht', name: 'Brecht', family: 'human', script: 'brecht', settings: ['birthright'] });
        register({ id: 'khinasi', name: 'Khinasi', family: 'human', script: 'khinasi', settings: ['birthright'] });
        register({ id: 'vosgaard', name: 'Vosgaard', family: 'human', script: 'vos', settings: ['birthright'] });

        // ───────────────────────────────────────────────
        // KINGDOMS OF KALAMAR
        // ───────────────────────────────────────────────
        register({ id: 'kalamar', name: 'Kalamarian', family: 'human', script: 'kalamarian', settings: ['kalamar'] });
        register({ id: 'reanaarian', name: 'Reanaarian', family: 'human', script: 'reanaarian', settings: ['kalamar'] });
        register({ id: 'svimohzish', name: 'Svimohzish', family: 'human', script: 'svimohzish', settings: ['kalamar'] });
        register({ id: 'fhokki', name: 'Fhokki', family: 'human', script: 'fhokki', settings: ['kalamar'] });
        register({ id: 'dejy', name: 'Dejy', family: 'human', script: 'dejy', settings: ['kalamar'] });
        register({ id: 'kobold_kalamar', name: 'Kobold (Kalamar)', family: 'kobold', script: 'dethek', settings: ['kalamar'] });

        // ───────────────────────────────────────────────
        //  DARK SUN (ATHAS)
        // ───────────────────────────────────────────────
        register({ id: 'athasian_common', name: 'Athasian Common', family: 'human', script: 'athasian', settings: ['athas'] });
        register({ id: 'kreen', name: 'Kreen', family: 'thri-kreen', script: 'none', settings: ['athas','spelljammer'] });
        register({ id: 'rhulisti', name: 'Rhulisti', family: 'halfling', script: 'rhulisti', rarity: 'rare', settings: ['athas'] });
        register({ id: 'draj', name: 'Draj', family: 'human', script: 'athasian', settings: ['athas'] });
        register({ id: 'nibenese', name: 'Nibenese', family: 'human', script: 'athasian', settings: ['athas'] });
        register({ id: 'tyrian', name: 'Tyrian', family: 'human', script: 'athasian', settings: ['athas'] });
        register({ id: 'belgoi', name: 'Belgoi', family: 'belgoi', script: 'none', settings: ['athas'] });
        register({ id: 'rhul_thun', name: 'Rhul-thun', family: 'halfling', script: 'none', settings: ['athas'] }); // (Language of the Blue Age masters)


        // ───────────────────────────────────────────────
        //  RAVINCA
        // ───────────────────────────────────────────────
        register({ id: 'loxodon', name: 'Loxodon', family: 'loxodon', script: 'elvish', settings: ['ravnica'] });
        register({ id: 'kraul', name: 'Kraul', family: 'kraul', script: 'kraul', settings: ['ravnica'] });

        // ───────────────────────────────────────────────
        //  SPELLJAMMER / TRAVELLER / SCI-FI
        // ───────────────────────────────────────────────
        register({ id: 'galactic_standard', name: 'Galactic Standard', family: 'human', script: 'galactic', settings: ['spelljammer','traveller'] });
        register({ id: 'machine_code', name: 'Machine Code', family: 'ai', script: 'binary', settings: ['traveller','cyberpunk'] });
        register({ id: 'vargr_high', name: 'High Vargr', family: 'vargr', script: 'vargr', settings: ['traveller'] });
        register({ id: 'aslan_high', name: 'High Aslan', family: 'aslan', script: 'aslan', settings: ['traveller'] });
        register({ id: 'solomani', name: 'Solomani', family: 'human', script: 'latin', settings: ['traveller'] });
        register({ id: 'vilani', name: 'Vilani', family: 'human', script: 'vilani', settings: ['traveller'] });
        register({ id: 'aslan', name: 'Aslan', family: 'aslan', script: 'aslan', settings: ['traveller'] });
        register({ id: 'vargr', name: 'Vargr', family: 'vargr', script: 'vargr', settings: ['traveller'] });
        register({ id: 'giff', name: 'Giff', family: 'giff', script: 'common', settings: ['spelljammer'] });
        register({ id: 'neogi', name: 'Neogi', family: 'neogi', script: 'neogi', settings: ['spelljammer'] });
        register({ id: 'illithid', name: 'Illithid', family: 'aberration', script: 'illithid', settings: ['spelljammer'] });
        register({ id: 'grommam', name: 'Grommam', family: 'grommam', script: 'common', settings: ['spelljammer'] });
        register({ id: 'xixchil', name: 'Xixchil', family: 'insectoid', script: 'xixchil', settings: ['spelljammer'] });
        register({ id: 'zdetl', name: 'Zdetl', family: 'hiver', script: 'zdetl', settings: ['traveller'] });
        register({ id: 'kian', name: 'Kian', family: 'kian', script: 'kian', settings: ['traveller'] });
        register({ id: 'droyne', name: 'Droyne', family: 'droyne', script: 'droyne', settings: ['traveller'] });
        register({ id: 'akashic', name: 'Akashic', family: 'outsider', script: 'akashic', settings: ['starfinder'] });
        register({ id: 'triaxian', name: 'Triaxian', family: 'triaxian', script: 'triaxian', settings: ['starfinder'] });
        register({ id: 'ysoki', name: 'Ysoki', family: 'ysoki', script: 'ysoki', settings: ['starfinder'] });
        register({ id: 'shirren', name: 'Shirren', family: 'insectoid', script: 'shirren', settings: ['starfinder'] });
        register({ id: 'vesk', name: 'Vesk', family: 'vesk', script: 'vesk', settings: ['starfinder'] });
        register({ id: 'kasatha', name: 'Kasatha', family: 'kasatha', script: 'kasatha', settings: ['starfinder'] });

        // ───────────────────────────────────────────────
        //  SHADOWRUN / CYBERPUNK
        // ───────────────────────────────────────────────
        register({ id: 'japanese', name: 'Japanese', family: 'human', script: 'kanji', settings: ['shadowrun','cyberpunk','twilight2000'] });                
        register({ id: 'english', name: 'English', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'spanish', name: 'Spanish', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'sperethiel', name: 'Sperethiel', family: 'elf', script: 'sperethiel', settings: ['shadowrun'] });
        register({ id: 'orset', name: 'Orzet', family: 'ork', script: 'latin', settings: ['shadowrun'] });
        register({ id: 'city_speak', name: 'City Speak', family: 'slang', script: 'latin', settings: ['cyberpunk'] });
        register({ id: 'salish', name: 'Salish', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'sioux', name: 'Sioux', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'pueblo', name: 'Pueblo', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'ukranian', name: 'Ukranian', family: 'human', script: 'cyrillic', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'russian', name: 'Russian', family: 'human', script: 'cyrillic', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'corporate_cant', name: 'Corporate Cant', family: 'slang', script: 'latin', settings: ['cyberpunk'] });
        register({ id: 'streetslang', name: 'Streetslang', family: 'slang', script: 'latin', settings: ['cyberpunk'] });
        register({ id: 'chinese_mandarin', name: 'Mandarin Chinese', family: 'human', script: 'hanzi', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'korean', name: 'Korean', family: 'human', script: 'hangul', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'polish', name: 'Polish', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'german', name: 'German', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'swedish', name: 'Swedish', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'french', name: 'French', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'italian', name: 'Italian', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'arabic', name: 'Arabic', family: 'human', script: 'arabic', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'hebrew', name: 'Hebrew', family: 'human', script: 'hebrew', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'hindi', name: 'Hindi', family: 'human', script: 'devanagari', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'portuguese', name: 'Portuguese', family: 'human', script: 'latin', settings: ['shadowrun','cyberpunk','twilight2000'] });
        register({ id: 'seldruin', name: 'Seldruin', family: 'arcane', script: 'hamarfae', settings: ['shadowrun'] }); // (A dead tongue of elven high magic remembered only by dragons) 
        register({ id: 'tir_tairngire_elvish', name: 'Tir Tairngire Elvish', family: 'elf', script: 'sperethiel', settings: ['shadowrun'] });
        register({ id: 'puyallup_slang', name: 'Puyallup Slang', family: 'slang', script: 'latin', settings: ['shadowrun'] });
        register({ id: 'yamatetsu_corp', name: 'Yamatetsu Corporate', family: 'corporate', script: 'kanji', settings: ['shadowrun'] });
        register({ id: 'ncorp', name: 'NeoCorp Cant', family: 'corporate', script: 'latin', settings: ['cyberpunk'] });
        register({ id: 'synth_speech', name: 'Synth Speech', family: 'ai', script: 'digital', settings: ['cyberpunk'] });
        register({ id: 'blackwall_code', name: 'Blackwall Code', family: 'ai', script: 'binary', rarity: 'rare', settings: ['cyberpunk'] });
        register({ id: 'norwegian', name: 'Norwegian', family: 'human', script: 'latin', settings: ['twilight2000'] });
        register({ id: 'finnish', name: 'Finnish', family: 'human', script: 'latin', settings: ['twilight2000'] });

        // ───────────────────────────────────────────────
        //  STAR WARS
        // ───────────────────────────────────────────────
        register({ id: 'galactic_basic', name: 'Galactic Basic', family: 'human', script: 'aurebesh', settings: ['starwars'] });
        register({ id: 'binary', name: 'Binary', family: 'droid', script: 'digital', settings: ['starwars'] });
        register({ id: 'hutese', name: 'Huttese', family: 'hutt', script: 'hutt', settings: ['starwars'] });
        register({ id: 'shyriiwook', name: 'Shyriiwook', family: 'wookiee', script: 'none', settings: ['starwars'] });
        register({ id: 'durese', name: 'Durese', family: 'duros', script: 'aurebesh', settings: ['starwars'] });
        register({ id: 'mandoa', name: 'Mando\'a', family: 'mandalorian', script: 'mandalorian', settings: ['starwars'] });
        register({ id: 'sith', name: 'Sith', family: 'sith', script: 'kittat', rarity: 'rare', settings: ['starwars'] });
        register({ id: 'ewokese', name: 'Ewokese', family: 'ewok', script: 'none', settings: ['starwars'] });
        register({ id: 'mon_calamarian', name: 'Mon Calamarian', family: 'mon_cal', script: 'aurebesh', settings: ['starwars'] });
        register({ id: 'rodese', name: 'Rodese', family: 'rodian', script: 'aurebesh', settings: ['starwars'] });
        
        // ───────────────────────────────────────────────
        //  STAR TREK
        // ───────────────────────────────────────────────
        register({ id: 'federation_standard', name: 'Federation Standard', family: 'human', script: 'latin', settings: ['startrek'] });
        register({ id: 'klingon', name: 'Klingon', family: 'klingon', script: 'piklqd', settings: ['startrek'] });
        register({ id: 'vulcan', name: 'Vulcan', family: 'vulcan', script: 'vuhlkansu', settings: ['startrek'] });
        register({ id: 'romulan', name: 'Romulan', family: 'romulan', script: 'romulan', settings: ['startrek'] });
        register({ id: 'andorian', name: 'Andorian', family: 'andorian', script: 'andorian', settings: ['startrek'] });
        register({ id: 'cardassian', name: 'Cardassian', family: 'cardassian', script: 'cardassian', settings: ['startrek'] });
        register({ id: 'ferengi', name: 'Ferengi', family: 'ferengi', script: 'ferengi', settings: ['startrek'] });
        register({ id: 'bajoran', name: 'Bajoran', family: 'bajoran', script: 'bajoran', settings: ['startrek'] });
        register({ id: 'dominion', name: 'Dominion', family: 'changeling', script: 'dominion', settings: ['startrek'] });
        register({ id: 'borg', name: 'Borg Data-stream', family: 'borg', script: 'geometric', rarity: 'rare', settings: ['startrek'] });
        
        // ───────────────────────────────────────────────
        //  WARHAMMER / WH40K
        // ───────────────────────────────────────────────
        register({ id: 'low_gothic', name: 'Low Gothic', family: 'human', script: 'gothic', settings: ['wh40k'] });
        register({ id: 'high_gothic', name: 'High Gothic', family: 'human', script: 'gothic', rarity: 'rare', settings: ['wh40k'] });
        register({ id: 'ork', name: 'Ork', family: 'ork', script: 'glyphz', settings: ['wh40k'] });
        register({ id: 'aeldari', name: 'Aeldari', family: 'eldar', script: 'aeldari', settings: ['wh40k'] });
        register({ id: 'khazalid', name: 'Khazalid', family: 'dwarf', script: 'klinkarhun', settings: ['warhammer_fantasy'] });
        register({ id: 'queekish', name: 'Queekish', family: 'skaven', script: 'skaven', settings: ['warhammer_fantasy'] });
        register({ id: 'tau_lexicon', name: 'Tau Lexicon', family: 'tau', script: 'tau', settings: ['wh40k'] });
        register({ id: 'reikspiel', name: 'Reikspiel', family: 'human', script: 'gothic', settings: ['warhammer_fantasy'] });
        register({ id: 'eltharin', name: 'Eltharin', family: 'elf', script: 'eltharin', settings: ['warhammer_fantasy'] });
        register({ id: 'goblin_tongue', name: 'Goblin Tongue', family: 'goblinoid', script: 'goblin', settings: ['warhammer_fantasy'] });
        register({ id: 'necron', name: 'Necron', family: 'necron', script: 'necron', rarity: 'rare', settings: ['wh40k'] });
        register({ id: 'tyranid', name: 'Tyranid Bio-Signal', family: 'tyranid', script: 'none', rarity: 'rare', settings: ['wh40k'] });
        register({ id: 'eldar', name: 'Eldar', family: 'eldar', script: 'aeldari', settings: ['wh40k'] });
        register({ id: 'dark_eldar', name: 'Dark Eldar', family: 'eldar', script: 'aeldari', settings: ['wh40k'] });
        register({ id: 'magick', name: 'Magick', family: 'arcane', script: 'various', settings: ['warhammer_fantasy'] }); // (Subdivided into Elemental, Illusionist, Necromantic, and Wizardry)
        register({ id: 'dark_tongue', name: 'Dark Tongue', family: 'chaos', script: 'chaos-runes', settings: ['wh40k', 'warhammer_fantasy'] }); // (The language of Chaos and Daemons)
        register({ id: 'classical', name: 'Classical', family: 'human', script: 'classical', settings: ['warhammer_fantasy'] }); // (A dead language akin to Latin, used for academic and holy texts)
        register({ id: 'old_slann', name: 'Old Slann', family: 'arcane', script: 'glyphs', settings: ['warhammer_fantasy'] }); // (The oldest and rarest arcane language, used by the world-shapers)
        register({ id: 'queekish', name: 'Queekish', family: 'skaven', script: 'none', settings: ['warhammer_fantasy'] }); // (A rapid-fire, chittering language of the Skaven)
        register({ id: 'battle_tongue', name: 'Battle Tongue', family: 'coded', script: 'none', settings: ['warhammer_fantasy'] }); // (A clipped version of Old Worlder used for orders; can be spoken twice as fast)
        register({ id: 'nagarythe', name: 'Nagarythe', family: 'elf', script: 'eltharin', settings: ['warhammer_fantasy'] });
        register({ id: 'druchii', name: 'Druchii', family: 'elf', script: 'eltharin', settings: ['warhammer_fantasy'] });
        register({ id: 'adeptus_mechanicus', name: 'Lingua Technis', family: 'machine', script: 'binary', settings: ['wh40k'] });
        register({ id: 'eldar_high', name: 'High Aeldari', family: 'eldar', script: 'aeldari', settings: ['wh40k'] });

        // ───────────────────────────────────────────────
        // BESM
        // ───────────────────────────────────────────────
        register({ id: 'ancient_lemurian', name: 'Ancient Lemurian', family: 'ancient', script: 'lemurian', settings: ['besm'] });
        register({ id: 'neo_tokyo', name: 'Neo-Tokyo Dialect', family: 'human', script: 'kanji', settings: ['besm'] });

        // ───────────────────────────────────────────────
        //  PATHFINDER / GOLARION
        // ───────────────────────────────────────────────
        register({ id: 'jistka', name: 'Jistka', family: 'human', script: 'jistka', settings: ['golarion'] }); // (First human empire)
        register({ id: 'azlanti', name: 'Azlanti', family: 'human', script: 'azlanti', settings: ['golarion'] }); // (The High Speech of lost Azlant)
        register({ id: 'thassilonian', name: 'Thassilonian', family: 'human', script: 'thassilonian', settings: ['golarion'] }); // (Empire of Sin)
        register({ id: 'tekritanin', name: 'Tekritanin', family: 'human', script: 'tekritanin', settings: ['golarion'] });
        register({ id: 'shory', name: 'Shory', family: 'human', script: 'shory', settings: ['golarion'] }); // (Language of the flying cities)
        register({ id: 'cyclops', name: 'Cyclops', family: 'giant', script: 'cyclops', settings: ['golarion'] }); // (Ancient Ghol-Gan)
        register({ id: 'orkuthan', name: 'Orkuthan', family: 'planar', script: 'none', settings: ['golarion'] }); // (Secret language of the Shae)
        register({ id: 'senzar', name: 'Senzar', family: 'racial', script: 'none', settings: ['golarion'] }); // (Ancient language of the Kitsune and spirits)

        // ───────────────────────────────────────────────
        //  SIGN LANGUAGES
        // ───────────────────────────────────────────────
        register({ id: 'drow_sign', name: 'Drow Sign Language', family: 'sign', script: 'none', settings: ['fr', 'greyhawk', 'golarion'] }); // (Complex hand signals)
        register({ id: 'draconic_sign', name: 'Draconic Sign', family: 'sign', script: 'none', settings: ['fr'] }); // (Jaw, claw, and wing movements)
        register({ id: 'malatran_sign', name: 'Malatran Sign', family: 'sign', script: 'none', settings: ['fr'] }); // (Used by hunters in the Malatran Plateau)
        register({ id: 'common_sign', name: 'Common Sign', family: 'sign', script: 'none', settings: ['fr'] });
        register({ id: 'asl', name: 'American Sign Language', family: 'sign', script: 'none', settings: ['twilight2000','shadowrun','cyberpunk'] });

        // ───────────────────────────────────────────────
        // RUNEQUEST
        // ───────────────────────────────────────────────
        register({ id: 'auld_wyrmish', name: 'Auld Wyrmish', family: 'draconic', script: 'draconic', settings: ['glorantha'] }); // (The complex language of dragons, nearly impossible for humans to master)
        register({ id: 'darktongue', name: 'Darktongue', family: 'darkness', script: 'dark-runes', settings: ['glorantha'] }); // (Spoken by Trolls and ancestors from the Darkness)
        register({ id: 'spiritspeech', name: 'Spiritspeech', family: 'magical', script: 'none', settings: ['glorantha'] }); // (The universal tongue used by discorporate spirits)
        register({ id: 'aldryami', name: 'Aldryami', family: 'nature', script: 'none', settings: ['glorantha'] }); // (The language of the woods spoken by Elves/Aldryami) 

        // ───────────────────────────────────────────────
        // NUMENARA (THE NINTH WORLD)
        // ───────────────────────────────────────────────
        register({ id: 'the_truth', name: 'The Truth', family: 'common', script: 'truth', settings: ['numenera'] }); // (The primary common language, though its origin is mysterious)
        register({ id: 'mastigophore', name: 'Mastigophore', family: 'dead', script: 'ancient', settings: ['numenera'] }); // (The language of an extinct builder race)
        register({ id: 'shin_talk', name: 'Shin-Talk', family: 'trade', script: 'none', settings: ['numenera'] }); // (An older, cruder trade language)

        // ───────────────────────────────────────────────
        // CTHULHU
        // ───────────────────────────────────────────────
        register({ id: 'aklo', name: 'Aklo', family: 'mythos', script: 'unknown', settings: ['cthulhu-mythos'] }); // (Associated with Serpent People and ancient cults)
        register({ id: 'rlyehian', name: 'R\'lyehian', family: 'deity', script: 'hieroglyphs', settings: ['cthulhu-mythos'] }); // (The language of Cthulhu and his spawn)
        register({ id: 'hyperborean', name: 'Hyperborean', family: 'human', script: 'glyphs', settings: ['cthulhu-mythos'] }); // (Spoken in the lost arctic civilization of Tsathoggua)
        register({ id: 'naacal', name: 'Naacal', family: 'human', script: 'hieroglyphs', settings: ['cthulhu-mythos'] }); // (The holy language of lost Mu)
        register({ id: 'elder_thing_code', name: 'Elder Thing Code', family: 'alien', script: 'dots', settings: ['cthulhu-mythos'] }); // (Musical, piping language of the Elder Things)
      }
    }
  };
};
