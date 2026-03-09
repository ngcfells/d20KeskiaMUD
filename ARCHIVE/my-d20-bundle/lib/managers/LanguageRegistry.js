'use strict';

class LanguageRegistry {
  constructor() {
    this.languages = new Map();
    this._bootstrap();
  }

  _register(lang) {
    if (!lang.id) throw new Error('Language must have an id');
    this.languages.set(lang.id, {
      rarity: 'common',
      script: null,
      settings: [],
      ...lang
    });
  }

  _bootstrap() {

    // ───────────────────────────────────────────────
    //  MULTIVERSAL CONSTANTS
    // ───────────────────────────────────────────────

    this._register({ id: 'abyssal', name: 'Abyssal', family: 'fiendish', script: 'infernal', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The language of demons; chaotic and harsh.' });
    this._register({ id: 'aquan', name: 'Aquan', family: 'primordial', script: 'selvaran', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The dialect of water-based elemental beings.' });
    this._register({ id: 'auran', name: 'Auran', family: 'primordial', script: 'selvaran', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The dialect of air-based elemental beings.' });
    this._register({ id: 'celestial', name: 'Celestial', family: 'great_wheel', script: 'celestial', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The language of good-aligned outsiders and angels.' });
    this._register({ id: 'daan', name: 'Daan', family: 'eberron_planar', script: 'daan', rarity: 'very_rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The language of law and order spoken by formians and inevitable beings in Daanvi.' });
    this._register({ id: 'daelkyr', name: 'Daelkyr', family: 'eberron_planar', script: 'daelkyr', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The alien tongue of Xoriat; spoken by aberrations and mind flayers.' });
    this._register({ id: 'elamxin', name: 'Elamxin', family: 'primordial', script: 'selvaran', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'Ancient elemental tongue of the Air genies.' });
    this._register({ id: 'gith', name: 'Gith', family: 'great_wheel', script: 'tir_su', rarity: 'uncommon', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'A sharp, clicking tongue written in circular Tir\'su glyphs; read clockwise by Githyanki and counter-clockwise by Githzerai.' });
    this._register({ id: 'glav', name: 'Glav', family: 'draconic', script: 'iokharic', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'An archaic, high-form of Draconic used in ritual.' });
    this._register({ id: 'ignan', name: 'Ignan', family: 'primordial', script: 'selvaran', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The dialect of fire-based elemental beings.' });
    this._register({ id: 'infernal', name: 'Infernal', family: 'fiendish', script: 'infernal', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The precise, legalistic language of Devils.' });
    this._register({ id: 'irial', name: 'Irial', family: 'eberron_planar', script: 'iokharic', rarity: 'very_rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'A radiant language of positive energy spoken by beings from Irian.' });
    this._register({ id: 'jannti', name: 'Jannti', family: 'planar_trade', script: 'dethek', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The Common tongue used by Genies throughout Zakhara and the planes.' });
    this._register({ id: 'khezu', name: 'Khezu', family: 'extraplanar', script: 'khezu', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The language of the Khezu, the primordial demon.' });
    this._register({ id: 'mabran', name: 'Mabran', family: 'eberron_planar', script: 'iokharic', rarity: 'very_rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'A dark, whispering tongue spoken by creatures of the plane of Mabar.' });
    
    this._register({ id: 'quori', name: 'Quori', family: 'eberron_planar', script: 'quori', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The language of Dal Quor; spoken by the Inspired and kalashtar.' });
    this._register({ id: 'risian', name: 'Risian', family: 'eberron_planar', script: 'dwarven', rarity: 'very_rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'A cold language spoken by ice-based beings from the plane of Risia.' });
    ;
    this._register({ id: 'syranian', name: 'Syranian', family: 'eberron_planar', script: 'celestial', rarity: 'very_rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The angelic tongue of the plane of Syrania.' });
    this._register({ id: 'terran', name: 'Terran', family: 'primordial', script: 'selvaran', rarity: 'rare', settings: ['eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The dialect of earth-based elemental beings.' });

    // ───────────────────────────────────────────────
    //  FEY (family: 'fey')
    // ───────────────────────────────────────────────
    //      ELEMENTAL FEY SUB (family: 'elemental_fey_sub')
    // ───────────────────────────────────────────────
	          this._register({ id: 'nixie', name: 'Nixie', family: 'elemental_fey_sub', script: 'selvaran', rarity: 'uncommon', settings: ['multiverse', 'mystara'], notes: 'A bubbly, playful dialect used by water fey; bridges the gap between Sylvan and Aquan.' });
	          this._register({ id: 'knocker_echo', name: 'Knocker-Echo', family: 'elemental_fey_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['multiverse', 'rockhome'], notes: 'A percussive, rhythmic language of stone-vibrations used by earth-fey.' });
	          this._register({ id: 'sylph', name: 'Sylph-Auran', family: 'elemental_fey_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['multiverse', 'sky_of_mystara'], notes: 'A melodic, whispering dialect of Auran; sounds like wind through high mountain passes.' });
    // ───────────────────────────────────────────────
    //      FAERIE HIGHT COURT (family: 'faerie_hight_court')
    // ───────────────────────────────────────────────
            this._register({ id: 'faerie_speak', name: 'Faerie Speak', family: 'fey', script: 'spoken_only', rarity: 'rare', settings: ['multiverse', 'palladium_fantasy'], notes: 'A high-pitched, rapid-fire language spoken by Sprites, Pixies, and Leprechauns.' });
            this._register({ id: 'hamadryad_ancient', name: 'Hamadryad', family: 'faerie_high_court', script: 'spoken_only', rarity: 'very_rare', settings: ['multiverse'], notes: 'A deep, rhythmic language of the Great Trees; can be understood by anyone who can "hear" the forest.' });        
            this._register({ id: 'senzar', name: 'Senzar', family: 'faerie_high_court', script: 'hamarfae', rarity: 'rare', settings: ['multiverse', 'mystara'], notes: 'The liturgical and ancestral bridge between Elven and Fey; highly resonant and magically sensitive.' });
    // ───────────────────────────────────────────────
    //      SIDHE NOBLE SUB (family: 'sidhe_noble_sub')
    // ───────────────────────────────────────────────
            this._register({ id: 'sidhe_high_court', name: 'Sidhe High Court', family: 'sidhe_noble_sub', script: 'hamarfae', rarity: 'very_rare', settings: ['multiverse', 'faerie'], notes: 'A rigid, magically-binding language of protocol used by Titania and the Seelie elite.' });
            this._register({ id: 'sidhe_low_court', name: 'Sidhe Low Court', family: 'sidhe_noble_sub', script: 'spoken_only', rarity: 'rare', settings: ['multiverse', 'faerie'], notes: 'The dark, sibilant tongue of the Unseelie Court; focused on curses and shadows.' });
    // ───────────────────────────────────────────────
    //      SYLVAN FOREST SUB (family: 'sylvan_forest_sub')
    // ───────────────────────────────────────────────
            this._register({ id: 'arboreal', name: 'Arboreal', family: 'sylvan_forest_sub', script: 'espruar', rarity: 'uncommon', settings: ['ghostwalk', 'multiverse'], notes: 'The language of the wood elementals and treants inhabiting the Spirit Wood.' });
            this._register({ id: 'pooka_argot', name: 'Pooka', family: 'sylvan_forest_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['multiverse'], notes: 'A shifting, chaotic tongue used by trickster fey; relies on riddles and wordplay.' });
            this._register({ id: 'sylvan', name: 'Sylvan', family: 'sylvan_forest_sub', script: 'sylvan_runes', rarity: 'uncommon', settings: ['multiverse', 'eberron', 'forgotten_realms', 'mystara', 'planescape', 'spelljammer'], notes: 'The language of the Feywild and nature spirits.' })


    // ───────────────────────────────────────────────
    //  MONSTER / NON-HUMAN TONGUES - MAY NEED TO BREAK UP REGIONALLY
    // ───────────────────────────────────────────────

    this._register({ id: 'spelljammer_beholder', name: 'Beholder', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: [ 'spelljammer'], notes: 'The dialect of spelljamming Beholders aboard Hive Ships. It is more tactical and adapted for large-scale coordination, which solitary terrestrial Beholders find "repulsive"' });
    this._register({ id: 'quevquel', name: 'Faerûnian Beholder', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'Quevquel is the language spoken by Faeruqnian Beholders. They believe it to be the purest form of their language.' });
    this._register({ id: 'bugbear', name: 'Bugbear', family: 'goblinoid', script: 'dethek', rarity: 'common', settings: ['forgotten_realms'], notes: 'A guttural language sharing roots with Goblin.' });
    this._register({ id: 'daraktan', name: 'Daraktan', family: 'orcish', script: 'dethek', rarity: 'common', settings: ['forgotten_realms'], notes: 'The standard modern Orcish language.' });
    this._register({ id: 'deep_drow', name: 'Deep Drow', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['forgotten_realms'], notes: 'Common tongue of the Underdark-dwelling Dark Elves.' });
    this._register({ id: 'dethek', name: 'Dwarvish', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['forgotten_realms'], notes: 'Standard language of the Stout Folk.' });
    this._register({ id: 'draconic', name: 'Draconic', family: 'draconic', script: 'iokharic', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The language of dragons; often used in arcane study.' });
    this._register({ id: 'drow_sign_language', name: 'Drow Sign Language', family: 'elvish', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A silent, complex code of hand signals used by the Drow.' });
    this._register({ id: 'duergan', name: 'Duergan', family: 'dwarven', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Dialect spoken by the Gray Dwarves.' });
    this._register({ id: 'espruar', name: 'Espruar', family: 'elvish', script: 'espruar', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Refers to the ancient alphabetical script of the Moon Elves.' });
    this._register({ id: 'gaurwaith', name: 'Gaurwaith', family: 'monstrous_canine', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The "Wolf-tongue" spoken by certain lycanthrope tribes.' });
    this._register({ id: 'ghukliak', name: 'Ghukliak', family: 'goblinoid', script: 'dethek', rarity: 'common', settings: ['forgotten_realms'], notes: 'The primary language of Goblins, Hobgoblins, and Bugbears.' });
    this._register({ id: 'giant', name: 'Giant', family: 'jotun', script: 'dethek', rarity: 'common', settings: ['forgotten_realms'], notes: 'Language of the Jotunbrud (Giants).' });
    this._register({ id: 'gnim', name: 'Gnim', family: 'gnomish', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The specific internal name for the Gnomish language.' });
    this._register({ id: 'gnoll', name: 'Gnoll', family: 'monstrous_canine', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A cackling, barking language spoken by Gnolls.' });
    this._register({ id: 'goblin', name: 'Goblin', family: 'goblinoid', script: 'oghyr', rarity: 'common', settings: ['dragonlance'], notes: 'Spoken by goblins and hobgoblins; uses the Oghyr script.' });
    this._register({ id: 'hinspeak', name: 'Hinspeak', family: 'halfling', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'The internal name for the Halfling language, primarily used in Luiren.' });
    this._register({ id: 'high_drow', name: 'High Drow', family: 'elvish', script: 'espruar', rarity: 'rare', settings: ['forgotten_realms'], notes: 'An aristocratic, complex version of Drow used by the noble houses.' });
    this._register({ id: 'hook_horror', name: 'Hook Horror', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'A language of clicks and scrapes against stone surfaces.' });
    this._register({ id: 'hulgorkyn', name: 'Hulgorkyn', family: 'orcish', script: 'dethek', rarity: 'extinct', settings: ['forgotten_realms'], notes: 'Ancient orcish script and tongue; largely replaced by Daraktan.' });
    this._register({ id: 'jogishk', name: 'Jogishk', family: 'jotun', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A crude, simplified version of Giant spoken by Ogres.' });
    this._register({ id: 'jotunhaug', name: 'Jotunhaug', family: 'jotun', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The low-tongue of Hill Giants.' });
    this._register({ id: 'kurit', name: 'Kurit', family: 'dwarven', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The dialect of the Arctic Dwarves.' });
    this._register({ id: 'saurial', name: 'Saurial', family: 'humanoid_reptilian', script: 'spoken_only', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'A combination of clicks and scents used by lizard-folk from the Lost Vale.' });
    this._register({ id: 'seldruin', name: 'Seldruin', family: 'elvish', script: 'hamarfae', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The language of Elven High Magic.' });
    this._register({ id: 'serpentes', name: 'Serpentes', family: 'serpentine', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The language of the Yuan-ti and other serpent-folk.' });
    this._register({ id: 'telquessan', name: 'Tel\'Quessan', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['forgotten_realms'], notes: 'The musical language of the Elves (Tel\'Quessan).' });
    this._register({ id: 'thri_kreen', name: 'Thri-Kreen', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A language of mandibles clicking; almost impossible for humans to speak.' });
    this._register({ id: 'lerrrone', name: 'Lerrrone', family: 'monstrous_feline', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The language of the lion-centaurs (Wemics) of the Shaar.' });
    this._register({ id: 'nagane', name: 'Nagane', family: 'serpentine', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The sibilant language of the Nagas.' });
    this._register({ id: 'xulaye', name: 'Xulaye', family: 'elvish', script: 'espruar', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A trade-tongue used by the Drow with other Underdark races.' });
    this._register({ id: 'yikaria', name: 'Yikaria', family: 'monstrous', script: 'dethek', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The language of the Yak-folk.' });
    this._register({ id: 'yipyak', name: 'Yipyak', family: 'humanoid_reptilian', script: 'iokharic', rarity: 'common', settings: ['greyhawk'], notes: 'A frantic, yapping tongue that sounds like barking dogs to the untrained ear spoken by Kobolds. Shares a root with Draconic but is far more primitive.' });

    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS
    // ───────────────────────────────────────────────

    this._register({ id: 'aglarondan', name: 'Aglarondan', family: 'central_faerunian', script: 'espruar', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in Aglarond; influenced by elven loanwords.' });
    this._register({ id: 'alzhedo', name: 'Alzhedo', family: 'human_faerunian', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'Language of Calimshan; influenced by elemental and planar contact.' });
    this._register({ id: 'alambit', name: 'Alambit', family: 'central_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Spoken near the Alambit River in the Vilhon Reach.' });
    this._register({ id: 'alessian', name: 'Allesian', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'An archaic language of the Raumathar descendants.' });
    this._register({ id: 'altumbic', name: 'Altumbic', family: 'central_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in Altumbel; closely related to Aglarondan.' });
    this._register({ id: 'argalun', name: 'Argalun', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A minor human dialect from the northern interior.' });
    this._register({ id: 'arkaiun', name: 'Arkaiun', family: 'boreal_steppe', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The language of the Dambrathan nomads and the people of the Shaar.' });
    this._register({ id: 'bothii', name: 'Bothii', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the Uthgardt Sky Pony and Red Pony tribes.' });
    this._register({ id: 'calishite_high', name: 'High Calishite', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Aristocratic dialect of Calimshan; retains ancient planar vocabulary.' });
    this._register({ id: 'calishite_low', name: 'Low Calishite', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Everyday dialect of Calimshan; distinct from formal Alzhedo.' });
    this._register({ id: 'chardic', name: 'Chardic', family: 'human_faerunian', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Also known as Easting; the common dialect of the Easting Reach.' });
    this._register({ id: 'chessentan', name: 'Chessentan', family: 'human_faerunian', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'Primary language of the Chessenta region.' });
    this._register({ id: 'chondathan', name: 'Chondathan', family: 'central_faerunian', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'Primary trade language of the Western Heartlands and Sword Coast.' });
    this._register({ id: 'cosh', name: 'Cosh', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A crude trade tongue used in the Nelanther Isles.' });
    this._register({ id: 'daelic', name: 'Daelic', family: 'human_faerunian', script: 'ogham', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The specific druidic tongue of the Moonshae Isles.' });
    this._register({ id: 'damaran', name: 'Damaran', family: 'central_faerunian', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'Spoken in Damara, Impiltur, and the Bloodstone Lands.' });
    this._register({ id: 'dambrathan', name: 'Dambrathan', family: 'human_faerunian', script: 'espruar', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in Dambrath; uses the Elven script due to history.' });
    this._register({ id: 'darum', name: 'Darum', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A minor dialect used by merchants in the Eastern Reach.' });
    this._register({ id: 'dtarig', name: 'D\'tarig', family: 'faerunian_arcana', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the desert nomads of Anauroch.' });
    this._register({ id: 'durpari', name: 'Durpari', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in the Shining South (Durpar and Estagund).' });
    this._register({ id: 'eanul', name: 'Eanul', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in the Indul region of the Shining South.' });
    this._register({ id: 'elpran', name: 'Elpran', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'An obscure dialect spoken in the southern islands.' });
    this._register({ id: 'halruaan', name: 'Halruaan', family: 'human_faerunian', script: 'iokharic', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Language of Halruaa; heavily influenced by arcane iokharic.' });
    this._register({ id: 'hlondethan', name: 'Hlondethan', family: 'faerunian_creole', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A sibilant creole of Sespechian and Yuan-ti, spoken in the City of Serpents.' });
    this._register({ id: 'hodian', name: 'Hodian', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A dialect spoken in the northern regions of the Great Dale.' });
    this._register({ id: 'illuskan', name: 'Illuskan', family: 'central_faerunian', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'Spoken by the Northlanders; ancestor of many Sword Coast dialects.' });
    this._register({ id: 'iteprou', name: 'Iteprou', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A Mulhorandi dialect spoken in the coastal regions.' });
    this._register({ id: 'lantanese', name: 'Lantanese', family: 'faerunian_arcana', script: 'iokharic', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken on the island of Lantan; often used in technical manuals.' });
    this._register({ id: 'loross', name: 'Loross', family: 'central_faerunian', script: 'iokharic', rarity: 'extinct', settings: ['forgotten_realms'], notes: 'The high-speech of Netherese nobility and archmages.' });
    this._register({ id: 'maiden_tongue', name: 'Maiden\'s Tongue', family: 'faerunian_arcana', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A female-only ritual language used in the Vilhon Reach.' });
    this._register({ id: 'maran', name: 'Maran', family: 'human_faerunian', script: 'untheric', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Spoken by the Mar people of the Utter East; related to Midani.' });
    this._register({ id: 'merchant_pidgin', name: 'Merchant-Pidgin', family: 'faerunian_creole', script: 'spoken_only', rarity: 'common', settings: ['forgotten_realms', 'multiversal'], notes: 'A stripped-down, grammatically simplified version of Common used for basic inter-species trade.' });
    this._register({ id: 'muhjuri', name: 'Muhjuri', family: 'human_faerunian', script: 'sempharic', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Common language of Murghôm and Semphar.' });
    this._register({ id: 'mulhorandi', name: 'Mulhorandi', family: 'human_faerunian', script: 'mulhorandi_hieratic', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Ancient language of Mulhorand; retains divine and ritual vocabulary.' });
    this._register({ id: 'narfelli', name: 'Narfelli', family: 'boreal_steppe', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in the cold lands of Narfell.' });
    this._register({ id: 'netherese_modern', name: 'Modern Netherese', family: 'faerunian_arcana', script: 'iokharic', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Descendant of ancient Netherese; used by surviving enclaves and scholars.' });
    this._register({ id: 'nozuran', name: 'Nozuran', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A dialect of the nomadic tribes of the Eastern Shaar.' });
    this._register({ id: 'old_ulanthi', name: 'Old Ulanthi', family: 'faerunian_arcana', script: 'thorass', rarity: 'extinct', settings: ['forgotten_realms'], notes: 'The archaic form of Ulanthi, used in ancient Eastern treaties.' });
    this._register({ id: 'rashemi', name: 'Rashemi', family: 'boreal_steppe', script: 'rashemi_script', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the Rashemi tribes; partially logographic.' });
    this._register({ id: 'rauraric', name: 'Rauraric', family: 'human_faerunian', script: 'thorass', rarity: 'extinct', settings: ['forgotten_realms'], notes: 'The ancient ancestor of Mulhorandi and Untheric.' });
    this._register({ id: 'reghedjic', name: 'Reghedjic', family: 'central_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the Reghed Barbarians of Icewind Dale.' });
    this._register({ id: 'ruathlek', name: 'Ruathlek', family: 'faerunian_arcana', script: 'ruathlek', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'A secret language used by illusionists of Netherese descent.' });
    this._register({ id: 'sespechian', name: 'Sespechian', family: 'central_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The regional dialect of the Barony of Sespech.' });
    this._register({ id: 'shaan_patois', name: 'Shaan-Patois', family: 'faerunian_creole', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A hybrid of Durpari and Shaaran used by the nomadic tribes of the Eastern Shaar.' });
    this._register({ id: 'shaaran', name: 'Shaaran', family: 'human_faerunian', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the nomads of the Shaar.' });
    this._register({ id: 'sossic', name: 'Sossic', family: 'boreal_steppe', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Spoken by the Sossrim in the far frozen reaches.' });
    this._register({ id: 'swagdar', name: 'Swagdar', family: 'faerunian_creole', script: 'dethek', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A rough creole of Dambrathan used by outcasts and nomads in the South; often written in dwarven runes.' });
    this._register({ id: 'telpi', name: 'Telpi', family: 'faerunian_creole', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in the Dragon Coast and Pirate Isles.' });
    this._register({ id: 'tethyrian', name: 'Tethyrian', family: 'central_faerunian', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'Blend of Illuskan and Chondathan; spoken in Tethyr and Amn.' });
    this._register({ id: 'thayan', name: 'Thayan', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A dialect of Mulhorandi spoken in the magocracy of Thay.' });
    this._register({ id: 'thorasta', name: 'Thorasta', family: 'faerunian_creole', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'The modern evolved form of Common; a stable creole of Old Thorass and Chondathan.' });
    this._register({ id: 'thorass', name: 'Thorass', family: 'central_faerunian', script: 'thorass', rarity: 'extinct', settings: ['forgotten_realms'], notes: 'The "Old Common" of the early human empires.' });
    this._register({ id: 'tuelhalan', name: 'Tuelhalan', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'An archaic dialect from the Sossal region.' });
    this._register({ id: 'tuigan', name: 'Tuigan', family: 'boreal_steppe', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the Hordelands nomads.' });
    this._register({ id: 'turmic', name: 'Turmic', family: 'central_faerunian', script: 'turmic_script', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of Turmish; formalized variant of Thorass.' });
    this._register({ id: 'ulanthi', name: 'Ulanthi', family: 'faerunian_arcana', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The modern language of Ulgarth and the Utter East.' });
    this._register({ id: 'ulanthis', name: 'Ulanthis', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A distinct, archaic dialect spoken in the southernmost reaches of the East.' });
    this._register({ id: 'uloushinn', name: 'Uloushinn', family: 'faerunian_creole', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'An ancient dialect connecting Bedine Midani and Zakharan roots.' });
    this._register({ id: 'uluik', name: 'Uluik', family: 'boreal_steppe', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Language of the sea-hunters in the Great Glacier.' });
    this._register({ id: 'ulutiun', name: 'Ulutiun', family: 'boreal_steppe', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken by the Arctic people of the Great Glacier.' });
    this._register({ id: 'untheric', name: 'Untheric', family: 'human_faerunian', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Ancient and modern tongue of Unther.' });
    this._register({ id: 'uthgardt', name: 'Uthgardt', family: 'central_faerunian', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken by the Uthgardt barbarian tribes; no written form.' });
    this._register({ id: 'waelan', name: 'Waelan', family: 'human_faerunian', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The language of the Ffolk in the Moonshae Isles.' });

    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS — ZAKHARAN HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'akotan', name: 'Akotan', family: 'zakharan_tribal', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A dialect of the Great Sea coast, often associated with the corsairs and slave-traders.' });
    this._register({ id: 'astok', name: 'Astok', family: 'human_faerunian', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A minor human dialect from the Land of Fate.' });
    this._register({ id: 'midani_high', name: 'High Midani', family: 'midani_dialects', script: 'midani', rarity: 'rare', settings: ['forgotten_realms', 'al_qadim'], notes: 'The formal, poetic tongue used by the Caliphs and the enlightened of Zakhara.' });
    this._register({ id: 'midani_common', name: 'Midani', family: 'midani_dialects', script: 'midani', rarity: 'common', settings: ['forgotten_realms', 'al_qadim'], notes: 'The trade tongue of the Land of Fate; widely spoken from Huzuz to the Pearl Cities.' });
    this._register({ id: 'midani_low', name: 'Low Midani', family: 'midani_dialects', script: 'midani', rarity: 'common', settings: ['forgotten_realms', 'al_qadim'], notes: 'A blunt, practical dialect of Midani used by sailors, laborers, and the Hill Tribes of Zakhara.' });
    this._register({ id: 'shang_chou', name: 'Shang-Chou', family: 'zakharan_creole', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms', 'al_qadim'], notes: 'A trade pidgin from Kara-Tur used by sailors and merchants in Zakharan ports.' });
    this._register({ id: 'thieves_cant_midani', name: "Thieves' Cant (Midani)", family: 'zakharan_creole', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms', 'al_qadim'], notes: 'A choppy, coded lingo used by Zakharan rogues; varies by city (e.g., Qudra vs. Huzuz).' });

    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS — KARA-TUR HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'alan', name: 'Alan', family: 'human_kara_tur', script: 'shou', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken by the nomadic tribes of the Ama Basin in Kara-Tur.' });
    this._register({ id: 'kao_te_shou', name: 'Kao te Shou', family: 'human_kara_tur', script: 'shou', rarity: 'common', settings: ['forgotten_realms'], notes: 'The "High Shou" language of the Shou Lung Empire.' });
    this._register({ id: 'koryoan', name: 'Koryoan', family: 'human_kara_tur', script: 'shou', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the nation of Koryo (Han).' });
    this._register({ id: 'kozaku', name: 'Kozakuran', family: 'human_kara_tur', script: 'kozaku_script', rarity: 'common', settings: ['forgotten_realms'], notes: 'Language of Kozakura; related to Shou but distinct.' });
    this._register({ id: 'kozuran', name: 'Kozakuran', family: 'human_kara_tur', script: 'shou', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The language of the island nation of Kozakura.' });
    this._register({ id: 'kuong', name: 'Kuong', family: 'human_kara_tur', script: 'shou', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A minority language spoken in the southern jungles of Kara-Tur.' });
    this._register({ id: 'laothan', name: 'Laothan', family: 'human_kara_tur', script: 'shou', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The tongue of the nation of Laotian (Seng).' });
    this._register({ id: 'shou', name: 'Shou', family: 'human_kara_tur', script: 'shou', rarity: 'common', settings: ['forgotten_realms'], notes: 'Primary trade language of Shou Lung; uses logographic script.' });
    this._register({ id: 'tabotan', name: 'Tabotan', family: 'human_kara_tur', script: 'shou', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The mountain language of the Tabot region.' });
    this._register({ id: 'tu_lung', name: 'T\'u Lung', family: 'human_kara_tur', script: 'shou', rarity: 'common', settings: ['forgotten_realms'], notes: 'The language of the T\'u Lung Empire; a major dialect of Shou.' });
    this._register({ id: 'wa_an', name: 'Wa-an', family: 'human_kara_tur', script: 'shou', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The language of the nation of Wa in Kara-Tur.' });

    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS — IMASKARI HUMAN LANGUAGES
    // ───────────────────────────────────────────────
    
    this._register({ id: 'ancient_imask', name: 'Ancient Imask', family: 'human_imaskari', script: 'imaskari', rarity: 'extinct', settings: ['forgotten_realms'], notes: 'The precursor to modern Roushoum and the Hordeland dialects.' });
    this._register({ id: 'roushoum', name: 'Roushoum', family: 'human_imaskari', script: 'imaskari', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The archaic language of Deep Imaskar.' });
    this._register({ id: 'commani', name: 'Commani', family: 'northern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Western Hordelands tongue with round vowels and rolled R sounds.' });
    this._register({ id: 'khassidi', name: 'Khassidi', family: 'northern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the Khassidi tribe, intelligible with Commani and Naican.' });
    this._register({ id: 'naican', name: 'Naican', family: 'northern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken across the Western and Southern Hordelands.' });
    this._register({ id: 'raumvira', name: 'Raumvira', family: 'northern_imaskari', script: 'dethek', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Language of the Lake of Mists; uniquely uses the Dwarven Dethek script.' });
    this._register({ id: 'oigur', name: 'Oigur', family: 'southern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Central Hordelands tongue of the Oigur tribe; the canon equivalent to the Uighur people.' });
    this._register({ id: 'quirish', name: 'Quirish', family: 'southern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Southern Hordelands language closely related to Tuigan and Oigur.' });
    this._register({ id: 'gurri', name: 'Gurri', family: 'imaskari_creole', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A creole of Roushoum and Thorass spoken by the Gur nomads of the Western Heartlands.' });
    this._register({ id: 'chuchian', name: 'Chuchian', family: 'eastern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Language of the Fankiang, Kashghun, and Tsu-tsu tribes.' });
    this._register({ id: 'zamogedi', name: 'Zamogedi', family: 'eastern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken by the Zamoged people of the eastern Hordelands.' });
    this._register({ id: 'chuchian', name: 'Chuchian', family: 'eastern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Extremely precise language of the Plain of Horses; vagueness is a social insult.' });
    this._register({ id: 'wu_haltai', name: 'Wu-Haltai', family: 'amaese_languages', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Ama Basin tongue distantly related to the language of Ogre Magi.' });
    this._register({ id: 'zamogedi', name: 'Zamogedi', family: 'eastern_imaskari', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Nasal, vowel-heavy language spoken by the Zamoged people of the eastern steppes.' });
    this._register({ id: 'issacortae', name: 'Issacortae', family: 'amaese_languages', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Tribal language of the Ama Basin nomads.' });
    this._register({ id: 'pazruki', name: 'Pazruki', family: 'amaese_languages', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Language of the Pazruki nation in the Koryaz Mountains.' });
    
    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS — MAZTICA HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'azuposi', name: 'Azuposi', family: 'maztican_regional', script: 'azuposi_glyphs', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken by the "Cliff Dwellers" of northern Maztica.' });
    this._register({ id: 'huacli', name: 'Huacli', family: 'maztican_regional', script: 'maztica_glyphs', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A distinct language related to Nexalan, spoken in the Huacli city-states.' });
    this._register({ id: 'kultakan', name: 'Kultakan', family: 'maztican_regional', script: 'maztica_glyphs', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in the warrior-state of Kultaka; partially intelligible with Nexalan.' });
    this._register({ id: 'nexalan', name: 'Nexalan', family: 'maztican_high', script: 'nexalan_script', rarity: 'common', settings: ['forgotten_realms'], notes: 'Primary language of the Nexalan Empire.' });
    this._register({ id: 'payit', name: 'Payit', family: 'maztican_regional', script: 'maztica_glyphs', rarity: 'common', settings: ['forgotten_realms'], notes: 'The language of the peaceful Payit people; ancestral to Tabaxi.' });
    this._register({ id: 'amnian_nexalan', name: 'Amnian-Nexalan', family: 'maztican_creole', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'A colonial trade creole spoken in Helmsport and the Uthangot Coast, blending Amnian (Common) with Nexalan.' });

    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS — KATASHAKAN HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'ancient_tabaxi', name: 'Ancient Tabaxi', family: 'human_katashakan', script: 'spoken_only', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'The original root-tongue of the Tabaxi tribes before their migration to Chult.' });  
    this._register({ id: 'thinguth', name: 'Thinguth', family: 'human_katashakan', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Language of the Thinguth tribe; one of the three great human migrations from Katashaka.' });
    this._register({ id: 'maru_patois', name: 'Maru-Patois', family: 'human_katashakan', script: 'spoken_only', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'The militant dialect spoken by the Anaconda mercenary company and the Amazon marines.' });
    this._register({ id: 'taerloonian', name: 'Taerloonian', family: 'human_katashakan', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A sophisticated dialect from the port city of Taerloon, used in early arcane tutoring.' });
    
    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS — CHULT HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'akalan', name: 'Akalan', family: 'human_chult', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'A minor regional dialect spoken in the easternmost reaches of the Chultan peninsula.' });
    this._register({ id: 'eshowan', name: 'Eshowan', family: 'human_chult', script: 'spoken_only', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'The nearly extinct language of the Eshowe tribe, destroyed by the shadows of the past.' });
    this._register({ id: 'kouroo', name: 'Kouroo', family: 'chultan_creole', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'A widely understood regional variant of Chultan used by merchants along the coast.' });
    this._register({ id: 'nxala', name: 'Nxala', family: 'human_chult', script: 'thorass', rarity: 'rare', settings: ['forgotten_realms'], notes: 'A minor human dialect from the southern peninsula near Chult.' });
    this._register({ id: 'nyanzarun', name: 'Nyanzarun', family: 'chultan_creole', script: 'thorass', rarity: 'common', settings: ['forgotten_realms'], notes: 'The street-slang of Port Nyanzaru, blending Chultan grammar with Amnian (Common) trade words.' });
    this._register({ id: 'samman', name: 'Samman', family: 'human_chult', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The ancient language of the Samman tribe of central Chult.' });
    this._register({ id: 'tabaxi_human', name: 'Tabaxi (Human)', family: 'human_chult', script: 'thorass', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Ancient language of the people of Chult (pre-dating the Tabaxi race name).' });
    this._register({ id: 'tashalan', name: 'Tashalan', family: 'human_chult', script: 'dethek', rarity: 'uncommon', settings: ['forgotten_realms'], notes: 'Spoken in Tashluta and the Black Jungles.' });
    
    // ───────────────────────────────────────────────
    //  FORGOTTEN REALMS - GHOSTWALK LANGUAGES - HOMEBREW DECISION TO PLACE IT THERE...
    // ───────────────────────────────────────────────

    this._register({ id: 'bazarese', name: 'Bazarese', family: 'manifest_human', script: 'thorass', rarity: 'common', settings: ['ghostwalk'], notes: 'The primary trade tongue of the city of Manifest; a blend of several regional dialects.' });
    this._register({ id: 'ghost_cant', name: 'Ghost Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['ghostwalk'], notes: 'A specialized jargon used by ghosts to discuss the "True Death" and the "Veil" without being overheard by the living.' });
    this._register({ id: 'manifest_common', name: 'Common (Manifest)', family: 'polyglot', script: 'thorass', rarity: 'common', settings: ['ghostwalk'], notes: 'The standard tongue used for administration and law within the city walls.' });
    this._register({ id: 'spirit_tongue', name: 'Spirit Tongue', family: 'extraplanar', script: 'celestial', rarity: 'rare', settings: ['ghostwalk'], notes: 'The language of the calling; used by those who guide souls into the Veil.' });
    this._register({ id: 'thurian', name: 'Thurian', family: 'manifest_human', script: 'thorass', rarity: 'uncommon', settings: ['ghostwalk'], notes: 'The language of the northern human tribes that historically settled near the Veil.' });
    this._register({ id: 'untheric_ghost', name: 'Old Untheric (Manifest)', family: 'manifest_human', script: 'dethek', rarity: 'rare', settings: ['ghostwalk'], notes: 'An archaic dialect preserved by the oldest ghosts in the city.' });
    
    this._register({ id: 'dwarf_manifest', name: 'Manifest Dwarven', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['ghostwalk'], notes: 'Spoken by the dwarves who maintain the massive tombs and vaults of Manifest.' });
    this._register({ id: 'elf_manifest', name: 'Manifest Elven', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['ghostwalk'], notes: 'Used by the elves of the Spirit Wood; has a sibilant, ghostly quality.' });
    this._register({ id: 'gnoll_manifest', name: 'Manifest Gnoll', family: 'monstrous_canine', script: 'thorass', rarity: 'uncommon', settings: ['ghostwalk'], notes: 'The harsh tongue of the gnoll packs that roam the Spirit Wood.' });
    this._register({ id: 'halfling_manifest', name: 'Manifest Halfling', family: 'halfling', script: 'thorass', rarity: 'common', settings: ['ghostwalk'], notes: 'Used by the halfling "grave-diggers" and merchant families of the city.' });
    this._register({ id: 'yuan_ti_manifest', name: 'Serpentes (Manifest)', family: 'serpentine', script: 'iokharic', rarity: 'rare', settings: ['ghostwalk'], notes: 'The sibilant tongue of the yuan-ti hiding in the ruined cities near Manifest.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_baldurian', name: 'Lower City Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The slang of the Guild in Baldur\'s Gate; heavy on maritime and "Upper City" euphemisms.' });
    this._register({ id: 'necro_code', name: 'Necromancer\'s Cipher', family: 'secret_arcane', script: 'infernal', rarity: 'rare', settings: ['ghostwalk'], notes: 'A coded language used by practitioners of the "Black Arts" to share notes on soul-binding.' });
    this._register({ id: 'cant_shadow_thief', name: 'Shadow Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Used by the Shadow Thieves of Amn; focuses on mercantile infiltration and "coin-speak".' });
    this._register({ id: 'cant_tel_tekiira', name: 'Tel-tekiira', family: 'secret_guild', script: 'espruar', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'The "Star-walkers" secret code used by the Night Elves of the Underdark.' });
    this._register({ id: 'cant_vault_thief', name: 'Vault Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['ghostwalk'], notes: 'The specialized cant used by tomb-robbers and vault-breakers in Manifest.' });
    this._register({ id: 'cant_waterdhavian', name: 'Deepwatch Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'The jargon of the Xanathar Guild and the many gangs of Skullport.' });
    this._register({ id: 'cant_westgate', name: 'Nightmask Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['forgotten_realms'], notes: 'Used by the Night Masks of Westgate; includes specific terms for nocturnal operations.' });
    this._register({ id: 'warden_signal_ghost', name: 'Grave-Warden Signal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['ghostwalk'], notes: 'A non-verbal code used by the city watch to track spectral movements at night.' });
    this._register({ id: 'druidic_moonshae', name: 'Moonshae Druidic', family: 'secret_circle', script: 'druidic_ogham', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'The ancient tongue of the Great Druid of the Isles; heavy Fey influence.' });
    this._register({ id: 'druidic_gulthandor', name: 'Gulthandor Druidic', family: 'secret_circle', script: 'druidic_ogham', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'The forest-speak of the Cedarspells in the Chondalwood.' });
    this._register({ id: 'druidic_tall_trees', name: 'High Forest Druidic', family: 'secret_circle', script: 'druidic_ogham', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'Spoken by the Tall Trees Circle; incorporates many Elvish loanwords.' });
    this._register({ id: 'druidic_hylar', name: 'Winter-Circle Druidic', family: 'secret_circle', script: 'druidic_ogham', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'A harsh, survivalist dialect used by druids of the Great Glacier.' });
    this._register({ id: 'druidic_chult', name: 'Jungle-Circle Druidic', family: 'secret_circle', script: 'druidic_ogham', rarity: 'very_rare', settings: ['forgotten_realms'], notes: 'The sibilant, dense tongue of the Chultan emerald circles.' });
    this._register({ id: 'druidic_spirit_wood', name: 'Spirit-Wood Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['ghostwalk'], notes: 'A druidic dialect focused on the preservation of the veil and the balance between life and death.' });

    // ───────────────────────────────────────────────
    //  GREYHAWK — BAKLUNISH HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'ancient_baklunish', name: 'Ancient Baklunish', family: 'human_baklunish', script: 'baklunish', rarity: 'uncommon', settings: ['greyhawk'], notes: 'The precursor to Common; used for religious and legal texts in the west.' });
    this._register({ id: 'baklunish', name: 'Baklunish', family: 'human_baklunish', script: 'baklunish', rarity: 'common', settings: ['greyhawk'], notes: 'Standard modern tongue of nations west of the Yatil Mountains (Zeif, Ekbir, etc.).' });
    this._register({ id: 'ordai', name: 'Ordai', family: 'human_baklunish', script: 'baklunish', rarity: 'uncommon', settings: ['greyhawk'], notes: 'The dialect of the Wolf and Tiger Nomads; close to Paynim Baklunish.' });
    this._register({ id: 'ulagha', name: 'Ulagha', family: 'human_baklunish', script: 'baklunish', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A debased, guttural version of Baklunish spoken in the nation of Ull.' });

    // ───────────────────────────────────────────────
    //  GREYHAWK — FLAN HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'flan', name: 'Flan', family: 'human_flan', script: 'flan_runes', rarity: 'uncommon', settings: ['greyhawk'], notes: 'The oldest surviving human tongue of Oerth; spoken in Tenh and Geoff.' });
      
      // ───────────────────────────────────────────────
    //  GREYHAWK — HEPMONI HUMAN LANGUAGES
    // ───────────────────────────────────────────────
    
    this._register({ id: 'ralat', name: 'Ralat', family: 'human_hepmoni', script: 'spoken_only', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A Hepmonaland trade tongue derived from Touv, Olman, and Rasol.' });

    // ───────────────────────────────────────────────
    //  GREYHAWK — OERIDIAN HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'ferral', name: 'Ferral', family: 'human_oeridian', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'A secret Oeridian military cant used by the Iron League.' });
    this._register({ id: 'keolandish', name: 'Keolandish', family: 'human_oeridian', script: 'common', rarity: 'uncommon', settings: ['greyhawk'], notes: 'Also known as Keoish; an Old Oeridian dialect spoken in the Sheldomar Valley.' });
    this._register({ id: 'nyrondese', name: 'Nyrondese', family: 'human_oeridian', script: 'common', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A Common dialect heavily influenced by High Oeridian; spoken in Nyrond.' });
    this._register({ id: 'oeridian', name: 'Old Oeridian', family: 'human_oeridian', script: 'common', rarity: 'uncommon', settings: ['greyhawk'], notes: 'The formal academic and legal language of the former Great Kingdom.' });
    this._register({ id: 'velondi', name: 'Velondi', family: 'human_oeridian', script: 'spoken_only', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A tribal Oeridian tongue spoken by the peasantry of Furyondy and Veluna.' });

  // ───────────────────────────────────────────────
    //  GREYHAWK — OLMAN HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'olman', name: 'Olman', family: 'human_olman', script: 'olman_pictographs', rarity: 'uncommon', settings: ['greyhawk'], notes: 'The language of the Amedio and Hepmonaland jungles; uses complex pictographs.' });

  // ───────────────────────────────────────────────
    //  GREYHAWK — RHENNEE HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'rhopan', name: 'Rhopan', family: 'human_rhennee', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'The secret cant of the Rhennee bargefolk; likely non-Oerthly in origin.' });
    
    // ───────────────────────────────────────────────
    //  GREYHAWK — SUEL HUMAN LANGUAGES
    // ───────────────────────────────────────────────
    
    this._register({ id: 'amedi', name: 'Amedi', family: 'human_suel', script: 'suloise', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A corrupt form of Suloise spoken by Suel-descended tribes in the Amedio Jungle.' });
    this._register({ id: 'cold_tongue', name: 'Cold Tongue', family: 'human_suel', script: 'suloise', rarity: 'uncommon', settings: ['greyhawk'], notes: 'Also known as Fruz; a Suel-Flan hybrid spoken by northern barbarians.' });
    this._register({ id: 'lendorian', name: 'Lendorian', family: 'human_suel', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'A nearly extinct Suel dialect from the Lendore Isles; rich in maritime terms.' });
    this._register({ id: 'rasol', name: 'Rasol', family: 'human_suel', script: 'suloise_runes', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A Suel-derived language with many Olman loanwords for jungle life.' });
    this._register({ id: 'suloise', name: 'Suloise', family: 'human_suel', script: 'suloise', rarity: 'rare', settings: ['greyhawk'], notes: 'The near-dead language of the Suel Imperium; used by wizards and the Scarlet Brotherhood.' });

    // ───────────────────────────────────────────────
    //  GREYHAWK — TOUV HUMAN LANGUAGES
    // ───────────────────────────────────────────────
    
    this._register({ id: 'touv', name: 'Touv', family: 'human_touv', script: 'touv_phonetic', rarity: 'uncommon', settings: ['greyhawk'], notes: 'A polyglot tongue from Hepmonaland; has a unique phonetic alphabet.' });
    this._register({ id: 'yeku', name: 'Yeku', family: 'human_touv', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'A specific Hepmonaland dialect used for navigating the dense rainforests.' });

    // ───────────────────────────────────────────────
    //  GREYHAWK — NON-HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'derrosh', name: 'Derrosh', family: 'dwarven', script: 'dwarvish', rarity: 'rare', settings: ['greyhawk'], notes: 'A mix of Suel and Dwarven roots used by the Derro.' });
    this._register({ id: 'lendorian_elvish', name: 'Lendorian Elvish', family: 'elvish', script: 'rellanic', rarity: 'rare', settings: ['greyhawk'], notes: 'A divinely granted tongue spoken by the elves of the Spindrift Isles.' });
    this._register({ id: 'olve', name: 'Elvish', family: 'elvish', script: 'rellanic', rarity: 'common', settings: ['greyhawk'], notes: 'The musical tongue of the elves; remains remarkably consistent across Oerth.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_greyhawk', name: 'Greyhawk Argot', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'The sophisticated slang of the Free City\'s Thieves\' Guild; utilizes "reversed" Oeridian words.' });
    this._register({ id: 'cant_dyvers', name: 'The Dyvers Hook', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'The river-pirate and dock-thief jargon used along the Nyr Dyv.' });
    this._register({ id: 'cant_iuz', name: 'Old One\'s Whisper', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['greyhawk'], notes: 'A terrifying blend of Cant and Abyssal used by spies in the Empire of Iuz.' });
    this._register({ id: 'cant_scarlet', name: 'Crimson Code', family: 'secret_guild', script: 'suloise', rarity: 'very_rare', settings: ['greyhawk'], notes: 'A highly structured secret tongue used by Scarlet Brotherhood infiltrators.' });
    this._register({ id: 'druidic_old_faith', name: 'Old Faith Druidic', family: 'secret_circle', script: 'flan_runes', rarity: 'very_rare', settings: ['greyhawk'], notes: 'The standard secret tongue of the Hierophants of the Old Faith.' });
    this._register({ id: 'druidic_vesve', name: 'Vesve-Circle Druidic', family: 'secret_circle', script: 'flan_runes', rarity: 'very_rare', settings: ['greyhawk'], notes: 'Used by the defenders of the Vesve Forest against the forces of Iuz.' });
    this._register({ id: 'druidic_sheldomar', name: 'Sheldomar Druidic', family: 'secret_circle', script: 'flan_runes', rarity: 'very_rare', settings: ['greyhawk'], notes: 'A dialect used in the Valley of the Sheldomar; influenced by Keolandish.' });


    // ──────────────────────────────────────────────
    // MULTIVERSE   (family: 'multiverse')
    // ──────────────────────────────────────────────
    //  MYSTARA     (family: 'mystara')
    // ──────────────────────────────────────────────
    //    MYSTARAN ANCESTRAL (family: 'mystaran_ancestral')
    // ───────────────────────────────────────────────
    //      ABOREAL MACRO (family: 'aboreal_macro')
    // ───────────────────────────────────────────────
    //        PHANA ROOT (family: 'phana_root')
    // ───────────────────────────────────────────────
	            this._register({ id: 'archaic_phana', name: 'Archaic Phana (High Phana)', family: 'phana_root', script: 'spoken_only', rarity: 'ancient', settings: ['hollow_world', 'isle_of_dread'], notes: 'The complex, melodic progenitor tongue of the Phanaton; utilized by Elder-Councils and Hollow World tribes.' });        
	            this._register({ id: 'phana_common', name: 'Phana (Phanaton)', family: 'phana_root', script: 'spoken_only', rarity: 'uncommon', settings: ['isle_of_dread', 'mystara'], notes: 'A rapid-fire language of whistles and chattering; carries well through dense jungle canopies.' });
    // ───────────────────────────────────────────────
    //        UEE BRANCH (family: 'uee_branch')
    // ───────────────────────────────────────────────
	            this._register({ id: 'uee_tongue', name: 'Uee', family: 'uee_branch', script: 'spoken_only', rarity: 'rare', settings: ['savage_coast'], notes: 'A chirping, melodic language spoken by the small monkey-folk of the west; includes a complex tail-signal layer.' });
    // ───────────────────────────────────────────────
    //      ANOMALY MACRO (family: 'mystaran_anomaly_macro')
    // ───────────────────────────────────────────────
    //        ABERRATION ALIEN SUB (family: 'mystaran_aberration_alien_sub')
    // ───────────────────────────────────────────────
              this._register({ id: 'mystaran_beholder', name: 'Mystaran Beholder', family: 'mystaran_aberration_alien_sub', script: 'visual_only', rarity: 'very_rare', settings: ['mystara', 'planar'], notes: 'A visual-frequency language utilizing eye-movement and iris-patterns; requires multiple eyes to "speak" fluently.' });
              this._register({ id: 'mystaran_cloaker_infrasound', name: 'Mystaran Cloaker (Moan-Cant)', family: 'mystaran_aberration_alien_sub', script: 'spoken_only', rarity: 'rare', settings: ['mystara', 'underdark'], notes: 'A language composed of low-frequency moans that can cause physical nausea in listeners.' });
              this._register({ id: 'mystaran_decapus_click', name: 'Mystaran Decapus', family: 'mystaran_aberration_alien_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['isle_of_dread'], notes: 'A series of wet, snapping clicks and suction-noises used for hunting coordination.' });
              this._register({ id: 'mystaran_neh_thalggu_void_whisper', name: 'Mystaran Neh-thalggu (Brain-Speech)', family: 'mystaran_aberration_alien_sub', script: 'psychic_imprint', rarity: 'ancient', settings: ['mystara', 'savage_coast'], notes: 'An alien, layered language that sounds like multiple overlapping whispers; used by the Brain Collectors.' });
    // ───────────────────────────────────────────────
    //        CONSTRUCT ELEMENTAL SUB (family: 'mystaran_construct_elemental_sub')
    // ───────────────────────────────────────────────
	            this._register({ id: 'mystaran_gargoyle_grind', name: 'Mystaran Gargoyle (Grind-Speech)', family: 'mystaran_construct_elemental_sub', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'A percussive language of lithic friction; sounds like a landslide or grinding gears.' });
    // ───────────────────────────────────────────────
    //      AQUATIC KIN MACRO (family: 'aquatic_kin_macro')
    // ───────────────────────────────────────────────
    //        AQUATIC ABERRATION SUB (family: 'mystaran_aquatic_aberration_sub')
    // ───────────────────────────────────────────────
              this._register({ id: 'aboleth_telepathic_slime', name: 'Aboleth (Deep Speech)', family: 'mystaran_aquatic_aberration_sub', script: 'psychic_imprint', rarity: 'ancient', settings: ['sea_of_dread', 'hollow_world'], notes: 'A terrifyingly old language that transmits memories directly into the target\'s mind via mucus-contact or telepathy.' });
              this._register({ id: 'chuul_mandibular', name: 'Chuul', family: 'mystaran_aquatic_aberration_sub', script: 'spoken_only', rarity: 'rare', settings: ['sea_of_dread'], notes: 'A rhythmic grinding of chitinous plates; used to convey simple, predatory logic.' });
    // ───────────────────────────────────────────────
    //        ICHTHYAN ROOT (family: 'ichthyan_root')
    // ───────────────────────────────────────────────
	            this._register({ id: 'kna_ichthyan', name: 'Kna', family: 'ichthyan_root', script: 'spoken_only', rarity: 'uncommon', settings: ['sea_of_dread', 'mystara'], notes: 'The indigenous language of the Kna; a melodic, bubbling tongue related to the "speech" of fish.' });
	            this._register({ id: 'sea_giant_hrok', name: 'Hrok (Sea Giant)', family: 'ichthyan_root', script: 'dethek_crude', rarity: 'very_rare', settings: ['sea_of_dread', 'mystara'], notes: 'A thunderous, low-frequency tongue; sounds like the grinding of tectonic plates underwater.' });
    // ───────────────────────────────────────────────
    //          MERFOLK SUB   (family: 'merfolk_sub')
    // ───────────────────────────────────────────────
	              this._register({ id: 'merrow', name: 'Merrow (Merfolk Common)', family: 'merfolk_sub', script: 'selvaran', rarity: 'common', settings: ['mystara'], notes: 'The foundational singing language of the Mer-tribes; used by nomads and sea-settlers alike.' });
    // ───────────────────────────────────────────────
    //          MERROW IMPERIAL BRANCH   (family: 'merrow_imperial_branch')
    // ───────────────────────────────────────────────
		this._register({ id: 'mermish_archaic', name: 'Mermish (Archaic)', family: 'merrow_imperial_branch', script: 'selvaran', rarity: 'ancient', settings: ['mystara', 'hollow_world'], notes: 'The liturgical high-tongue of the ancient Mer-kingdoms; preserved primarily in the Hollow World and deep-trench ruins.' });            
		this._register({ id: 'twaelar', name: 'Twaelar (Imperial Merrow)', family: 'merrow_imperial_branch', script: 'selvaran', rarity: 'uncommon', settings: ['mystara', 'thanegioth'], notes: 'The formal, legalistic tongue of the Twaelar Empire; phonetically sharper than common Merfolk singing.' });
    // ______________________________________________
    //      SHARK KIN SUB   (family: 'shark_kin_sub')
    // ______________________________________________
	    this._register({ id: 'shark_kin_tongue', name: 'Shark-kin', family: 'shark_kin_sub', script: 'spoken_only', rarity: 'common', settings: ['sea_of_dread'], notes: 'A harsh, percussive tongue used by nomadic shark-kin; includes a lateral-line vibration component.' });
    // ───────────────────────────────────────────────
    //        IXITXACHITL BRANCH   (family: 'ixitxachitl_branch')
    // ───────────────────────────────────────────────
	      this._register({ id: 'ixitxachitl_corrupted', name: 'Ixitxachitl (Darkspeak)', family: 'ixitxachitl_branch', script: 'spoken_only', rarity: 'rare', settings: ['sea_of_dread'], notes: 'A jagged, discordant tongue of malice; contains blasphemous phonetics that agitate marine life.' });
	      this._register({ id: 'ixitxan_high', name: 'Ixitxan (High Devilfish)', family: 'ixitxachitl_branch', script: 'selvaran', rarity: 'ancient', settings: ['hollow_world'], notes: 'The original, balanced tongue of the ray-folk before their racial fall.' });
    // ______________________________________________
    //      TRITON PLANAR 
    // ______________________________________________
	    this._register({ id: 'triton_high_aquan', name: 'Triton High Aquan', family: 'triton_planar_sub', script: 'selvaran', rarity: 'rare', settings: ['mystara', 'elemental_plane_of_water'], notes: 'The sophisticated, melodic tongue of the Triton kingdoms; alien to native Mystaran fish-kin.' });
    // ______________________________________________
    //    AVIAN MACRO (family: 'avian_macro')
    // ───────────────────────────────────────────────
    //    AVIAN PROGENITOR ROOT (family: 'avian_progenitor_root')
    // ───────────────────────────────────────────────
    //      BAAK PREDATORY SUB (family: 'baak_predatory_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'baak_ra', name: 'Baak-Ra', family: 'baak_predatory_sub', script: 'spoken_only', rarity: 'rare', settings: ['hollow_world'], notes: 'The primal, booming tongue of the Baak; utilizes low-frequency vibrations to mark vast territories.' });
    // ───────────────────────────────────────────────
    //      FAENARE SUB (family: 'faenare_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'aura_high_song', name: 'Aura (High Faenare)', family: 'faenare_sub', script: 'visual_only', rarity: 'very_rare', settings: ['mystara'], notes: 'The harmonic, elemental tongue of the bird-folk; used for weather-weaving and elder-rites.' });
	    this._register({ id: 'faenare', name: 'Faenare', family: 'faenare_sub', script: 'spoken_only', rarity: 'very_rare', settings: ['savage_coast', 'mystara'], notes: 'The high-pitched, singing tongue of the small bird-folk; resembles complex birdsong.' });
    // ───────────────────────────────────────────────
    //      NAGPA BRANCH  (family: 'nagpa_branch')
    // ───────────────────────────────────────────────
	    this._register({ id: 'nagpa_cursed', name: 'Nagpa', family: 'nagpa_branch', script: 'carrion_glyphs', rarity: 'very_rare', settings: ['mystara', 'hollow_world'], notes: 'A sibilant, dry-throated language of the cursed vulture-kin; highly intellectual and alien.' });
	    this._register({ id: 'vulture_patois', name: 'Vulture Patois (Nag)', family: 'nagpa_branch', script: 'carrion_glyphs', rarity: 'rare', settings: ['mystara', 'hollow_world'], notes: 'A "broken" version of Vaynan composed of squawks, caws, and dry shrieks; unsuited for whispering or civil conversation.' });
    // ───────────────────────────────────────────────
    //      NIMMUSH ENDUK (family: 'nimmush_enduk')
    // ───────────────────────────────────────────────
	    this._register({ id: 'nimmush', name: 'Nimmush (Enduk)', family: 'avian_progenitor_root', script: 'aeshtyn_runes', rarity: 'rare', settings: ['savage_coast'], notes: 'The resonant, "clacking" tongue of the winged minotaurs; shares a script with the Ee\'aar.' });
    // ───────────────────────────────────────────────
    //    BEASTMAN MACRO (family: 'beastman_macro')
    // ───────────────────────────────────────────────
    //      ARCHAIC BEASTMAN ROOT (family: 'archaic_beastman')
    // ───────────────────────────────────────────────
	  		this._register({ id: 'garl_archaic', name: 'Garl (Archaic Beastman)', family: 'archaic_beastman_root', script: 'spoken_only', rarity: 'ancient', settings: ['hollow_world'], notes: 'The unstable, "melting" tongue of the progenitor humanoids before tribal stabilization.' });
	  		this._register({ id: 'tharian_archaic', name: 'Archaic Tharian', family: 'archaic_beastman_root', script: 'beastman_glyphs', rarity: 'ancient', settings: ['blackmoor'], notes: 'The guttural, prehistoric precursor to the Orcish common tongue; the primary "Enemy Tongue" of the Blackmoor frontier.' });
    // ───────────────────────────────────────────────
    //        GNOLLISTANI SUB (family: 'gnollistani_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'archaic_gnollistani', name: 'Archaic Gnollistani', family: 'gnollistani_sub', script: 'beastman_glyphs', rarity: 'ancient', settings: ['hollow_world', 'mystara'], notes: 'The high-imperial tongue of the fallen Gnollistanian Empire; complex and cruel.' });  
	      this._register({ id: 'gnollistani_common', name: 'Gnollistani', family: 'gnollistani_sub', script: 'spoken_only', rarity: 'common', settings: ['known_world', 'ylarurand'], notes: 'The modern nomadic tongue; characterized by barking consonants and high-pitched cackling vowels.' });
    // ───────────────────────────────────────────────
    //        GRAHK ORCISH SUB    (family: 'ghrak_orcish_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'oenkmarian', name: 'Oenkmarian (High Orcish)', family: 'ghrak_orcish_sub', script: 'oenkmarian_hieroglyphs', rarity: 'ancient', settings: ['broken_lands', 'hollow_world'], notes: 'The sophisticated, liturgical tongue of the sunken city Oenkmarr; used for deep-earth ritual and law.' });          
	      this._register({ id: 'tharian', name: 'Tharian (Orcish-Common)', family: 'ghrak_orcish_sub', script: 'beastman_glyphs', rarity: 'common', settings: ['broken_lands', 'known_world'], notes: 'The standardized military tongue of the Orcish tribes, unified by King Thar.' });
    // ───────────────────────────────────────────────
    //        MOG GOBLINOID SUB    (family: 'mog_goblinoid_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'bugburbian', name: 'Bugburbian', family: 'mog_goblinoid_sub', script: 'beastman_glyphs', rarity: 'uncommon', settings: ['broken_lands', 'known_world'], notes: 'A sibilant, whisper-heavy goblinoid dialect used by bugbears; includes a tactile gesture layer.' });      
	      this._register({ id: 'high_mog', name: 'High Mog (Hobgoblin)', family: 'mog_goblinoid_sub', script: 'beastman_glyphs', rarity: 'uncommon', settings: ['known_world'], notes: 'A disciplined, tactical language of the red-skinned goblinoid legions.' });
	      this._register({ id: 'low_mog', name: 'Low Mog (Goblin)', family: 'mog_goblinoid_sub', script: 'spoken_only', rarity: 'common', settings: ['mystara'], notes: 'A high-pitched, rapid-fire dialect of Beastman focused on numbers and traps.' });
    // ───────────────────────────────────────────────
    //        TROLLETIC SUBFAMILY    (family: 'trolletic_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'hrok_giant_common', name: 'Hrok (Giant Common)', family: 'trolletic_sub', script: 'dethek_crude', rarity: 'very_rare', settings: ['mystara', 'northern_reaches'], notes: 'A thunderous, ancient root tongue; uses a simplified, oversized version of the Dethek script.' });
	      this._register({ id: 'jotun_frost_dialect', name: 'Jotun (Frost Giant)', family: 'trolletic_sub', script: 'dethek_crude', rarity: 'rare', settings: ['mystara', 'northern_reaches'], notes: 'A biting, glottal version of Hrok; phonetically designed to cut through the roar of arctic blizzards.' });
	      this._register({ id: 'oga_ogre_patois', name: 'Oga Patois', family: 'trolletic_sub', script: 'spoken_only', rarity: 'common', settings: ['broken_lands', 'known_world'], notes: 'A slow, bass-heavy beastman derivative spoken by ogres; lacks complex abstract terms.' });
	      this._register({ id: 'trollhattanese', name: 'Trollhattanese', family: 'trolletic_sub', script: 'spoken_only', rarity: 'rare', settings: ['broken_lands', 'trollhattan'], notes: 'The resonant, vibrating tongue of the trolls; specialized for communication in damp, cavernous halls.' });
    // ───────────────────────────────────────────────
    //    DRACONIC MACRO    (family: 'mystaran_draconic_macro')
    // ───────────────────────────────────────────────
    //      HIGH DRACONIC SUB    (family: 'mystaran_draconic_high_sub')
    // ─────────────────────────────────────────────── 
	    this._register({ id: 'aragrakh', name: 'Aragrakh (Old High Wyrm)', family: 'draconic_high_sub', script: 'iokharic', rarity: 'ancient', settings: ['mystara', 'hollow_world'], notes: 'The second-oldest draconic tongue; used for monumental inscriptions and great-wyrm parley.' });        
	    this._register({ id: 'draconic_ancient', name: 'Ancient Draconic', family: 'mystaran_draconic_high_sub', script: 'iokharic', rarity: 'very_rare', settings: ['mystara', 'hollow_world'], notes: 'The prehistoric root of dragon-speech; the language of the first Dragon-Lords and the Dragon-Kings of the Hollow World.' });
	    this._register({ id: 'draconic_arcane', name: 'Arcane Draconic', family: 'mystaran_draconic_high_sub', script: 'iokharic', rarity: 'rare', settings: ['mystara', 'glantri'], notes: 'A specialized dialect used by Golden Dragons and Glantrian Dracologists for complex spell-weaving.' });
    // ───────────────────────────────────────────────
    //      DRACONIC COMMON SUB    (family: 'mystaran_draconic_common_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'draconic_common', name: 'Draconic (Common)', family: 'mystaran_draconic_high_sub', script: 'iokharic', rarity: 'rare', settings: ['mystara'], notes: 'The universal tongue of the Wyrmsteeth Mountains; sibilant and resonant, used for high-level draconic diplomacy.' });
	    this._register({ id: 'nightdragon_archaic', name: 'Nightdragon (Archaic)', family: 'draconic_common_sub', script: 'iokharic', rarity: 'very_rare', settings: ['mystara', 'hollow_world'], notes: 'A cold, sibilant dialect spoken by Nightdragons; phonetically designed to carry through the Ethereal Plane.' });       
	    this._register({ id: 'wyrmspeak', name: 'Wyrmspeak', family: 'mystaran_draconic_lesser_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'A "low" version of Draconic used by Kobolds and Lizard-kin to worship or communicate with their dragon masters.' });
    // ───────────────────────────────────────────────
    //        DRACONIC DIMINUTIVE SUB    (family: 'mystaran_draconic_diminutive_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'pocket_dragon_chirp', name: 'Pocket Dragon (Chirpy)', family: 'mystaran_draconic_diminutive_sub', script: 'spoken_only', rarity: 'rare', settings: ['mystara', 'glantri'], notes: 'A rapid-fire, high-pitched version of Wyrmspeak used by pocket dragons and pseudodragons; sounds like rhythmic chirping.' });
    // ───────────────────────────────────────────────
    //      DRACONIC FERAL SUB    (family: 'mystaran_draconic_feral_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'drake_hiss', name: 'Drake-Hiss', family: 'mystaran_draconic_feral_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara', 'savage_coast'], notes: 'The primal, non-sentient version of Draconic used by wild drakes; primarily communicates hunger, territory, and threat.' });
    // ───────────────────────────────────────────────
    //      LUNAR DRACONIC SUB    (family: 'mystaran_draconic_lunar_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'pateran_dragon', name: 'Moon-Dragon', family: 'draconic_macro', script: 'myoshiman_kanji', rarity: 'very_rare', settings: ['mystara', 'patera'], notes: 'Spoken by the dragons of the Invisible Moon; mirrors the formal linguistic structures of the Myoshiman Rakasta.' });
    // ───────────────────────────────────────────────
    //    DWARVISH MACRO    (family: 'dwarvish_macro')      
    // ───────────────────────────────────────────────
    //      DENWARF ROOT    (family: 'denwarf_root')
    // ───────────────────────────────────────────────
	    this._register({ id: 'hurgon', name: 'Hurgon', family: 'denwarf_root', script: 'dethek', rarity: 'rare', settings: ['mystara', 'northern_reaches'], notes: 'An archaic, conservative dwarven dialect spoken in the deep holds of the Northern Reaches.' });
	    this._register({ id: 'koglor', name: 'Koglor', family: 'denwarf_root', script: 'dethek', rarity: 'uncommon', settings: ['mystara', 'hollow_world'], notes: 'A "frozen" ancient dialect spoken by the Koglor clan; more archaic and guttural than Rockhome Dwarven.' });
	    this._register({ id: 'khurdan', name: 'Khurdan', family: 'denwarf_root', script: 'dethek', rarity: 'uncommon', settings: ['mystara', 'savage_coast'], notes: 'The dialect of the Khurdumian dwarves; includes loan-words from the human Robrenn and Eusdrian neighbors.' });
    // ───────────────────────────────────────────────
    //        DWARVEN ROCKHOME DIALECTS   (family: 'dwarven_rockhome_dialects')
    // ───────────────────────────────────────────────
	      this._register({ id: 'dengar', name: 'Dwarven (Rockhome)', family: 'dwarven_rockhome_dialects', script: 'dethek', rarity: 'common', settings: ['known_world', 'hollow_world'], notes: 'The standard liturgical and trade tongue for all Dwarves; stagnant by design of the Immortal Kagyar.' });
	      this._register({ id: 'everast_high', name: 'Everast High Speech', family: 'dwarven_rockhome_dialects', script: 'dethek', rarity: 'uncommon', settings: ['mystara', 'rockhome'], notes: 'The formal, courtly dialect of the Everast kings; utilizes archaic grammar and complex honorifics.' });
	      this._register({ id: 'skarrad_tech', name: 'Skarrad-Tech', family: 'dwarven_rockhome_dialects', script: 'dethek', rarity: 'rare', settings: ['mystara', 'rockhome'], notes: 'A jargon-heavy dialect focused on engineering, steam-mechanics, and metallurgy; derived from Koglor roots.' });
	      this._register({ id: 'wyrwarf_vernacular', name: 'Wyrwarf Vernacular', family: 'dwarven_rockhome_dialects', script: 'dethek', rarity: 'common', settings: ['mystara', 'rockhome'], notes: 'The common, rough speech of the Wyrwarf farmers and Syrklist traders; contains more human loanwords.' });
    // ───────────────────────────────────────────────
    //          HEPHAESTIAN SUB    (family: 'hephaestian_sub')
    // ───────────────────────────────────────────────
		this._register({ id: 'hephaestian_common', name: 'Hephaestian', family: 'hephaestian_sub', script: 'milennian_alphabet', rarity: 'rare', settings: ['mystara'], notes: 'Spoken by the dwarves of the Isle of Dread; heavily influenced by the human Milennian (Greek-analog) culture.' });         
    // ───────────────────────────────────────────────
    //        MODRIGSVERG SUB   (family: 'modrigsverg_sub')
    // ───────────────────────────────────────────────      
	      this._register({ id: 'modrigsverg', name: 'Modrigsverg', family: 'modrigsverg_sub', script: 'dark_dethek', rarity: 'very_rare', settings: ['mystara'], notes: 'The "Mad Dwarf" dialect of the Northern Reaches; incorporates chaotic whispers and dark-arcane terminology.' });
    // ──────────────────────────────────────────────
    //    ELVISH MACRO    (family: 'elvish_macro')
    // ───────────────────────────────────────────────
    //      AQUARENDI SUB    (family: 'aquarendi_sub')
    // _______________________________________________
	    this._register({ id: 'aquarendi', name: 'Aquarendi', family: 'elvish', script: 'hamarfae', rarity: 'rare', settings: ['known_world'], notes: 'The melodic, water-resonant language of the Sea Elves; uses a fluid script legible underwater.' });
	    this._register({ id: 'meditor', name: 'Meditor', family: 'aquarendi_sub', script: 'phonetic_glyphs', rarity: 'uncommon', settings: ['mystara'], notes: 'The seafaring dialect of the Minrothad Guilds; incorporates many maritime trade terms.' });
    // ───────────────────────────────────────────────
    //      SPERETHIEL    (family: 'sperethiel')      
    // _______________________________________________       
	    this._register({ id: 'sperethiel_high', name: 'Sperethiel (High/Ancient)', family: 'sperethiel', script: 'espruar', rarity: 'rare', settings: ['mystara', 'hollow_world'], notes: 'The pure, un-drifted ancestral Elven tongue.' });
    // ───────────────────────────────────────────────
    //      SURFACE ELF SUB    (family: 'surface_elf_sub')      
    // _______________________________________________
	    this._register({ id: 'aeshtyn', name: 'Aeshtyn', family: 'surface_elf_sub', script: 'enduk_runes', rarity: 'rare', settings: ['mystara'], notes: 'A high-pitched elven dialect written in the runic script shared with the Enduks.' });        
	    this._register({ id: 'alfheim', name: 'Alfheim Elven', family: 'surface_elf_sub', script: 'alfheim_glyphs', rarity: 'common', settings: ['mystara'], notes: 'The standard dialect of the central Canolbarth forest; uses traditional forest runes.' });
	    this._register({ id: 'belcadiz', name: 'Belcadiz', family: 'surface_elf_sub', script: 'thyatian', rarity: 'uncommon', settings: ['mystara'], notes: 'A graceful, flamboyant dialect from Glantri; heavily influenced by human Thyatian culture.' });
	    this._register({ id: 'eusdrian_elf', name: 'Eusdrian Elven', family: 'surface_elf_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara', 'savage_coast'], notes: 'Spoken by the elves of the North; they have adopted the runic script of their human Viking neighbors.' });
	    this._register({ id: 'gentle_folk', name: 'Gentle Folk', family: 'surface_elf_sub', script: 'spoken_only', rarity: 'very_rare', settings: ['mystara', 'hollow_world'], notes: 'A primitive, pacifist elven tongue; they lack a written script and live in total harmony with nature.' });
	    this._register({ id: 'icevale', name: 'Icevale Elven', family: 'surface_elf_sub', script: 'icevale_runes', rarity: 'rare', settings: ['mystara', 'hollow_world'], notes: 'Spoken by the primitive elves of the frozen north; their script is etched into bone and ice.' });
	    this._register({ id: 'sheyallia', name: 'Sheyallia', family: 'surface_elf_sub', script: 'sylvan_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'The forest-elven dialect of the Serpent Peninsula; the primary influence on the Yavi language.' });
	    this._register({ id: 'shiye_lawr', name: 'Shiye-Lawr', family: 'surface_elf_sub', script: 'alphatian_alphabet', rarity: 'uncommon', settings: ['alphatia', 'known_world' ], notes: 'A "High Elven" dialect of the Alphatian Empire; has largely adopted the Alphatian script for governance and magic.' });
	    this._register({ id: 'vyalia', name: 'Vyalia', family: 'surface_elf_sub', script: 'vyalia_runes', rarity: 'rare', settings: ['karameikos', 'known_world', 'thyatis'], notes: 'A highly formal, ancient dialect focused on the preservation of high magic and elven history.' });
	    this._register({ id: 'wendarian', name: 'Wendarian', family: 'surface_elf_sub', script: 'vyalia_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'An ancient, secluded elven tongue from the northern forests; rejects modern Common influences.' });  
    // ───────────────────────────────────────────────
    //      SHADOW ELF SUB    (family: 'shadow_elf_sub')      
    // _______________________________________________
	  this._register({ id: 'cant_shadowelf', name: 'Stone-Tapping', family: 'shadow_elf_sub', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'A rhythmic acoustic code used by Shadow Elf infiltrators and spies.' });        
	  this._register({ id: 'schattenalfen', name: 'Schattenalfen', family: 'shadow_elf_sub', script: 'shadow_runes', rarity: 'rare', settings: ['mystara', 'hollow_world'], notes: 'The dark counterparts to the Shadow Elves; their language is harsh and militant.' });
	    this._register({ id: 'shadow_elf', name: 'Shadow Elven', family: 'shadow_elf_sub', script: 'shadow_runes', rarity: 'rare', settings: ['mystara'], notes: 'The subterranean tongue of the Shadow Elves; spoken with soft, echoing whispers.' });
	    
    // ───────────────────────────────────────────────
    //    GNOMISH MACRO    (family: 'gnomish_macro')
    // _______________________________________________
    //      HIGHFORGE SUB    (family: 'highforge_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'gnomish_highforge', name: 'Gnomish (Highforge)', family: 'highforge_sub', script: 'dethek', rarity: 'uncommon', settings: ['known_world', 'karameikos'], notes: 'The standard Gnomish tongue of the Known World; a precise, rapid-fire language of inventors.' });
	    this._register({ id: 'gnomish_rockhome', name: 'Gnomish (Rockhome)', family: 'highforge_sub', script: 'dethek', rarity: 'uncommon', settings: ['known_world', 'rockhome'], notes: 'A grit-heavy Gnomish dialect used by the Highforge ambassadors and smiths living among the Seven Clans.' });
    // ───────────────────────────────────────────────
    //      LOST VALLEY SUB    (family: 'lost_valley_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'archaic_gnomish_root', name: 'Archaic Gnomish', family: 'lost_valley_sub', script: 'dethek', rarity: 'ancient', settings: ['blackmoor', 'hollow_world'], notes: 'The progenitor tongue of the gnomish race; highly technical but lacks modern mechanical terms.' });        
	    this._register({ id: 'oostdok_gnomish', name: 'Oostdok Gnomish', family: 'lost_valley_sub', script: 'dethek', rarity: 'very_rare', settings: ['hollow_world'], notes: 'An archaic, militaristic dialect spoken by the gnomes of the Lost Valley.' });
    // ───────────────────────────────────────────────
    //      SKY GNOME SUB    (family: 'sky_gnome_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'skycommon', name: 'Skycommon', family: 'sky_gnome_sub', script: 'alphatian_alphabet', rarity: 'rare', settings: ['mystara', 'serraine'], notes: 'A polyglot trade tongue of the flying city Serraine, blending Gnomish, Alphatian, and Nagpa dialects.' });
    // ───────────────────────────────────────────────
    //    HIN MACRO    (family: 'hin_macro')
    // ───────────────────────────────────────────────
    //      AHAH ROOT    (family: 'ahah_root')
    // ───────────────────────────────────────────────
	    this._register({ id: 'anah_ancient', name: 'Anah (Progenitor Hin)', family: 'anah_root', script: 'dethek', rarity: 'ancient', settings: ['hollow_world'], notes: 'The original, melodic tongue of the Hin; lacks the "thief-cant" layers of surface dialects.' });
    // ───────────────────────────────────────────────
    //        HINSPEAK SUB    (family: 'hinspeak_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'hinspeak', name: 'Hinspeak', family: 'hinspeak_sub', script: 'hin_runes', rarity: 'common', settings: ['mystara'], notes: 'The standard language of the Five Shires.' });
	      this._register({ id: 'lalor', name: 'Lalor (Ancient Hin)', family: 'hinspeak_sub', script: 'hin_runes', rarity: 'rare', settings: ['five_shires'], notes: 'The secretive "Resistance Tongue" developed during the Orcish occupation.'  });
	      this._register({ id: 'highshire_dialect', name: 'Highshire', family: 'hinspeak_sub', script: 'thyatian', rarity: 'common', settings: ['mystara'], notes: 'A modern, loanword-heavy dialect used for trade and politics in the Five Shires.' });
    // ───────────────────────────────────────────────
    //    HUMAN MACRO    (family: 'human_macro')
    // ───────────────────────────────────────────────
    //      HUMAN CREOLES    (family: 'human_creoles')
    // ─────────────────────────────────────────────── 
	    this._register({ id: 'glantrian_common', name: 'Glantrian (Common)', family: 'human_creoles', script: 'thyatian_common', rarity: 'common', settings: ['mystara'], notes: 'A sophisticated trade-creole of Thyatian, Alphatian, and Traladaran; spoken with a distinctive "Highland" lilt.' });
	    this._register({ id: 'milos_patois', name: 'Milos Patois', family: 'human_creoles', script: 'spoken_only', rarity: 'rare', settings: ['mystara', 'karameikos'], notes: 'A "Servant\'s Creole" blending High Taymoran vocabulary with Archaic Neathar grammar; used by the ancient thrall-caste.' });
    // ───────────────────────────────────────────────
    //        BLACKMOOR CREOLES    (family: 'blackmoor_creoles')
    // ─────────────────────────────────────────────── 
	    this._register({ id: 'skandaharian_patois', name: 'Skandaharian Patois', family: 'blackmoor_creoles', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'A rough nautical hybrid spoken by the northern coastal raiders and Thonian merchant marines.' });
	    this._register({ id: 'west_march_pidgin', name: 'West March Pidgin', family: 'blackmoor_creoles', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'A gritty contact tongue used by mercenaries, swamp-raiders, and border-guards in the Western Marches.' });
	// ───────────────────────────────────────────────
    //        	PESHWAH SUB    (family: 'peswah_sub')
    // ─────────────────────────────────────────────── 
		this._register({ id: 'peshwah_trade_argot', name: 'Peshwah Trade Argot', family: 'peswah_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The commercial tongue of the Peshwah horse-lords; essential for the northern horse trade.' });
		this._register({ id: 'peshwah_archaic', name: 'Archaic Peshwah', family: 'peshwah_sub', script: 'spoken_only', rarity: 'ancient', settings: ['blackmoor', 'hollow_world'], notes: 'The liturgical and ancestral tongue of the horse-lords; highly tonal and focused on equine spirit-work.' });
	  
	// ───────────────────────────────────────────────
    //        NEATHAR CREOLES    (family: 'neathar_creoles')
    // ───────────────────────────────────────────────
	      this._register({ id: 'darokinian', name: 'Darokinian', family: 'neathar_creoles', script: 'thyatian', rarity: 'common', settings: ['mystara'], notes: 'A trade-heavy mix of Thyatian, Traladaran, and Sindhi.' });
	      this._register({ id: 'minrothad_patois', name: 'Minrothad Patois', family: 'neathar_creoles', script: 'thyatian_common', rarity: 'common', settings: ['mystara'], notes: 'The ultimate maritime trade tongue; blends Milennian roots with Elvish grammar.' });
	      this._register({ id: 'slag_patois', name: 'Slag Patois', family: 'neathar_creoles', script: 'thyatian', rarity: 'common', settings: ['mystara', 'savage_coast'], notes: 'The common trade tongue of the Savage Coast.' });
    // ───────────────────────────────────────────────
    //      IMMIGRANT MYSTARAN HUMAN BRANCH    (family: 'immigrant_mystaran_human_branch')
    // ───────────────────────────────────────────────
    //        EARTH TRANSPLANT SUB    (family: 'earth_transplant_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'anglaise', name: 'Anglaise', family: 'earth_transplant_sub', script: 'laterran', rarity: 'rare', settings: ['mystara'], notes: 'A language of the Fenfolk, derived from otherworldly Laterran roots (English).' });
	      this._register({ id: 'averoignian', name: 'Averoignian', family: 'earth_transplant_sub', script: 'laterran', rarity: 'rare', settings: ['mystara'], notes: 'An alien tongue (French) from the province of Averoigne in Glantri.' });
	      this._register({ id: 'ispan', name: 'Ispan', family: 'earth_transplant_sub', script: 'thyatian', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken in the Savage Coast; root for Belcadiz elven. (Spanish)' });
	      this._register({ id: 'kaelic', name: 'Kaelic', family: 'earth_transplant_sub', script: 'laterran', rarity: 'rare', settings: ['mystara'], notes: 'A Scots Gaelic-analog tongue used by the Klantyre wizards in Glantri.' });
    // ───────────────────────────────────────────────
    //        HUMAN ALIEN SUB (family: 'human_alien_sub')
    // ───────────────────────────────────────────────
		this._register({ id: 'emerondian', name: 'Emerondian', family: 'human_alien_sub', script: 'pyrithian', rarity: 'rare', settings: ['mystara'], notes: 'An extraterrestrial language from the Kingdom of Emerond; completely unrelated to Mystaran roots.' });
		this._register({ id: 'oard_binary', name: 'Oard (Binary-Drone)', family: 'human_alien_sub', script: 'binary_unified', rarity: 'very_rare', settings: ['mystara', 'aasla'], notes: 'A high-speed cybernetic language consisting of binary drones and modulated clicks; used by the Oards to coordinate their collective actions.' });
    // ───────────────────────────────────────────────
    //        ALPHATIAN HUMAN    (family: 'human_alphatian')
    // ───────────────────────────────────────────────
    //          ALPHATIAN HIGH SPEECH   (family: 'alphatian_high_speech')
    // ───────────────────────────────────────────────
		this._register({ id: 'alphatian_imperial', name: 'Alphatian (High Speech)', family: 'alphatian_high_speech', script: 'alphatian_alphabet', rarity: 'uncommon', settings: ['mystara'], notes: 'The complex, magically-resonant tongue of the Alphatian aristocracy.' });
		this._register({ id: 'flaemish', name: 'Flaemish', family: 'alphatian_high_speech', script: 'alphatian_alphabet', rarity: 'rare', settings: ['mystara'], notes: 'An archaic, fire-themed variant spoken by the Flaems of Glantri.' });
    // ───────────────────────────────────────────────
    //          ALPHATIAN VERNACULARS     (family: 'alphatian_vernaculars')
    // ───────────────────────────────────────────────
		  this._register({ id: 'cypri', name: 'Cypri', family: 'alphatian_vernaculars', script: 'alphatian_alphabet', rarity: 'common', settings: ['mystara'], notes: 'The vernacular tongue of the commoners inhabiting the Alphatian heartlands.' });
		  this._register({ id: 'ochalean', name: 'Ochalean', family: 'alphatian_vernaculars', script: 'ochalean_logograms', rarity: 'common', settings: ['mystara'], notes: 'A philosophical language that blends Alphatian syntax with local Ochalean concepts.' });
    // ───────────────────────────────────────────────
    //      NATIVE MYSTARAN HUMAN BRANCH    (family: 'native_mystaran_human_branch')
    // ───────────────────────────────────────────────
    //        NEATHER HUMAN    (family: 'human_neather')
    // ───────────────────────────────────────────────
    //          ARCHAIC NEATHAR    (family: 'archaic_neathar')
    // ───────────────────────────────────────────────
		this._register({ id: 'dunael', name: 'Dunael', family: 'archaic_neathar', script: 'ogham', rarity: 'rare', settings: ['mystara'], notes: 'Pre-alphatian Celtic-analogue tongue of the Isle of Dawn.' });                
		this._register({ id: 'makai', name: 'Makai', family: 'archaic_neathar', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'The original tongue of the Ierendi Islands.' });
		this._register({ id: 'urduk', name: 'Urduk', family: 'archaic_neathar', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'Archaic nomadic tongue of the Sind Desert and Barren Plain.' });
    // ───────────────────────────────────────────────
    //          MILIENIAN BRANCH    (family: 'milienian_branch')
    // ───────────────────────────────────────────────
    //            ANTALIAN SUB    (family: 'antalian_sub')
    // ───────────────────────────────────────────────
		  this._register({ id: 'antalian', name: 'Antalian', family: 'antalian_sub', script: 'antalian_runes', rarity: 'common', settings: ['mystara'], notes: 'The ancestral tongue of the Northern Reaches (Ostland, Vestland, Soderfjord).' });
		  this._register({ id: 'denagothian', name: 'Denagothian', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'A dark, isolated language of the Plateau of Denagoth. It is heavily influenced by the guttural sounds of neighboring orc and goblin tribes.' });
		  this._register({ id: 'freeholder', name: 'Freeholder', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'The traditional Antalian dialect of the Heldann Freeholds before the rise of the Heldannic Knights.' });
		  this._register({ id: 'ghyric', name: 'Ghyric', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Dialect of the forest tribes of Ghyr; an isolated Antalian offshoot with archaic grammar.' });
		  this._register({ id: 'icereach_antalian', name: 'Icereach Antalian', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Frontier dialect spoken in the Icereach foothills; shaped by extreme climate and isolation.' });
		  this._register({ id: 'kaarjalic', name: 'Kaarjalic', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Dialect of the Kaarjala tribes; Antalian substrate blended with unique northern and shamanic influences.' });
		  this._register({ id: 'norwoldic', name: 'Norwoldic', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Dialect spoken by the barbarian clans of Norwold; retains archaic Antalian features.' });
		  this._register({ id: 'ostlander', name: 'Ostlander', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Dialect of the Ostlander tribes; a conservative Antalian tongue with strong seafaring vocabulary.' });
		  this._register({ id: 'qeodharic', name: 'Qeodharic', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Island dialect of Qeodhar; Antalian base with Heldannic and Thyatian loanwords.' });
		  this._register({ id: 'soderfjordic', name: 'Soderfjordic', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Dialect of the Soderfjord clans; marked by loanwords from neighboring cultures and a rugged frontier lexicon.' });
		  this._register({ id: 'vestlandic', name: 'Vestlandic', family: 'antalian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Dialect of the Vestland tribes; smoother phonology and strong heroic oral tradition.' });
    // ───────────────────────────────────────────────
    //            THAYTIAN SUB    (family: 'thaytian_sub')
    // ───────────────────────────────────────────────
		  this._register({ id: 'heldannic', name: 'Heldannic', family: 'thaytian_sub', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'A Hattian dialect spoken by the Heldannic Knights.' });
		  this._register({ id: 'milennian', name: 'Milennian', family: 'thaytian_sub', script: 'milennian', rarity: 'rare', settings: ['mystara'], notes: 'Ancient Greek-analog tongue preserved in Davania and the Hollow World.' });
		  this._register({ id: 'thyatian', name: 'Thyatian', family: 'thaytian_sub', script: 'thyatian', rarity: 'common', settings: ['mystara'], notes: 'The "Common" tongue for most of the Known World.' });
    // ───────────────────────────────────────────────
    //            TRALADARAN SUB    (family: 'traladaran_sub')
    // ───────────────────────────────────────────────
		  this._register({ id: 'traldaran', name: 'Traldaran', family: 'traladaran_sub', script: 'milennian_alphabet', rarity: 'uncommon', settings: ['mystara'], notes: 'The archaic root of modern Thyatian-influenced Karameikan; maintains heavy Nithian syntactical structures.' });
    // ───────────────────────────────────────────────
    //          NITHIAN BRANCH    (family: 'nithian_branch')
    // ───────────────────────────────────────────────
		this._register({ id: 'hutaakan', name: 'Hutaakan', family: 'nithian_branch', script: 'nithian_hieroglyphs', rarity: 'very_rare', settings: ['mystara'], notes: 'The jackal-headed tutors of the ancient Traldar; a specialized Nithian dialect.' });
    // ───────────────────────────────────────────────
    //            NITHIAN CORE    (family: 'nithian_core')
    // ────────────────────────────────────────────────
		  this._register({ id: 'nithian', name: 'Nithian', family: 'nithian_core', script: 'nithian_hieroglyphs', rarity: 'rare', settings: ['mystara'], notes: 'The language of the forbidden Nithian Empire; survives in Thothia.' });
		  this._register({ id: 'thothian', name: 'Thothian', family: 'nithian_core', script: 'alphatian', rarity: 'rare', settings: ['mystara'], notes: 'A heavily modified Nithian dialect that adopted the Alphatian script for modern records.' });
    // ───────────────────────────────────────────────
    //            YLARA ALASIYAN CONTINUUM    (family: 'ylara_alasiyan')
    // ────────────────────────────────────────────────
		  this._register({ id: 'alasiyan', name: 'Alasiyan', family: 'ylara_alasiyan', script: 'alasiyan', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken by the desert peoples of Ylaruam; also called Ylari.' });
		  this._register({ id: 'ylari', name: 'Ylari', family: 'ylara_alasiyan', script: 'ylari_phonetic', rarity: 'common', settings: ['mystara'], notes: 'A descendant of the Alasiyan and Nithian tongues; primarily spoken in the Emirates of Ylaruam.' });
    // ───────────────────────────────────────────────
    //          TAYMORAN BRANCH     (family: 'taymoran_branch')
    // ────────────────────────────────────────────────
		this._register({ id: 'makai_archaic', name: 'Archaic Makai', family: 'taymoran_branch', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'The purest form of the Makai tongue, predating Thyatian influence; preserves Taymoran syntax.' });
		this._register({ id: 'taymoran', name: 'Taymoran', family: 'taymoran_branch', script: 'taymoran_glyphs', rarity: 'extinct', settings: ['mystara'], notes: 'The liturgical tongue of the Sunken Empire; utilized by the Nosferatu and in high-necrotic funerary rites.' });
    // ───────────────────────────────────────────────
    //          VARELLYIAN BRANCH     (family: 'varelyian_branch')
    // ────────────────────────────────────────────────
		this._register({ id: 'varellyian', name: 'Varellyian (Ancient)', family: 'varellyian_branch', script: 'milennian_alphabet', rarity: 'ancient', settings: ['davania', 'hollow_world'], notes: 'The archaic high-tongue of the Varellyian culture; ancestor to the Milenian dialects.' }); 
		this._register({ id: 'modern_varellyian', name: 'Modern Varellyian', family: 'varellyian_branch', script: 'milennian_alphabet', rarity: 'uncommon', settings: ['davania'], notes: 'The surviving vernacular of the Varellyian people in southern Davania.' });
    // ───────────────────────────────────────────────
    //        OLTEC HUMAN    (family: 'human_oltec')
    // ───────────────────────────────────────────────
	      this._register({ id: 'oltec', name: 'Oltec', family: 'human_oltec', script: 'oltec_glyphs', rarity: 'ancient', settings: ['mystara', 'hollow_world'], notes: 'The progenitor macro-tongue of the Oltec civilization; largely extinct in the Outer World but preserved in the Hollow World.' });
    // ───────────────────────────────────────────────
    //          ETHENGAR STEPPE    (family: 'ethengar_steppe')
    // ───────────────────────────────────────────────
		this._register({ id: 'ethengar_archaic', name: 'Archaic Ethengar', family: 'ethengar_steppe', script: 'ethengar_runes', rarity: 'ancient', settings: ['mystara', 'hollow_world'], notes: 'The runic, high-tongue of the First Khans; found on steppe-monuments and spirit-totems.' });
		this._register({ id: 'ethengarian', name: 'Ethengarian', family: 'ethengar_steppe', script: 'ethengar_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken by the nomadic horse-lords of the Ethengar Khanate.' });
		this._register({ id: 'hulean', name: 'Hulean', family: 'ethengar_steppe', script: 'hulian', rarity: 'uncommon', settings: ['mystara'], notes: 'The administrative tongue of the Master of Hule.' });
    // ───────────────────────────────────────────────
    //          OLTEC CORE    (family: 'oltec_core')
    // ────────────────────────────────────────────────
		this._register({ id: 'atruaghin_clans', name: 'Atruaghin', family: 'oltec_core', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken by the Atruaghin Clans; often utilizes sign language between tribes.' });
		this._register({ id: 'azcan', name: 'Azcan', family: 'oltec_core', script: 'oltec_glyphs', rarity: 'dead', settings: ['mystara'], notes: 'An ancient root tongue preserved primarily in the Hollow World.' });
		this._register({ id: 'jennite', name: 'Jennite', family: 'oltec_core', script: 'jenn', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken in the lands of Esterhold and Jen.' });
		this._register({ id: 'minaean', name: 'Minaean', family: 'oltec_core', script: 'milennian_alphabet', rarity: 'uncommon', settings: ['mystara'], notes: 'A hybrid of Jennite and Milenian spoken by the pirates and traders of the Minaean Coast.' });
		this._register({ id: 'sindhi', name: 'Sindhi', family: 'oltec_core', script: 'oltec_glyphs', rarity: 'uncommon', settings: ['mystara'], notes: 'The language of the Kingdom of Sind.' });
		this._register({ id: 'varellyian', name: 'Varellyian', family: 'oltec_core', script: 'oltec_glyphs', rarity: 'rare', settings: ['mystara'], notes: 'The "Classical" Oltec language of the lost Davanian Empire; used today primarily by scholars and archaeologists.' });
    // ───────────────────────────────────────────────
    //          HUMAN TANAGORO 
    // ───────────────────────────────────────────────
    //            SAVAGE COAST TANAGORO   (family: 'savage_coast_tanagoro')
    // ───────────────────────────────────────────────
		  this._register({ id: 'shura', name: 'Shura', family: 'savage_coast_tanagoro', script: 'ispan_common', rarity: 'rare', settings: ['savage_coast'], notes: 'A percussive Tanagoro dialect heavily influenced by the Red Curse environment.' });
		  this._register({ id: 'yawari', name: 'Yawari', family: 'savage_coast_tanagoro', script: 'tanagoro_glyphs', rarity: 'rare', settings: ['savage_coast'], notes: 'A tonal and melodic Tanagoro tongue of the Savage Coast; highly resistant to Ispan loanwords.' });
    // ───────────────────────────────────────────────
    //            TANAGORO CORE    (family: 'tanagoro_core')
    // ───────────────────────────────────────────────
		  this._register({ id: 'gombar', name: 'Gombar', family: 'tanagoro_core', script: 'tanagoro_glyphs', rarity: 'uncommon', settings: ['mystara'], notes: 'A mainland Davanian Tanagoro dialect; more guttural than Nuar and used heavily in jungle trade.' });
		  this._register({ id: 'nuar', name: 'Nuar', family: 'tanagoro_core', script: 'tanagoro_glyphs', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken by the peoples of the Pearl Islands.' });
		  this._register({ id: 'proto_tanagoro', name: 'Proto-Tanagoro', family: 'tanagoro_core', script: 'tanagoro_glyphs', rarity: 'ancient', settings: ['mystara', 'hollow_world'], notes: 'The ancestral root tongue of the Davanian tribes; preserved in the Hollow World.' });
		  this._register({ id: 'yavi', name: 'Yavi', family: 'tanagoro_core', script: 'tanagoro_glyphs', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken in Yavdlom; influenced by elven dialects.' });
    // ───────────────────────────────────────────────
    //      PRE-CATACLYSMIC HUMAN SUB    (family: 'pre_cataclysmic_human_sub')
    // ───────────────────────────────────────────────
    //        AFRIDHI BRANCH    (family: 'afridhi_branch')
    // ───────────────────────────────────────────────
	      this._register({ id: 'afridhi_archaic', name: 'Afridhi', family: 'afridhi_branch', script: 'spoken_only', rarity: 'ancient', settings: ['blackmoor'], notes: 'The aggressive, fire-venerating tongue of the Afridhi nomads.' });
    // ───────────────────────────────────────────────
    //        THONIAN SUB    (family: 'thonian_sub')
    // ───────────────────────────────────────────────
	      this._register({ id: 'blackmoorian', name: 'Blackmoorian', family: 'thonian_sub', script: 'thonian_alphabet', rarity: 'ancient', settings: ['blackmoor', 'mystara'], notes: 'The common speech of the Kingdom of Blackmoor; more pragmatic and tech-heavy than Thonian.' });
	      this._register({ id: 'high_thonian', name: 'High Thonian', family: 'thonian_sub', script: 'thonian_alphabet', rarity: 'very_rare', settings: ['blackmoor'], notes: 'The refined, liturgical dialect of the Thonian nobility and the Arch-Mages of Blackmoor.' });
	      this._register({ id: 'thonian', name: 'Thonian', family: 'thonian_sub', script: 'thonian_alphabet', rarity: 'ancient', settings: ['blackmoor', 'mystara'], notes: 'The imperial high-tongue of Old Thonia; the root of Blackmoorian and Lanterran.' });
    // _______________________________________________
    //          LANTERRAN SUB    (family: 'lanterran_sub')
    // ───────────────────────────────────────────────
		this._register({ id: 'lanterran', name: 'Lanterran', family: 'lanterran_sub', script: 'thonian_alphabet', rarity: 'ancient', settings: ['mystara', 'blackmoor'], notes: 'A technological descendant of Thonian; preserved in the Hollow World and hidden enclaves.' });
		this._register({ id: 'proto_lupin', name: 'Proto-Lupin', family: 'lanterran_sub', script: 'thonian_alphabet', rarity: 'ancient', settings: ['blackmoor', 'savage_coast'], notes: 'The synthetic ancestor of all Lupin tongues, derived from Lanterran for the first uplifted hounds.' });
    // ──────────────────────────────────────────────
    //        VAYNAN SUB   (family: 'vaynan_sub')
    // ──────────────────────────────────────────────
	      this._register({ id: 'high_vaynan', name: 'Vaynan High Speech', family: 'vaynan_sub', script: 'ethereal_vocal_runes', rarity: 'ancient', settings: ['hollow_world', 'blackmoor'], notes: 'The original human scholar-tongue of the Vaynans before their transformation into Nagpa.' });
    // ───────────────────────────────────────────────
    //    INSECTOID MACRO    (family: 'insectoid_macro')
    // ───────────────────────────────────────────────
    //      ARCHNIDIAN ROOT    (family: 'archnidian_root')
    // ───────────────────────────────────────────────
	    this._register({ id: 'aranea_common', name: 'Aranea Common (Arachnean)', family: 'arachnidan_root', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara', 'isle_of_dread'], notes: 'The native tongue of the Aranea; a "thinner" version of Herathian focused on hunting and silk-weaving.' });
	    this._register({ id: 'herathian', name: 'Herathian', family: 'arachnidan_root', script: 'herathian_script', rarity: 'common', settings: ['savage_coast'], notes: 'The public "diplomatic" tongue of Herath; designed to sound like a blend of Elvish and Thyatian to hide Aranean origins.' })       
	    this._register({ id: 'herathian_high', name: 'Herathian (High Aranea)', family: 'arachnidan_root', script: 'herathian_glyphs', rarity: 'rare', settings: ['savage_coast', 'herath'], notes: 'A complex language of clicks, leg-vibrations, and subtle pheromones; designed for arcane precision.' });
	    this._register({ id: 'web_cant', name: 'Web-Cant', family: 'arachnidan_root', script: 'tactile_only', rarity: 'uncommon', settings: ['mystara', 'isle_of_dread'], notes: 'A silent, tactile language used by Aranea and intelligent spiders to communicate through web-vibrations.' });
    // ───────────────────────────────────────────────
    //      HIVEBROOD MACRO    (family: 'hivebrood_macro')
    // ───────────────────────────────────────────────
	    this._register({ id: 'brood_clicks', name: 'Brood-Clicks', family: 'hivebrood_macro', script: 'spoken_only', rarity: 'very_rare', settings: ['mystara', 'savage_coast'], notes: 'Rapid-fire mandibular clicks used by the Hivebrood for echolocation and short-range tactical signals.' });        
	    this._register({ id: 'hive_pheromonal', name: 'Hive-Scent', family: 'hivebrood_macro', script: 'chemical_only', rarity: 'very_rare', settings: ['mystara', 'savage_coast'], notes: 'A non-vocal language used by Hivebrood; communicates status and tactical commands via airborne chemicals.' });
    // ───────────────────────────────────────────────
    //    INTER-SPECIES CREOLES MACRO    (family: 'inter_species_creoles_macro')
    // ───────────────────────────────────────────────
	  this._register({ id: 'glantrian_arcane_cant', name: 'Glantrian Arcane Cant', family: 'inter_species_creoles_macro', script: 'alphatian_alphabet', rarity: 'rare', settings: ['glantri'], notes: 'A technical polyglot blending Flaemish, Alphatian, and Elvish; used for precise magical formulaic discussion.' });      
	  this._register({ id: 'ghazz', name: 'Ghazz (Battle-Tongue)', family: 'inter_species_creoles_macro', script: 'dethek', rarity: 'uncommon', settings: ['mystara', 'rockhome'], notes: 'A "Frontier-Creole" optimized for insults and parley between Dwarves and Orcs.' });
	  this._register({ id: 'kol', name: 'Kol (Kobold)', family: 'inter_species_creoles_macro', script: 'draconic_glyphs', rarity: 'common', settings: ['mystara', 'broken_lands'], notes: 'The yapping tongue of the Kobolds of the Broken Lands; a frantic mix of Ghurka and "low" Draconic.' });
	  this._register({ id: 'krugel', name: 'Krugel', family: 'inter_species_creoles_macro', script: 'dethek', rarity: 'rare', settings: ['mystara', 'hollow_world'], notes: 'A sophisticated Orcish dialect with Gnomish loanwords, spoken by the Krugel tribes.' });
	  this._register({ id: 'old_cogur', name: 'Old Cogur', family: 'inter_species_creoles_macro', script: 'spoken_only', rarity: 'ancient', settings: ['blackmoor'], notes: 'A human dialect of the Blackmoor era with heavy Dwarven loanwords; used for trade between the Thonians and the Koglor dwarves.' });
    // ───────────────────────────────────────────────
    //    LUPIN MACRO    (family: 'lupin')
    // ───────────────────────────────────────────────
	  this._register({ id: 'lupin_common', name: 'Lupin (Common)', family: 'lupin', script: 'thyatian', rarity: 'common', settings: ['mystara', 'savage_coast'], notes: 'The standard trade tongue of the Lupin; a barking dialect heavily influenced by human Common.' });
	  this._register({ id: 'renardian', name: 'Renardian', family: 'lupin', script: 'thyatian', rarity: 'common', settings: ['savage_coast'], notes: 'The sophisticated, nasal tongue of the Renardie Lupins; sounds like a melodic, barking version of French.' });
	  this._register({ id: 'wolven', name: 'Wolven', family: 'lupin', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'A primitive, ancient Lupin tongue spoken by nomadic tribes; relies heavily on growls and territorial howls. Almost uninteliigible to modern, civilized, lupins.' });
    // ───────────────────────────────────────────────
    //      HAZE SUB    (family: 'haze_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'haze_lupin', name: 'Haze Lupin', family: 'lupin', script: 'spoken_only', rarity: 'rare', settings: ['savage_coast'], notes: 'A telepathic-assisted dialect used by Lupins affected by the Red Curse.' });
    // ───────────────────────────────────────────────
    //      HELDANN SUB    (family: 'heldann_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'heldann_lupin', name: 'Heldannic Lupin', family: 'lupin', script: 'antalian_runes', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken by the northern Lupin breeds; uses the runic script of the Heldannic Knights.' });
    // ───────────────────────────────────────────────
    //	  MONSTROUS MACRO    (family: 'mystaran_monstrous_macro')
    // ───────────────────────────────────────────────
    	  this._register({ id: 'mystaran_blink_dog', name: 'Mystaran Blink Dog', family: 'mystaran_monstrous_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'A mix of high-pitched barks and telepathic cues; impossible for humans to replicate perfectly.' });
      	  this._register({ id: 'mystaran_snow_ape', name: 'Mystaran Snow Ape (Visual)', family: 'mystaran_monstrous_macro', script: 'tactile_only', rarity: 'rare', settings: ['hollow_world', 'northern_reaches'], notes: 'A "half-language" using vocal grunts and physical piles of sticks or stones to mark territory.' });
      	  this._register({ id: 'mystaran_worgish', name: 'Mystaran Worgish', family: 'mystaran_monstrous_macro', script: 'spoken_only', rarity: 'uncommon', settings: ['broken_lands', 'known_world'], notes: 'A predatory, growling tongue used by Worgs; share some root-phonetics with Wolven.' });
    // ───────────────────────────────────────────────
    //    RAKASTA MACRO    (family: 'rakasta_macro')
    // ───────────────────────────────────────────────
	  this._register({ id: 'ancient_rakastan', name: 'Ancient Rakastan', family: 'rakasta_macro', script: 'rakasta_glyphs', rarity: 'ancient', settings: ['mystara', 'hollow_world'], notes: 'The progenitor tongue of all cat-folk; preserved by the Cave Rakasta in the Hollow World.' });
    // ───────────────────────────────────────────────
    //      RAKASTA    (family: 'rakasta')
    // ───────────────────────────────────────────────
	    this._register({ id: 'bellaynish', name: 'Bellaynish', family: 'rakasta', script: 'thyatian', rarity: 'common', settings: ['savage_coast'], notes: 'The courtly language of Bellayne; sounds like a mixture of feline purrs and Elizabethan English.' });
	    this._register({ id: 'fasteth', name: 'Fasteth', family: 'rakasta', script: 'phonetic_glyphs', rarity: 'uncommon', settings: ['mystara', 'davania'], notes: 'The rapid-fire, high-pitched dialect of the cheetah-folk; the fastest spoken language on Mystara.' });
	    this._register({ id: 'myoshiman', name: 'Myoshiman', family: 'rakasta', script: 'myoshiman_kanji', rarity: 'rare', settings: ['mystara', 'patera'], notes: 'The formal, complex language of the Rakasta of the Invisible Moon; mirrors feudal Japanese structures.' });
	    this._register({ id: 'pateran', name: 'Pateran', family: 'rakasta', script: 'myoshiman_kanji', rarity: 'rare', settings: ['mystara', 'patera'], notes: 'The common "street" dialect of the Invisible Moon; less formal than Myoshiman but shares the same script.' });
	    this._register({ id: 'rakasta_common', name: 'Rakasta (Common)', family: 'rakasta', script: 'thyatian', rarity: 'common', settings: ['mystara', 'savage_coast'], notes: 'A purring, sibilant tongue used by the nomadic tribes of the Known World.' });
	    this._register({ id: 'sherkasta', name: 'Sherkasta', family: 'rakasta', script: 'rakastan_glyphs', rarity: 'rare', settings: ['mystara', 'hollow_world'], notes: 'The tiger-folk dialect; heavy on low-frequency rumbles that can be felt as much as heard.' });
	    this._register({ id: 'simban', name: 'Simban', family: 'rakasta_exotic', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara', 'davania'], notes: 'The roaring, bass-heavy language of the lion-folk of Davania; relies on chest resonance.' });
	    this._register({ id: 'snow_rakasta', name: 'Pardasta', family: 'rakasta', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'The soft, hushing dialect of the snow-leopard folk of the Hyborean Ice; designed for stealth in the tundra.' });
    // ───────────────────────────────────────────────
    //    REPTILLIAN MACRO    (family: 'reptillian_macro')
    // ───────────────────────────────────────────────
    //      CHELONE SUB    (family: 'mystaran_humanoid_chelone')
    // ───────────────────────────────────────────────
	    this._register({ id: 'proto_chelone', name: 'Proto-Chelone', family: 'mystaran_humanoid_chelone', script: 'chelone_glyphs', rarity: 'ancient', settings: ['savage_coast'], notes: 'The ancestral root of all turtle-folk; characterized by slow, deep resonance.' });
	    this._register({ id: 'snapper', name: 'Snapper', family: 'mystaran_humanoid_chelone', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'The aggressive dialect spoken by the hostile subrace of Tortles.' });
	    this._register({ id: 'tortle', name: 'Tortle', family: 'mystaran_humanoid_chelone', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'The slow, deliberate tongue of the nomadic turtle-folk.' });
    // ───────────────────────────────────────────────
    //      HYBRID SUB    (family: 'mystaran_reptilian_hybrid_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'mogrethian', name: 'Mogrethian', family: 'mystaran_reptilian_hybrid_sub', script: 'oltec_glyphs', rarity: 'dead', settings: ['mystara'], notes: 'The high-culture tongue of the lost Mogreth Empire; used today only in ancient ruins and by powerful liches.' });
    // ───────────────────────────────────────────────
    //      KOPRU ANCIENT SUB    (family: 'kopru_ancient_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'abyssal_bubble_cant', name: 'Abyssal Bubble-Cant', family: 'kopru_ancient_sub', script: 'spoken_only', rarity: 'very_rare', settings: ['sea_of_dread'], notes: 'The non-psychic, low-frequency component of Kopru speech used to command mindless aquatic thralls.' });        
	    this._register({ id: 'kopru_ancient', name: 'Kopru (Ancient)', family: 'kopru_ancient_sub', script: 'psychic_imprint', rarity: 'ancient', settings: ['isle_of_dread', 'sea_of_dread', 'hollow_world'], notes: 'A terrifying prehistoric tongue; the spoken component is a wet, sibilant hiss, but the true meaning is transmitted telepathically.' });
    // ───────────────────────────────────────────────
    //      LIZARD-KIN SUB    (family: 'mystaran_lizardkin_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'cayman', name: 'Cayman', family: 'mystaran_lizardkin_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara', 'savage_coast'], notes: 'Spoken by the small, crocodile-like reptilians of the Savage Coast.' });
	    this._register({ id: 'gurrash', name: 'Gurrash', family: 'mystaran_lizardkin_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara', 'savage_coast'], notes: 'A swamp-creole of Malpheggi and primal roars; lacks a written form and focuses on hunting and dominance.' });       
	    this._register({ id: 'malpheggi_archaic', name: 'Malpheggi (Archaic)', family: 'mystaran_lizardkin_sub', script: 'shazak_glyphs', rarity: 'ancient', settings: ['hollow_world', 'known_world'], notes: 'The high-imperial tongue of the ancient lizard-kin empire; phonetically dense with vibrating sibilants.' });
	    this._register({ id: 'shazak', name: 'Shazak', family: 'lizardkin_sub', script: 'shazak_glyphs', rarity: 'uncommon', settings: ['savage_coast'], notes: 'The sophisticated, hiss-based tongue of the civilized Lizard-Kin; structurally complex.' });
	    this._register({ id: 'sisthik', name: 'Sis\'thik', family: 'mystaran_lizardkin_sub', script: 'spoken_only', rarity: 'uncommon', settings: ['mystara'], notes: 'Spoken by the desert-dwelling "scythe-jaw" lizard-folk.' });
    // ───────────────────────────────────────────────
    //      OPHIDIAN SUB    (family: 'ophidian_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'nagane_high', name: 'Nagane (High Ophidian)', family: 'ophidian_sub', script: 'serpentine_scripts', rarity: 'rare', settings: ['mystara', 'davania'], notes: 'An ancient, hypnotic tongue of the Naga; sounds like shifting sand and scales.' });
	    this._register({ id: 'ssshur_common', name: 'Ssshur (Ophidian Common)', family: 'ophidian_sub', script: 'serpentine_scripts', rarity: 'uncommon', settings: ['mystara', 'davania', 'savage_coast'], notes: 'The common trade-hiss of the serpent-folk; percussive sibilants and low-frequency rasps.' });
    // ───────────────────────────────────────────────
    //      WALLARA SUB    (family: 'wallara_sub')
    // ───────────────────────────────────────────────
	    this._register({ id: 'risil', name: 'Risil', family: 'wallara_sub', script: 'spoken_only', rarity: 'rare', settings: ['savage_coast'], notes: 'The dream-like language of the Chameleon Men; shares a distant, warped history with Aranean "silk-thought."' });
    // ───────────────────────────────────────────────
    //  MYSTARAN FUNCTIONAL SECRETS (family: 'mystaran_functional_secrets')
    // ───────────────────────────────────────────────
    //    DRUIDIC CIRCLE MACRO (family: 'mystaran_druidic_circle_macro')
    // ───────────────────────────────────────────────
	  this._register({ id: 'druidic_atruaghin', name: 'Atruaghin Druidic', family: 'mystaran_druidic_circle_macro', script: 'spoken_only', rarity: 'very_rare', settings: ['mystara'], notes: 'A purely oral/sign-based druidic code used by the Atruaghin Clans.' });
	  this._register({ id: 'druidic_known_world', name: 'Known World Druidic', family: 'mystaran_druidic_circle_macro', script: 'neathar_runes', rarity: 'very_rare', settings: ['mystara'], notes: 'The common secret language for druids across the Thyatian and Karameikan regions.' });
	  this._register({ id: 'druidic_robrenn', name: 'Robrenn Druidic', family: 'mystaran_druidic_circle_macro', script: 'druidic_ogham', rarity: 'very_rare', settings: ['mystara'], notes: 'The specific druidic tongue of the Robrenn people on the Savage Coast.' });
    // ───────────────────────────────────────────────
    //    SECRET GUILD MACRO (family: 'mystaran_secret_guild_macro')
    // ───────────────────────────────────────────────
	  this._register({ id: 'cant_darokinian', name: 'The Golden Ledger', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'A mercantile-based cant used by the many coin-clipping guilds of Darokin City.' });
	  this._register({ id: 'cant_glantrian', name: 'Alchemist\'s Jargon', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'A code used by Glantri\'s "unlicensed" magic-users to identify fellow practitioners under the Princes\' rule.' });
	  this._register({ id: 'cant_heldannic', name: 'Sacred Shadow', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'very_rare', settings: ['mystara'], notes: 'A code used by the internal secret police and dissenters within the Heldannic Territories.' });
	  this._register({ id: 'cant_hulean', name: 'The Master\'s Silence', family: 'mystaran_secret_guild_macrov', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'The fearful, sub-vocalized cant of the oppressed city-dwellers in Hule.' });
	  this._register({ id: 'cant_ierendi', name: 'Reef-Speak', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'Used by the privateers and "heroic" thieves of the Ierendi islands.' });
	  this._register({ id: 'cant_minrothad', name: 'Guild-Sign', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'A silent, complex system of hand signals used by the Minrothad sea-merchants and smugglers.' });
	  this._register({ id: 'cant_slags', name: 'Slag-Talk', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'The rough, polyglot cant used by pirates and cursed "Cinnabryl" seekers on the Savage Coast.' });
	  this._register({ id: 'cant_thyatian', name: 'Thyatian Underworld Patter', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'The standard cant of the Capital; heavily uses military metaphors and "centurion" slang.' });
	  this._register({ id: 'cant_traladaran', name: 'The Veiled Whisper', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'rare', settings: ['mystara'], notes: 'Used by the Iron Ring and ethnic Traladaran rebels in Karameikos.' });
	  this._register({ id: 'cinnabryl_thrum', name: 'Cinnabryl-Thrum', family: 'mystaran_secret_guild_macro', script: 'spoken_only', rarity: 'very_rare', settings: ['savage_coast'], notes: 'A "vibration-slang" used by those heavily afflicted by the Red Curse; utilizes the humming of Legacies to convey meaning.' });
	  this._register({ id: 'vila_thieve', name: 'Vila-Thieve', family: 'mystaran_secret_guild_macro', script: 'thieves_symbols', rarity: 'uncommon', settings: ['mystara', 'vilaverpa'], notes: 'The specific criminal cant of the Vilaverpan smugglers; heavy on maritime and "vermin" metaphors.' });
    
    
    
    
    






    
    
    // ───────────────────────────────────────────────
    //  DRAGONLANCE (KRYNN) — HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'abanasinian', name: 'Abanasinian', family: 'human_ansalon', script: 'ergot', rarity: 'common', settings: ['dragonlance'], notes: 'Native tongue of the Plainsmen and Seekers in Abanasinia.' });
    this._register({ id: 'abyssal_taladas', name: 'Taladasian Abyssal', family: 'fiendish', script: 'infernal', rarity: 'rare', settings: ['dragonlance'], notes: 'A distinct dialect of Abyssal spoken by the cults of Hiteh.' });
    this._register({ id: 'alan_aku', name: 'Alan-aku', family: 'human_taladas', script: 'unknown', rarity: 'uncommon', settings: ['dragonlance'], notes: 'A language spoken by humans in the continent of Taladas.' });
    this._register({ id: 'aurish', name: 'Aurish', family: 'human_ansalon', script: 'istarian', rarity: 'rare', settings: ['dragonlance'], notes: 'An obscure regional dialect from eastern Ansalon.' });
    this._register({ id: 'bolad', name: 'Bolad', family: 'human_taladas', script: 'unknown', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The language of the nomadic tribes in the Burning Lands.' });
    this._register({ id: 'ergot', name: 'Ergot', family: 'human_ansalon', script: 'ergot', rarity: 'common', settings: ['dragonlance'], notes: 'The foundational language of Northern Ergoth; root of many western dialects.' });
    this._register({ id: 'hand_talk', name: 'Hand Talk', family: 'human_ansalon', script: 'spoken_only', rarity: 'uncommon', settings: ['dragonlance'], notes: 'A complex sign language used by the tribes of Abanasinia.' });
    this._register({ id: 'ice_folk', name: 'Ice Folk', family: 'human_ansalon', script: 'ergot', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The language of the humans in Icewall, also used by thanoi.' });
    this._register({ id: 'istarian', name: 'Ancient Istarian', family: 'human_ansalon', script: 'istarian', rarity: 'rare', settings: ['dragonlance'], notes: 'The formal language of the lost Empire of Istar.' });
    this._register({ id: 'kalinese', name: 'Kalinese', family: 'human_ansalon', script: 'istarian', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The language of sailors and traders in the Blood Sea ports.' });
    this._register({ id: 'kharolian', name: 'Kharolian', family: 'human_ansalon', script: 'ergot', rarity: 'common', settings: ['dragonlance'], notes: 'Spoken in Tarsis, the Plains of Dust, and the Kharolis Mountains.' });
    this._register({ id: 'khurish', name: 'Khurish', family: 'human_ansalon', script: 'istarian', rarity: 'common', settings: ['dragonlance'], notes: 'The language of the desert nomads of Khur.' });
    this._register({ id: 'lemish', name: 'Lemish', family: 'human_ansalon', script: 'ergot', rarity: 'uncommon', settings: ['dragonlance'], notes: 'A dialect shared by humans and goblins in the region of Lemish.' });
    this._register({ id: 'magius', name: 'Magius', family: 'magical', script: 'magius', rarity: 'rare', settings: ['dragonlance'], notes: 'The ancient language of magic; many spells are based on Indonesian roots.' });
    this._register({ id: 'nerakese', name: 'Nerakese', family: 'human_ansalon', script: 'istarian', rarity: 'common', settings: ['dragonlance'], notes: 'The tongue of the Dragonarmies and the humans of Taman Busuk.' });
    this._register({ id: 'nordmaarian', name: 'Nordmaarian', family: 'human_ansalon', script: 'istarian', rarity: 'uncommon', settings: ['dragonlance'], notes: 'Spoken in the northern jungle nation of Nordmaar.' });
    this._register({ id: 'saifhum', name: 'Saifhum', family: 'human_ansalon', script: 'istarian', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The unique dialect of the seafaring humans of Saifhum.' });
    this._register({ id: 'solamnic', name: 'Solamnic', family: 'human_ansalon', script: 'ergot', rarity: 'common', settings: ['dragonlance'], notes: 'The formal, honorable language of the Knights of Solamnia.' });

    // ───────────────────────────────────────────────
    //  DRAGONLANCE (KRYNN) — NON-HUMAN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'bakali', name: 'Bakali', family: 'draconic', script: 'iokharic', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The ancient sibilant language of the lizard-folk.' });
    this._register({ id: 'draconian', name: 'Draconian', family: 'draconian', script: 'iokharic', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The guttural language spoken by the various draconian subraces.' });
    this._register({ id: 'dwarven_daergar', name: 'Daergar', family: 'dwarven', script: 'dethek', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The dark, harsh dialect of the Deep Dwarves of Thorbardin.' });
    this._register({ id: 'dwarven_hylar', name: 'Hylar', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['dragonlance'], notes: 'The "High" Dwarven tongue; formal and traditional.' });
    this._register({ id: 'dwarven_neidar', name: 'Neidar', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['dragonlance'], notes: 'The Hill Dwarf dialect; more informal and closer to Common.' });
    this._register({ id: 'elven_dargoi', name: 'Dargoi', family: 'elvish', script: 'espruar', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The shared language of sea-dwelling Dargonesti and Dimernesti elves.' });
    this._register({ id: 'elven_qualinesti', name: 'Qualinesti', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['dragonlance'], notes: 'The elven tongue of the western Qualinesti nation.' });
    this._register({ id: 'elven_silvanesti', name: 'Silvanesti', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['dragonlance'], notes: 'The formal, high elven tongue of the eastern Silvanesti nation.' });
    this._register({ id: 'gulley_slang', name: 'Gully Talk', family: 'dwarven', script: 'spoken_only', rarity: 'uncommon', settings: ['dragonlance'], notes: 'A broken, simplistic dialect spoken by Aghar (Gully Dwarves).' });
    this._register({ id: 'hammertalk', name: 'Hammertalk', family: 'dwarven', script: 'spoken_only', rarity: 'uncommon', settings: ['dragonlance'], notes: 'A non-verbal language of taps used by dwarves and goblins underground.' });
    this._register({ id: 'irda', name: 'Irda', family: 'ogre_ancestry', script: 'ancient_ogre', rarity: 'rare', settings: ['dragonlance'], notes: 'The elegant, high-form language of the ancient high ogres.' });
    this._register({ id: 'kenderspeak', name: 'Kenderspeak', family: 'kender', script: 'ergot', rarity: 'common', settings: ['dragonlance'], notes: 'A mix of Common and unique kender slang.' });
    this._register({ id: 'kothian', name: 'Kothian', family: 'minotaur', script: 'kothian', rarity: 'common', settings: ['dragonlance'], notes: 'The guttural, proud tongue of the minotaurs.' });
    this._register({ id: 'ogre', name: 'Ogre', family: 'ogre', script: 'ogre', rarity: 'common', settings: ['dragonlance'], notes: 'A debased version of the ancient Irda language.' });
    this._register({ id: 'thanoi', name: 'Thanoi', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['dragonlance'], notes: 'The language of the walrus-men of the southern ice.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_palanthas', name: 'Lord\'s Shadow Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'The sophisticated cant of the Palanthas Thieves\' Guild; avoids detection by the City Watch.' });
    this._register({ id: 'cant_tarsian', name: 'The Dry Dock Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'A sailor-based cant used in Tarsis, primarily focused on the city\'s "beached" history.' });
    this._register({ id: 'cant_nerakese', name: 'Dragon-Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'The rough, military-inflected cant used by black-marketeers in Neraka.' });
    this._register({ id: 'cant_khurish', name: 'Sand-Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'A non-verbal system of patterns drawn in sand or dirt used by Khurish nomads.' });
    this._register({ id: 'cant_san_sigil', name: 'San-Sigil', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'A mathematical/technical cant used by Gnomes of Mount Nevermind to share "unauthorized" research.' });
    this._register({ id: 'cant_solamnic', name: 'Squire\'s Slang', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'An informal code used by lower-ranking soldiers and servants in Solamnic keeps.' });
    this._register({ id: 'cant_kender_patter', name: 'Kender-Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'Not a "thieves" cant per se, but a fast-talk method Kender use to distract while "borrowing".' });
    this._register({ id: 'cant_kothian', name: 'The Arena Whisper', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'The silent sign-language used by Minotaur slaves and pit-fighters.' });
    this._register({ id: 'cant_taladasian', name: 'Glass-Talk', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'Used by the survivors of the Great Destruction on Taladas near the Glass Sea.' });
    this._register({ id: 'cant_irda', name: 'Illusionist\'s Breath', family: 'secret_guild', script: 'spoken_only', rarity: 'very_rare', settings: ['dragonlance'], notes: 'A highly complex, telepathic-friendly code used by Irda to stay hidden.' });
    this._register({ id: 'druidic_chislev', name: 'Chislev\'s Voice', family: 'secret_circle', script: 'ergot', rarity: 'very_rare', settings: ['dragonlance'], notes: 'The rare, nature-attuned tongue of the few true druids of Ansalon.' });
    this._register({ id: 'druidic_taladas', name: 'Taladasian Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['dragonlance'], notes: 'Spoken by the nomadic druids in the Burning Lands of Taladas.' });

    // ───────────────────────────────────────────────
    //  RAVENLOFT — COMPLETE LANGUAGE SET
    // ───────────────────────────────────────────────

    this._register({ id: 'agonian', name: 'Agonian', family: 'ravenloft_human', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'Native tongue of the domain of Agony; largely oral.' });
    this._register({ id: 'akiri', name: 'Akiri', family: 'amber_wastes_human', script: 'akiri_hieroglyphs', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The ancient, desert-dwelling tongue of Har\'Akir; uses complex pictographs.' });
    this._register({ id: 'arak', name: 'Arak', family: 'shadow_fey', script: 'espruar', rarity: 'rare', settings: ['ravenloft'], notes: 'The sibilant, rhythmic dialect spoken by the Shadow Fey of Arak.' });
    this._register({ id: 'balok', name: 'Balok', family: 'southwestern_core_human', script: 'balok', rarity: 'common', settings: ['ravenloft'], notes: 'The primary language of Barovia and Borca; used as a trade tongue in the south.' });
    this._register({ id: 'blausteinian', name: 'Blausteinian', family: 'island_domain_human', script: 'mordentish', rarity: 'rare', settings: ['ravenloft'], notes: 'A Mordentish-Lamordian hybrid spoken on the island of Blaustein.' });
    this._register({ id: 'darkonese', name: 'Darkonese', family: 'northern_core_human', script: 'darkonese', rarity: 'common', settings: ['ravenloft'], notes: 'The administrative and occult language of Darkon; heavy arcane influence.' });
    this._register({ id: 'falkovnian', name: 'Falkovnian', family: 'core_human', script: 'falkovnian', rarity: 'uncommon', settings: ['ravenloft'], notes: 'A rigid, military-focused language spoken in the domain of Falkovnia.' });
    this._register({ id: 'farellean', name: 'Farellean', family: 'island_domain_human', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'The dying language of the lost island of Farelle.' });
    this._register({ id: 'forfarian', name: 'Forfarian', family: 'core_human', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'The Gaelic-styled tongue of the few survivors of the domain of Forlorn.' });
    this._register({ id: 'grabenite', name: 'Grabenite', family: 'island_domain_human', script: 'vaasi', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The dialect of the Graben family and their island domain.' });
    this._register({ id: 'kalidnayan', name: 'Kalidnayan', family: 'island_domain_human', script: 'darkonese', rarity: 'rare', settings: ['ravenloft'], notes: 'The language of the Athas-themed domain of Kalidnay.' });
    this._register({ id: 'kartakan', name: 'Old Kartakan', family: 'core_human', script: 'spoken_only', rarity: 'rare', settings: ['dragonlance'], notes: 'A melodic, near-extinct language used in the folk songs of Kartakass.' });
    this._register({ id: 'lamordian', name: 'Lamordian', family: 'core_human', script: 'lamordian', rarity: 'uncommon', settings: ['ravenloft'], notes: 'A precise, technical language spoken in the scientifically-inclined Lamordia.' });
    this._register({ id: 'luktar', name: 'Luktar', family: 'core_human', script: 'balok', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The language of the native Gundarakites, now oppressed in Barovia and Invidia.' });
    this._register({ id: 'mordentish_high', name: 'High Mordentish', family: 'northwestern_core_human', script: 'mordentish', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The formal, sophisticated tongue of nobility in Mordent and Dementlieu.' });
    this._register({ id: 'mordentish_low', name: 'Low Mordentish', family: 'northwestern_core_human', script: 'mordentish', rarity: 'common', settings: ['ravenloft'], notes: 'The widely spoken commoner dialect of the northwestern domains.' });
    this._register({ id: 'nidalan', name: 'Nidalan', family: 'shadowborn_cluster_human', script: 'mordentish', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The courtly, archaic language of the domain of Nidala.' });
    this._register({ id: 'nosian', name: 'Nosian', family: 'island_domain_human', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'The language of the plague-ridden domain of Nosos.' });
    this._register({ id: 'odiare_it', name: 'Odiaran', family: 'island_domain_human', script: 'latin', rarity: 'rare', settings: ['ravenloft'], notes: 'A variant of Italian spoken by the inhabitants of Odiare.' });
    this._register({ id: 'old_vaasan', name: 'Old Vaasan', family: 'core_human', script: 'vaasi', rarity: 'rare', settings: ['ravenloft'], notes: 'The archaic, ritualistic precursor to modern Vaasi.' });
    this._register({ id: 'patterna', name: 'Patterna', family: 'vistani', script: 'spoken_only', rarity: 'secret', settings: ['ravenloft'], notes: 'The secret, spoken-only language of the Vistani; forbidden to outsiders.' });
    this._register({ id: 'pharazian', name: 'Pharazian', family: 'amber_wastes_human', script: 'akiri_hieroglyphs', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The religious and legal tongue of Pharazia.' });
    this._register({ id: 'rajian', name: 'Rajian', family: 'island_domain_human', script: 'sanskrit', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The language of Sri Raji, derived from an ancient, distant world.' });
    this._register({ id: 'sanguine', name: 'Sanguine', family: 'frozen_reaches_human', script: 'vaasi', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The cold, staccato language of the domain of Sanguinia.' });
    this._register({ id: 'sithican', name: 'Sithican', family: 'elvish', script: 'espruar', rarity: 'uncommon', settings: ['ravenloft'], notes: 'A sibilant, "hissing" dialect of Elvish spoken by the elves of Sithicus.' });
    this._register({ id: 'souragnien', name: 'Souragnien', family: 'island_domain_human', script: 'mordentish', rarity: 'uncommon', settings: ['ravenloft'], notes: 'A Creole-like tongue spoken in the swampy domain of Souragne.' });
    this._register({ id: 'tepestani', name: 'Tepestani', family: 'core_human', script: 'spoken_only', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The superstitious, oral-only language of the folk of Tepest.' });
    this._register({ id: 'thaani', name: 'Thaani', family: 'core_human', script: 'dwarven', rarity: 'rare', settings: ['ravenloft'], notes: 'The language of the tortured survivors from Bluetspur.' });
    this._register({ id: 'vaasi', name: 'Vaasi', family: 'southeastern_core_human', script: 'vaasi', rarity: 'common', settings: ['ravenloft'], notes: 'The dominant tongue of Nova Vaasa and Hazlan; language of the Lawgiver faith.' });
    this._register({ id: 'vechorite', name: 'Vechorite', family: 'island_domain_human', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'The erratic, ever-shifting language of the domain of Vechor.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_barovian', name: 'Barovian Whispers', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'A cant used by the few surviving thieves\' circles in Barovia to avoid Strahd\'s eyes.' });
    this._register({ id: 'cant_lek_mordentish', name: 'The Silent Ledger', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'The complex trade-cant of the Dementlieu underworld.' });
    this._register({ id: 'cant_vistani_rogue', name: 'Fakir Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['ravenloft'], notes: 'A bastardized version of Patterna used by outcasts and non-Vistani associates.' });
    this._register({ id: 'undercommon_darkon', name: 'Toll-Speak', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['ravenloft'], notes: 'The trade-cant of the Underdark beneath Darkon; heavily influenced by Dwarven.' });
    this._register({ id: 'druidic_tepest', name: 'Witch-Weave Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['ravenloft'], notes: 'A fearful, nature-based code used by those hiding from the Tepestani Inquisition.' });

    // ───────────────────────────────────────────────
    //  EBERRON
    // ───────────────────────────────────────────────

    this._register({ id: 'argon', name: 'Argon', family: 'human_argonnessen', script: 'common', rarity: 'uncommon', settings: ['eberron'], notes: 'A mutated form of Common spoken by the barbarian tribes of Argonnessen.' });
    this._register({ id: 'azhani', name: 'Azhani', family: 'human_sarlona', script: 'goblin', rarity: 'rare', settings: ['eberron'], notes: 'An ancient human dialect from Sarlona that utilized a goblin abjad script.' });
    this._register({ id: 'kaluuni', name: 'Kaluuni', family: 'human_sarlona', script: 'common', rarity: 'rare', settings: ['eberron'], notes: 'A dialect preserved by the Heirs of Ohr Kaluun.' });
    this._register({ id: 'khorvairian', name: 'Khorvairian', family: 'human_khorvaire', script: 'common', rarity: 'common', settings: ['eberron'], notes: 'A regional variant of Common specific to the Five Nations.' });
    this._register({ id: 'riedran', name: 'Riedran', family: 'human_sarlona', script: 'common', rarity: 'common', settings: ['eberron'], notes: 'The official language of the continent of Sarlona; a blend of Old Common and Quori.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_boromar', name: 'Boromar Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['eberron'], notes: 'Halfling-centric slang from Sharn; heavy on Talenta Plains metaphors and family-based code.' });
    this._register({ id: 'cant_daask', name: 'Daask Grunts', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['eberron'], notes: 'A rough, multi-racial jargon used by the monstrous cells of Droaam; blends Goblin and Giant.' });
    this._register({ id: 'cant_khoravar', name: 'Khoravar Cant', family: 'human_khorvaire', script: 'spoken_only', rarity: 'uncommon', settings: ['eberron'], notes: 'A social "cant" used by Half-Elves to speak privately in the presence of other races.' });
    this._register({ id: 'cant_tarkanan', name: 'Tarkanan Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['eberron'], notes: 'A precise, military-style jargon used by those with Aberrant Dragonmarks to coordinate strikes.' });
    this._register({ id: 'cant_tyrant', name: 'The Tyrants\' Whisper', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['eberron'], notes: 'A subtle code used by doppelgangers and shifters in Sharn to track identities and secrets.' });
    this._register({ id: 'code_house_sivis', name: 'Notary\'s Cipher', family: 'dragonmarked_house', script: 'dwarven', rarity: 'very_rare', settings: ['eberron'], notes: 'A highly complex cryptographic language used for House Sivis secure communications.' });
    this._register({ id: 'druidic_ashbound', name: 'Ashbound Cant', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['eberron'], notes: 'A harsh, aggressive dialect used by the Ashbound; often used to decry arcane "unnaturalness".' });
    this._register({ id: 'druidic_children_winter', name: 'Winter\'s Chill', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['eberron'], notes: 'A grim, fatalistic tongue used by the Children of Winter focused on death and rebirth.' });
    this._register({ id: 'druidic_gatekeeper', name: 'Gatekeeper Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['eberron'], notes: 'A specialized druidic tongue focused on sealing planar rifts.' });
    this._register({ id: 'druidic_greensinger', name: 'Greensinger Song', family: 'secret_circle', script: 'elvish', rarity: 'very_rare', settings: ['eberron'], notes: 'A chaotic, melodic tongue influenced by the fey of Thelanis.' });
    this._register({ id: 'druidic_warden', name: 'Warden Speak', family: 'secret_circle', script: 'common', rarity: 'very_rare', settings: ['eberron'], notes: 'The language of the Wardens of the Wood; used to mediate between nature and the Five Nations.' });

    // ───────────────────────────────────────────────
    //  DARK SUN
    // ───────────────────────────────────────────────

    this._register({ id: 'akan', name: 'Akan', family: 'athasian_human', script: 'spoken_only', rarity: 'uncommon', settings: ['dark_sun'], notes: 'The regional dialect of the City-State of Raam; rhythmic and complex.' });
    this._register({ id: 'anakore', name: 'Anakore', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['dark_sun'], notes: 'A series of low vibrations and rasps used by the Great Silt Sea dunes-dwellers.' });
    this._register({ id: 'arn_aku', name: 'Arn-aku', family: 'athasian_human', script: 'spoken_only', rarity: 'rare', settings: ['dark_sun'], notes: 'An archaic human dialect spoken by the reclusive tribes of the Sea of Silt.' });
    this._register({ id: 'athasian_common', name: 'Athasian Common', family: 'universal', script: 'tyrian', rarity: 'common', settings: ['dark_sun'], notes: 'The trade tongue of the Seven Cities; largely oral as literacy is a crime.' });
    this._register({ id: 'belgoi', name: 'Belgoi', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['dark_sun'], notes: 'The bell-ringing, hypnotic language of the desert stalkers.' });
    this._register({ id: 'braxat', name: 'Braxat', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['dark_sun'], notes: 'A combination of clicks and telepathic pulses used by the rhinoceros-men.' });
    this._register({ id: 'drajian', name: 'Drajian', family: 'athasian_human', script: 'drajian_glyphs', rarity: 'uncommon', settings: ['dark_sun'], notes: 'The harsh, militant tongue of the City-State of Draj.' });
    this._register({ id: 'dwarven_athas', name: 'Athasian Dwarven', family: 'dwarven', script: 'spoken_only', rarity: 'common', settings: ['dark_sun'], notes: 'Focused on "Focus" (tasks); lacks words for abstract concepts like "home".' });
    this._register({ id: 'elven_athas', name: 'Athasian Elven', family: 'elvish', script: 'spoken_only', rarity: 'common', settings: ['dark_sun'], notes: 'A rapid-fire language designed for communication while running at high speeds.' });
    this._register({ id: 'gith_athas', name: 'Athasian Gith', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['dark_sun'], notes: 'A harsh, barking language distinct from the planar Githyanki/Githzerai.' });
    this._register({ id: 'halfling_athas', name: 'Athasian Halfling', family: 'halfling', script: 'spoken_only', rarity: 'uncommon', settings: ['dark_sun'], notes: 'The ancient, primal tongue of the Forest Ridge cannibals.' });
    this._register({ id: 'kreen', name: 'Kreen', family: 'monstrous', script: 'spoken_only', rarity: 'common', settings: ['dark_sun'], notes: 'The clicking, mandible-based language of the Thri-Kreen; nearly impossible for others.' });
    this._register({ id: 'mulg', name: 'Mulg', family: 'athasian_human', script: 'spoken_only', rarity: 'rare', settings: ['dark_sun'], notes: 'A simplified grunt-language used by Mul slaves in the fighting pits.' });
    this._register({ id: 'nabni', name: 'Nabni', family: 'athasian_human', script: 'spoken_only', rarity: 'uncommon', settings: ['dark_sun'], notes: 'The melodic, trade-focused dialect of Gulg.' });
    this._register({ id: 'pterran', name: 'Pterran', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['dark_sun'], notes: 'A sibilant language of the Pterran pte-folk; involves wide arm gestures.' });
    this._register({ id: 'saurial_athas', name: 'Athasian Saurial', family: 'monstrous_reptillian', script: 'spoken_only', rarity: 'very_rare', settings: ['dark_sun'], notes: 'Uses scent-based communication paired with high-pitched chirps.' });
    this._register({ id: 'silt_tongue', name: 'Silt Tongue', family: 'athasian_human', script: 'spoken_only', rarity: 'uncommon', settings: ['dark_sun'], notes: 'A jargon used by silt-skimmer pilots and mud-flat scavengers.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_tyrian', name: 'Tyrian Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dark_sun'], notes: 'Used by the Free City\'s shadows to discuss water-rights and iron-smuggling.' });
    this._register({ id: 'cant_veiled_alliance', name: 'Alliance Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'very_rare', settings: ['dark_sun'], notes: 'A secret code of the Veiled Alliance to identify fellow Preservers.' });
    this._register({ id: 'rhul-thari', name: 'Rhul-thari', family: 'halfling', script: 'spoken_only', rarity: 'extinct', settings: ['dark_sun'], notes: 'The ancient "Master" language of the halflings from the Blue Age.' });
    this._register({ id: 'urian', name: 'Urian', family: 'athasian_human', script: 'tyrian', rarity: 'uncommon', settings: ['dark_sun'], notes: 'The dialect of Urik; heavily influenced by the legal codes of Hamanu.' });
    this._register({ id: 'druidic_athas', name: 'Guardian Speak', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['dark_sun'], notes: 'Spoken by the Guardians of the Lands; focuses on the "Spirit of the Land".' });

    // ───────────────────────────────────────────────
    //  SPELLJAMMER LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'bralish', name: 'Bralish', family: 'wildspace_human', script: 'common', rarity: 'common', settings: ['spelljammer'], notes: 'The specific, fast-paced trade dialect of the Rock of Bral; heavy on "groundling" slurs.' });
    this._register({ id: 'dohwar', name: 'Dohwar', family: 'monstrous', script: 'common', rarity: 'uncommon', settings: ['spelljammer'], notes: 'The rapid, telepathic-assisted trade tongue of the penguin-like Dohwar merchants.' });
    this._register({ id: 'draconic_voyager', name: 'High Draconic', family: 'draconic', script: 'iokharic', rarity: 'uncommon', settings: ['spelljammer'], notes: 'Used by astral dragons and ancient stellar beings to navigate the Flow.' });
    this._register({ id: 'elven_imperial', name: 'Imperial Elvish', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['spelljammer'], notes: 'The formal, militaristic language of the Imperial Elven Navy (IEN).' });
    this._register({ id: 'flow_tongue', name: 'Flow-Tongue', family: 'polyglot', script: 'spoken_only', rarity: 'common', settings: ['spelljammer'], notes: 'A pidgin of Common, Elven, and Dwarven used by multi-racial crews in the Phlogiston.' });
    this._register({ id: 'fractal', name: 'Fractal', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['spelljammer'], notes: 'The mathematical, light-based language of the Clockwork Horrors.' });
    this._register({ id: 'gammaroid', name: 'Gammaroid', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['spelljammer'], notes: 'The low-frequency vibration language of giant space-turtles.' });
    this._register({ id: 'giat_patter', name: 'Giff-Patter', family: 'monstrous', script: 'common', rarity: 'uncommon', settings: ['spelljammer'], notes: 'A rigid, military jargon used by Giff mercenaries; heavy on explosive and rank terminology.' });
    this._register({ id: 'grommam', name: 'Grommam', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['spelljammer'], notes: 'The rhythmic, gestural language of the ape-like Grommam crews.' });
    this._register({ id: 'hadozee', name: 'Hadozee', family: 'monstrous', script: 'common', rarity: 'uncommon', settings: ['spelljammer'], notes: 'The "Deck-Talk" of the Yazirians/Hadozee; includes many terms for gliding and rigging.' });
    this._register({ id: 'hurwaeti', name: 'Hurwaeti', family: 'monstrous', script: 'thorass', rarity: 'rare', settings: ['spelljammer'], notes: 'The ancient, sibilant language of the salt-encrusted Hurwaeti.' });
    this._register({ id: 'illithid_spelljammer', name: 'Qualith', family: 'monstrous', script: 'qualith', rarity: 'rare', settings: ['spelljammer'], notes: 'A tactile, psionic script written in four-line clusters; used by Nautiloid crews.' });
    this._register({ id: 'mercane_trade', name: 'Mercane', family: 'planar_trade', script: 'arcane_glyphs', rarity: 'rare', settings: ['spelljammer'], notes: 'The highly legalistic trade language used by the blue-skinned giants (formerly Arcane).' });
    this._register({ id: 'neogi', name: 'Neogi', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['spelljammer'], notes: 'A language of hisses and clicks; used to issue commands to Umber Hulk thralls.' });
    this._register({ id: 'plasmoid', name: 'Plasmoid', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['spelljammer'], notes: 'A language of chemical pulses and internal vibrations used by ooze-folk.' });
    this._register({ id: 'rastipede', name: 'Rastipede', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['spelljammer'], notes: 'A quick, chittering tongue used by the insectoid trade-crews.' });
    this._register({ id: 'reverie', name: 'Reverie', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['spelljammer'], notes: 'The telepathic communal "thought-stream" of the Radiant Dragons.' });
    this._register({ id: 'scro', name: 'Scro', family: 'orcish', script: 'scro_runes', rarity: 'uncommon', settings: ['spelljammer'], notes: 'A highly disciplined, advanced version of Orcish used by the space-faring Scro.' });
    this._register({ id: 'voadkyn', name: 'Voadkyn', family: 'giant', script: 'dethek', rarity: 'rare', settings: ['spelljammer'], notes: 'The language of the space-faring Wood Giants; shares roots with Sylvan.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_flow_pirate', name: 'Flow-Pirate Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['spelljammer'], notes: 'A code used to discuss "unclaimed" cargos and Imperial Elven Navy patrols.' });
    this._register({ id: 'cant_rock_shadow', name: 'Rock Shadow Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['spelljammer'], notes: 'The thieves\' cant of the Rock of Bral\'s lower tunnels.' });
    this._register({ id: 'code_ien_signal', name: 'IEN Signal Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['spelljammer'], notes: 'A visual language of flags, lights, and magic flares used for ship-to-ship maneuvers.' });
    this._register({ id: 'druidic_star_circle', name: 'Star-Circle Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['spelljammer'], notes: 'The language of druids who tend to the gardens of "Living Ships" and asteroid groves.' });

    // ───────────────────────────────────────────────
    //  KINGDOMS OF KALAMAR LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'brandobian', name: 'Brandobian', family: 'human_tellene', script: 'brandobian', rarity: 'common', settings: ['kalamar'], notes: 'Spoken in the far west; considered a "pure" language with ancient elvish influences.' });
    this._register({ id: 'dejy', name: 'Dejy', family: 'human_tellene', script: 'spoken_only', rarity: 'common', settings: ['kalamar'], notes: 'An oral-only language with many dialects spoken by nomadic tribes in the Wild Lands and Young Kingdoms.' });
    this._register({ id: 'fhokki', name: 'Fhokki', family: 'human_tellene', script: 'spoken_only', rarity: 'uncommon', settings: ['kalamar'], notes: 'A hard, staccato language of the far north bearing similarities to Hobgoblin.' });
    this._register({ id: 'kalamaran', name: 'Kalamaran', family: 'human_tellene', script: 'kalamaran', rarity: 'common', settings: ['kalamar'], notes: 'The administrative tongue of the Kalamaran Empire; syllables are quick and uniform.' });
    this._register({ id: 'merchant_tongue', name: 'Merchant\'s Tongue', family: 'human_tellene', script: 'svimohzish', rarity: 'common', settings: ['kalamar'], notes: 'A trade language used by the merchant classes; eschewed by nobility as "low-speech".' });
    this._register({ id: 'reanaarese', name: 'Reanaarese', family: 'human_tellene', script: 'reanaarese', rarity: 'common', settings: ['kalamar'], notes: 'Rich with double/triple vowels and spoken with dramatic flair; popular among half-breeds.' });
    this._register({ id: 'svimohzish', name: 'Svimohzish', family: 'human_tellene', script: 'svimohzish', rarity: 'common', settings: ['kalamar'], notes: 'The oldest language in Tellene, developed in the isolation of the southern isle.' });
    this._register({ id: 'low_kalamaran', name: 'Low Kalamaran', family: 'human_tellene', script: 'kalamaran', rarity: 'common', settings: ['kalamar'], notes: 'A derivative of ancient Kalamaran heavily influenced by Dwarvish over centuries.' });
    this._register({ id: 'dwarven_tellene', name: 'Dwarven', family: 'dwarven', script: 'dwarven', rarity: 'common', settings: ['kalamar'], notes: 'A harsh language that significantly influenced the development of Kalamaran.' });
    this._register({ id: 'elvish_tellene', name: 'Elvish', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['kalamar'], notes: 'Fluid and beautiful; provided the foundational influence for the Brandobian language.' });
    this._register({ id: 'gnomish_tellene', name: 'Gnome', family: 'gnomish', script: 'dethek', rarity: 'common', settings: ['kalamar'], notes: 'Distinct from Gnomish in other realms; shares three genders and uses Dwarven script.' });
    this._register({ id: 'hobgoblin_tellene', name: 'Hobgoblin', family: 'goblinoid', script: 'spoken_only', rarity: 'uncommon', settings: ['kalamar'], notes: 'A massive vocabulary with no articles; historically unified but now splintered into regional dialects.' });
    this._register({ id: 'orcish_ukak', name: 'Common Orc (Ukak)', family: 'orcish', script: 'spoken_only', rarity: 'common', settings: ['kalamar'], notes: 'The standard orcish tongue, with variants for Black, Gray, Brown, and White Orcs.' });

    // CANTS / DRUIDIC

    this._register({ id: 'infiltrator_code', name: 'Infiltrator Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['kalamar'], notes: 'A secret code language used by the Infiltrator class for clandestine communication.' });
    this._register({ id: 'basiran_dance', name: 'Basiran Signal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['kalamar'], notes: 'Specialized non-verbal communication methods used by Basiran dancers.' });
    this._register({ id: 'undercommon_tellene', name: 'Undercommon', family: 'universal', script: 'dwarven', rarity: 'uncommon', settings: ['kalamar'], notes: 'The trade tongue of Tellene\'s Underdark; distinct from Faerûnian variants.' });
    this._register({ id: 'druidic_tellene', name: 'Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['kalamar'], notes: 'A restricted language for Tellene\'s druids; rarely shared with outsiders.' });

    // ───────────────────────────────────────────────
    //  PLANESCAPE LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'common_planar', name: 'Planar Common', family: 'polyglot', script: 'common_planar', rarity: 'common', settings: ['planescape'], notes: 'The standard trade tongue of Sigil; differs slightly from Prime Material variants.' });
    this._register({ id: 'modron', name: 'Modron', family: 'great_wheel', script: 'modron_geometric', rarity: 'rare', settings: ['planescape'], notes: 'A mathematical, clicking language spoken by the inhabitants of Mechanus.' });
    this._register({ id: 'primordial', name: 'Primordial', family: 'primordial', script: 'barazhad', rarity: 'uncommon', settings: ['planescape'], notes: 'The root language of elementals; splits into Aquan, Auran, Ignan, and Terran.' });
    this._register({ id: 'slaad', name: 'Slaad', family: 'great_wheel', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'The chaotic, ever-shifting croaking of the inhabitants of Limbo.' });
    this._register({ id: 'tunyreth', name: 'Tu\'nyreth', family: 'great_wheel', script: 'tir_su', rarity: 'uncommon', settings: ['planescape'], notes: 'The harsh, militant language of the Githyanki of the Astral Plane.' });
    this._register({ id: 'zerth', name: 'Zerth', family: 'great_wheel', script: 'tir_su', rarity: 'uncommon', settings: ['planescape'], notes: 'The philosophical, disciplined language of the Githzerai of Limbo.' });
    this._register({ id: 'baatorian', name: 'Old Baatorian', family: 'fiendish', script: 'infernal', rarity: 'extinct', settings: ['planescape'], notes: 'The original tongue of the inhabitants of Hell before the arrival of the Baatezu.' });
    this._register({ id: 'cant_sigil_low', name: 'Hive Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'The gutter-slang of Sigil\'s Hive district; nearly unintelligible to "clueless" primes.' });
    this._register({ id: 'daemonic', name: 'Yugoloth', family: 'fiendish', script: 'infernal', rarity: 'uncommon', settings: ['planescape'], notes: 'The sibilant, treacherous tongue of the Yugoloths of Gehenna.' });
    this._register({ id: 'formian', name: 'Formian', family: 'great_wheel', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A hive-mind language of scents and chitin-clicks used on Mechanus.' });
    this._register({ id: 'gehreleth', name: 'Gehreleth', family: 'great_wheel', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'The oily, thick-tongued language of the residents of Carceri.' });
    this._register({ id: 'marut_code', name: 'Inevitable Logos', family: 'planar_trade', script: 'binary_unified', rarity: 'very_rare', settings: ['planescape'], notes: 'The cold, binary-like communication used by Inevitables.' });
    this._register({ id: 'rilmani', name: 'Rilmani', family: 'great_wheel', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'The neutral, balanced tongue of the Outlands\' guardians.' });
    this._register({ id: 'sharn_planar', name: 'Sharn', family: 'great_wheel', script: 'spoken_only', rarity: 'very_rare', settings: ['planescape'], notes: 'The chaotic, multi-voiced language of the Sharn (distinct from Eberron\'s city).' });
    this._register({ id: 'varguille', name: 'Varguille', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A terrifying language of high-pitched shrieks.' });
    this._register({ id: 'yagnoloth', name: 'Yagnoloth', family: 'fiendish', script: 'infernal', rarity: 'rare', settings: ['planescape'], notes: 'The bureaucratic sub-dialect of Yugoloth.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_athar', name: 'Defier\'s Code', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'Secret jargon used by the Athar to discuss divinity and "The Great Unknown".' });
    this._register({ id: 'cant_dustmen', name: 'Deadman\'s Silence', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A minimal, sub-vocalized cant used by the Dustmen to discuss the True Death.' });
    this._register({ id: 'cant_fated', name: 'Tallyman\'s Cipher', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'Used by the Fated to discuss ownership, debts, and taxes.' });
    this._register({ id: 'cant_guvner', name: 'The Golden Rule', family: 'faction_secret', script: 'common_planar', rarity: 'rare', settings: ['planescape'], notes: 'Precise, legalistic jargon used by the Fraternity of Order.' });
    this._register({ id: 'cant_harmonium', name: 'Hardhead Patter', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A rigid, command-based cant used by the Harmonium peacekeepers.' });
    this._register({ id: 'cant_indep', name: 'Free-Speak', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A highly varied, unpredictable cant used by the Free League.' });
    this._register({ id: 'cant_mercryk', name: 'Taxman\'s Cant', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'The financial jargon of the Mercykillers (Red Death).' });
    this._register({ id: 'cant_sensate', name: 'Experience-Share', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A descriptive, sensory-heavy code used by the Society of Sensation.' });
    this._register({ id: 'cant_signers', name: 'One\'s Echo', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'The solipsistic jargon of the Sign of One.' });
    this._register({ id: 'cant_xaositect', name: 'Barking Chaos', family: 'faction_secret', script: 'spoken_only', rarity: 'rare', settings: ['planescape'], notes: 'A structurally incoherent code used by the Xaositects.' });
    this._register({ id: 'druidic_beastlands', name: 'Beastlands Cant', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['planescape'], notes: 'A primal, vocalized druidic dialect that incorporates animal growls and calls.' });
    this._register({ id: 'druidic_elysium', name: 'The Bloom-Speak', family: 'secret_circle', script: 'ogham', rarity: 'very_rare', settings: ['planescape'], notes: 'A peaceful, resonant druidic tongue used by those tending the fields of Elysium.' });
    this._register({ id: 'druidic_gray_waste', name: 'The Rot-Whisper', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['planescape'], notes: 'A grim druidic code focused on decay, fungi, and the "Natural End" in Hades.' });
    this._register({ id: 'druidic_limbo', name: 'The Chaos-Hum', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['planescape'], notes: 'An ever-shifting druidic dialect that requires constant adaptation to the surrounding chaos.' });
    this._register({ id: 'druidic_mechanus', name: 'The Gear-Click', family: 'secret_circle', script: 'modron_geometric', rarity: 'very_rare', settings: ['planescape'], notes: 'A highly structured, rhythmic druidic tongue used by those tending the "Metal Forests".' });
    this._register({ id: 'druidic_mount_celestia', name: 'The Radiant Echo', family: 'secret_circle', script: 'celestial', rarity: 'very_rare', settings: ['planescape'], notes: 'A harmonic druidic dialect used by the Wardens of the Silver Heaven.' });
    this._register({ id: 'druidic_outlands', name: 'True-Balance Druidic', family: 'secret_circle', script: 'flan', rarity: 'very_rare', settings: ['planescape'], notes: 'The most "pure" form of Druidic, used by the Hierophants at the base of the Spire.' });
    this._register({ id: 'druidic_pandemonium', name: 'The Wind-Howl', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['planescape'], notes: 'A loud, screeching druidic dialect designed to be heard over the eternal winds.' });

    // ───────────────────────────────────────────────
    //  BIRTHRIGHT LANGUAGES
    // ───────────────────────────────────────────────
    
    this._register({ id: 'andu', name: 'Andu', family: 'human_cerilia', script: 'andure', rarity: 'common', settings: ['birthright'], notes: 'The root of modern Anuirean; now mostly a scholarly or archaic tongue.' });
    this._register({ id: 'anuirean', name: 'Anuirean', family: 'human_cerilia', script: 'andure', rarity: 'common', settings: ['birthright'], notes: 'The most widespread human language, spoken in the south and west.' });
    this._register({ id: 'basarji', name: 'Basarji', family: 'human_cerilia', script: 'basarji', rarity: 'common', settings: ['birthright'], notes: 'Spoken in the Khinasi city-states; a language of trade, philosophy, and magic.' });
    this._register({ id: 'brecht', name: 'Brecht', family: 'human_cerilia', script: 'brech', rarity: 'common', settings: ['birthright'], notes: 'Language of the northern merchants and sailors; includes many nautical terms.' });
    this._register({ id: 'low_brecht', name: 'Low Brecht', family: 'human_cerilia', script: 'brech', rarity: 'common', settings: ['birthright'], notes: 'A simplified trade-patois used in the ports of the Great Bay.' });
    this._register({ id: 'mhoried', name: 'Mhoried', family: 'human_cerilia', script: 'andure', rarity: 'uncommon', settings: ['birthright'], notes: 'A distinct Highland dialect of Anuirean spoken in the Mhoried borderlands.' });
    this._register({ id: 'rjuven', name: 'Rjuven', family: 'human_cerilia', script: 'rjuven', rarity: 'common', settings: ['birthright'], notes: 'The guttural, rhythmic tongue of the Rjurik clans in the north.' });
    this._register({ id: 'vos', name: 'Vos', family: 'human_cerilia', script: 'vos', rarity: 'common', settings: ['birthright'], notes: 'The harsh, sibilant language of the Vos tribes in the frozen east.' });
    this._register({ id: 'old_anuirean', name: 'Old Anuirean', family: 'human_cerilia', script: 'andure', rarity: 'rare', settings: ['birthright'], notes: 'The high-court language of the old Anuirean Empire; used for royal decrees.' });
    this._register({ id: 'halaia', name: 'Halaia', family: 'human_cerilia', script: 'basarji', rarity: 'uncommon', settings: ['birthright'], notes: 'A lyrical dialect of Basarji used specifically by Khinasi poets and seers.' });
    this._register({ id: 'sidhelien', name: 'Sidhelien', family: 'elvish', script: 'sidhelien', rarity: 'common', settings: ['birthright'], notes: 'The melodic, ancient language of the Cerilian Elves; unchanged for millennia.' });
    this._register({ id: 'karamhul', name: 'Karamhul', family: 'dwarven', script: 'karamhul', rarity: 'common', settings: ['birthright'], notes: 'The deep, resonant tongue of the Dwarves; spoken in the Baruk-Azhik mountains.' });
    this._register({ id: 'oroog', name: 'Oroog', family: 'orcish', script: 'spoken_only', rarity: 'uncommon', settings: ['birthright'], notes: 'The language of the Underdark-dwelling Cerilian orcs (Oroogs).' });
    this._register({ id: 'ogre_cerilia', name: 'Cerilian Ogre', family: 'ogre', script: 'spoken_only', rarity: 'uncommon', settings: ['birthright'], notes: 'A simplified, booming dialect used by ogres in the Vosgaard peaks.' });
    this._register({ id: 'goblin_cerilia', name: 'Cerilian Goblin', family: 'goblinoid', script: 'spoken_only', rarity: 'common', settings: ['birthright'], notes: 'Spoken by the diverse goblin kingdoms (e.g., Markazor, Kal-Saithare).' });
    this._register({ id: 'gnoll_cerilia', name: 'Cerilian Gnoll', family: 'beastfolk', script: 'spoken_only', rarity: 'uncommon', settings: ['birthright'], notes: 'The yapping, aggressive tongue of the gnoll tribes in the southern deserts.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_city_of_anire', name: 'Imperial Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['birthright'], notes: 'The slang of the City of Anuire\'s docks and slums.' });
    this._register({ id: 'cant_brecht_smuggler', name: 'Bay-Whistle', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['birthright'], notes: 'A whistle-and-gesture code used by Brecht sailors to bypass customs.' });
    this._register({ id: 'warden_code', name: 'Warden Signal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['birthright'], notes: 'Used by the rangers and wardens of the Great Shield to track Awnshegh movements.' });
    this._register({ id: 'shadow_tongue', name: 'Shadow World Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'very_rare', settings: ['birthright'], notes: 'Used by those who traverse the Shadow World (the Unerech) to communicate without attracting the Cold Rider.' });
    this._register({ id: 'druidic_erik', name: 'Erik\'s Whisper', family: 'secret_circle', script: 'rjuven', rarity: 'very_rare', settings: ['birthright'], notes: 'The secret language of the Druids of Erik; focused on the Rjurik wilderness.' });
    
    // ───────────────────────────────────────────────
    //  BLACKMOOR LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'afridhi', name: 'Afridhi', family: 'human_blackmoor', script: 'spoken_only', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The language of the conquering Afridhi tribes from the west.' });
    this._register({ id: 'common_thonian', name: 'Common (Thonian)', family: 'universal', script: 'thonian', rarity: 'common', settings: ['blackmoor'], notes: 'The trade tongue of the North, derived from the language of the Thonian Empire.' });
    this._register({ id: 'cumasti', name: 'Cumasti', family: 'elvish', script: 'espruar', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The language of the "High" Cumasti Elves of the Redwood Forest.' });
    this._register({ id: 'docrae', name: 'Docrae', family: 'halfling', script: 'thonian', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The specific dialect spoken by the hardy halflings of the Blackmoor region.' });
    this._register({ id: 'dwarven_blackmoor', name: 'Blackmoor Dwarven', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['blackmoor'], notes: 'Spoken by the dwarves of the Crystal Peaks and the Regent of the Mines.' });
    this._register({ id: 'elvish_blackmoor', name: 'Blackmoor Elvish', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['blackmoor'], notes: 'A foundational elven tongue; used as the root for Westryn and Cumasti.' });
    this._register({ id: 'gatorman', name: 'Gatorman (Broadgrin)', family: 'monstrous_reptillian', script: 'spoken_only', rarity: 'uncommon', settings: ['blackmoor'], notes: 'A sibilant, swamp-dwelling language used by the gatormen of the Loch Gloomen.' });
    this._register({ id: 'high_thonian', name: 'High Thonian', family: 'human_blackmoor', script: 'thonian', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The formal, courtly language of the Thonian Empire\'s nobility.' });
    this._register({ id: 'low_thonian', name: 'Low Thonian', family: 'human_blackmoor', script: 'thonian', rarity: 'common', settings: ['blackmoor'], notes: 'The everyday dialect of the peasantry and common folk in the North.' });
    this._register({ id: 'mermen_thonian', name: 'Mermen', family: 'aquatic', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'A liquid-based language used by the aquatic civilizations of the Blackmoor Bay.' });
    this._register({ id: 'naliseth', name: 'Naliseth', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'The strange, whispering tongue of the Naliseth frog-kin.' });
    this._register({ id: 'orc_blackmoor', name: 'Orc (Blackmoor)', family: 'orcish', script: 'dethek', rarity: 'common', settings: ['blackmoor'], notes: 'The harsh tongue of the orcish tribes under the Egg of Coot.' });
    this._register({ id: 'peshwah', name: 'Peshwah', family: 'human_blackmoor', script: 'spoken_only', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The language of the nomadic horse-tribes of the Hak plains.' });
    this._register({ id: 'skandaharian', name: 'Skandaharian', family: 'human_blackmoor', script: 'skandaharian', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The language of the fierce northern sea-raiders.' });
    this._register({ id: 'undercommon_blackmoor', name: 'Undercommon (Blackmoor)', family: 'universal', script: 'dethek', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The trade tongue of the dungeons beneath Blackmoor Castle.' });
    this._register({ id: 'westryn', name: 'Westryn', family: 'elvish', script: 'espruar', rarity: 'uncommon', settings: ['blackmoor'], notes: 'The language of the reclusive Westryn Elves; closer to Sylvan than Cumasti.' });

    // CANTS / DRUIDIC / TECHNIC

    this._register({ id: 'cant_blackmoor', name: 'Castle Blackmoor Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'The jargon used by the thieves\' guilds in the town of Blackmoor.' });
    this._register({ id: 'cant_frog_cult', name: 'Crotal Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'A series of croaks and hand gestures used by the Cult of the Frog.' });
    this._register({ id: 'skandaharian_sign', name: 'Raider\'s Silence', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'A silent battle-language used by Skandaharian boarding parties.' });
    this._register({ id: 'druidic_north', name: 'Northern Druidic', family: 'secret_circle', script: 'thonian_runes', rarity: 'very_rare', settings: ['blackmoor'], notes: 'The secret language of the druids tending the ancient groves of the North.' });
    this._register({ id: 'technic_common', name: 'Technic Common', family: 'technic', script: 'technic_digital', rarity: 'very_rare', settings: ['blackmoor'], notes: 'The standard language of the City of the Gods; incorporates complex technical and scientific terminology.' });
    this._register({ id: 'binary_pulse', name: 'Binary Pulse', family: 'technic', script: 'binary_unified', rarity: 'rare', settings: ['blackmoor'], notes: 'A machine language used by the robots and automated systems of the City to coordinate defense.' });
    this._register({ id: 'high_technic', name: 'High Technic', family: 'technic', script: 'technic_digital', rarity: 'very_rare', settings: ['blackmoor'], notes: 'An advanced, academic form of the City\'s language used by the original crew and Command AI.' });
    this._register({ id: 'frog_technic_pidgin', name: 'Frog-Tech Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['blackmoor'], notes: 'A corrupt blend of Thonian and Technic used by the monks of the Order of the Frog to operate stolen devices.' });
    this._register({ id: 'technic_code_cipher', name: 'Security Override Code', family: 'technic', script: 'technic_digital', rarity: 'very_rare', settings: ['blackmoor'], notes: 'A specialized encryption language used for high-level security clearances within the City.' });

    // ───────────────────────────────────────────────
    //  PELINORE LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'city_patter', name: 'City League Patter', family: 'human_pelinore', script: 'common', rarity: 'common', settings: ['pelinore'], notes: 'The standard trade tongue of the City League; influenced by all surrounding counties.' });
    this._register({ id: 'cerwyn_dialect', name: 'Cerwyn Dialect', family: 'human_pelinore', script: 'common', rarity: 'common', settings: ['pelinore'], notes: 'The primary language of the County of Cerwyn; stable and formal.' });
    this._register({ id: 'rim_speak', name: 'Rim-Speak', family: 'human_pelinore', script: 'spoken_only', rarity: 'uncommon', settings: ['pelinore'], notes: 'A fragmented set of dialects spoken by those dwelling near the mysterious edge of the world.' });
    this._register({ id: 'worldheart_archaic', name: 'Worldheart Archaic', family: 'human_pelinore', script: 'spoken_only', rarity: 'rare', settings: ['pelinore'], notes: 'A ritualistic language whispered to be spoken at the mysterious center of the world.' });
    this._register({ id: 'herald_code', name: 'Herald\'s Tongue', family: 'human_pelinore', script: 'common', rarity: 'rare', settings: ['pelinore'], notes: 'A precise, descriptive jargon used by the Order of Heralds to map the unknown.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_city_league', name: 'Sprawl Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['pelinore'], notes: 'The criminal jargon of the Market Square and the Western Gate slums.' });
    this._register({ id: 'gambler_patter', name: 'The Deuce', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['pelinore'], notes: 'A specialized cant used by gamblers and card-sharps in the City League taverns.' });
    this._register({ id: 'peasant_argot', name: 'Commoner\'s Grip', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['pelinore'], notes: 'A coded way of speaking used by peasants to complain about lords without being understood.' });
    this._register({ id: 'druidic_pelinore', name: 'Grove-Speak', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['pelinore'], notes: 'The secret language of the druids tending the few remaining sacred forests.' });


    // ───────────────────────────────────────────────
    //  COUNCIL OF WYRMS LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'draconic_chromatic', name: 'Chromatic Draconic', family: 'draconic', script: 'iokharic', rarity: 'common', settings: ['council_of_wyrms'], notes: 'The harsh, predatory tongue of the Red, Blue, Green, Black, and White dragons.' });
    this._register({ id: 'draconic_metallic', name: 'Metallic Draconic', family: 'draconic', script: 'iokharic', rarity: 'common', settings: ['council_of_wyrms'], notes: 'The resonant, melodic tongue of the Gold, Silver, Bronze, Copper, and Brass dragons.' });
    this._register({ id: 'draconic_gem', name: 'Gem Draconic', family: 'draconic', script: 'iokharic', rarity: 'uncommon', settings: ['council_of_wyrms'], notes: 'A shimmering, precise language used by Amethyst, Emerald, Sapphire, Topaz, and Crystal dragons.' });
    this._register({ id: 'draconic_high', name: 'High Draconic (Iokharic)', family: 'draconic', script: 'iokharic', rarity: 'rare', settings: ['council_of_wyrms'], notes: 'The formal ritual language of the Council; used for law-giving and ancient history.' });
    this._register({ id: 'draconic_vassal_common', name: 'Vassal Common', family: 'universal', script: 'common', rarity: 'common', settings: ['council_of_wyrms'], notes: 'The trade tongue used between the human, elven, and dwarven servants of the dragon clans.' });
    this._register({ id: 'dwarf_io_blood', name: 'Blood-Isle Dwarven', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['council_of_wyrms'], notes: 'Spoken by the dwarves who mine the precious gems required for draconic hoards.' });
    this._register({ id: 'elf_io_blood', name: 'Blood-Isle Elven', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['council_of_wyrms'], notes: 'Used by the elven vassals who tend the forest territories of the Green and Gold dragons.' });
    this._register({ id: 'human_io_blood', name: 'Blood-Isle Human', family: 'human_io_blood', script: 'common', rarity: 'common', settings: ['council_of_wyrms'], notes: 'The language of the human populations residing on the vassal islands.' });
    this._register({ id: 'kindred_patter', name: 'Kindred Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['council_of_wyrms'], notes: 'A secret code used by dragon-kin and vassals to discuss draconic politics safely.' });
    this._register({ id: 'kobold_wyrm', name: 'Wyrm-Talk (Kobold)', family: 'draconic', script: 'iokharic', rarity: 'common', settings: ['council_of_wyrms'], notes: 'A high-pitched, yipping version of Chromatic Draconic used by kobold minions.' });

    // CANTS / DRUIDIC

    this._register({ id: 'draconic_battle_sign', name: 'Wing-Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['council_of_wyrms'], notes: 'A visual language of wing-beats and tail-positions used during aerial combat.' });
    this._register({ id: 'wyrm_roar', name: 'The Great Roar', family: 'draconic', script: 'spoken_only', rarity: 'very_rare', settings: ['council_of_wyrms'], notes: 'A semi-magical language consisting of resonant roars capable of carrying for miles across the sea.' });
    this._register({ id: 'druidic_io_blood', name: 'Island Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['council_of_wyrms'], notes: 'Spoken by those who guard the volcanic and primordial nature of the isles.' });
    
    // ───────────────────────────────────────────────
    //  HYBOREAN AGE / CONAN / RED SONJA LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'aquilonian', name: 'Aquilonian', family: 'hyborian_human', script: 'aquilonian_latin', rarity: 'common', settings: ['conan'], notes: 'The most widespread trade language of the West; spoken in the most powerful Hyborian kingdom.' });
    this._register({ id: 'argossean', name: 'Argossean', family: 'hyborian_human', script: 'aquilonian_latin', rarity: 'common', settings: ['conan'], notes: 'The maritime tongue of Argos; heavy with nautical terms and Zingaran loanwords.' });
    this._register({ id: 'brythunian', name: 'Brythunian', family: 'hyborian_human', script: 'brythunian_runes', rarity: 'uncommon', settings: ['conan'], notes: 'An archaic Hyborian tongue spoken by the blonde-haired inhabitants of Brythunia.' });
    this._register({ id: 'corinthian', name: 'Corinthian', family: 'hyborian_human', script: 'aquilonian_latin', rarity: 'uncommon', settings: ['conan'], notes: 'Spoken in the city-states of Corinthia; known for its diverse regional accents.' });
    this._register({ id: 'gunderman', name: 'Gunderman', family: 'hyborian_human', script: 'aquilonian_latin', rarity: 'uncommon', settings: ['conan'], notes: 'A distinct, practical dialect of Aquilonian spoken by the hardy Gunderland frontiersmen.' });
    this._register({ id: 'hyperborean', name: 'Hyperborean', family: 'hyborian_human', script: 'hyperborean_glyphs', rarity: 'uncommon', settings: ['conan'], notes: 'A cold, slow language spoken in the hermit-kingdom of the North; associated with the White Hand cult.' });
    this._register({ id: 'kothian', name: 'Kothian', family: 'hyborian_human', script: 'kothian_cursive', rarity: 'common', settings: ['conan'], notes: 'The language of Koth; heavily influenced by Shemite due to centuries of trade and war.' });
    this._register({ id: 'nemedian', name: 'Nemedian', family: 'hyborian_human', script: 'aquilonian_latin', rarity: 'common', settings: ['conan'], notes: 'The language of Aquilonia\'s chief rival; scholarly and highly structured.' });
    this._register({ id: 'ophirean', name: 'Ophirean', family: 'hyborian_human', script: 'kothian_cursive', rarity: 'uncommon', settings: ['conan'], notes: 'The gilded tongue of the wealthy merchants of Ophir.' });
    this._register({ id: 'shemite', name: 'Shemite', family: 'shemite_human', script: 'shemite_cuneiform', rarity: 'common', settings: ['conan'], notes: 'The language of the Meadow Shemites and Pelishtim; the primary tongue of the Near East.' });
    this._register({ id: 'cimmerian', name: 'Cimmerian', family: 'cimmerian_human', script: 'spoken_only', rarity: 'uncommon', settings: ['conan'], notes: 'A melancholy, somber language; descendant of the ancient Atlantean tongue.' });
    this._register({ id: 'hyrkanian', name: 'Hyrkanian', family: 'hyrkanian_human', script: 'hyrkanian_brush', rarity: 'uncommon', settings: ['conan'], notes: 'The language of the horse-archers from the steppes; root of the Turanian tongue.' });
    this._register({ id: 'khitai', name: 'Khitan', family: 'khitan_human', script: 'khitan_glyphs', rarity: 'rare', settings: ['conan'], notes: 'An ancient, musical language from the Far East; used by the Scarlet Circle sorcerers.' });
    this._register({ id: 'kushite', name: 'Kushite', family: 'stygian_human', script: 'stygian_hieroglyphs', rarity: 'uncommon', settings: ['conan'], notes: 'The primary language of the Black Kingdoms; Chaga Kushite is a "High" dialect.' });
    this._register({ id: 'nordheimir', name: 'Nordheimir', family: 'nordic_human', script: 'nordic_runes', rarity: 'uncommon', settings: ['conan'], notes: 'Includes the dialects of Aesir and Vanir; a rugged, booming tongue.' });
    this._register({ id: 'stygian', name: 'Stygian', family: 'stygian_human', script: 'stygian_hieroglyphs', rarity: 'uncommon', settings: ['conan'], notes: 'The sibilant, ancient tongue of Stygia; associated with the worship of Set.' });
    this._register({ id: 'turanian', name: 'Turanian', family: 'hyrkanian_human', script: 'shemite_cuneiform', rarity: 'common', settings: ['conan'], notes: 'The imperial language of Aghrapur and the Turanian Empire.' });
    this._register({ id: 'vendhyan', name: 'Vendhyan', family: 'vendhyan_human', script: 'vendhyan_sanskrit', rarity: 'uncommon', settings: ['conan'], notes: 'A lyrical language from the golden kingdom of Vendhya.' });
    this._register({ id: 'zamorian', name: 'Zamorian', family: 'zamorian_human', script: 'zamorian_cipher', rarity: 'uncommon', settings: ['conan'], notes: 'The language of the "City of Thieves"; contains many specialized criminal terms.' });
    this._register({ id: 'zingaran', name: 'Zingaran', family: 'hyborian_human', script: 'aquilonian_latin', rarity: 'uncommon', settings: ['conan'], notes: 'A sharp, quick language spoken by the swordsmen and pirates of Zingara.' });
    this._register({ id: 'acheronian', name: 'Acheronian', family: 'pre_cataclysmic', script: 'hieroglyphs_of_set', rarity: 'dead', settings: ['conan'], notes: 'The dead language of the Empire of Acheron; used only in dark sorcery.' });
    this._register({ id: 'atlantean', name: 'Atlantean', family: 'pre_cataclysmic', script: 'spoken_only', rarity: 'extinct', settings: ['conan'], notes: 'The root of the Cimmerian tongue; spoken by the lords of Atlantis before the Flood.' });
    this._register({ id: 'lemurian', name: 'Lemurian', family: 'pre_cataclysmic', script: 'unknown', rarity: 'extinct', settings: ['conan'], notes: 'Spoken by the ancestors of the Hyrkanians before their enslavement by the Kings of the East.' });
    this._register({ id: 'pictish', name: 'Pictish', family: 'pictish_human', script: 'spoken_only', rarity: 'rare', settings: ['conan'], notes: 'A guttural, primitive language spoken by the tribes of the Pictish Wilderness.' });
    this._register({ id: 'serpent_tongue', name: 'Serpent-Talk', family: 'serpentine', script: 'spoken_only', rarity: 'very_rare', settings: ['conan'], notes: 'The sibilant hissing of the ancient Serpent Men; predates human speech.' });
    this._register({ id: 'valusian', name: 'Valusian', family: 'pre_cataclysmic', script: 'hieroglyphs_of_set', rarity: 'dead', settings: ['conan'], notes: 'The language of the Seven Kingdoms from the Age of Kull.' });

    // CANTS / DRUIDIC

    this._register({ id: 'cant_zamorian', name: 'Maul-Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['conan'], notes: 'The specific thieves\' cant of the Maul in Zamora.' });
    this._register({ id: 'cant_barachan', name: 'Freebooter Slang', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['conan'], notes: 'A blend of Zingaran, Argossean, and Kushite used by the pirates of the Baracha Isles.' });
    this._register({ id: 'sorcerous_cipher', name: 'Black Circle Code', family: 'secret_guild', script: 'khitan_glyphs', rarity: 'very_rare', settings: ['conan'], notes: 'A secret mathematical and symbolic language used by the Black Seers of Yimsha.' });
    this._register({ id: 'hieroglyphs_of_set', name: 'Setite Ritual', family: 'secret_circle', script: 'stygian_hieroglyphs', rarity: 'rare', settings: ['conan'], notes: 'The liturgical language of the Stygian priesthood.' });
    this._register({ id: 'druidic_pictish', name: 'Shaman\'s Whisper', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['conan'], notes: 'The nature-spirits tongue used by Pictish shamans to command beasts.' });

    // ───────────────────────────────────────────────
    //  EXANDRIA LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'aeorian', name: 'Aeorian', family: 'human_exandria', script: 'aeorian_glyphs', rarity: 'rare', settings: ['exandria'], notes: 'The ancient, arcane-focused language of the fallen floating city of Aeor.' });
    this._register({ id: 'marquesian', name: 'Marquesian', family: 'human_exandria', script: 'common', rarity: 'common', settings: ['exandria'], notes: 'The primary language of the continent of Marquet; also widely spoken on the Menagerie Coast.' });
    this._register({ id: 'naush', name: 'Naush', family: 'human_exandria', script: 'common', rarity: 'uncommon', settings: ['exandria'], notes: 'The native regional language of the Ki\'Nau people from the Menagerie Coast.' });
    this._register({ id: 'zemnian', name: 'Zemnian', family: 'human_exandria', script: 'zemnian', rarity: 'common', settings: ['exandria'], notes: 'An important language of the Dwendalian Empire; retains strong cultural roots in the Zemni Fields.' });
    this._register({ id: 'xhorhasian', name: 'Xhorhasian', family: 'monstrous', script: 'undercommon', rarity: 'uncommon', settings: ['exandria'], notes: 'A regional dialect or trade tongue used primarily within the Kryn Dynasty of Xhorhas.' });

    // ───────────────────────────────────────────────
    //  JAKANDOR LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'charonti_high', name: 'High Charonti', family: 'charonti_human', script: 'charonti_glyphs', rarity: 'uncommon', settings: ['jakandor'], notes: 'The formal, written language of the Charonti; used for magic, history, and necromantic theory.' });
    this._register({ id: 'charonti_low', name: 'Low Charonti', family: 'charonti_human', script: 'charonti_glyphs', rarity: 'common', settings: ['jakandor'], notes: 'The everyday spoken tongue of the Charonti citizens; less complex than the High form.' });
    this._register({ id: 'dead_speak', name: 'Dead-Speak', family: 'necromantic', script: 'spoken_only', rarity: 'uncommon', settings: ['jakandor'], notes: 'A specialized command-tongue used by Charonti necromancers to direct their mindless undead servants.' });
    this._register({ id: 'ancient_charonti', name: 'Ancient Charonti', family: 'charonti_human', script: 'charonti_glyphs', rarity: 'rare', settings: ['jakandor'], notes: 'The archaic precursor to modern Charonti; found in the ruins of the "Old Kingdom".' });
    this._register({ id: 'knorr', name: 'Knorr', family: 'knorr_human', script: 'spoken_only', rarity: 'common', settings: ['jakandor'], notes: 'The primary spoken language of the Knorr tribes; a practical, oral-only tongue.' });
    this._register({ id: 'knorr_battle_sign', name: 'Knorr Battle-Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['jakandor'], notes: 'A silent language of gestures and bird-calls used by Knorr scout-parties to coordinate ambushes.' });
    this._register({ id: 'knorr_totem_speak', name: 'Totem-Speak', family: 'secret_circle', script: 'spoken_only', rarity: 'rare', settings: ['jakandor'], notes: 'A ritualistic language used by Knorr shamans to communicate with the island\'s animal spirits.' });
    this._register({ id: 'ghoul_patter', name: 'Wild-Ghoul Patter', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['jakandor'], notes: 'A debased, feral version of Low Charonti spoken by the island\'s independent ghoul packs.' });
    this._register({ id: 'island_common', name: 'Jakandor Trade', family: 'universal', script: 'spoken_only', rarity: 'very_rare', settings: ['jakandor'], notes: 'A crude pidgin used only by the rare outcasts or prisoners who bridge the two cultures.' });
    this._register({ id: 'gnome_jakandor', name: 'Jakandorian Gnomish', family: 'gnomish', script: 'charonti_glyphs', rarity: 'common', settings: ['jakandor'], notes: 'The primary language of the gnome servant class; heavily influenced by Charonti technical terms.' });
    this._register({ id: 'technic_charonti', name: 'Technic Charonti', family: 'charonti_human', script: 'charonti_glyphs', rarity: 'uncommon', settings: ['jakandor'], notes: 'The high-level technical language used to describe the intersection of necromancy and machinery.' });
    this._register({ id: 'gnome_engine_code', name: 'Engine-Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['jakandor'], notes: 'A series of rhythmic clacks and hums gnomes use to "talk" to the Charonti golems and lifters.' });
    this._register({ id: 'gnome_slave_patter', name: 'Workshop Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['jakandor'], notes: 'A secret cant used by gnomes to share repair shortcuts or complain about Charonti masters.' });
    this._register({ id: 'spark_whisper', name: 'Spark-Whisper', family: 'necromantic', script: 'spoken_only', rarity: 'very_rare', settings: ['jakandor'], notes: 'A rare, intuitive language used by gnomish "Sparkers" to sense the flow of soul-energy in machines.' });

    // ───────────────────────────────────────────────
    //  LANKHMAR LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'lankhmarian', name: 'Lankhmarian', family: 'human_nehwon', script: 'lankhmarian', rarity: 'common', settings: ['lankhmar'], notes: 'The primary language of the City of the Black Toga; serves as a regional common tongue.' });
    this._register({ id: 'ehmish', name: 'Ehmish', family: 'human_nehwon', script: 'lankhmarian', rarity: 'uncommon', settings: ['lankhmar'], notes: 'The language of the Eight Cities; melodic and heavily influenced by maritime trade.' });
    this._register({ id: 'mingol', name: 'Mingol', family: 'human_nehwon', script: 'spoken_only', rarity: 'uncommon', settings: ['lankhmar'], notes: 'The harsh, staccato language of the nomadic horse-warriors and steppe-dwellers.' });
    this._register({ id: 'ilmetite', name: 'Ilmetite', family: 'human_nehwon', script: 'lankhmarian', rarity: 'uncommon', settings: ['lankhmar'], notes: 'Spoken in the land of Ilmet; known for its formal, archaic sentence structures.' });
    this._register({ id: 'quarmallian', name: 'Quarmallian', family: 'human_nehwon', script: 'quarmallian_glyphs', rarity: 'rare', settings: ['lankhmar'], notes: 'The ancient, decadent tongue of the subterranean kingdom of Quarmall.' });
    this._register({ id: 'sarheenish', name: 'Sarheenish', family: 'human_nehwon', script: 'lankhmarian', rarity: 'uncommon', settings: ['lankhmar'], notes: 'Spoken in the Eastern Lands; a flowery and highly descriptive language.' });
    this._register({ id: 'stygian_nehwon', name: 'Stygian (Nehwon)', family: 'human_nehwon', script: 'hieroglyphs', rarity: 'rare', settings: ['lankhmar'], notes: 'The sibilant language of the Shadow-land; distinct from the Hyborian Stygian.' });
    this._register({ id: 'rim_dialect_nehwon', name: 'Rim-Speak', family: 'human_nehwon', script: 'spoken_only', rarity: 'rare', settings: ['lankhmar'], notes: 'A fragmented dialect spoken by those living near the edge of the world.' });
    this._register({ id: 'ghoul_nehwon', name: 'Nehwon Ghoul', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['lankhmar'], notes: 'The sibilant, transparent-fleshed ghouls speak a dialect of ancient Lankhmarian.' });
    this._register({ id: 'rat_patter', name: 'Rat-Talk', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['lankhmar'], notes: 'A high-pitched, chittering tongue spoken by the intelligent rats of Lankhmar Below.' });
    this._register({ id: 'serpent_nehwon', name: 'Serpent-Tongue', family: 'serpentine', script: 'spoken_only', rarity: 'very_rare', settings: ['lankhmar'], notes: 'The ancient, hissing language of the reptilian inhabitants of the southern jungles.' });
    this._register({ id: 'simorgyan', name: 'Simorgyan', family: 'aquatic', script: 'spoken_only', rarity: 'rare', settings: ['lankhmar'], notes: 'The bubbling, liquid language of the sunken land of Simorgya.' });

    // CANTS

    this._register({ id: 'cant_lankhmar_thief', name: 'Guild Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['lankhmar'], notes: 'The highly complex jargon of the Lankhmar Thieves\' Guild; used to mask criminal intent.' });
    this._register({ id: 'beggar_sign', name: 'Beggar\'s Twitch', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['lankhmar'], notes: 'A non-verbal code of facial twitches and hand tremors used by the Beggars\' Guild.' });
    this._register({ id: 'sorcerous_nehwon', name: 'High Sorcery', family: 'secret_guild', script: 'arcane_runes', rarity: 'very_rare', settings: ['lankhmar'], notes: 'The ritual language used by wizards like Sheelba of the Eyeless Face.' });
    this._register({ id: 'mercenary_slang', name: 'Slayer\'s Code', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['lankhmar'], notes: 'A blunt, pragmatic cant used by sellswords and Northland mercenaries.' });

    // ───────────────────────────────────────────────
    //  RADIANT CITADEL LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'akandian', name: 'Akandian', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The melodic, trade-heavy language of the city-state of Akne.' });
    this._register({ id: 'atlayish', name: 'Atlayish', family: 'radiant_citadel_human', script: 'atlayish_glyphs', rarity: 'common', settings: ['radiant_citadel'], notes: 'The rhythmic, glyph-based language of the Atlayo people; uses tonal shifts.' });
    this._register({ id: 'dayawish', name: 'Dayawish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', notes: 'The lyrical language of the TAYAM people; known for its focus on community and family.' });
    this._register({ id: 'djayna', name: 'Djayna', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The primary language of the Djaynai people; often spoken with a distinct, airy cadence.' });
    this._register({ id: 'etlan', name: 'Etlan', family: 'radiant_citadel_human', script: 'etlan_pictographs', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the high-altitude Etlani people; utilizes complex pictographic symbols.' });
    this._register({ id: 'jalgish', name: 'Jalgish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The staccato, practical tongue of the Jalgiri people.' });
    this._register({ id: 'kelemish', name: 'Kelemish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the city-state of Kelemesh; rich in philosophical and legal terms.' });
    this._register({ id: 'sanamish', name: 'Sanamish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the Sanam people; known for its intricate honorifics.' });
    this._register({ id: 'shankhabish', name: 'Shankhabish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the Shankhabha people; incorporates many maritime and river-based terms.' });
    this._register({ id: 'siu_chiu', name: 'Siu Chiu', family: 'radiant_citadel_human', script: 'siu_chiu_glyphs', rarity: 'common', settings: ['radiant_citadel'], notes: 'The primary language of the Siu Chiu empire; a sophisticated and ancient tongue.' });
    this._register({ id: 'citadel_common', name: 'Radiant Common', family: 'universal', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The trade tongue of the Radiant Citadel; a blend of the fifteen founding languages.' });
    this._register({ id: 'dawn_patter', name: 'Dawn-Incense Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['radiant_citadel'], notes: 'A specialized jargon used by the Citadel\'s diplomats and spies to communicate in public.' });
    this._register({ id: 'ethereal_whisper', name: 'Ethereal Whisper', family: 'extraplanar', script: 'spoken_only', rarity: 'uncommon', settings: ['radiant_citadel'], notes: 'A sub-vocalized language used to navigate the Deep Ethereal surrounding the Citadel.' });
    this._register({ id: 'spirit_song_citadel', name: 'Ancestral Song', family: 'secret_circle', script: 'spoken_only', rarity: 'rare', settings: ['radiant_citadel'], notes: 'A ritualistic language used by the Kelemesh and Sanam people to honor their ancestors.' });
    this._register({ id: 'tekuish', name: 'Tekuish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the Tekuo people; known for its focus on nature and the environment.' });
    this._register({ id: 'yong_jing_tongue', name: 'Yong Jing', family: 'radiant_citadel_human', script: 'siu_chiu_glyphs', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the Yong Jing people; closely related to Siu Chiu but with distinct tonal variations.' });
    this._register({ id: 'zakarish', name: 'Zakarish', family: 'radiant_citadel_human', script: 'common', rarity: 'common', settings: ['radiant_citadel'], notes: 'The language of the Zakar peoples; often described as resonant and commanding.' });

    // ───────────────────────────────────────────────
    //  ROKUGAN / LEGEND OF THE FIVE RINGS LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'rokugani_high', name: 'High Rokugani', family: 'rokugani_human', script: 'kami_kanji', rarity: 'common', settings: ['l5r'], notes: 'The courtly language of the Great Clans; heavy on honorifics and indirectness.' });
    this._register({ id: 'rokugani_low', name: 'Low Rokugani', family: 'rokugani_human', script: 'nazumi_kana', rarity: 'common', settings: ['l5r'], notes: 'The "vulgar" tongue of peasants and merchants; direct and lacking formal flourishes.' });
    this._register({ id: 'kami_kanji', name: 'Old Rokugani', family: 'rokugani_human', script: 'kami_kanji', rarity: 'rare', settings: ['l5r'], notes: 'The archaic language of the Heavens and the first Emperors; used for ancient scrolls.' });
    this._register({ id: 'ivory_kingdoms', name: 'Ivory Kingdoms Tongue', family: 'foreign_human', script: 'ivory_glyphs', rarity: 'rare', settings: ['l5r'], notes: 'The language of the lands to the far south; rarely heard within the Empire.' });
    this._register({ id: 'yobanjin', name: 'Yobanjin', family: 'human_barbarian', script: 'spoken_only', rarity: 'uncommon', settings: ['l5r'], notes: 'The "barbarian" dialects of the tribes living beyond the northern mountains.' });
    this._register({ id: 'burning_sands', name: 'Sands-Speak', family: 'foreign_human', script: 'kalamaran', rarity: 'rare', settings: ['l5r'], notes: 'The language of the Caliphates and the Moto tribes before they joined the Unicorn.' });
    this._register({ id: 'nezumi', name: 'Nezumi-Bark', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['l5r'], notes: 'A rapid language of clicks, barks, and scent-markers used by the Ratling tribes.' });
    this._register({ id: 'naga_hiss', name: 'Akasha', family: 'serpentine', script: 'naga_glyphs', rarity: 'rare', settings: ['l5r'], notes: 'The sibilant, telepathic-linked language of the ancient Serpent Folk.' });
    this._register({ id: 'bakemono', name: 'Goblin-Cackle', family: 'tainted', script: 'spoken_only', rarity: 'uncommon', settings: ['l5r'], notes: 'The chaotic, screeching language of the Shadowlands goblins.' });
    this._register({ id: 'oni_tongue', name: 'Akuma_no_Kotoba', family: 'tainted', script: 'ghul_glyphs', rarity: 'rare', settings: ['l5r'], notes: 'The terrifying, unnatural language of demons from Jigoku.' });
    
    // CANTS

    this._register({ id: 'cant_kolat', name: 'The Silent Master', family: 'secret_guild', script: 'spoken_only', rarity: 'very_rare', settings: ['l5r'], notes: 'A code of double-meanings and hand signals used by the Kolat conspiracy.' });
    this._register({ id: 'cant_scop', name: 'Shadow-Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['l5r'], notes: 'The shinobi/spy cant used by the Scorpion Clan to relay intelligence.' });
    this._register({ id: 'shugenja_liturgy', name: 'Kami-Speak', family: 'secret_circle', script: 'kami_kanji', rarity: 'rare', settings: ['l5r'], notes: 'The ritual prayers and invocations used to commune with the elemental spirits.' });
    this._register({ id: 'monk_koan', name: 'The Way of Shinsei', family: 'secret_circle', script: 'nazumi_kana', rarity: 'uncommon', settings: ['l5r'], notes: 'A philosophical jargon used by the Brotherhood of Shinsei to discuss enlightenment.' });
    this._register({ id: 'ninja_cipher', name: 'Kuji-Kiri', family: 'secret_guild', script: 'spoken_only', rarity: 'very_rare', settings: ['l5r'], notes: 'A purely gestural "sign language" used by ninja for silent tactical coordination.' });


    // ───────────────────────────────────────────────
    //  WARCRAFT LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'common_azeroth', name: 'Common', family: 'universal', script: 'common', rarity: 'common', settings: ['warcraft'], notes: 'The trade tongue of the Alliance; natively spoken by humans from Stormwind, Lordaeron, and Kul Tiras.' });
    this._register({ id: 'orcish_warcraft', name: 'Orcish', family: 'orcish', script: 'common_runic', rarity: 'common', settings: ['warcraft'], notes: 'The primary language of the Horde; mandatory for all member races to learn for coordination.' });
    this._register({ id: 'low_common', name: 'Low Common', family: 'universal', script: 'spoken_only', rarity: 'uncommon', settings: ['warcraft'], notes: 'A simplified, crude version of Common spoken by gnolls, kobolds, and other lesser races.' });
    this._register({ id: 'gutterspeak', name: 'Gutterspeak', family: 'forsaken_human', script: 'common', rarity: 'common', settings: ['warcraft'], notes: 'The native tongue of the Forsaken; derived from the Lordaeronian dialect of Common.' });
    this._register({ id: 'gilnean', name: 'Gilnean', family: 'human_warcraft', script: 'common', rarity: 'common', settings: ['warcraft'], notes: 'The specific dialect of the kingdom of Gilneas; known for its distinct isolationist accents.' });
    this._register({ id: 'darnassian', name: 'Darnassian', family: 'elvish', script: 'darnassian', rarity: 'common', settings: ['warcraft'], notes: 'The ancient and primary language of the Night Elves; the root for Thalassian and Nazja.' });
    this._register({ id: 'thalassian', name: 'Thalassian', family: 'elvish', script: 'darnassian', rarity: 'common', settings: ['warcraft'], notes: 'Spoken by Blood Elves and High Elves; closely related to Darnassian but with more modern adaptations.' });
    this._register({ id: 'dwarven_ironforge', name: 'Dwarven', family: 'dwarven', script: 'runic', rarity: 'common', settings: ['warcraft'], notes: 'The deep, resonant tongue of the Ironforge and Dark Iron dwarves.' });
    this._register({ id: 'gnomish_azeroth', name: 'Gnomish', family: 'gnomish', script: 'common', rarity: 'common', settings: ['warcraft'], notes: 'An incredibly complex and technical language used by Gnomes and Mechagnomes.' });
    this._register({ id: 'zandali', name: 'Zandali', family: 'troll', script: 'unknown', rarity: 'common', settings: ['warcraft'], notes: 'The primary language of all Trolls, including Darkspear and Zandalari tribes.' });
    this._register({ id: 'taur_ahe', name: 'Taur-ahe', family: 'tauren', script: 'pictoforms', rarity: 'common', settings: ['warcraft'], notes: 'The rhythmic, low-frequency language of the Tauren and Highmountain tribes.' });
    this._register({ id: 'pandaren_warcraft', name: 'Pandaren', family: 'pandaren', script: 'calligraphy', rarity: 'common', settings: ['warcraft'], notes: 'Shared by all Pandaren regardless of faction; uses elegant brush-based calligraphy.' });
    this._register({ id: 'draenei_warcraft', name: 'Draenei', family: 'eredun', script: 'eredic', rarity: 'common', settings: ['warcraft'], notes: 'The melodic, light-infused tongue of the Draenei; related to the demonic Eredun.' });
    this._register({ id: 'eredun', name: 'Eredun', family: 'fiendish', script: 'eredic', rarity: 'rare', settings: ['warcraft'], notes: 'Also known as Demonic; the language of the Burning Legion.' });
    this._register({ id: 'kalimag', name: 'Kalimag', family: 'primordial', script: 'runic', rarity: 'rare', settings: ['warcraft'], notes: 'The elemental language spoken by giants and elementals; includes Aquan, Auran, Ignan, and Terran.' });
    this._register({ id: 'shath_yar', name: 'Shath\'Yar', family: 'old_god', script: 'spoken_only', rarity: 'very_rare', settings: ['warcraft'], notes: 'The terrifying, mind-bending language of the Old Gods and their Faceless minions.' });
    this._register({ id: 'titan_warcraft', name: 'Titan', family: 'titan_forged', script: 'runic_glyphs', rarity: 'very_rare', settings: ['warcraft'], notes: 'The language of the Makers; used by Titans and their high-ranking constructs.' });
    this._register({ id: 'nazja', name: 'Nazja', family: 'elvish', script: 'darnassian', rarity: 'uncommon', settings: ['warcraft'], notes: 'The sibilant, underwater language of the Naga; derived from ancient Darnassian.' });
    this._register({ id: 'vrykul', name: 'Vrykul', family: 'titan_forged', script: 'vrykul_runes', rarity: 'uncommon', settings: ['warcraft'], notes: 'The harsh, booming language of the giant warriors of Northrend; ancestor to modern Dwarven and Common.' });
    this._register({ id: 'earthen_archaic', name: 'Earthen Archaic', family: 'titan_forged', script: 'titan_runic', rarity: 'rare', settings: ['warcraft'], notes: 'A slow, grinding language spoken by the un-cursed Earthen; sounds like shifting stone.' });
    this._register({ id: 'mechagnome_binary', name: 'Clockwork Binary', family: 'gnomish', script: 'binary_unified', rarity: 'uncommon', settings: ['warcraft'], notes: 'A data-driven language used by the fully mechanical gnomes of Mimiron and Mechagon.' });
    this._register({ id: 'anubisath', name: 'Anubisath', family: 'titan_forged', script: 'qiraji_glyphs', rarity: 'rare', settings: ['warcraft'], notes: 'The resonant tongue of the stone giants created to guard Ahn\'Qiraj.' });
    this._register({ id: 'mogunic', name: 'Mogunic', family: 'titan_forged', script: 'mogunic_scroll', rarity: 'uncommon', settings: ['warcraft'], notes: 'The commanding, imperial language of the Mogu; shares roots with Zandali and Titan.' });
    this._register({ id: 'tolvir', name: 'Tol\'vir', family: 'titan_forged', script: 'titan_runic', rarity: 'uncommon', settings: ['warcraft'], notes: 'Spoken by the sphinx-like guardians of Uldum; focuses on solar and celestial concepts.' });
    this._register({ id: 'broken_draenic', name: 'Krokul', family: 'eredun', script: 'eredic', rarity: 'uncommon', settings: ['warcraft'], notes: 'A raspy, devolved version of Draenei spoken by the Broken tribes of Outland.' });
    this._register({ id: 'ogre_warcraft', name: 'Ogre (Azerothian)', family: 'ogre', script: 'spoken_only', rarity: 'common', settings: ['warcraft'], notes: 'A simple, booming language; two-headed ogres often speak a more sophisticated "High Ogre" variant.' });
    this._register({ id: 'gronn_speech', name: 'Gronn-Speak', family: 'ogre', script: 'spoken_only', rarity: 'rare', settings: ['warcraft'], notes: 'The primal, thunderous language of the Gronn and Magnaron of Draenor.' });
    this._register({ id: 'arakkoa', name: 'Arakkoa', family: 'humanoid_avian', script: 'arakkoa_glyphs', rarity: 'uncommon', settings: ['warcraft'], notes: 'A language of squawks and clicks; "High Arakkoa" includes solar-focused ritual terms.' });
    this._register({ id: 'saberon', name: 'Saberon', family: 'monstrous_feline', script: 'spoken_only', rarity: 'rare', settings: ['warcraft'], notes: 'A snarling, feline language spoken by the predatory cat-men of Draenor.' });

    // CANTS / DRUIDIC / CASTER

    this._register({ id: 'cant_rogue_warcraft', name: 'Thieves\' Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['warcraft'], notes: 'A coded mix of dialect and jargon used by rogues, spies, and cultists like the Defias Brotherhood.' });
    this._register({ id: 'druidic_talon', name: 'Language of the Winds', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['warcraft'], notes: 'A specialized druidic dialect used by Druids of the Talon and creatures of the sky.' });
    this._register({ id: 'druidic_claw', name: 'Ursine', family: 'secret_circle', script: 'pictoforms', rarity: 'very_rare', settings: ['warcraft'], notes: 'Also known as Furbolg; the primary language of bear-form druids and furbolg tribes.' });
    this._register({ id: 'kirin_tor_code', name: 'Kirin Tor Cipher', family: 'secret_guild', script: 'arcane_runes', rarity: 'rare', settings: ['warcraft'], notes: 'A coded language used by mages of Dalaran for secure arcane communication.' });
    this._register({ id: 'nerglish', name: 'Nerglish', family: 'monstrous', script: 'pictoforms', rarity: 'common', settings: ['warcraft'], notes: 'The bubbling, gargling language of Murlocs and Makrura.' });
    this._register({ id: 'ethereal_trade', name: 'Ethereal Trade-Speak', family: 'extraplanar', script: 'ethereal_glyphs', rarity: 'rare', settings: ['warcraft'], notes: 'A sophisticated, echoing language used by the Consortium and other Ethereal cartels.' });
    this._register({ id: 'void_whisper_minor', name: 'Void-Common', family: 'old_god', script: 'spoken_only', rarity: 'rare', settings: ['warcraft'], notes: 'A "safe" version of Shath\'Yar used by Void Elves and shadow priests to communicate with minor void entities.' });
    this._register({ id: 'nerubian_chitin', name: 'Nerubian', family: 'monstrous', script: 'qiraji_glyphs', rarity: 'uncommon', settings: ['warcraft'], notes: 'A clicking, mandible-based language spoken by the undead and living spider-lords of Azjol-Nerub.' });

    // ───────────────────────────────────────────────
    //  PATHFINDER / STARFINDER LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'erutaki', name: 'Erutaki', family: 'human_golarion', script: 'common', rarity: 'uncommon', settings: ['pathfinder'], notes: 'Native tongue of the Erutaki people of the Crown of the World.' });
    this._register({ id: 'hallit', name: 'Hallit', family: 'human_golarion', script: 'spoken_only', rarity: 'uncommon', settings: ['pathfinder'], notes: 'A harsh, guttural tongue spoken by the Kellid people in northern Avistan.' });
    this._register({ id: 'kelish', name: 'Kelish', family: 'human_golarion', script: 'kelish', rarity: 'common', settings: ['pathfinder'], notes: 'Language of the Padishah Empire of Kelesh; widely used in trade and poetry.' });
    this._register({ id: 'mwangi', name: 'Mwangi', family: 'human_golarion', script: 'spoken_only', rarity: 'common', settings: ['pathfinder'], notes: 'Also called Polyglot; a family of mutually intelligible dialects in the Mwangi Expanse.' });
    this._register({ id: 'osiriani', name: 'Osiriani', family: 'human_golarion', script: 'osiriani', rarity: 'common', settings: ['pathfinder'], notes: 'The most widespread language of Garund, descended from Ancient Osiriani.' });
    this._register({ id: 'shoanti', name: 'Shoanti', family: 'human_golarion', script: 'spoken_only', rarity: 'uncommon', settings: ['pathfinder'], notes: 'Spoken by the Shoanti people of Varisia; shares roots with Giant and Thassilonian.' });
    this._register({ id: 'skald', name: 'Skald', family: 'human_golarion', script: 'dwarven', rarity: 'common', settings: ['pathfinder'], notes: 'The sonorous, lilting tongue of the Lands of the Linnorm Kings.' });
    this._register({ id: 'taldane', name: 'Taldane', family: 'human_golarion', script: 'common', rarity: 'common', settings: ['pathfinder'], notes: 'The "Common" tongue of Avistan and northern Garund; evolved from ancient Azlanti.' });
    this._register({ id: 'tien', name: 'Tien', family: 'human_golarion', script: 'tien_pictographs', rarity: 'common', settings: ['pathfinder'], notes: 'The "Common" tongue of Tian Xia; a complex tonal language with thousands of pictographs.' });
    this._register({ id: 'varisian', name: 'Varisian', family: 'human_golarion', script: 'common', rarity: 'common', settings: ['pathfinder'], notes: 'The subtle, nuanced language of the nomadic Varisian people.' });
    this._register({ id: 'aklo', name: 'Aklo', family: 'eldritch', script: 'spoken_only', rarity: 'rare', settings: ['pathfinder'], notes: 'The language of otherworldly monsters, evil fey, and the Darklands.' });
    this._register({ id: 'ancient_osiriani', name: 'Ancient Osiriani', family: 'ancient_golarion', script: 'osiriani_hieroglyphs', rarity: 'rare', settings: ['pathfinder'], notes: 'The archaic tongue of the Pharaohs; partially understood by modern Osiriani speakers.' });
    this._register({ id: 'azlanti', name: 'Azlanti', family: 'ancient_golarion', script: 'azlanti', rarity: 'rare', settings: ['pathfinder'], notes: 'The language of the lost Azlanti Empire; foundational to Taldane and Thassilonian.' });
    this._register({ id: 'empyrean', name: 'Empyrean', family: 'extraplanar', script: 'celestial', rarity: 'uncommon', settings: ['pathfinder'], notes: 'Commonly known as Celestial; the musical language of good-aligned outsiders.' });
    this._register({ id: 'necril', name: 'Necril', family: 'undead', script: 'spoken_only', rarity: 'uncommon', settings: ['pathfinder'], notes: 'The language of ghouls and intelligent undead; a whispering, dry tongue.' });
    this._register({ id: 'shadowtongue', name: 'Shadowtongue', family: 'eldritch', script: 'spoken_only', rarity: 'rare', settings: ['pathfinder'], notes: 'The sibilant language of the Netherworld; spoken primarily in Nidal.' });
    this._register({ id: 'thassilonian', name: 'Thassilonian', family: 'ancient_golarion', script: 'thassilonian_runes', rarity: 'rare', settings: ['pathfinder'], notes: 'The language of ancient Thassilon; scholars prize its complex grammatical genders.' });
    this._register({ id: 'vudrani', name: 'Vudrani', family: 'human_golarion', script: 'vudrani', rarity: 'uncommon', settings: ['pathfinder'], notes: 'Spoken in distant Vudra; believed by its speakers to be the tongue of the gods.' });
    this._register({ id: 'barathu', name: 'Barathu', family: 'interplanetary_alien', script: 'spoken_only', rarity: 'uncommon', settings: ['starfinder'], notes: 'A language of telepathic resonance and color shifts used by the floating barathus of Bretheda.' });
    this._register({ id: 'kasatha', name: 'Kasatha', family: 'interplanetary_alien', script: 'kasatha_glyphs', rarity: 'common', settings: ['starfinder'], notes: 'The rhythmic, four-armed gestural and vocal language of the Kasatha; heavily traditional.' });
    this._register({ id: 'lashunta', name: 'Lashunta', family: 'interplanetary_alien', script: 'castrovelian', rarity: 'common', settings: ['starfinder'], notes: 'A melodic language from Castrovel; often supplemented by the race\'s natural telepathy.' });
    this._register({ id: 'shirren', name: 'Shirren', family: 'interplanetary_alien', script: 'shirren_chitin', rarity: 'common', settings: ['starfinder'], notes: 'A language of chitters and clicks, usually transmitted via telepathy for nuance.' });
    this._register({ id: 'triaxian', name: 'Triaxian', family: 'interplanetary_alien', script: 'triaxian', rarity: 'common', settings: ['starfinder'], notes: 'The language of the "Dragon Planet" Triaxus; varies based on the current generational season.' });
    this._register({ id: 'vesk', name: 'Vesk', family: 'interplanetary_alien', script: 'vesk_militaristic', rarity: 'common', settings: ['starfinder'], notes: 'The harsh, commanding tongue of the Veskarium empire.' });
    this._register({ id: 'ysoki', name: 'Ysoki', family: 'interplanetary_alien', script: 'common', rarity: 'common', settings: ['starfinder'], notes: 'The rapid-fire, high-pitched chatter of the Ratfolk; contains many technical loanwords.' });
    this._register({ id: 'aballonian', name: 'Aballonian', family: 'machine_logic', script: 'binary_unified', rarity: 'uncommon', settings: ['starfinder'], notes: 'The data-driven language of the robotic inhabitants of Aballon.' });
    this._register({ id: 'eoxian', name: 'Eoxian', family: 'undead', script: 'necril', rarity: 'uncommon', settings: ['starfinder'], notes: 'A modern, academic evolution of Necril used by the Bone Sages of Eox.' });
    this._register({ id: 'izalguun', name: 'Izalguun', family: 'deep_space_alien', script: 'spoken_only', rarity: 'rare', settings: ['starfinder'], notes: 'The language of the reclusive Izalguun; involves complex spatial concepts.' });
    this._register({ id: 'kalo', name: 'Kalo', family: 'interplanetary_alien', script: 'kalo_sonar', rarity: 'uncommon', settings: ['starfinder'], notes: 'A sonar-based language used by the aquatic Kalo of Kaster-7.' });
    this._register({ id: 'sarcesian', name: 'Sarcesian', family: 'interplanetary_alien', script: 'common', rarity: 'uncommon', settings: ['starfinder'], notes: 'The language of the winged inhabitants of the Diaspora asteroid belt.' });
    this._register({ id: 'verthani', name: 'Verthani', family: 'interplanetary_alien', script: 'verthani_logic', rarity: 'uncommon', settings: ['starfinder'], notes: 'Spoken on Verces; includes signals transmitted through the race\'s skin-pigmentation.' });

    // CANTS / DRUIDIC / CASTER

    this._register({ id: 'druidic_golarion', name: 'Druidic', family: 'secret_circle', script: 'druidic_ogham', rarity: 'very_rare', settings: ['pathfinder'], notes: 'The secret language of druids; strictly forbidden to non-initiates.' });
    this._register({ id: 'sakvroth', name: 'Sakvroth', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['pathfinder'], notes: 'A sign language used in the Darklands; often used interchangeably with Drow Sign Language.' });
    this._register({ id: 'thieves_cant_golarion', name: 'Thieves\' Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['pathfinder'], notes: 'A slang-heavy jargon used by criminal organizations like the Sczarni.' });
    this._register({ id: 'orvian', name: 'Orvian', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['pathfinder'], notes: 'Spoken by deep-dwelling races of the Darklands; a blend of Aklo and Terran.' });
    this._register({ id: 'senzar', name: 'Senzar', family: 'fey', script: 'spoken_only', rarity: 'very_rare', settings: ['pathfinder'], notes: 'The ancient language of the kami (spirits) in Tian Xia.' });
    this._register({ id: 'binary_data', name: 'Binary Data-Stream', family: 'machine_logic', script: 'binary_unified', rarity: 'common', settings: ['starfinder', 'multiverse'], notes: 'The universal language of computers and AIs; used by Technomancers.' });
    this._register({ id: 'cant_absalom_station', name: 'Station-Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['starfinder'], notes: 'The underworld jargon of the Spike and low-levels of Absalom Station.' });
    this._register({ id: 'drift_whisper', name: 'Drift-Speak', family: 'eldritch', script: 'spoken_only', rarity: 'very_rare', settings: ['starfinder'], notes: 'A fragmented, eerie language used to communicate with entities within the Drift.' });
    this._register({ id: 'hacker_argot', name: 'Net-Crawl', family: 'secret_guild', script: 'digital', rarity: 'rare', settings: ['starfinder', 'multiverse'], notes: 'A specialized leetspeak used by infosphere hackers and data-brokers.' });
    this._register({ id: 'xenoglossy', name: 'Xenoglossy', family: 'multiversal_trade', script: 'various', rarity: 'uncommon', settings: ['starfinder', 'multiverse'], notes: 'A hybrid trade-tongue designed for first-contact and inter-species diplomacy.' });

    // ───────────────────────────────────────────────
    //  WARHAMMER FANTASY LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'bretonnian', name: 'Bretonnian', family: 'human_old_world', script: 'classical', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The language of Bretonnia; similar to modern French and largely unchanged for centuries.' });
    this._register({ id: 'classical', name: 'Classical', family: 'human_old_world', script: 'classical', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'A dead language used by scholars and priests; the root of many modern human tongues.' });
    this._register({ id: 'estalian', name: 'Estalian', family: 'human_old_world', script: 'common', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The language of the Estalian kingdoms; similar to modern Spanish.' });
    this._register({ id: 'gospodarinyi', name: 'Kislevarin', family: 'human_old_world', script: 'cyrillic', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'Also known as Gospodarinyi; the primary language of Kislev.' });
    this._register({ id: 'norse', name: 'Norse', family: 'human_old_world', script: 'runic', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'The rugged tongue of Norsca; includes many dialects shared by northern tribes.' });
    this._register({ id: 'reikspiel', name: 'Reikspiel', family: 'human_old_world', script: 'common', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The official language of the Empire; the most widely used trade tongue in the Old World.' });
    this._register({ id: 'strigany', name: 'Strigany', family: 'human_old_world', script: 'spoken_only', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The nomadic tongue of the Strigany people; shares mysterious roots with Tilean.' });
    this._register({ id: 'tilean', name: 'Tilean', family: 'human_old_world', script: 'tilean_cursive', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The language of the Tilean city-states; known for its diverse regional accents.' });
    this._register({ id: 'ungol', name: 'Ungol', family: 'human_old_world', script: 'spoken_only', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'The language of the nomadic Ungol tribes of northern Kislev.' });
    this._register({ id: 'wastelander', name: 'Wastelander', family: 'human_old_world', script: 'common', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'A dialect spoken in the Wasteland and the trade-hub of Marienburg.' });
    this._register({ id: 'dark_tongue', name: 'Dark Tongue', family: 'fiendish', script: 'chaos_runes', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The potent, corrupting language of Chaos used by cultists and daemons.' });
    this._register({ id: 'druhir', name: 'Druhir', family: 'elvish', script: 'druchii_runes', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The "Black Elven" tongue of the Druchii; a blend of Eltharin and the Dark Tongue.' });
    this._register({ id: 'eltharin', name: 'Eltharin', family: 'elvish', script: 'eltharin_runes', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The core elven language; includes Tar-Eltharin (High Elves) and Fan-Eltharin (Wood Elves).' });
    this._register({ id: 'grumbarth', name: 'Grumbarth', family: 'ogre', script: 'spoken_only', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'The booming, simplistic language of the Ogres.' });
    this._register({ id: 'khazalid', name: 'Khazalid', family: 'dwarven', script: 'klinkarhun', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The ancient, unchanging language of the Dwarfs; rarely spoken in the presence of other races.' });
    this._register({ id: 'nehekharan', name: 'Nehekharan', family: 'undead', script: 'hieroglyphs', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The ancient, pictographic language of the Tomb Kings; used for necromancy.' });
    this._register({ id: 'queekish', name: 'Queekish', family: 'skaven', script: 'spoken_only', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'A rapid-fire, chittering language of the Skaven; a bastardization of the Dark Tongue.' });
    this._register({ id: 'ssissylk', name: 'Ssissyl\'k', family: 'monstrous_reptillian', script: 'glyphs', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The language of the Lizardmen, divided into caste-based dialects.' });

    // CANTS / DRUIDIC / CASTER

    this._register({ id: 'battle_tongue', name: 'Battle Tongue', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'A specialized military jargon of orders and signals developed by the goddess Myrmidia.' });
    this._register({ id: 'beast_tongue', name: 'Beast Tongue', family: 'chaos', script: 'spoken_only', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'A crude dialect of the Dark Tongue mixed with beastial grunts used by Beastmen.' });
    this._register({ id: 'druidic_warhammer', name: 'Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['warhammer_fantasy'], notes: 'The extremely rare, ancient tongue of the Old Druids of the Old World.' });
    this._register({ id: 'guilder', name: 'Guilder', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'A jargon used by trade and craft guilds, often mixing Classical and professional slang.' });
    this._register({ id: 'thieves_tongue_warhammer', name: 'Thieves\' Tongue', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'A localized code used by rogues; for example, Tilean and Imperial versions are distinct.' });
    this._register({ id: 'lingua_praestantia', name: 'Lingua Praestantia', family: 'arcane_human', script: 'eltharin_runes', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The tonal "high language" taught by Teclis; mandatory for safe spellcasting in the Imperial Colleges.' });
    this._register({ id: 'magick_elemental', name: 'Elemental Magick', family: 'arcane_human', script: 'common', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'A subdivision of Magick used for channelling elemental forces (Nature, Fire, Air).' });
    this._register({ id: 'magick_illusion', name: 'Illusionist Magick', family: 'arcane_human', script: 'common', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'A precise tonal variant used to weave phantasms and manipulate perception.' });
    this._register({ id: 'magick_necromantic', name: 'Necromantic Magick', family: 'arcane_human', script: 'hieroglyphs', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The dark, resonating variant used to raise and command the dead.' });
    this._register({ id: 'magick_wizardry', name: 'Wizardry', family: 'arcane_human', script: 'common', rarity: 'common', settings: ['warhammer_fantasy'], notes: 'The foundational arcane dialect used for standard battle magic and general spells.' });
    this._register({ id: 'arcane_dwarf', name: 'Arcane Dwarf (Runic)', family: 'dwarven', script: 'klinkarhun', rarity: 'very_rare', settings: ['warhammer_fantasy'], notes: 'Ancient form of Khazalid used solely for the creation of magical runes; known only to Runesmiths.' });
    this._register({ id: 'arcane_elf', name: 'Anoqeyån', family: 'elvish', script: 'eltharin_runes', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The "High Elven Arcane" tongue; significantly more complex and powerful than Lingua Praestantia.' });
    this._register({ id: 'entropic_daemonic', name: 'Entropic Daemonic', family: 'chaos', script: 'chaos_runes', rarity: 'rare', settings: ['warhammer_fantasy'], notes: 'The language used in all daemonic conjurations and pacts.' });
    this._register({ id: 'dhar', name: 'Dhar', family: 'chaos', script: 'chaos_runes', rarity: 'uncommon', settings: ['warhammer_fantasy'], notes: 'The "Dark Magic" cipher; represents the corrupted, mixed energy of all winds.' });
    this._register({ id: 'qhaysh', name: 'Qhaysh', family: 'high_magic', script: 'eltharin_runes', rarity: 'very_rare', settings: ['warhammer_fantasy'], notes: 'The "High Magic" cipher; all eight winds woven perfectly together.' });
 
    // ───────────────────────────────────────────────
    //  WARHAMMER 40K LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'high_gothic', name: 'High Gothic', family: 'imperial_human', script: 'high_gothic_runes', rarity: 'uncommon', settings: ['warhammer_40k'], notes: 'The sacred language of the Emperor and the Administratum; a pseudo-Latin tongue used for official decrees and tech-rituals.' });
    this._register({ id: 'low_gothic', name: 'Low Gothic', family: 'imperial_human', script: 'common', rarity: 'common', settings: ['warhammer_40k'], notes: 'The trade tongue of the Imperium; evolves into millions of regional dialects across the galaxy.' });
    this._register({ id: 'thoughtmark', name: 'Thoughtmark', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['warhammer_40k'], notes: 'A highly complex, silent sign language used by the Sisters of Silence for tactical coordination.' });
    this._register({ id: 'chthonian_40k', name: 'Chthonian', family: 'imperial_human', script: 'spoken_only', rarity: 'rare', settings: ['warhammer_40k'], notes: 'An ancient, guttural dialect from the mining world of Chthonia; associated with the Sons of Horus.' });
    this._register({ id: 'colchisian', name: 'Colchisian', family: 'imperial_human', script: 'spoken_only', rarity: 'rare', settings: ['warhammer_40k'], notes: 'The liturgical language of the world Colchis; known for its poetic and religious significance.' });
    this._register({ id: 'binharic_cant', name: 'Binharic Cant', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['warhammer_40k'], notes: 'A pure binary language used for rapid data transmission and mechanical liturgies.' });
    this._register({ id: 'hexamathic_code', name: 'Hexamathic Code', family: 'machine_logic', script: 'latin', rarity: 'very_rare', settings: ['warhammer_40k'], notes: 'A specialized, ultra-dense code used for complex technical calculations and machine-to-machine interactions.' });
    this._register({ id: 'lingua_technis', name: 'Lingua-Technis', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['warhammer_40k'], notes: 'Also known as Techna-Lingua; the official binary language of the Adeptus Mechanicus.' });
    this._register({ id: 'noospheric_bleed', name: 'Noospheric Bleed', family: 'machine_logic', script: 'spoken_only', rarity: 'very_rare', settings: ['warhammer_40k'], notes: 'A digital-reality language used to interact with the Noosphere; requires an MIU implant.' });
    this._register({ id: 'scrap_code', name: 'Scrap-code', family: 'chaos', script: 'binary_unified', rarity: 'rare', settings: ['warhammer_40k'], notes: 'A malignant, viral version of the machine tongue corrupted by Chaos.' });
    this._register({ id: 'aeldari_lexicon', name: 'Aeldari Lexicon', family: 'aeldari', script: 'aeldari_runes', rarity: 'uncommon', settings: ['warhammer_40k'], notes: 'The highly complex language of the Eldar; relies heavily on subtle posture and psychic subtext.' });
    this._register({ id: 'ork_glyph', name: 'Orkish', family: 'monstrous', script: 'ork_glyphs', rarity: 'common', settings: ['warhammer_40k'], notes: 'A crude jumble of sounds and borrowed Gothic terms; largely onomatopoeic.' });
    this._register({ id: 'tau_lexicon', name: 'T\'au Lexicon', family: 'tau', script: 'tau_glyphs', rarity: 'uncommon', settings: ['warhammer_40k'], notes: 'A precise, logical language used by the T\'au Empire; divided into caste-based dialects.' });
    this._register({ id: 'necrontyr', name: 'Necron Lexicon', family: 'necron', script: 'necrontyr_glyphs', rarity: 'rare', settings: ['warhammer_40k'], notes: 'An ancient, cold language that predates most life in the galaxy; typically translated via machine-protocols.' });
    this._register({ id: 'hrud_lexicon', name: 'Hrud Lexicon', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['warhammer_40k'], notes: 'The chittering, time-distorted language of the reclusive Hrud.' });

    // ───────────────────────────────────────────────
    //  PALLADIUM FANTASY LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'eastern_common', name: 'Eastern Common', family: 'human_palladium', script: 'common', rarity: 'common', settings: ['palladium_fantasy'], notes: 'The primary trade tongue of the Eastern Territory and the most widespread human language.' });
    this._register({ id: 'western_human', name: 'Western', family: 'human_palladium', script: 'western', rarity: 'common', settings: ['palladium_fantasy'], notes: 'Spoken in the Western Empire; sophisticated and used as the language of diplomacy.' });
    this._register({ id: 'southern_human', name: 'Southern', family: 'human_palladium', script: 'common', rarity: 'uncommon', settings: ['palladium_fantasy'], notes: 'The language of the Land of the South; melodic and often used in poetry.' });
    this._register({ id: 'timiro', name: 'Timiro', family: 'human_palladium', script: 'common', rarity: 'uncommon', settings: ['palladium_fantasy'], notes: 'The specific dialect of the Timiro Kingdom; heavy with nautical and mercantile terms.' });
    this._register({ id: 'byzantine', name: 'Byzantine', family: 'human_palladium', script: 'spoken_only', rarity: 'uncommon', settings: ['palladium_fantasy'], notes: 'Spoken by the northern wilderness tribes and Bizantium sailors.' });
    this._register({ id: 'elven_palladium', name: 'Elven', family: 'elvish', script: 'espruar', rarity: 'common', settings: ['palladium_fantasy'], notes: 'Also called Dragonese; the oldest living language, shared by Elves, Dragons, and Titans.' });
    this._register({ id: 'dwarven_palladium', name: 'Dwarven', family: 'dwarven', script: 'dwarven_runes', rarity: 'common', settings: ['palladium_fantasy'], notes: 'Also called Gnomish; a guttural, practical language shared by Dwarves, Gnomes, and Troglodytes.' });
    this._register({ id: 'gobblely', name: 'Gobblely', family: 'goblinoid', script: 'spoken_only', rarity: 'common', settings: ['palladium_fantasy'], notes: 'A broken, screeching language shared by Goblins, Orcs, Hobgoblins, and Kobolds.' });
    this._register({ id: 'ogre_palladium', name: 'Ogre', family: 'ogre', script: 'spoken_only', rarity: 'uncommon', settings: ['palladium_fantasy'], notes: 'A crude language with many loanwords from Gobblely and Giant.' });
    this._register({ id: 'giant_palladium', name: 'Giant', family: 'giant', script: 'dwarven_runes', rarity: 'uncommon', settings: ['palladium_fantasy'], notes: 'The booming tongue of Trolls, Cyclops, and True Giants.' });
    this._register({ id: 'wolfen', name: 'Wolfen', family: 'monstrous_canine', script: 'wolfen_glyphs', rarity: 'common', settings: ['palladium_fantasy'], notes: 'The official language of the Wolfen Empire; highly structured and military-focused.' });

    // CANTS / DRUIDIC / CASTER

    this._register({ id: 'druidic_palladium', name: 'Druidic', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['palladium_fantasy'], notes: 'The secret language of nature, shared by Druids and Scaramouche.' });
    
    this._register({ id: 'magick_palladium', name: 'Mystic Quarter', family: 'arcane_human', script: 'hamarfae', rarity: 'rare', settings: ['palladium_fantasy'], notes: 'The specific tonal language used for Wizardry and spellcasting.' });
    this._register({ id: 'demongogian', name: 'Demongogian', family: 'fiendish', script: 'spoken_only', rarity: 'rare', settings: ['palladium_fantasy'], notes: 'The language of demons, deevils, and other supernatural horrors.' });
    this._register({ id: 'runic_arcane', name: 'Arcane Runic', family: 'ancient_arcane', script: 'ancient_runes', rarity: 'very_rare', settings: ['palladium_fantasy'], notes: 'The dead language of the Great Old Ones; used to create Rune Weapons.' });
    this._register({ id: 'cant_eastern', name: 'Eastern Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['palladium_fantasy'], notes: 'The thieves\' cant used in the pirate ports and trade cities of the East.' });
    this._register({ id: 'monk_vow', name: 'The Silent Vow', family: 'secret_circle', script: 'spoken_only', rarity: 'rare', settings: ['palladium_fantasy'], notes: 'A sign-language used by the monks of the Great Library.' });
    this._register({ id: 'wolfen_scout_code', name: 'Iron-Paw Signal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['palladium_fantasy'], notes: 'A non-verbal code used by Wolfen Quell-thieves and scouts.' });

    // ───────────────────────────────────────────────
    //  RIFTS LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'american_english', name: 'American_English', family: 'human_rifts', script: 'common', rarity: 'common', settings: ['rifts'], notes: 'The primary trade tongue of North America and the Coalition States.' });
    this._register({ id: 'german_rifts', name: 'German', family: 'human_rifts', script: 'common', rarity: 'common', settings: ['rifts'], notes: 'The common trade language of the New German Republic and much of Europe.' });
    this._register({ id: 'spanish_rifts', name: 'Spanish', family: 'human_rifts', script: 'common', rarity: 'common', settings: ['rifts'], notes: 'Dominant in South America, the Vampire Kingdoms, and parts of the Magic Zone.' });
    this._register({ id: 'chinese_rifts', name: 'Chinese', family: 'human_rifts', script: 'pictographs', rarity: 'uncommon', settings: ['rifts'], notes: 'Spoken in the Geo-Front and the various warring states of post-Rifts China.' });
    this._register({ id: 'japanese_rifts', name: 'Japanese', family: 'human_rifts', script: 'kanji', rarity: 'uncommon', settings: ['rifts'], notes: 'The language of the New Republic of Japan and the traditionalist Oni-hunters.' });
    this._register({ id: 'russian_rifts', name: 'Russian', family: 'human_rifts', script: 'cyrillic', rarity: 'uncommon', settings: ['rifts'], notes: 'Spoken by the Warlords of Russia and the Sovietski.' });
    this._register({ id: 'techno_can', name: 'Techno-Can', family: 'machine_logic', script: 'digital', rarity: 'uncommon', settings: ['rifts', 'multiverse'], notes: 'A high-speed, data-dense language used by pilots, borgs, and AIs for technical readouts.' });
    this._register({ id: 'ley_line_drifter', name: 'Line-Speak', family: 'secret_circle', script: 'spoken_only', rarity: 'rare', settings: ['rifts'], notes: 'A sub-vocalized jargon used by Ley Line Walkers to discuss "tides" and "surges" in the magic flow.' });
    this._register({ id: 'splugorthian', name: 'Splugorthian', family: 'fiendish', script: 'atlantian_runes', rarity: 'rare', settings: ['rifts'], notes: 'The trade language of the interdimensional Splugorth Empire; used across Atlantis.' });
    this._register({ id: 'true_atlantian', name: 'True Atlantian', family: 'ancient_human', script: 'atlantian_runes', rarity: 'rare', settings: ['rifts'], notes: 'The archaic, high-brow language of the Undead Slayers and the Atlantian clans.' });
    this._register({ id: 'dog_speak', name: 'Dog-Speak', family: 'mutant', script: 'spoken_only', rarity: 'uncommon', settings: ['rifts'], notes: 'A mix of growls, yips, and simplified American used by Coalition Dog Boys.' });
    this._register({ id: 'psi_talk', name: 'Psi-Talk', family: 'psionic', script: 'spoken_only', rarity: 'rare', settings: ['rifts'], notes: 'A telepathic-assisted language used by Mind Melters and Bursters for silent coordination.' });
    this._register({ id: 'simvan', name: 'Simvan', family: 'beastfolk', script: 'spoken_only', rarity: 'uncommon', settings: ['rifts'], notes: 'The guttural, aggressive tongue of the Monster Riders of the West.' });
    this._register({ id: 'db_patter', name: 'D-Bee Slang', family: 'polyglot', script: 'spoken_only', rarity: 'common', settings: ['rifts'], notes: 'A constantly shifting jargon used by various "Dimensional Beings" to communicate in rift-towns.' });
    this._register({ id: 'code_dead_band', name: 'Dead-Band Cipher', family: 'secret_guild', script: 'binary_unified', rarity: 'rare', settings: ['rifts'], notes: 'Military encryption used by the Coalition States for silent radio and tight-beam laser comms.' });
    this._register({ id: 'tw_glyph_logic', name: 'Techno-Wizardry', family: 'techno_arcane', script: 'arcane_runes', rarity: 'uncommon', settings: ['rifts', 'multiverse'], notes: 'A hybrid language of physics and sorcery; used to "program" Ley Line energy into machinery.' });
    this._register({ id: 'psi_medical_cant', name: 'Mind-Mend Patter', family: 'secret_circle', script: 'spoken_only', rarity: 'rare', settings: ['rifts'], notes: 'A sub-vocalized jargon used by Mind Doctors and Psionic Healers to synchronize during surgery.' });
    this._register({ id: 'cant_chop_shop', name: 'Suture-Slang', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['rifts', 'multiverse'], notes: 'Used by Cyber-Docs and black-market surgeons; heavy on terms for "scrap" and "chrome".' });
    this._register({ id: 'tele-code', name: 'Tele-Pulse', family: 'psionic', script: 'spoken_only', rarity: 'very_rare', settings: ['rifts', 'multiverse'], notes: 'A purely thought-based data compression language used by powerful Psychics to transmit memories instantly.' });
    this._register({ id: 'glitter_boy_comms', name: 'Chrome-Voice', family: 'secret_guild', script: 'common', rarity: 'rare', settings: ['rifts'], notes: 'The specialized tactical jargon used by Glitter Boy pilots to avoid interference from audio-kinetic magic.' });

    // ───────────────────────────────────────────────
    //  ROBOTECH LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'zentraedi', name: 'Zentraedi', family: 'alien_robotech', script: 'zentraedi_glyphs', rarity: 'common', settings: ['robotech'], notes: 'The harsh, military-focused language of the giant warrior race; includes many terms for battle tactics.' });
    this._register({ id: 'tirolian', name: 'Tirolian', family: 'alien_robotech', script: 'tirolian_cursive', rarity: 'uncommon', settings: ['robotech'], notes: 'The sophisticated, scientific language of the Robotech Masters; root of Zentraedi.' });
    this._register({ id: 'invid_sensor_pulse', name: 'Invid Pulse', family: 'alien_robotech', script: 'spoken_only', rarity: 'rare', settings: ['robotech'], notes: 'A non-verbal, proto-cultural resonance used by the Invid; involves sensing Protoculture signatures.' });

    // ───────────────────────────────────────────────
    //  TMNT and AFTER THE BOMB LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'feral_talk', name: 'Feral-Talk', family: 'mutant_beast', script: 'spoken_only', rarity: 'common', settings: ['tmnt', 'after_the_bomb'], notes: 'A blend of human speech and ancestral animal vocalizations; varies by species group (Canine, Feline, etc.).' });
    this._register({ id: 'bio_cant', name: 'Bio-Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['tmnt', 'after_the_bomb'], notes: 'A specialized jargon used by geneticists and "Chimera-Docs" to discuss mutation stability.' });
    this._register({ id: 'rodent_whisper', name: 'Rodent-Whisper', family: 'mutant_beast', script: 'spoken_only', rarity: 'uncommon', settings: ['tmnt'], notes: 'A high-frequency language used by mutated rats, mice, and hamsters for urban infiltration.' });
    this._register({ id: 'empire_of_humanity', name: 'Pure-Speak', family: 'human_rifts', script: 'common', rarity: 'uncommon', settings: ['after_the_bomb'], notes: 'The rigid, archaic "Old American" used by the Empire of Humanity to distinguish from mutants.' });

    // ───────────────────────────────────────────────
    //  STAR WARS LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'abyssal_sw', name: 'Abyssin', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The primitive, monosyllabic language of the cyclopean Abyssins from Byss.' });
    this._register({ id: 'adarian', name: 'Adarian', family: 'alien_starwars', script: 'adarian_glyphs', rarity: 'rare', settings: ['star_wars'], notes: 'Uses the Adarians\' unique throat pouches to create subsonic resonating tones.' });
    this._register({ id: 'agarian', name: 'Agarian', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The fungal-based tonal language of the Agarians.' });
    this._register({ id: 'amanese', name: 'Amanese', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Amanin; utilizes a complex system of chirps and clicks.' });
    this._register({ id: 'ammaran', name: 'Ammaran', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'Spoken by the fox-like Ammarans; involves many high-pitched trills.' });
    this._register({ id: 'anari', name: 'Anari', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The regional language of the Anarrian sector.' });
    this._register({ id: 'ancients_sw', name: 'Ancient Core', family: 'ancient_starwars', script: 'celestial', rarity: 'extinct', settings: ['star_wars'], notes: 'The precursor to Galactic Basic; found in Pre-Republic ruins.' });
    this._register({ id: 'andatese', name: 'Andatese', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The melodic, multi-layered language of the Andat.' });
    this._register({ id: 'anshin', name: 'Anshin', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local tongue of the Anshis system.' });
    this._register({ id: 'anquat', name: 'Anquat', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The aquatic-vocal language of the Anx.' });
    this._register({ id: 'arconese', name: 'Arconese', family: 'alien_starwars', script: 'arconese_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'The sibilant language of the Arcona; often involves pheromonal cues.' });
    this._register({ id: 'arkanian', name: 'Arkanian', family: 'human_starwars', script: 'arkanian_arithmetic', rarity: 'uncommon', settings: ['star_wars'], notes: 'A highly technical and scientific language used by Arkanian geneticists.' });
    this._register({ id: 'aryth', name: 'Aryth', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The whistling language of the Arythian nomads.' });
    this._register({ id: 'astromech_binary', name: 'Binary (Astromech)', family: 'machine_logic', script: 'binary_unified', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'A series of beeps and whistles used by R-series droids; standard for navicomputers.' });
    this._register({ id: 'atrisian', name: 'Atrisian', family: 'human_starwars', script: 'atrisian_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'An ancient, formal human tongue from the world of Atrisia.' });
    this._register({ id: 'aurabesh', name: 'Galactic Basic (Aurebesh)', family: 'universal', script: 'aurebesh', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'The universal trade tongue of the galaxy; the "Common" of Star Wars.' });
    this._register({ id: 'ayrou', name: 'Ayrou', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The high-pitched, song-like language of the Ayrou.' });
    this._register({ id: 'balosar', name: 'Balosar', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A quick, whispering tongue often used in the galactic underworld.' });
    this._register({ id: 'barabel', name: 'Barabel', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A sibilant, predatory language; Barabels often refer to themselves in the third person.' });
    this._register({ id: 'bartokk', name: 'Bartokk', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The clicking, hive-mind-influenced language of the Bartokk.' });
    this._register({ id: 'besalisk', name: 'Besalisk', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A booming, jovial language; often involves complex hand-gestures.' });
    this._register({ id: 'binary_droid', name: 'Droidspeak', family: 'machine_logic', script: 'binary_unified', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'The standard data-transfer language between non-organic entities.' });
    this._register({ id: 'bit_thaevarian', name: 'Bit-Thaevarian', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The rhythmic, percussive language of the Bit-Thaevarians.' });
    this._register({ id: 'bith_siiesis', name: 'Bith', family: 'alien_starwars', script: 'bith_musical', rarity: 'common', settings: ['star_wars'], notes: 'A highly sophisticated language that treats mathematics and music as grammar.' });
    this._register({ id: 'bocce', name: 'Bocce', family: 'multiversal_trade', script: 'common', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'A trade pidgin designed for communication between different species and droids.' });
    this._register({ id: 'bothese', name: 'Bothese', family: 'alien_starwars', script: 'bothese_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'The language of the Bothans; incorporates "The Bothan Way" social cues.' });
    this._register({ id: 'caamasi', name: 'Caamasi', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A gentle, melodic language; Caamasi can share memories (Memnii) through specific phrases.' });
    this._register({ id: 'catharese', name: 'Catharese', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A growling, feline language spoken by the Cathar.' });
    this._register({ id: 'cerean', name: 'Cerean', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'Requires the Cereans\' binary brains to track multiple conversational threads.' });
    this._register({ id: 'chevin', name: 'Chevin', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The trumpeting, low-frequency language of the Chevin.' });
    this._register({ id: 'cipher_imperial', name: 'Imperial Code', family: 'secret_guild', script: 'binary_unified', rarity: 'rare', settings: ['star_wars'], notes: 'Mathematical encryption used by Imperial Intelligence and the ISB.' });
    this._register({ id: 'cipher_rebel', name: 'Rebel Signal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A jargon-heavy code used by the Alliance to Restore the Republic.' });
    this._register({ id: 'clawdite', name: 'Clawdite', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A sibilant language; often used by shapeshifters to identify their own kind.' });
    this._register({ id: 'code_black_sun', name: 'Black Sun Shadow', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The specialized cant of the Black Sun crime syndicate.' });
    this._register({ id: 'code_jedi', name: 'Jedi Battle-Sign', family: 'secret_circle', script: 'spoken_only', rarity: 'very_rare', settings: ['star_wars'], notes: 'A silent language of finger-gestures and Force-pulses used for tactical stealth.' });
    this._register({ id: 'code_sith', name: 'Sith Qâlis', family: 'secret_circle', script: 'sith_hieroglyphs', rarity: 'very_rare', settings: ['star_wars'], notes: 'A forbidden code used to hide dark-side knowledge; causes unease in listeners.' });
    this._register({ id: 'corellian', name: 'Corellian', family: 'human_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A fast-paced, slang-heavy dialect of Basic native to Corellia.' });
    this._register({ id: 'dantooini', name: 'Dantooini', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The rustic, agrarian dialect of the world of Dantooine.' });
    this._register({ id: 'dashade', name: 'Dashade', family: 'alien_starwars', script: 'spoken_only', rarity: 'extinct', settings: ['star_wars'], notes: 'A harsh, gravelly language spoken by Force-resistant assassins.' });
    this._register({ id: 'dathomiri', name: 'Dathomiri', family: 'human_starwars', script: 'witch_runes', rarity: 'rare', settings: ['star_wars'], notes: 'The sibilant, ritualistic language of the Nightsisters.' });
    this._register({ id: 'devaronese', name: 'Devaronese', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A low-pitched, vibratory language; females and males often use different tonal registers.' });
    this._register({ id: 'diagonal', name: 'Diagonal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A sophisticated slicing cant used by hackers to discuss exploits in plain sight.' });
    this._register({ id: 'dotar', name: 'Dotar', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The sibilant, hiss-heavy language of the Dressellians.' });
    this._register({ id: 'draethos', name: 'Draethos', family: 'alien_starwars', script: 'draethos_glyphs', rarity: 'rare', settings: ['star_wars'], notes: 'A cold, logical language spoken by a predatory, long-lived warrior race.' });
    this._register({ id: 'dug_tongue', name: 'Dug', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A barking, aggressive language; often involves physical posturing with the feet.' });
    this._register({ id: 'duros', name: 'Duros', family: 'alien_starwars', script: 'durese', rarity: 'common', settings: ['star_wars'], notes: 'One of the oldest space-faring languages; the root of many navigational technical terms.' });
    this._register({ id: 'ebenn_laaq', name: 'Ebenn Laaq', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The rapid, melodic language of the Elom.' });
    this._register({ id: 'echani', name: 'Echani', family: 'human_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A language where combat and movement are used to convey complex emotional states.' });
    this._register({ id: 'enuncia_sw', name: 'Enuncia', family: 'force_attuned', script: 'unknown', rarity: 'artifact', settings: ['star_wars', 'multiverse'], notes: 'A primordial language that manipulates reality itself; extremely dangerous to the speaker.' });
    this._register({ id: 'evocii', name: 'Evocii', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The melancholic, dying language of the original inhabitants of Nal Hutta.' });
    this._register({ id: 'ewokese', name: 'Ewokese', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A primitive language of chirps and barks; incorporates many terms for forest survival.' });
    this._register({ id: 'falleen', name: 'Falleen', family: 'alien_starwars', script: 'falleen_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'A sibilant language; meaning is often modified by the speaker’s pheromonal output.' });
    this._register({ id: 'feeorin', name: 'Feeorin', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A harsh, gravelly language spoken by the long-lived inhabitants of Odryn.' });
    this._register({ id: 'firrerreo', name: 'Firrerreo', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A song-like language that can only be fully understood when sung in harmony.' });
    this._register({ id: 'force_communion', name: 'Force-Speak', family: 'force_attuned', script: 'spoken_only', rarity: 'very_rare', settings: ['star_wars', 'multiverse'], notes: 'Purely telepathic communication via the Force; bypasses linguistic barriers.' });
    this._register({ id: 'frozian', name: 'Frozian', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The whistling, multi-tonal language of the feline-like Frozians.' });
    this._register({ id: 'gadal', name: 'Gadal', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The native tongue of the Gadal people.' });
    this._register({ id: 'galactic_sign', name: 'Basic Sign', family: 'universal', script: 'spoken_only', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'The standard non-verbal language; used by many species for silent trade.' });
    this._register({ id: 'gamorrean', name: 'Gamorrean', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A language consisting almost entirely of grunts, squeals, and snorts.' });
    this._register({ id: 'geanoshian', name: 'Geonosian', family: 'alien_starwars', script: 'geonosian_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'A clicking, strident language; involves the rubbing of chitinous plates.' });
    this._register({ id: 'geran', name: 'Geran', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The local language of the Geran system.' });
    this._register({ id: 'givin', name: 'Givin', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language based on mathematical equations; Givin consider math the only "true" grammar.' });
    this._register({ id: 'gran', name: 'Gran', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A rhythmic language; meaning is often conveyed through subtle eye movements.' });
    this._register({ id: 'gungese', name: 'Gungan Basic', family: 'multiversal_trade', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A dialect of Basic heavily modified by Gungan vocal patterns and nautical slang.' });
    this._register({ id: 'habassa', name: 'Habassa', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the multi-armed Habassa.' });
    this._register({ id: 'hapan', name: 'Hapan', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The elegant, isolationist language of the Hapes Consortium.' });
    this._register({ id: 'harkul', name: 'Harkul', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A primitive, booming language spoken by the Harkul tribes.' });
    this._register({ id: 'has_tiki', name: 'Has Tiki', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The language of the Has tribes.' });
    this._register({ id: 'hattian', name: 'Hattian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A human dialect from the Hutta sector, heavily influenced by Huttese.' });
    this._register({ id: 'herglic', name: 'Herglic', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A booming language; Herglics often include gambling terms in everyday speech.' });
    this._register({ id: 'high_galactic', name: 'High Galactic', family: 'force_attuned', script: 'high_galactic', rarity: 'rare', settings: ['star_wars', 'multiverse'], notes: 'An elite, archaic version of Basic used in Jedi Archives and by the Core World aristocracy.' });
    this._register({ id: 'ho\'din', name: 'Ho\'din', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A gentle language; focuses on botanical and ecological concepts.' });
    this._register({ id: 'hrakert', name: 'Hrakert', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The clicking, sibilant language of the Selkath.' });
    this._register({ id: 'hutt_cipher', name: 'Cartel Code', family: 'secret_guild', script: 'huttese_glyphs', rarity: 'rare', settings: ['star_wars'], notes: 'Encryption used by the Hutt Clans for smuggling manifests and bounties.' });
    this._register({ id: 'hutt_vulgar', name: 'Low Huttese', family: 'multiversal_trade', script: 'spoken_only', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'The "Street" version of Huttese; the trade tongue of the Outer Rim.' });
    this._register({ id: 'huttese', name: 'Huttese', family: 'alien_starwars', script: 'huttese_glyphs', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'The primary language of the Hutt Cartel and much of the galactic underworld.' });
    this._register({ id: 'huu_jin', name: 'Huu Jin', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The rhythmic, percussive language of the Huu.' });
    this._register({ id: 'iana', name: 'Iana', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A quick, tonal language spoken by the inhabitants of the Ianni system.' });
    this._register({ id: 'iktotchese', name: 'Iktotchese', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'Spoken by the precognitive Iktotchi; uses specific inflections to indicate future vs. present tense.' });
    this._register({ id: 'illodan', name: 'Illodan', family: 'human_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'A localized human dialect from the Outer Rim territories.' });
    this._register({ id: 'illunian', name: 'Illunian', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The melodic, resonant language of the Illun.' });
    this._register({ id: 'imm_code', name: 'Imperial Military Mode', family: 'secret_guild', script: 'binary_unified', rarity: 'rare', settings: ['star_wars'], notes: 'High-speed encrypted data-burst language used by Imperial droids and cruisers.' });
    this._register({ id: 'imperium_high', name: 'High Imperial', family: 'secret_guild', script: 'high_galactic', rarity: 'rare', settings: ['star_wars'], notes: 'A coded, formal version of Basic used by the Imperial High Command.' });
    this._register({ id: 'iri', name: 'Iri', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The whispering, sibilant language of the Iri.' });
    this._register({ id: 'ishi_tib', name: 'Ishi Tib', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A series of honks and squeaks; Ishi Tib often converse in communal rhythmic cycles.' });
    this._register({ id: 'isklon', name: 'Isklon', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The underwater vocalizations of the Isklonian people.' });
    this._register({ id: 'isiz', name: 'Isiz', family: 'human_starwars', script: 'isiz_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'The native human tongue of the world Onderon; used in ancient Iziz poetry.' });
    this._register({ id: 'ithorese', name: 'Ithorian', family: 'alien_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'Requires the Ithorians\' twin mouths; sounds like stereophonic music to other species.' });
    this._register({ id: 'iun', name: 'Iun', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The staccato, percussive language of the Iun tribes.' });
    this._register({ id: 'iyra', name: 'Iyra', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'An ultrasonic language spoken by the aquatic Iyra.' });
    this._register({ id: 'jawaese', name: 'Jawaese', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A rapid-fire language of chirps and squeaks; relies heavily on pheromonal "scent-talk".' });
    this._register({ id: 'jawa_trade', name: 'Jawa Trade Talk', family: 'multiversal_trade', script: 'spoken_only', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'A simplified version of Jawaese used to haggle with "groundlings" and droid-buyers.' });
    this._register({ id: 'jedi_archaic', name: 'Old Jedi', family: 'force_attuned', script: 'jedi_runes', rarity: 'very_rare', settings: ['star_wars'], notes: 'Used in the earliest Jedi texts; syllables are designed to resonate with Light Side energy.' });
    this._register({ id: 'jen_jiidai', name: 'Jen\'jiidai', family: 'force_attuned', script: 'sith_hieroglyphs', rarity: 'artifact', settings: ['star_wars'], notes: 'The "Dark Jedi" tongue; a precursor to the modern Sith language.' });
    this._register({ id: 'jensarai', name: 'Jensarai Code', family: 'force_attuned', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A secretive dialect used by the Jensarai order to discuss Force-imbued metallurgy.' });
    this._register({ id: 'jere', name: 'Jere', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Jer people; known for its complex vowel shifts.' });
    this._register({ id: 'jicarph', name: 'Jicarph', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The melodic, multi-tonal tongue of the Jica.' });
    this._register({ id: 'jiidai', name: 'Jiidai', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The local language of the world Jidai.' });
    this._register({ id: 'juhah', name: 'Juhah', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The guttural, growling language of the Juhah tribes.' });
    this._register({ id: 'jukassan', name: 'Jukassan', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The rhythmic, tonal language of the Jukassa.' });
    this._register({ id: 'kadri', name: 'Kadri', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Kadri\'Ra space-slugs.' });
    this._register({ id: 'kaleesh', name: 'Kaleesh', family: 'alien_starwars', script: 'kaleesh_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'A harsh, militant language; General Grievous\'s native tongue.' });
    this._register({ id: 'kaminoan', name: 'Kaminoan', family: 'alien_starwars', script: 'kaminoan_arithmetic', rarity: 'rare', settings: ['star_wars'], notes: 'A precise, clinical language incorporating UV-spectrum visual signals.' });
    this._register({ id: 'kanchi', name: 'Kanchi', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Kanchi system.' });
    this._register({ id: 'karak', name: 'Karak', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The booming, resonance-heavy language of the Karakan giants.' });
    this._register({ id: 'karat', name: 'Karat', family: 'alien_starwars', script: 'common', rarity: 'rare', settings: ['star_wars'], notes: 'The language of the Karat tribes; rich in mineral and earth terms.' });
    this._register({ id: 'keerak', name: 'Keerak', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The sibilant, hiss-heavy language of the Keerak.' });
    this._register({ id: 'kel_dor', name: 'Kel Dor', family: 'alien_starwars', script: 'kel_dor_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'A telepathy-friendly language often spoken through filtration masks.' });
    this._register({ id: 'kerestian', name: 'Kerestian', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A cold, logical language spoken by the Kerestian hunters.' });
    this._register({ id: 'ketton', name: 'Ketton', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Ketton people.' });
    this._register({ id: 'khil', name: 'Khil', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The musical, hooting language of the Khil; involves hooting through face-tendrils.' });
    this._register({ id: 'ki_adz', name: 'Ki Adz', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Ki-Adz; involves complex whistle patterns.' });
    this._register({ id: 'kian_thar', name: 'Kian\'thar', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language that includes emotional resonance detectable only by sensitives.' });
    this._register({ id: 'kilian', name: 'Kilian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A human dialect from the Killian sector.' });
    this._register({ id: 'kitonak', name: 'Kitonak', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A slow, vibrating language involving flute-like vocalizations.' });
    this._register({ id: 'klatooinian', name: 'Klatooinian', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A ritualistic language heavily influenced by the Hutt Cartel over millennia.' });
    this._register({ id: 'kobok', name: 'Kobok', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The clicking, insectoid language of the Kobok.' });
    this._register({ id: 'koornacht', name: 'Koornacht', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The aggressive, xenophobic language of the Yevetha.' });
    this._register({ id: 'kubazian', name: 'Kubazian', family: 'alien_starwars', script: 'kubazian_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language of high-pitched buzzed and clicks produced by the Kubaz trunk.' });
    this._register({ id: 'kushiban', name: 'Kushiban', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A chirping language; Kushibans often shift fur color to add emotional nuance.' });
    this._register({ id: 'kyuzan', name: 'Kyuzan', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The native tongue of the Kyuzo; typically spoken through heavy filtration masks.' });
    this._register({ id: 'lannik', name: 'Lannik', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A concise, efficient language used by the small but fierce Lannik warriors.' });
    this._register({ id: 'lanteebian', name: 'Lanteebian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The regional dialect of the mining world Lanteeb.' });
    this._register({ id: 'lasat', name: 'Lasat', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A guttural language; Lasat often use ritualized combat-chants in formal settings.' });
    this._register({ id: 'lebenn', name: 'Lebenn', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The rhythmic, tonal language of the Lebennin.' });
    this._register({ id: 'lepi', name: 'Lepi', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A high-speed, twitch-heavy language spoken by the rabbit-like Lepi.' });
    this._register({ id: 'lit_code', name: 'Literary Basic', family: 'human_starwars', script: 'high_galactic', rarity: 'rare', settings: ['star_wars'], notes: 'An overly formal, archaic version of Basic used in high-society poetry and law.' });
    this._register({ id: 'look_click', name: 'Look-Click', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The visual and auditory language of the insectoid Verpine.' });
    this._register({ id: 'low_basic', name: 'Low Basic', family: 'multiversal_trade', script: 'common', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'A simplified, slang-heavy version of Basic used by smugglers and spacers.' });
    this._register({ id: 'luharian', name: 'Luharian', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The melodic, pitch-shifting language of the Luhar.' });
    this._register({ id: 'lurmen', name: 'Lurmen', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A gentle, rolling language spoken by the pacifistic lemur-folk.' });
    this._register({ id: 'maka_tai', name: 'Maka-tai', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The language of the bird-like Maka-tai; involves many high-pitched chirps.' });
    this._register({ id: 'mandallian', name: 'Mandallian', family: 'alien_starwars', script: 'mando_runes', rarity: 'rare', settings: ['star_wars'], notes: 'The language of the giant Mandallian Giants; influenced the early development of Mando\'a.' });
    this._register({ id: 'mandoa', name: 'Mando\'a', family: 'mandalorian', script: 'mando_runes', rarity: 'common', settings: ['star_wars'], notes: 'The warrior language of the Mandalorians; focuses on survival and clan loyalty.' });
    this._register({ id: 'marian', name: 'Marian', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Mari sector.' });
    this._register({ id: 'massassi', name: 'Massassi', family: 'force_attuned', script: 'sith_hieroglyphs', rarity: 'extinct', settings: ['star_wars'], notes: 'A harsh, guttural dialect of Sith spoken by the warrior-caste of the ancient Sith Empire.' });
    this._register({ id: 'meishodo', name: 'Meishodo', family: 'force_attuned', script: 'unknown', rarity: 'very_rare', settings: ['star_wars', 'multiverse'], notes: 'A language of physical symbols and names used to bind Force-energy; rare outside the Unicorn Clan.' });
    this._register({ id: 'melodie', name: 'Melodie', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A beautiful, song-based language spoken by the inhabitants of Yavin 8.' });
    this._register({ id: 'menahuun', name: 'Menahuun', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the small Menahuun people.' });
    this._register({ id: 'miralukese', name: 'Miralukese', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A nuanced language often accompanied by Force-sensory markers since the species is blind.' });
    this._register({ id: 'mirialan', name: 'Mirialan', family: 'alien_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'Includes specific ritual vocabulary related to their geometric facial tattoos.' });
    this._register({ id: 'miral', name: 'Miral', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Miral system.' });
    this._register({ id: 'mnemonii', name: 'Mnemonii', family: 'force_attuned', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A language of memory-triggers used by Caamasi to share "Memnii" with Force-sensitives.' });
    this._register({ id: 'mon_calamari', name: 'Mon Calamarian', family: 'alien_starwars', script: 'mon_cal_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'The primary language of the Mon Calamari; often involves heavy, wet vocalizations.' });
    this._register({ id: 'morsearian', name: 'Morsearian', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language spoken by the four-armed Morsearians; involves rhythmic breathing patterns.' });
    this._register({ id: 'mrissi', name: 'Mrissi', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The chirping, bird-like language of the Mrissi.' });
    this._register({ id: 'mustafarian', name: 'Mustafarian', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'Includes low-frequency vibrations that can be felt through the volcanic rock of Mustafar.' });
    this._register({ id: 'muun', name: 'Muun', family: 'alien_starwars', script: 'muun_arithmetic', rarity: 'uncommon', settings: ['star_wars'], notes: 'A logical language favored by the InterGalactic Banking Clan; treats economics as grammar.' });
    this._register({ id: 'myke', name: 'Myke', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The language of the nomadic Myke tribes.' });
    this._register({ id: 'mynock', name: 'Mynock-Screech', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A series of high-pitched ultrasonic squeals used for echolocation and swarm coordination.' });
    this._register({ id: 'myneyrsh', name: 'Myneyrsh', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The harsh, four-armed gestural language of the Myneyrsh.' });
    this._register({ id: 'nagai', name: 'Nagai', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The soft, whispering language of the Nagai; designed to be undetectable over background noise.' });
    this._register({ id: 'nautila', name: 'Nautila', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The pheromonal and vocal language of the Nautolans; only fully speakable underwater.' });
    this._register({ id: 'neimoidian', name: 'Neimoidian', family: 'alien_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A nasal, legalistic version of Pak Pak used by the Trade Federation.' });
    this._register({ id: 'nelvaanese', name: 'Nelvaanese', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A growling, primal language spoken by the canine-like Nelvaanians.' });
    this._register({ id: 'neti', name: 'Neti', family: 'alien_starwars', script: 'spoken_only', rarity: 'very_rare', settings: ['star_wars'], notes: 'A slow, creaking language spoken by sentient plant-beings over decades.' });
    this._register({ id: 'night_signs', name: 'Night-Signs', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A silent, tactical hand-code used by bounty hunters during low-light operations.' });
    this._register({ id: 'nikto', name: 'Nikto', family: 'alien_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A series of dialects used by the Nikto sub-species; heavily tied to the Hutt Cartel.' });
    this._register({ id: 'nohgri', name: 'Noghri', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A sibilant, clicking language; incorporates many terms for honor, debt, and assassination.' });
    this._register({ id: 'nuna_patter', name: 'Nuna-Speak', family: 'monstrous', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'The chirping and squawking of swamp-birds, often used as a base for swamp-dweller cants.' });
    this._register({ id: 'nyrian', name: 'Nyrian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local human dialect of the Nyria system.' });
    this._register({ id: 'omwati', name: 'Omwati', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A musical, bird-like language; Omwati have a natural aptitude for complex technical grammar.' });
    this._register({ id: 'onodrim', name: 'Onodrim', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A slow, booming language spoken by the tree-like inhabitants of the Mid Rim.' });
    this._register({ id: 'ooranari', name: 'Ooranari', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The harmonic, echoing language of the Ooran.' });
    this._register({ id: 'ortolan', name: 'Ortolan', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language based on musical notes; Ortolans "hear" flavors and scents through specific frequencies.' });
    this._register({ id: 'osarian', name: 'Osarian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local human dialect of the Osare system; known for its sharp, militaristic vowels.' });
    this._register({ id: 'pa_lowick', name: 'Pa-Lowick', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A high-pitched whistling language spoken by the inhabitants of Lowick.' });
    this._register({ id: 'paaeridan', name: 'Paaeridan', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The melodic, rhythmic language of the Paaeridans.' });
    this._register({ id: 'pacia', name: 'Pacia', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Paci system.' });
    this._register({ id: 'pak_pak', name: 'Pak Pak', family: 'alien_starwars', script: 'neimoidian_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'The guttural, clicking "Trade" tongue of the Neimoidians and Geonosians.' });
    this._register({ id: 'palanhi', name: 'Palanhi', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local human tongue of the Palanhi sector.' });
    this._register({ id: 'pantoran', name: 'Pantoran', family: 'human_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A refined dialect of Basic; Pantorans use specific tattoos to denote family and linguistic heritage.' });
    this._register({ id: 'pau_an', name: 'Pau\'an', family: 'alien_starwars', script: 'pau_an_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'A slow, whispery language spoken by the long-lived inhabitants of Utapau.' });
    this._register({ id: 'phindian', name: 'Phindian', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language that relies heavily on long-armed gestures to modify the meaning of spoken words.' });
    this._register({ id: 'phuii', name: 'Phuii', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The avian-influenced language of the Phuii.' });
    this._register({ id: 'polis_massan', name: 'Polis Massan', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A purely telepathic language; Polis Massans lack vocal cords and use digital transmitters for others.' });
    this._register({ id: 'pree', name: 'Pree', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Pree system.' });
    this._register({ id: 'protocol_binary', name: 'Protocol-Data', family: 'machine_logic', script: 'binary_unified', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'A highly structured version of binary used by 3PO units for diplomatic translation.' });
    this._register({ id: 'prythean', name: 'Prythean', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The rhythmic, tonal language of the Prythean.' });
    this._register({ id: 'quarrenese', name: 'Quarrenese', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A liquid, gurgling language; often used as a secret code by Quarren separatists.' });
    this._register({ id: 'quermian', name: 'Quermian', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A combination of vocal trills and telepathy used by the multi-limbed Quermians.' });
    this._register({ id: 'rakata_ancient', name: 'Rakata', family: 'ancient_starwars', script: 'rakatan_glyphs', rarity: 'extinct', settings: ['star_wars'], notes: 'The language of the Infinite Empire; harsh and designed to command Force-tech.' });
    this._register({ id: 'ranat', name: 'Ranat', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A chittering, squeaky language; often involves gnashing of teeth for punctuation.' });
    this._register({ id: 'raxus_patter', name: 'Separatist Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A code used by the CIS and Raxus Secessionists to hide communications from the Republic.' });
    this._register({ id: 'reesean', name: 'Reesean', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local human dialect of the Rees system.' });
    this._register({ id: 'rikk_hiss', name: 'Rikk', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The sibilant, hiss-heavy language of the Rikk.' });
    this._register({ id: 'ishi_tib_chirp', name: 'Rishii', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The chirping and mimicry-based language of the bird-like Rishii.' });
    this._register({ id: 'rodese', name: 'Rodese', family: 'alien_starwars', script: 'rodese_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'The staccato, whistling language of the Rodians; heavy with bounty hunting terminology.' });
    this._register({ id: 'ruusanian', name: 'Ruusanian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A rustic, agrarian human dialect from the world of Ruusan.' });
    this._register({ id: 'rybel', name: 'Rybel', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Rybel people.' });
    this._register({ id: 'ryleth', name: 'Ryl', family: 'alien_starwars', script: 'ryl_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'The lyrical language of the Twi\'leks; meaning is modified by "Lekku-sign" (tentacle movement).' });
    this._register({ id: 'sakiyan', name: 'Sakiyan', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'A cold, whisper-soft language spoken by the Sakiyan hunters.' });
    this._register({ id: 'selkath', name: 'Selkath', family: 'alien_starwars', script: 'selkath_script', rarity: 'uncommon', settings: ['star_wars'], notes: 'A bubbling, underwater language; its ancient script is found in Progenitor ruins.' });
    this._register({ id: 'shadow_code', name: 'Shadow-Code', family: 'secret_guild', script: 'binary_unified', rarity: 'very_rare', settings: ['star_wars'], notes: 'A high-level cryptographic language used by Shadow Troopers and the Emperor\'s Hands.' });
    this._register({ id: 'sharu', name: 'Sharu', family: 'ancient_starwars', script: 'spoken_only', rarity: 'extinct', settings: ['star_wars'], notes: 'The mind-bending language of the ancient Sharu; nearly impossible for modern brains to process.' });
    this._register({ id: 'shatayan', name: 'Shatayan', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The melodic, pitch-shifting language of the Shatay.' });
    this._register({ id: 'shawda_ti', name: 'Shawda Ti', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Shawda Ti people.' });
    this._register({ id: 'shili', name: 'Shili', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'The language of the Togruta; uses ultrasonic clicks detectable only by their montrals.' });
    this._register({ id: 'shirawa', name: 'Shirawa', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The chirping and clicking language of the Shistavanen.' });
    this._register({ id: 'shistavanen_bark', name: 'Shistavanen', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A growling, predatory language spoken by the wolf-like Shistavanens.' });
    this._register({ id: 'shriek_code', name: 'Shriek-Code', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'An acoustic-based distress code used by pilots and rebels to bypass radio jammers.' });
    this._register({ id: 'sika', name: 'Sika', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The rhythmic, tonal language of the Sika people.' });
    this._register({ id: 'sim_sign', name: 'Sim-Sign', family: 'universal', script: 'spoken_only', rarity: 'common', settings: ['star_wars', 'multiverse'], notes: 'A simplified galactic sign language used by many species lacking compatible vocal cords.' });
    this._register({ id: 'sith', name: 'Sith', family: 'force_attuned', script: 'sith_hieroglyphs', rarity: 'very_rare', settings: ['star_wars'], notes: 'The arcane written language used in ancient Sith holocrons and temples as well as their incantations.' });
    this._register({ id: 'skakoan', name: 'Skakoan', family: 'alien_starwars', script: 'skakoan_arithmetic', rarity: 'rare', settings: ['star_wars'], notes: 'A high-pressure, buzzing language spoken by the Techno Union leaders.' });
    this._register({ id: 'slith', name: 'Slith', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A purely sibilant language spoken by the serpent-folk of Skye.' });
    this._register({ id: 'squib_patter', name: 'Squib-Patter', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'An incredibly fast, high-pitched language; Squibs often barter while speaking.' });
    this._register({ id: 'ssi_ruuvi', name: 'Ssi-ruuvi', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The musical, whistling language of the Ssi-ruuk; involves scent-track modification.' });
    this._register({ id: 'stennes', name: 'Stennes', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Stennes Shifters; includes subtle sub-vocal identifiers.' });
    this._register({ id: 'sullustese', name: 'Sullustese', family: 'alien_starwars', script: 'sullustese_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'A rapid, chattering language; the primary tongue of Sullust and the Sorosuub Corporation.' });
    this._register({ id: 'talz', name: 'Talz', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A language of high-pitched buzzes and chirps; Talz use four eyes to track visual cues.' });
    this._register({ id: 'tarasin', name: 'Tarasin', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'Meaning is modified by the Tarasin changing their skin-pigmentation pattern.' });
    this._register({ id: 'tasari', name: 'Tasari', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The local language of the Tasari system.' });
    this._register({ id: 'thalluvian', name: 'Thalluvian', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The human dialect of the Thallu sector.' });
    this._register({ id: 'thisspiasian', name: 'Thisspiasian', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A sibilant, multi-vocal language spoken by the serpent-like Thisspiasians.' });
    this._register({ id: 'thyferran', name: 'Thyferran', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Bacta-producing world of Thyferra.' });
    this._register({ id: 'tinn_talk', name: 'Tinn-Talk', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'The native tongue of the Tinn people.' });
    this._register({ id: 'togrutane', name: 'Togrutane', family: 'alien_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'The primary language of the Togruta; utilizes the montrals for echolocation-speech.' });
    this._register({ id: 'toyidarian', name: 'Toydarian', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A buzzing, high-pitched language; Toydarians are naturally resistant to Force-persuasion.' });
    this._register({ id: 'trandoshan', name: 'Dosh', family: 'alien_starwars', script: 'dosh_glyphs', rarity: 'common', settings: ['star_wars'], notes: 'A sibilant, predatory language; focuses on the Scorekeeper and hunt-merit.' });
    this._register({ id: 'tusken_bark', name: 'Tusken', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A guttural language of barks and roars; incorporates specific sign-gestures with gaderffii sticks.' });
    this._register({ id: 'tyber', name: 'Tyber', family: 'human_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The human dialect of the Tyber system.' });
    this._register({ id: 'ubese', name: 'Ubese', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A harsh, electronic-sounding language; usually spoken through vocal-scrambling masks.' });
    this._register({ id: 'ugnaught', name: 'Ugnaught', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'A language of snorts and squeals; Ugnaughts are renowned for their technical efficiency.' });
    this._register({ id: 'umbaran', name: 'Umbaran', family: 'alien_starwars', script: 'umbaran_glyphs', rarity: 'rare', settings: ['star_wars'], notes: 'A whispery, melodic language; involves subtle UV-spectrum light signals.' });
    this._register({ id: 'utapaun', name: 'Utapaun', family: 'alien_starwars', script: 'utapaun_glyphs', rarity: 'uncommon', settings: ['star_wars'], notes: 'The shared language of the Pau\'an and Utai sub-species.' });
    this._register({ id: 'weequay', name: 'Weequay', family: 'alien_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'The language of the Quay-religion; includes pheromonal communication between Weequay.' });
    this._register({ id: 'whiphid', name: 'Whiphid', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A booming, resonant language spoken by the furred hunters of Toola.' });
    this._register({ id: 'wistie_pulse', name: 'Wistie-Pulse', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A visual language of light-pulses and color shifts used by the forest sprites of Endor.' });
    this._register({ id: 'wookiee', name: 'Wookiee', family: 'alien_starwars', script: 'spoken_only', rarity: 'common', settings: ['star_wars'], notes: 'The language of the Wookiees; consists of roars, growls, and moans. Three dialects.' });
    this._register({ id: 'woolamander', name: 'Woolamander', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'The high-pitched, screeching language of the blue monkey-folk.' });
    this._register({ id: 'xexto', name: 'Xexto', family: 'alien_starwars', script: 'spoken_only', rarity: 'uncommon', settings: ['star_wars'], notes: 'A rapid-fire language spoken by the six-limbed Xexto.' });
    this._register({ id: 'yaddle_patter', name: 'Ancient Core', family: 'force_attuned', script: 'spoken_only', rarity: 'very_rare', settings: ['star_wars'], notes: 'An archaic syntax of Basic used by long-lived Jedi masters.' });
    this._register({ id: 'yevethan', name: 'Yevethan', family: 'alien_starwars', script: 'spoken_only', rarity: 'rare', settings: ['star_wars'], notes: 'A harsh, xenophobic language that emphasizes biological superiority.' });
    this._register({ id: 'zabrak', name: 'Zabrak', family: 'human_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A language that includes specific warrior-codes and rhythmic drumming patterns.' });
    this._register({ id: 'zeltron', name: 'Zeltron', family: 'human_starwars', script: 'common', rarity: 'common', settings: ['star_wars'], notes: 'A highly expressive language; meaning is heavily influenced by the Zeltron\'s pheromones.' });
    this._register({ id: 'zhell', name: 'Zhell', family: 'ancient_starwars', script: 'aurebesh', rarity: 'extinct', settings: ['star_wars'], notes: 'The language of the ancient human ancestors of Coruscant.' });
    this._register({ id: 'zygerrian', name: 'Zygerrian', family: 'alien_starwars', script: 'common', rarity: 'uncommon', settings: ['star_wars'], notes: 'The language of the Zygerrian slave empire; known for its commanding tone.' });

    // ───────────────────────────────────────────────
    //  STAR TREK LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'aaamazzarite', name: 'Aaamazzarite', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The chemical-based language of the bee-like Aaamazzarites.' });
    this._register({ id: 'andorian', name: 'Andorian', family: 'federation_alien', script: 'andorian_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'The sharp, rhythmic language of the Aethenians; incorporates antenna-gestures.' });
    this._register({ id: 'androsian', name: 'Androsian', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the inhabitants of Gamma Trianguli VI.' });
    this._register({ id: 'angosian', name: 'Angosian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The sophisticated language of Angosia III; known for its focus on social order.' });
    this._register({ id: 'antedean', name: 'Antedean', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The high-pitched, ichthyoid language of the Antedeans.' });
    this._register({ id: 'antican', name: 'Antican', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The canine-vocal language of the Anticans; often aggressive and direct.' });
    this._register({ id: 'antarean', name: 'Antarean', family: 'alien_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the Antareans; includes specific terms for high-warp navigation.' });
    this._register({ id: 'arcadian', name: 'Arcadian', family: 'alien_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The melodic, bird-like language of the Arcadians.' });
    this._register({ id: 'archaeopolis', name: 'Archaeopolis', family: 'ancient_startrek', script: 'glyphs', rarity: 'extinct', settings: ['star_trek'], notes: 'The ancient language of the Promellians; found in ruins near Orelious.' });
    this._register({ id: 'argelian', name: 'Argelian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The gentle, hedonistic language of the inhabitants of Argelius II.' });
    this._register({ id: 'atreadian', name: 'Atreadian', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Atreadi; incorporates telepathic sub-harmonics.' });
    this._register({ id: 'atrisian_st', name: 'Atrisian', family: 'human_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'A human dialect from the Atrisian sector of Earth colonies.' });
    this._register({ id: 'axanar', name: 'Axanar', family: 'alien_startrek', script: 'axanar_glyphs', rarity: 'uncommon', settings: ['star_trek'], notes: 'The sibilant, multi-vocal language of the Axanar; involves breathing-pattern shifts.' });
    this._register({ id: 'bajoran', name: 'Bajoran', family: 'humanoid_startrek', script: 'bajoran_script', rarity: 'common', settings: ['star_trek'], notes: 'The spiritual, ancient language of Bajor; uses a highly calligraphic script.' });
    this._register({ id: 'bandi', name: 'Bandi', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the inhabitants of Deneb IV.' });
    this._register({ id: 'benzite', name: 'Benzite', family: 'alien_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The technical, precise language of the Benzites; typically spoken through breathing apparatus.' });
    this._register({ id: 'betazoid', name: 'Betazoid', family: 'humanoid_startrek', script: 'betazoid_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'Primarily a telepathic language; the spoken form is used mostly for ritual or with non-telepaths.' });
    this._register({ id: 'binary_bynar', name: 'Bynar Binary', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['star_trek', 'multiverse'], notes: 'A high-speed digital language used by the Bynars; allows for instant data sharing.' });
    this._register({ id: 'binary_computer', name: 'Computer LCARS', family: 'machine_logic', script: 'binary_unified', rarity: 'common', settings: ['star_trek', 'multiverse'], notes: 'The underlying data language of Federation computer systems.' });
    this._register({ id: 'bolian', name: 'Bolian', family: 'humanoid_startrek', script: 'common', rarity: 'common', settings: ['star_trek'], notes: 'The upbeat, fast-paced language of the Bolians.' });
    this._register({ id: 'boraalan', name: 'Boraalan', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The rustic, communal language of the Boraalans.' });
    this._register({ id: 'borg_collective', name: 'Borg Hive-Speak', family: 'machine_logic', script: 'spoken_only', rarity: 'rare', settings: ['star_trek', 'multiverse'], notes: 'A constant stream of data and sub-vocalized thoughts shared by the Collective.' });
    this._register({ id: 'breen', name: 'Breen', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'A series of electronic chirps and metallic rasps; unintelligible without a translator.' });
    this._register({ id: 'brunali', name: 'Brunali', family: 'humanoid_startrek', script: 'common', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Delta Quadrant race ravaged by the Borg.' });
    this._register({ id: 'caatati', name: 'Caatati', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the Delta Quadrant refugees from the Caatati system.' });
    this._register({ id: 'cairn_telepathy', name: 'Cairn', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A purely telepathic language; the Cairn have no vocal cords.' });
    this._register({ id: 'caldonian', name: 'Caldonian', family: 'alien_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The intellectual, deliberate language of the Caldonians.' });
    this._register({ id: 'cardassian', name: 'Cardassian', family: 'humanoid_startrek', script: 'cardassian_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'The rigid, formal language of the Cardassian Union; focuses on duty and family.' });
    this._register({ id: 'cant_ferengi', name: 'Profit-Cant', family: 'secret_guild', script: 'ferengi_glyphs', rarity: 'uncommon', settings: ['star_trek'], notes: 'A specialized jargon used by Ferengi to discuss the Rules of Acquisition without detection.' });
    this._register({ id: 'chalnoth', name: 'Chalnoth', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'A harsh, guttural language reflecting the chaotic and violent nature of Chalna.' });
    this._register({ id: 'chameloid', name: 'Chameloid', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language where skin-pigmentation shifts and vocal mimicry change the context of words.' });
    this._register({ id: 'cheron', name: 'Cheron', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'extinct', settings: ['star_trek'], notes: 'The dualistic language of the black-and-white inhabitants of Cheron; highly polarized syntax.' });
    this._register({ id: 'cipher_starfleet', name: 'Starfleet Command Code', family: 'secret_guild', script: 'binary_unified', rarity: 'rare', settings: ['star_trek'], notes: 'Sub-space encryption used for "eyes only" communications between Admiralty and Captains.' });
    this._register({ id: 'code_obsidian_order', name: 'Obsidian Cipher', family: 'secret_guild', script: 'cardassian_glyphs', rarity: 'very_rare', settings: ['star_trek'], notes: 'The highly encrypted, multi-layered code used by Cardassian intelligence.' });
    this._register({ id: 'corvallian', name: 'Corvallian', family: 'alien_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The mercenary trade-tongue used by Corvallian pilots and spies.' });
    this._register({ id: 'cytherian', name: 'Cytherian', family: 'alien_startrek', script: 'spoken_only', rarity: 'very_rare', settings: ['star_trek'], notes: 'A language consisting of high-speed data bursts and holographic projections.' });
    this._register({ id: 'deltan', name: 'Deltan', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'An extremely subtle, sensory-based language; often perceived as alluring by other species.' });
    this._register({ id: 'denobulan', name: 'Denobulan', family: 'humanoid_startrek', script: 'denobulan_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'A fast-paced language; Denobulans often hold multiple conversations simultaneously.' });
    this._register({ id: 'dominion_standard', name: 'Dominion Standard', family: 'universal', script: 'dominion_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'The administrative tongue used by Vorta and Jem\'Hadar across the Gamma Quadrant.' });
    this._register({ id: 'drayan', name: 'Drayan', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'A ritualistic language that treats time and aging with unique reverse-concepts.' });
    this._register({ id: 'duras_dialect', name: 'Klingon (Duras)', family: 'klingon', script: 'pikl_uth', rarity: 'uncommon', settings: ['star_trek'], notes: 'A "dishonorable" dialect of Klingon associated with the House of Duras; focuses on political deceit.' });
    this._register({ id: 'edo', name: 'Edo', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'A simplistic, gentle language from Rubicun III; lacks words for punishment or law.' });
    this._register({ id: 'el_aurian_modern', name: 'El-Aurian', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Listeners; includes specific linguistic structures for deep empathy.' });
    this._register({ id: 'elaysian', name: 'Elaysian', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A low-gravity dialect where meaning is modified by the orientation of the body.' });
    this._register({ id: 'el_aurian_ancient', name: 'Old El-Aurian', family: 'humanoid_startrek', script: 'glyphs', rarity: 'extinct', settings: ['star_trek'], notes: 'The ancient tongue used before the Borg scattering; contains secrets of time-sensitivity.' });
    this._register({ id: 'eredic_st', name: 'Eredic', family: 'alien_startrek', script: 'eredic_glyphs', rarity: 'uncommon', settings: ['star_trek'], notes: 'The primary language of the Eredians; shares coincidental names with Warcraft dialects.' });
    this._register({ id: 'federation_standard', name: 'Federation Standard', family: 'universal', script: 'common', rarity: 'common', settings: ['star_trek', 'multiverse'], notes: 'The official lingua franca of the United Federation of Planets; derived from 22nd-century Earth English.' });
    this._register({ id: 'fen_domar', name: 'Fen Domar', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language consisting of rhythmic chants and mathematical proofs.' });
    this._register({ id: 'ferengi', name: 'Ferengi', family: 'humanoid_startrek', script: 'ferengi_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'A language with hundreds of words for "profit" and "rain"; uses the Rules of Acquisition as core grammar.' });
    this._register({ id: 'folos', name: 'Folos', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Folosians; known for its high-frequency trills.' });
    this._register({ id: 'frunalian', name: 'Frunalian', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The melodic, pitch-shifting language of the Frunalians.' });
    this._register({ id: 'gallitep', name: 'Gallitep', family: 'humanoid_startrek', script: 'cardassian_glyphs', rarity: 'rare', settings: ['star_trek'], notes: 'A specialized Cardassian dialect used within labor camps.' });
    this._register({ id: 'galvin', name: 'Galvin', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Galvin people; involves sub-vocal hums.' });
    this._register({ id: 'garidian', name: 'Garidian', family: 'alien_startrek', script: 'garidian_glyphs', rarity: 'uncommon', settings: ['star_trek'], notes: 'A dialect closely related to Romulan; used by the Garidian splinter-group.' });
    this._register({ id: 'golic_vulcan_modern', name: 'Modern Vulcan', family: 'humanoid_startrek', script: 'vulcan_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'The standard modern logical language of Vulcan; avoids emotional adjectives.' });
    this._register({ id: 'gomtuu_pulse', name: 'Tin Man Pulse', family: 'alien_startrek', script: 'spoken_only', rarity: 'very_rare', settings: ['star_trek'], notes: 'A bio-digital language used by the living starship Gomtuu to communicate with its pilot.' });
    this._register({ id: 'gorn', name: 'Gorn', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'A sibilant, aggressive language; involves hisses and low-frequency thumps.' });
    this._register({ id: 'halii', name: 'Halii', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Haliians; relies heavily on the use of Canar crystals to focus intent.' });
    this._register({ id: 'hirogen', name: 'Hirogen', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'A predator\'s tongue; lacks words for "peace" or "home", but has hundreds for "tracking" and "kill".' });
    this._register({ id: 'horta_etch', name: 'Horta', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language of chemical etching and vibration; "No Kill I" is its most famous translated phrase.' });
    this._register({ id: 'husnock', name: 'Husnock', family: 'alien_startrek', script: 'spoken_only', rarity: 'extinct', settings: ['star_trek'], notes: 'The arrogant, violent language of a race entirely eradicated by the Douwd.' });
    this._register({ id: 'iconian', name: 'Iconian', family: 'ancient_startrek', script: 'iconian_glyphs', rarity: 'very_rare', settings: ['star_trek'], notes: 'The language of the Gatebuilders; its script acts as the "operating system" for ancient teleportation tech.' });
    this._register({ id: 'idonian', name: 'Idonian', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The melodic, pitch-shifting language of the Idonians.' });
    this._register({ id: 'jarada', name: 'Jarada', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'An insectoid language where a single incorrect click is considered a declaration of war.' });
    this._register({ id: 'kazon', name: 'Kazon', family: 'humanoid_startrek', script: 'kazon_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'A rough, factional language; varies significantly between the Ogla and Nistrim sects.' });
    this._register({ id: 'keldar', name: 'Keldar', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The trade-focused language of the Keldar people.' });
    this._register({ id: 'klingon_standard', name: 'Klingon (tlhIngan Hol)', family: 'klingon', script: 'pikl_uth', rarity: 'common', settings: ['star_trek'], notes: 'The guttural, aggressive tongue of the Empire; emphasizes verbs of action and honor.' });
    this._register({ id: 'klingon_high', name: 'Noopara', family: 'klingon', script: 'pikl_uth', rarity: 'rare', settings: ['star_trek'], notes: 'The "High Klingon" used in opera and the High Council; contains archaic honorifics.' });
    this._register({ id: 'koinonian', name: 'Koinonian', family: 'alien_startrek', script: 'spoken_only', rarity: 'very_rare', settings: ['star_trek'], notes: 'A language of pure energy and thought; used by the incorporeal beings of Koinonia.' });
    this._register({ id: 'kurillium', name: 'Kurillian', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The rapid, melodic language of the Kurillians.' });
    this._register({ id: 'kwejian', name: 'Kwejian', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language incorporating empathic bio-resonance with the planet\'s ecosystem.' });
    this._register({ id: 'kyrnan', name: 'Kyrnan', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The staccato, percussive language of the Kyrn.' });
    this._register({ id: 'ligos', name: 'Ligos', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language consisting of high-frequency pulses and light shifts.' });
    this._register({ id: 'lissyrian', name: 'Lissyrian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The polite, administrative language of the Lissyrian people.' });
    this._register({ id: 'lumerian', name: 'Lumerian', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The harmonic, echoing language of the Lumerians.' });
    this._register({ id: 'lurians', name: 'Lurian', family: 'alien_startrek', script: 'spoken_only', rarity: 'common', settings: ['star_trek'], notes: 'Lurians are mostly silent; their language involves complex throat-sac vibrations.' });
    this._register({ id: 'malon', name: 'Malon', family: 'humanoid_startrek', script: 'common', rarity: 'common', settings: ['star_trek'], notes: 'The industrial, technical language of the Malon waste-exporters.' });
    this._register({ id: 'mari_telepathy', name: 'Mari', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language of telepathic imagery; the Mari have no concept of "violent thoughts".' });
    this._register({ id: 'mazarite', name: 'Mazarite', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The sophisticated language of Mazar.' });
    this._register({ id: 'medusan', name: 'Medusan', family: 'extraplanar', script: 'spoken_only', rarity: 'very_rare', settings: ['star_trek'], notes: 'A non-visual, purely thought-based language; viewing the speakers causes madness.' });
    this._register({ id: 'mintakan', name: 'Mintakan', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A proto-Vulcan dialect; logical but lacks advanced technical vocabulary.' });
    this._register({ id: 'mizarian', name: 'Mizarian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The pacifistic language of Mizar II; lacks words for "resistance" or "war".' });
    this._register({ id: 'monaveen', name: 'Monaveen', family: 'machine_logic', script: 'binary_unified', rarity: 'very_rare', settings: ['star_trek'], notes: 'The data-language of the automated world-ship Monaveen.' });
    this._register({ id: 'nausicaan', name: 'Nausicaan', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'common', settings: ['star_trek'], notes: 'A loud, aggressive language; Nausicaans often use vocal threats as a form of greeting.' });
    this._register({ id: 'nechani', name: 'Nechani', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The spiritual language of the Nechani; includes many monastic terms.' });
    this._register({ id: 'norcadian', name: 'Norcadian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the Norcadians; known for its focus on martial arts and games.' });
    this._register({ id: 'nyrian_st', name: 'Nyrian', family: 'alien_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The technical language of the Nyrian translocators.' });
    this._register({ id: 'ocamper', name: 'Ocampa', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A telepathy-rich language; the Ocampa can share vast data-streams in seconds.' });
    this._register({ id: 'orian', name: 'Orion', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'common', settings: ['star_trek'], notes: 'The sibilant language of the Orion Syndicate; uses pheromones for subtext.' });
    this._register({ id: 'pakled', name: 'Pakled', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'A deceptively simple language; uses phrases like "Make us go" to hide technical cunning.' });
    this._register({ id: 'paradan', name: 'Paradan', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The local language of Parada.' });
    this._register({ id: 'rigelian', name: 'Rigelian', family: 'universal', script: 'common', rarity: 'common', settings: ['star_trek'], notes: 'The trade tongue of the Rigel system; divided into nineteen distinct sub-dialects.' });
    this._register({ id: 'rintalian', name: 'Rintalian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The melodic, pitch-shifting language of the Rintalians.' });
    this._register({ id: 'romulan', name: 'Romulan', family: 'romulan', script: 'romulan_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'A precise, nuanced language; emphasizes the "Threefold Path" of silence, loyalty, and secrecy.' });
    this._register({ id: 'rubicun', name: 'Rubicun', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the Edo people.' });
    this._register({ id: 'sikarian', name: 'Sikarian', family: 'humanoid_startrek', script: 'common', rarity: 'rare', settings: ['star_trek'], notes: 'The sophisticated language of the Sikarians; focuses on pleasure and storytelling.' });
    this._register({ id: 'sona', name: 'Son\'a', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'A dialect of Ba\'ku; incorporates many technological and militaristic terms.' });
    this._register({ id: 'suliban', name: 'Suliban', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'The language of the Suliban Cabal; meaning often shifts via bio-engineered traits.' });
    this._register({ id: 'tamarian', name: 'Tamarian', family: 'humanoid_startrek', script: 'spoken_only', rarity: 'very_rare', settings: ['star_trek', 'multiverse'], notes: 'A unique metaphor-based language (e.g., "Darmok and Jalad at Tanagra"); requires high knowledge-history skill.' });
    this._register({ id: 'tellarite', name: 'Tellarite', family: 'federation_alien', script: 'tellarite_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'A loud, argumentative language; Tellarites view insults and debating as polite conversation.' });
    this._register({ id: 'thalosian', name: 'Talosian', family: 'extraplanar', script: 'spoken_only', rarity: 'very_rare', settings: ['star_trek'], notes: 'A purely telepathic language used by the masters of illusion on Talos IV.' });
    this._register({ id: 'tholian', name: 'Tholian', family: 'alien_startrek', script: 'spoken_only', rarity: 'rare', settings: ['star_trek'], notes: 'A language of high-pitched crystalline shrieks and clicks; requires high heat to survive.' });
    this._register({ id: 'trill', name: 'Trill', family: 'humanoid_startrek', script: 'trill_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'Includes specific linguistic sub-routines for communicating between host and symbiont.' });
    this._register({ id: 'vidiian', name: 'Vidiian', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'A clinical language heavily focused on biology, organ-compatibility, and the Phage.' });
    this._register({ id: 'vorta', name: 'Vorta', family: 'humanoid_startrek', script: 'dominion_glyphs', rarity: 'common', settings: ['star_trek'], notes: 'The administrative tongue of the Dominion; precise, sycophantic, and efficient.' });
    this._register({ id: 'golic_vulcan_ritual', name: 'Ancient Vulcan', family: 'humanoid_startrek', script: 'vulcan_glyphs', rarity: 'rare', settings: ['star_trek'], notes: 'Refers to the formal ritual dialects used in Kolinahr ceremonies.' });
    this._register({ id: 'xindi_reptilian', name: 'Xindi-Reptilian', family: 'alien_startrek', script: 'xindi_glyphs', rarity: 'uncommon', settings: ['star_trek'], notes: 'A harsh, hiss-based language; the dominant military dialect of the Xindi council.' });
    this._register({ id: 'zakdorn', name: 'Zakdorn', family: 'humanoid_startrek', script: 'common', rarity: 'uncommon', settings: ['star_trek'], notes: 'The language of the galaxy\'s greatest strategists; treats every sentence as a move in a game.' });

    // ───────────────────────────────────────────────
    //  BABYLON 5 LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'abbai', name: 'Abbai', family: 'alien_b5', script: 'abbai_glyphs', rarity: 'uncommon', settings: ['babylon_5'], notes: 'The melodic, liquid language of the peaceful Abbai matriarchy.' });
    this._register({ id: 'brakiri', name: 'Brakiri', family: 'alien_b5', script: 'common', rarity: 'common', settings: ['babylon_5'], notes: 'A commerce-heavy language used by the Brakiri Syndic; contains thousands of terms for contract law.' });
    this._register({ id: 'centauri', name: 'Centauri', family: 'centauri_humanoid', script: 'centauri_glyphs', rarity: 'common', settings: ['babylon_5'], notes: 'An elegant, flowery language reflecting the Republic\'s imperial past; meaning is often hidden in courtly subtext.' });
    this._register({ id: 'drazi', name: 'Drazi', family: 'alien_b5', script: 'spoken_only', rarity: 'common', settings: ['babylon_5'], notes: 'A blunt, aggressive language; often involves physical posturing and rhythmic shouting.' });
    this._register({ id: 'english_b5', name: 'Universal Standard', family: 'universal', script: 'latin', rarity: 'common', settings: ['babylon_5'], notes: 'The primary language of the Earth Alliance and the Babylon 5 station.' });
    this._register({ id: 'hyach', name: 'Hyach', family: 'alien_b5', script: 'hyach_glyphs', rarity: 'uncommon', settings: ['babylon_5'], notes: 'A slow, formal language used by the long-lived Hyach; avoids contraction and slang.' });
    this._register({ id: 'llort', name: 'Llort', family: 'alien_b5', script: 'spoken_only', rarity: 'uncommon', settings: ['babylon_5'], notes: 'The scavengers\' tongue; incorporates words from dozens of other species\' trash and cast-offs.' });
    this._register({ id: 'minbari', name: 'Minbari', family: 'minbari', script: 'minbari_glyphs', rarity: 'common', settings: ['babylon_5'], notes: 'The language of the Minbari. Three dialects. Religious Caste, Worker Caste, and Warrior Caste.' });
    this._register({ id: 'narn', name: 'Narn', family: 'alien_b5', script: 'narn_glyphs', rarity: 'common', settings: ['babylon_5'], notes: 'A growling, resonant language; includes many religious terms from the Book of G\'Quan.' });
    this._register({ id: 'pakmara', name: 'Pak\'ma\'ra', family: 'alien_b5', script: 'spoken_only', rarity: 'uncommon', settings: ['babylon_5'], notes: 'A series of wet, clicking sounds; Pak\'ma\'ra refuse to learn other tongues, forcing others to use translators.' });
    this._register({ id: 'sh\'lassan', name: 'Sh\'lassan', family: 'alien_b5', script: 'common', rarity: 'uncommon', settings: ['babylon_5'], notes: 'The rhythmic, tonal language of the Sh\'lassans.' });
    this._register({ id: 'shadow_whisper', name: 'Shadow Speak', family: 'ancient_b5', script: 'spoken_only', rarity: 'very_rare', settings: ['babylon_5'], notes: 'A terrifying series of high-frequency chirps and whispers; perceived directly by the subconscious.' });
    this._register({ id: 'televised_sign', name: 'Standard Sign', family: 'universal', script: 'spoken_only', rarity: 'uncommon', settings: ['babylon_5'], notes: 'Used by the hearing-impaired and for silent communication in pressurized environments.' });
    this._register({ id: 'vree', name: 'Vree', family: 'alien_b5', script: 'spoken_only', rarity: 'uncommon', settings: ['babylon_5'], notes: 'A language consisting of rhythmic telepathic pulses and light-flashes from the "Greys".' });
    this._register({ id: 'vorlon', name: 'Vorlon', family: 'ancient_b5', script: 'vorlon_glyphs', rarity: 'very_rare', settings: ['babylon_5'], notes: 'A musical, electronic-sounding language; meaning is layered and often cryptic.' });
    this._register({ id: 'vulture_cant', name: 'Raider Speak', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['babylon_5'], notes: 'The jargon used by intergalactic pirates and raider clans to coordinate ambushes.' });
    this._register({ id: 'yolu', name: 'Yolu', family: 'alien_b5', script: 'yolu_glyphs', rarity: 'uncommon', settings: ['babylon_5'], notes: 'The language of the highly philosophical Yolu; incorporates martial arts terms into grammar.' });
    this._register({ id: 'zathras', name: 'Zathras', family: 'alien_b5', script: 'spoken_only', rarity: 'rare', settings: ['babylon_5'], notes: 'A unique, repetitive language spoken only by the ten brothers named Zathras.' });
    this._register({ id: 'psi_corps_patter', name: 'Psi-Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['babylon_5'], notes: 'A telepathic shorthand used by P-12s to communicate complex data instantly.' });
    this._register({ id: 'binary_jumpgate', name: 'Vortex Code', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['babylon_5'], notes: 'The data-language used by jumpgates to synchronize arrival/departure vectors.' });
    this._register({ id: 'code_grey_council', name: 'Grey Cipher', family: 'secret_guild', script: 'minbari_glyphs', rarity: 'very_rare', settings: ['babylon_5'], notes: 'The highest level of Minbari encryption; requires knowledge of all three caste dialects.' });
    this._register({ id: 'technomage_cipher', name: 'Arcane Data', family: 'techno_arcane', script: 'unknown', rarity: 'very_rare', settings: ['babylon_5', 'multiverse'], notes: 'A language that treats the universe\'s fundamental laws as lines of code.' });

    // ───────────────────────────────────────────────
    //  DUNE LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'atreides_battle', name: 'Atreides Battle Language', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dune'], notes: 'A hand-signal and vocal-slant language used for silent or coded tactical coordination.' });
    this._register({ id: 'azhar', name: 'Azhar', family: 'human_dune', script: 'azhar_script', rarity: 'rare', settings: ['dune'], notes: 'The "Book of Bogies"; a ritual language used by the Bene Gesserit to track ancient legends.' });
    this._register({ id: 'be_la_te', name: 'Be-la-te', family: 'human_dune', script: 'spoken_only', rarity: 'uncommon', settings: ['dune'], notes: 'A regional human dialect used in the outskirts of the Imperium.' });
    this._register({ id: 'bengali_dune', name: 'Bengali (Arrakis)', family: 'human_dune', script: 'spoken_only', rarity: 'uncommon', settings: ['dune'], notes: 'A linguistic remnant from Earth used by certain planetary populations.' });
    this._register({ id: 'chakobsa', name: 'Chakobsa', family: 'secret_circle', script: 'chakobsa_glyphs', rarity: 'uncommon', settings: ['dune'], notes: 'The magnetic hunter\'s tongue; used by the Fremen and the Bene Gesserit for ritual.' });
    this._register({ id: 'galach', name: 'Galach', family: 'universal', script: 'common', rarity: 'common', settings: ['dune', 'multiverse'], notes: 'The official language of the Imperium; a hybrid of Anglo-Slavic roots.' });
    this._register({ id: 'harkonnen_battle', name: 'Harkonnen Battle-Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['dune'], notes: 'A harsh, discordant code used by the Baron\'s troops to relay orders.' });
    this._register({ id: 'islamiyat', name: 'Islamiyat', family: 'human_dune', script: 'arabic', rarity: 'uncommon', settings: ['dune'], notes: 'An ancient religious language preserved by the Zensunni Wanderers.' });
    this._register({ id: 'liman', name: 'Liman', family: 'human_dune', script: 'spoken_only', rarity: 'uncommon', settings: ['dune'], notes: 'A language of the Imperial court, often used in formal diplomatic invitations.' });
    this._register({ id: 'panoplia_propheticus', name: 'Prophetic Patter', family: 'secret_circle', script: 'spoken_only', rarity: 'rare', settings: ['dune'], notes: 'The specialized vocabulary used by the Missionaria Protectiva to seed myths.' });
    this._register({ id: 'fremen_dialect', name: 'Fremen', family: 'human_dune', script: 'spoken_only', rarity: 'common', settings: ['dune'], notes: 'The everyday tongue of the Sietch-dwellers; a derivative of Arabic and Chakobsa.' });
    this._register({ id: 'mentat_logic', name: 'Mentat Projection', family: 'machine_logic', script: 'spoken_only', rarity: 'rare', settings: ['dune', 'multiverse'], notes: 'A sub-vocalized data-sharing language used by Mentats to process complex computations.' });
    this._register({ id: 'nayla', name: 'Nayla', family: 'human_dune', script: 'spoken_only', rarity: 'rare', settings: ['dune'], notes: 'A specialized dialect used by the Fish Speakers in later eras.' });
    this._register({ id: 'pyonspeak', name: 'Pyon-Argot', family: 'human_dune', script: 'spoken_only', rarity: 'common', settings: ['dune'], notes: 'The low-caste language of the planetary laborers and serfs.' });
    this._register({ id: 'spacing_guild_math', name: 'Guild Nav-Code', family: 'machine_logic', script: 'binary_unified', rarity: 'very_rare', settings: ['dune', 'multiverse'], notes: 'Mathematical "transmissions" used by Navigators to fold space; unintelligible to non-mutants.' });
    this._register({ id: 'tleilaxu_hiss', name: 'Tleilaxu', family: 'human_dune', script: 'spoken_only', rarity: 'rare', settings: ['dune'], notes: 'A secretive, whistling language used by the Bene Tleilax; avoids translation by machines.' });
    this._register({ id: 'u_li_ya', name: 'U-li-ya', family: 'human_dune', script: 'spoken_only', rarity: 'uncommon', settings: ['dune'], notes: 'A minor human language found in the Imperial archives.' });

    // ───────────────────────────────────────────────
    //  TRAVELLER LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'anglic', name: 'Anglic', family: 'human_traveller', script: 'latin', rarity: 'common', settings: ['traveller'], notes: 'The official language of the Third Imperium; derived from 21st-century English.' });
    this._register({ id: 'darian', name: 'Darian', family: 'human_traveller', script: 'darian_glyphs', rarity: 'uncommon', settings: ['traveller'], notes: 'The melodic, scientific language of the Darrians; known for its precise technical terms.' });
    this._register({ id: 'geonee', name: 'Geonee', family: 'human_traveller', script: 'latin', rarity: 'uncommon', settings: ['traveller'], notes: 'A dialect spoken by the Geonee, who claim to be the true ancestors of humanity.' });
    this._register({ id: 'svarellish', name: 'Svarellish', family: 'human_traveller', script: 'latin', rarity: 'rare', settings: ['traveller'], notes: 'An archaic human dialect found in the Spinward Marches.' });
    this._register({ id: 'vilani', name: 'Vilani', family: 'human_traveller', script: 'vilani_glyphs', rarity: 'uncommon', settings: ['traveller'], notes: 'The ancient, rigid language of the First Imperium; still used in high bureaucracy.' });
    this._register({ id: 'zhodani', name: 'Zhodani (Zdetl)', family: 'human_traveller', script: 'zhodani_alphabet', rarity: 'common', settings: ['traveller'], notes: 'The primary language of the Zhodani Consulate; incorporates psionic sub-harmonics.' });
    this._register({ id: 'aslan_trokh', name: 'Trokh', family: 'alien_traveller', script: 'aslan_glyphs', rarity: 'common', settings: ['traveller'], notes: 'The growling, status-heavy language of the Aslan; meaning changes based on social rank.' });
    this._register({ id: 'droyne_o_lo_ka', name: 'Olo-ka', family: 'alien_traveller', script: 'droyne_chirps', rarity: 'rare', settings: ['traveller'], notes: 'A chirping language used by the Droyne; meaning is tied to their current caste-role.' });
    this._register({ id: 'hivers_manipulation', name: 'Hiver Sign', family: 'alien_traveller', script: 'spoken_only', rarity: 'rare', settings: ['traveller'], notes: 'A silent language of complex limb and tentacle gestures; Hivers lack vocal cords.' });
    this._register({ id: 'k_kree', name: 'K\'kree', family: 'alien_traveller', script: 'k_kree_runes', rarity: 'uncommon', settings: ['traveller'], notes: 'A booming, resonant language designed for the herd-mind of the centaur-like K\'kree.' });
    this._register({ id: 'vargr_arrgh', name: 'Gvegh', family: 'alien_traveller', script: 'latin', rarity: 'common', settings: ['traveller'], notes: 'One of many Vargr dialects; snarls and posture are vital for "Charisma" modifiers.' });
    this._register({ id: 'battle_signal_imperial', name: 'Tac-Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['traveller'], notes: 'A non-verbal military code used by Imperial Marines for silent vacuum operations.' });
    this._register({ id: 'cant_spacer', name: 'Belter Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['traveller', 'multiverse'], notes: 'A jargon-heavy trade tongue used by asteroid miners and independent traders.' });
    this._register({ id: 'jump_code_binary', name: 'Jump-Vector Data', family: 'machine_logic', script: 'binary_unified', rarity: 'very_rare', settings: ['traveller', 'multiverse'], notes: 'The encrypted mathematical language used by Jump Drives to calculate fold-space vectors.' });
    this._register({ id: 'psionic_whisper', name: 'Thought-Flow', family: 'psionic', script: 'spoken_only', rarity: 'rare', settings: ['traveller', 'multiverse'], notes: 'A telepathic shorthand used by Zhodani Tavrchedl\' (Thought Police) to process "mental static".' });

    // ───────────────────────────────────────────────
    //  CALL OF CTHULHU LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'ancient_greek_coc', name: 'Ancient Greek', family: 'historical_human', script: 'greek', rarity: 'uncommon', settings: ['cthulhu'], notes: 'Essential for reading early translations of the Pnakotic Manuscripts.' });
    this._register({ id: 'arabic_classical', name: 'Classical Arabic', family: 'historical_human', script: 'arabic', rarity: 'uncommon', settings: ['cthulhu'], notes: 'The language of Al-Azif; required for the original Kitab al-Azif text.' });
    this._register({ id: 'egyptian_hieroglyphs', name: 'Egyptian Hieroglyphs', family: 'historical_human', script: 'hieroglyphs', rarity: 'rare', settings: ['cthulhu'], notes: 'Used to decode the secrets of Nephren-Ka and the Black Pharaoh.' });
    this._register({ id: 'latin_medieval', name: 'Medieval Latin', family: 'historical_human', script: 'latin', rarity: 'uncommon', settings: ['cthulhu'], notes: 'The academic standard for Mythos grimoires like the De Vermis Mysteriis.' });
    this._register({ id: 'sanskrit_mythos', name: 'Sanskrit', family: 'historical_human', script: 'devanagari', rarity: 'uncommon', settings: ['cthulhu'], notes: 'Often contains hidden Vedic references to the Plateau of Leng.' });
    this._register({ id: 'aklo_coc', name: 'Aklo', family: 'mythos_alien', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu', 'multiverse'], notes: 'A primordial language associated with serpent folk and the worship of Outer Gods.' });
    this._register({ id: 'elder_sign_logic', name: 'Elder Logic', family: 'mythos_alien', script: 'elder_runes', rarity: 'very_rare', settings: ['cthulhu'], notes: 'A mathematical-symbolic language used by the Elder Things of Antarctica.' });
    this._register({ id: 'mi_go_vibration', name: 'Mi-Go Buzz', family: 'mythos_alien', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'A language of wing-buzzes and color-shifts; requires surgical alteration for humans to speak.' });
    this._register({ id: 'rlyehian', name: 'R\'lyehian', family: 'mythos_alien', script: 'cuneiform', rarity: 'very_rare', settings: ['cthulhu'], notes: 'The "Cthulhu Chant" (Ph\'nglui mglw\'nafh...); a guttural, non-human tongue.' });
    this._register({ id: 'yithian_mental', name: 'Pnakotic', family: 'mythos_alien', script: 'pnakotic_glyphs', rarity: 'rare', settings: ['cthulhu'], notes: 'The language of the Great Race of Yith; structured to describe non-linear time.' });
    this._register({ id: 'cant_arkham_underworld', name: 'Bootlegger Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'Used by the O\'Bannion and Sheldon gangs in Arkham to discuss illicit spirits and shipments.' });
    this._register({ id: 'cipher_tcho_tcho', name: 'Tcho-Tcho Dialect', family: 'mythos_human', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'The high-pitched, disturbing language of the Plateau of Tsang; causes unease in listeners.' });
    this._register({ id: 'deep_one_gurgle', name: 'Innsmouth Look', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'A wet, croaking version of English/Aklo used by the Esoteric Order of Dagon.' });
    this._register({ id: 'naacal', name: 'Naacal', family: 'ancient_human', script: 'hieroglyphs', rarity: 'very_rare', settings: ['cthulhu'], notes: 'The language of the lost continent of Mu; shares roots with Aklo.' });
    this._register({ id: 'commorian', name: 'Commorian', family: 'hyperborean_human', script: 'hieroglyphs', rarity: 'rare', settings: ['cthulhu', 'hyperborea'], notes: 'The primary language of the capital of Hyperborea; used in the worship of Tsathoggua.' });
    this._register({ id: 'mhu_thulan', name: 'Mhu Thulan', family: 'hyperborean_human', script: 'spoken_only', rarity: 'uncommon', settings: ['cthulhu', 'hyperborea'], notes: 'The rugged, northern dialect of the ice-bound sorcerers.' });
    this._register({ id: 'tsathogguan', name: 'Tsathogguan', family: 'mythos_alien', script: 'spoken_only', rarity: 'very_rare', settings: ['cthulhu', 'hyperborea'], notes: 'A low, vibrating language used to commune with the Sleeper of N\'kai.' });
    this._register({ id: 'voormithadreth', name: 'Voormis', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['cthulhu', 'hyperborea'], notes: 'The guttural, growling tongue of the cave-dwelling beast-men of Mount Voormithadreth.' });
    this._register({ id: 'cynotian', name: 'Cynotian', family: 'zothique_human', script: 'common', rarity: 'uncommon', settings: ['cthulhu', 'zothique'], notes: 'The common trade tongue of the last continent; shares phonetic roots with Balok.' });
    this._register({ id: 'necromantic_zothique', name: 'Necromantic Patter', family: 'secret_circle', script: 'glyphs', rarity: 'rare', settings: ['cthulhu', 'zothique'], notes: 'Used by the dark mages of Ulua to command the skeletons that serve as the continent\'s labor force.' });
    this._register({ id: 'tasuunian', name: 'Tasuunian', family: 'zothique_human', script: 'common', rarity: 'uncommon', settings: ['cthulhu', 'zothique'], notes: 'The melancholy language of the desert empire of Tasuun.' });
    this._register({ id: 'xerashian', name: 'Xerashian', family: 'zothique_human', script: 'common', rarity: 'uncommon', settings: ['cthulhu', 'zothique'], notes: 'The decadent language of the island-dwellers; rich in terms for perfume and poison.' });
    this._register({ id: 'ghroth_resonance', name: 'Planetary Requiem', family: 'mythos_alien', script: 'spoken_only', rarity: 'artifact', settings: ['cthulhu', 'multiverse'], notes: 'A series of gravitational "notes" that can be felt by planetary crusts; spoken by the Nemesis Star.' });
    this._register({ id: 'l_gh_he_logic', name: 'L\'gh-he', family: 'mythos_alien', script: 'geometric', rarity: 'very_rare', settings: ['cthulhu'], notes: 'A non-linear language of light and shadow used by the Shan (Insects from Shaggai).' });
    this._register({ id: 'yog_sothoth_key', name: 'The Ultimate Gate', family: 'force_attuned', script: 'spoken_only', rarity: 'artifact', settings: ['cthulhu', 'multiverse'], notes: 'A conceptual language that allows the speaker to perceive all points in time simultaneously.' });
    this._register({ id: 'celephaisean', name: 'Celephaisean', family: 'dreamlands_human', script: 'common', rarity: 'uncommon', settings: ['cthulhu'], notes: 'The courtly, poetic language of the city of Celephaïs; governed by King Kuranes.' });
    this._register({ id: 'dylath_leen_patter', name: 'Dylath-Leen Trade', family: 'multiversal_trade', script: 'common', rarity: 'common', settings: ['cthulhu'], notes: 'A smoke-filled jargon used by merchants and black galleys in the basalt city.' });
    this._register({ id: 'inqua', name: 'Inqua', family: 'dreamlands_human', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'The whispering, cold language of the inhabitants of the city of Inquanok.' });
    this._register({ id: 'larkar', name: 'Larkar', family: 'dreamlands_human', script: 'spoken_only', rarity: 'uncommon', settings: ['cthulhu'], notes: 'A rhythmic language spoken in the southern jungles of the Dreamlands.' });
    this._register({ id: 'thranish', name: 'Thranish', family: 'dreamlands_human', script: 'common', rarity: 'uncommon', settings: ['cthulhu'], notes: 'The language of the city of Thran; known for its many terms for marble and architecture.' });
    this._register({ id: 'cat_ulthar', name: 'Cat-Speak', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['cthulhu'], notes: 'A language of purrs and tail-twitches; the cats of Ulthar can speak to humans, but rarely choose to.' });
    this._register({ id: 'ghoul_dream', name: 'Mephitic Gurgle', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['cthulhu'], notes: 'The slobbering, glottal language of the Dream-Ghouls; allows passage to the Underworld.' });
    this._register({ id: 'gug_mumble', name: 'Gug', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'A booming, unintelligible language spoken by the giant Gugs of the City of Gugs.' });
    this._register({ id: 'night_gaunt_sign', name: 'Gaunt-Tickle', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['cthulhu'], notes: 'Night-gaunts are faceless and voiceless; they communicate through tactile "tickling" and gestures.' });
    this._register({ id: 'zoog_chatter', name: 'Zoog', family: 'monstrous', script: 'spoken_only', rarity: 'uncommon', settings: ['cthulhu'], notes: 'A high-pitched, fluttery language of the forest-dwelling Zoogs; sounds like wind in the leaves.' });
    this._register({ id: 'elder_god_harmony', name: 'The Great Song', family: 'mythos_alien', script: 'spoken_only', rarity: 'artifact', settings: ['cthulhu', 'multiverse'], notes: 'A purely harmonic language used by the Elder Gods; creates physical bliss in listeners.' });
    this._register({ id: 'leng_dialect', name: 'High Leng', family: 'mythos_human', script: 'hieroglyphs', rarity: 'rare', settings: ['cthulhu'], notes: 'The sibilant, disturbing language of the Men of Leng; shared by the Moon-Beasts.' });
    this._register({ id: 'nyarlathotep_mask', name: 'The Thousand Tongues', family: 'force_attuned', script: 'various', rarity: 'artifact', settings: ['cthulhu', 'multiverse'], notes: 'A meta-language that allows the speaker to assume any linguistic identity perfectly.' });
    this._register({ id: 'peak_whisper', name: 'Kadathian', family: 'ancient_mythos', script: 'spoken_only', rarity: 'very_rare', settings: ['cthulhu'], notes: 'The cold, thin-air language of the Great Ones inhabiting Kadath.' });

    // ───────────────────────────────────────────────
    //  SHADOWRUN LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'sperethiel_modern', name: 'Sperethiel (Sixth World)', family: 'elvish', script: 'espruar', rarity: 'uncommon', settings: ['shadowrun'], notes: 'The official language of Tir Tairngire and Tir na nOg; an ancient elven tongue "rediscovered."' });
    this._register({ id: 'ork_zetamanas', name: 'Orzetan', family: 'orkish_modern', script: 'spoken_only', rarity: 'uncommon', settings: ['shadowrun'], notes: 'A linguistic reconstruction of ancient ork glyphs; used as a point of racial pride.' });
    this._register({ id: 'dwarf_skraal', name: 'Skraal', family: 'dwarven_modern', script: 'dethek', rarity: 'uncommon', settings: ['shadowrun'], notes: 'The rugged, technical language favored by underground metahuman communities.' });
    this._register({ id: 'centzon_totonac', name: 'Azlan Totonac', family: 'modern_human', script: 'pictographs', rarity: 'rare', settings: ['shadowrun'], notes: 'The primary language of the Aztechnology corporation and the Aztlan nation.' });

    // ───────────────────────────────────────────────
    //  STARGATE LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'alteran_ancient', name: 'Ancient Alteran', family: 'alteran_ancient', script: 'ancient_glyphs', rarity: 'very_rare', settings: ['stargate'], notes: 'The language of the Gate Builders; root of Latin and the language of Ascension.' });
    this._register({ id: 'asgard', name: 'Asgard', family: 'asgard_alien', script: 'asgard_runes', rarity: 'rare', settings: ['stargate'], notes: 'A complex, holographic-friendly language; visually resembles Old Norse runes.' });
    this._register({ id: 'furling', name: 'Furling', family: 'ancient_st_alien', script: 'furling_glyphs', rarity: 'artifact', settings: ['stargate'], notes: 'One of the four Great Races; their language is found only in the most obscure ruins.' });
    this._register({ id: 'nox', name: 'Nox', family: 'ancient_st_alien', script: 'spoken_only', rarity: 'rare', settings: ['stargate'], notes: 'A melodic, tonal language used by the pacifistic hidden masters of P3X-774.' });
    this._register({ id: 'ori_st', name: 'Ori', family: 'alteran_ancient', script: 'ancient_glyphs', rarity: 'rare', settings: ['stargate'], notes: 'A religious, archaic dialect of Ancient used by the followers of Origin.' });
    this._register({ id: 'goauld', name: 'Goa\'uld', family: 'goauld_alien', script: 'goauld_hieroglyphs', rarity: 'common', settings: ['stargate'], notes: 'The primary trade and military tongue of the Milky Way; spoken by Jaffa and System Lords.' });
    this._register({ id: 'jaffa_battle_sign', name: 'Jaffa Code', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['stargate'], notes: 'A tactical military jargon used by Jaffa rebellions and Free Jaffa forces.' });
    this._register({ id: 'unas', name: 'Unas', family: 'unas_alien', script: 'spoken_only', rarity: 'rare', settings: ['stargate'], notes: 'The primitive, guttural language of the original Goa\'uld hosts; requires high strength to vocalize.' });
    this._register({ id: 'wraith_st', name: 'Wraith', family: 'wraith_alien', script: 'wraith_glyphs', rarity: 'uncommon', settings: ['stargate'], notes: 'The sibilant, telepathic-heavy language of the Pegasus Galaxy predators; derivative of Ancient.' });
    this._register({ id: 'replicator_binary', name: 'Replicator Sync', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['stargate', 'multiverse'], notes: 'A high-speed data language used for hive-mind coordination of block-based constructs.' });
    this._register({ id: 'sg_tactical', name: 'SGC Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['stargate'], notes: 'Standard US Air Force radio jargon modified for off-world planetary exploration.' });
    this._register({ id: 'athosian', name: 'Athosian', family: 'human_st_offworld', script: 'common', rarity: 'uncommon', settings: ['stargate'], notes: 'A peaceful, agricultural dialect from the Pegasus Galaxy.' });

    // ───────────────────────────────────────────────
    //  MULTIVERSAL BRIDGE LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'planar_cant', name: 'Sigil Cant', family: 'multiversal_trade', script: 'common', rarity: 'common', settings: ['planescape', 'multiverse'], notes: 'The "Cutter\'s Tongue" from Sigil; used to bridge gaps between D&D worlds.' });
    this._register({ id: 'omni_code', name: 'Binary Omni-Code', family: 'techno_arcane', script: 'binary_unified', rarity: 'uncommon', settings: ['traveller', '40k', 'eberron'], notes: 'A mathematical language used by Artificers and Tech-Priests to talk across systems.' });
    this._register({ id: 'rift_speak', name: 'Rift-Talk', family: 'multiversal_trade', script: 'spoken_only', rarity: 'rare', settings: ['rifts', 'dark_sun', 'tmnt'], notes: 'A survivalist jargon spoken by those who fall through spontaneous dimensional tears.' });
    this._register({ id: 'void_whisper', name: 'Void-Whisper', family: 'eldritch', script: 'spoken_only', rarity: 'very_rare', settings: ['babylon_5', '40k', 'spelljammer'], notes: 'Telepathic communication used to navigate the "Hyperspace/Warp/Gray" between realms.' });
    this._register({ id: 'arcane_pidgin', name: 'The Weaver\'s Patter', family: 'multiversal_trade', script: 'various', rarity: 'uncommon', settings: ['lotr', 'mystara', 'greyhawk'], notes: 'A blend of High Elven and Draconic roots found in almost every magical fantasy realm.' });
    this._register({ id: 'matrix_jargon', name: 'Grid-Speak', family: 'machine_logic', script: 'binary_unified', rarity: 'common', settings: ['shadowrun', 'cyberpunk', 'multiverse'], notes: 'Technical terminology for IC, nodes, hosts, and data-trails.' });
    this._register({ id: 'binary_asist', name: 'ASIST Data', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['shadowrun'], notes: 'The "Artificial Sensory Induction System Technology" used to transmit raw emotion and sense.' });
    this._register({ id: 'leetspeak_mud', name: '1337-Speak', family: 'secret_guild', script: 'binary_unified', rarity: 'uncommon', settings: ['modern', 'multiverse'], notes: 'The foundational hacker dialect; often used as a basic encryption for text-based comms.' });
    this._register({ id: 'net_protocol_v12', name: 'Old-Net Protocol', family: 'machine_logic', script: 'binary_unified', rarity: 'very_rare', settings: ['cyberpunk'], notes: 'The dangerous, pre-DataKrash language used to navigate the "Old Net" and R.A.B.I.D.S.' });
    this._register({ id: 'technomancy_resonance', name: 'Resonance-Whisper', family: 'techno_arcane', script: 'spoken_only', rarity: 'very_rare', settings: ['shadowrun', 'multiverse'], notes: 'A purely digital-mental language used by Technomancers to talk directly to the Matrix.' });
    this._register({ id: 'city_speak', name: 'City-Speak', family: 'polyglot_modern', script: 'common', rarity: 'common', settings: ['shadowrun', 'cyberpunk'], notes: 'A hybrid of English, Japanese, German, and Spanish; the primary gutter-talk of the sprawls.' });
    this._register({ id: 'streetslang', name: 'Street-Slang', family: 'urban_modern', script: 'common', rarity: 'common', settings: ['cyberpunk', 'shadowrun'], notes: 'Evolving daily; used by Edgerunners to discuss "chrome," "eddies," and "corps."' });
    this._register({ id: 'mil_standard', name: 'NATO Standard', family: 'military_human', script: 'latin', rarity: 'common', settings: ['twilight_2000', 'modern'], notes: 'The jargon-heavy English used by military remnants in the ruins of Europe.' });
    this._register({ id: 'slavic_ruin', name: 'Warsaw-Pact Patter', family: 'military_human', script: 'cyrillic', rarity: 'uncommon', settings: ['twilight_2000'], notes: 'A survivalist blend of Russian, Polish, and Czech used in the post-nuclear frontline.' });
    this._register({ id: 'corporate_high', name: 'Corptalk', family: 'urban_modern', script: 'common', rarity: 'uncommon', settings: ['cyberpunk', 'shadowrun'], notes: 'A clinical, euphemistic language used by high-level salarymen and executives.' });
    this._register({ id: 'nomad_sign', name: 'Road-Sign', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['cyberpunk_red', 'modern'], notes: 'Visual markers and jargon used by Nomad packs (Aldecaldos, etc.) to flag safe havens.' });
    this._register({ id: 'cant_sprawl_rogue', name: 'Shadow-Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['shadowrun', 'multiverse'], notes: 'The "Professional" cant of Shadowrunners; focuses on deniability and extraction.' });
    this._register({ id: 'military_dead_drop', name: 'Buried-Signal', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['twilight_2000'], notes: 'A coded way of marking caches and radiation zones in a post-WWIII environment.' });

    // ───────────────────────────────────────────────
    //  BATTLETECH LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'davion_english', name: 'Crucis English', family: 'human_battletech', script: 'latin', rarity: 'common', settings: ['battletech'], notes: 'The high-society dialect of the Federated Suns; formal and traditional.' });
    this._register({ id: 'kurita_japanese', name: 'Draconis Japanese', family: 'human_battletech', script: 'kanji', rarity: 'common', settings: ['battletech'], notes: 'The primary language of the Draconis Combine; mandatory for the samurai-class (samurai-bu).' });
    this._register({ id: 'liao_mandarin', name: 'Capellan Mandarin', family: 'human_battletech', script: 'pictographs', rarity: 'common', settings: ['battletech'], notes: 'The official language of the Capellan Confederation; includes heavy Han-cultural nuances.' });
    this._register({ id: 'steiner_german', name: 'Lyran German', family: 'human_battletech', script: 'latin', rarity: 'common', settings: ['battletech'], notes: 'The dominant language of the Lyran Commonwealth; associated with mercantile power.' });
    this._register({ id: 'marik_italian', name: 'Free Worlds Italian', family: 'human_battletech', script: 'latin', rarity: 'uncommon', settings: ['battletech'], notes: 'A major regional language of the Free Worlds League alongside Spanish and Greek.' });
    this._register({ id: 'star_league_standard', name: 'Standard English', family: 'universal', script: 'latin', rarity: 'common', settings: ['battletech', 'multiverse'], notes: 'The common trade tongue of the Inner Sphere and the lost Star League.' });
    this._register({ id: 'outworlds_patois', name: 'Periphery Patois', family: 'human_battletech', script: 'spoken_only', rarity: 'uncommon', settings: ['battletech'], notes: 'A rough blend of languages spoken by frontier settlers in the Periphery.' });
    this._register({ id: 'clan_speak', name: 'Clan-Speak', family: 'human_clan', script: 'latin', rarity: 'uncommon', settings: ['battletech'], notes: 'Strict, contraction-free English; includes specific terms like "batchall" and "surat".' });
    this._register({ id: 'warrior_code_bt', name: 'Battle-Logic', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['battletech'], notes: 'A tactical sub-language used by MechWarriors via neurohelmet feedback during combat.' });
    this._register({ id: 'comstar_cipher', name: 'HPG Protocol', family: 'machine_logic', script: 'binary_unified', rarity: 'very_rare', settings: ['battletech'], notes: 'The secret data-language of the ComStar Order; used to maintain the HPG network.' });
    this._register({ id: 'merchant_cant_bt', name: 'Factor-Talk', family: 'secret_guild', script: 'spoken_only', rarity: 'uncommon', settings: ['battletech'], notes: 'Used by the Clan Merchant Caste to negotiate without alert to the Warrior Caste.' });
    this._register({ id: 'word_of_blake_code', name: 'Blakist Scripture', family: 'secret_guild', script: 'binary_unified', rarity: 'very_rare', settings: ['battletech'], notes: 'A radicalized version of the ComStar cipher used during the Jihad.' });
    this._register({ id: 'tech_slang_bt', name: 'Mech-Tech Cant', family: 'secret_guild', script: 'common', rarity: 'uncommon', settings: ['battletech', 'multiverse'], notes: 'Heavy on terms for fusion engines, myomer bundles, and heat sinks.' });
    this._register({ id: 'farstar_patois', name: 'Farstar Patois', family: 'human_battletech', script: 'spoken_only', rarity: 'rare', settings: ['battletech'], notes: 'A heavily eroded version of English and Russian spoken in the Farstar clusters.' });
    this._register({ id: 'interstellar_islat', name: 'Islat', family: 'human_battletech', script: 'latin', rarity: 'uncommon', settings: ['battletech'], notes: 'The primary language of the Umayyad Caliphate in the Deep Periphery.' });
    this._register({ id: 'jarnfolk_norse', name: 'Jarnfolk', family: 'human_battletech', script: 'runic', rarity: 'uncommon', settings: ['battletech'], notes: 'An archaic Scandinavian dialect spoken by the reclusive Jarnfolk traders.' });
    this._register({ id: 'niopsian_high', name: 'High Niopsian', family: 'human_battletech', script: 'latin', rarity: 'rare', settings: ['battletech'], notes: 'An academic, extremely formal English used by the scientists of the Niops Association.' });
    this._register({ id: 'oberon_slang', name: 'Pirate-Common', family: 'human_battletech', script: 'spoken_only', rarity: 'common', settings: ['battletech'], notes: 'The rough, aggressive jargon of the Oberon Confederation and coreward bandit kingdoms.' });
    this._register({ id: 'tetrae_vocal', name: 'Tetrae', family: 'alien_battletech', script: 'spoken_only', rarity: 'very_rare', settings: ['battletech'], notes: 'The language of the only confirmed sapient aliens (Neopithecanthropus); consists of complex hooting and gestures.' });
    this._register({ id: 'swamp_people_hum', name: 'Swamp-Hum', family: 'alien_battletech', script: 'spoken_only', rarity: 'very_rare', settings: ['battletech'], notes: 'Low-frequency humming used by the semi-sapient "Swamp People" of Hunter\'s Paradise.' });
    this._register({ id: 'neopithecan_sign', name: 'Hand-Grip', family: 'alien_battletech', script: 'spoken_only', rarity: 'very_rare', settings: ['battletech'], notes: 'A tactile sign language used by Tetrae to communicate status within their tribal groups.' });
    this._register({ id: 'code_minnesota', name: 'Minnesota Cipher', family: 'secret_guild', script: 'binary_unified', rarity: 'artifact', settings: ['battletech'], notes: 'The mysterious, high-level encryption used by the "Minnesota Tribe" (Exiled Clan Wolverine).' });
    this._register({ id: 'star_league_ritual', name: 'SLDF Liturgy', family: 'secret_guild', script: 'common', rarity: 'rare', settings: ['battletech'], notes: 'Used by the Eridani Light Horse and other SLDF remnants to preserve ancient military tradition.' });
    this._register({ id: 'void_beacon_code', name: 'Ghost-Signal', family: 'machine_logic', script: 'binary_unified', rarity: 'very_rare', settings: ['battletech', 'multiverse'], notes: 'Automated HPG-style transmissions found in the Deep Periphery from unknown or dead origins.' });


    // ───────────────────────────────────────────────
    //  LOTR / MIDDLE EARTH LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'adunaic', name: 'Adûnaic', family: 'human_middle_earth', script: 'cirth', rarity: 'extinct', settings: ['middle_earth'], notes: 'The native tongue of Númenor; ancestor to Westron and the Black Speech.' });
    this._register({ id: 'avarin', name: 'Avarin', family: 'elvish', script: 'spoken_only', rarity: 'rare', settings: ['middle_earth'], notes: 'The speech of the "Unwilling" elves who never began the Great March.' });
    this._register({ id: 'goldogrin', name: 'Gnomish (Goldogrin)', family: 'elvish', script: 'tengwar', rarity: 'rare', settings: ['middle_earth'], notes: 'An early, archaic form of the Noldorin dialect.' });
    this._register({ id: 'noldorin', name: 'Noldorin', family: 'elvish', script: 'tengwar', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The evolving language of the Noldor in Exile; later developed into Sindarin.' });
    this._register({ id: 'quenya', name: 'Quenya', family: 'elvish', script: 'tengwar', rarity: 'rare', settings: ['middle_earth'], notes: 'High-Elven; the "Latin" of Middle-earth used for ritual, song, and lore.' });
    this._register({ id: 'sindarin', name: 'Sindarin', family: 'elvish', script: 'tengwar', rarity: 'common', settings: ['middle_earth'], notes: 'Grey-Elven; the primary living language of the Elves in the Third Age.' });
    this._register({ id: 'telerin', name: 'Telerin', family: 'elvish', script: 'tengwar', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The language of the Sea-elves; closely related to Quenya.' });
    this._register({ id: 'ilkorin', name: 'Ilkorin', family: 'elvish', script: 'tengwar', rarity: 'extinct', settings: ['middle_earth'], notes: 'The lost language of the Elves of Beleriand who were not of the Sindar.' });
    this._register({ id: 'nandorin', name: 'Nandorin', family: 'elvish', script: 'tengwar', rarity: 'rare', settings: ['middle_earth'], notes: 'The tongue of the Green-elves; influenced the Silvan dialects of Mirkwood.' });
    this._register({ id: 'falathrin', name: 'Falathrin', family: 'elvish', script: 'tengwar', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The specific Sindarin dialect of the coastal elves of the Falas.' });
    this._register({ id: 'common_westron', name: 'Westron (Sôval Phârë)', family: 'universal', script: 'common', rarity: 'common', settings: ['middle_earth'], notes: 'The "Common Speech" of the Third Age; spoken by almost all civilized races.' });
    this._register({ id: 'dunlending', name: 'Dunlending', family: 'human_middle_earth', script: 'spoken_only', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The harsh tongue of the Men of Dunland; unrelated to Westron.' });
    this._register({ id: 'easterling', name: 'Easterling', family: 'human_middle_earth', script: 'spoken_only', rarity: 'uncommon', settings: ['middle_earth'], notes: 'A collection of diverse tongues spoken by the tribes of Rhûn.' });
    this._register({ id: 'haladin', name: 'Haladin', family: 'human_middle_earth', script: 'spoken_only', rarity: 'extinct', settings: ['middle_earth'], notes: 'The isolated language of the Second House of Men (the Haladin).' });
    this._register({ id: 'haradrim', name: 'Haradrim', family: 'human_middle_earth', script: 'spoken_only', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The languages of the Southrons; varied across the vast lands of Harad.' });
    this._register({ id: 'hobbitish', name: 'Hobbitish', family: 'human_middle_earth', script: 'common', rarity: 'common', settings: ['middle_earth'], notes: 'A rustic, agrarian dialect of Westron with unique localized vocabulary.' });
    this._register({ id: 'rohirric', name: 'Rohirric', family: 'human_middle_earth', script: 'cirth', rarity: 'common', settings: ['middle_earth'], notes: 'The language of the Rohirrim; archaic and related to the tongues of the Northmen.' });
    this._register({ id: 'talaska', name: 'Talaska', family: 'human_middle_earth', script: 'spoken_only', rarity: 'extinct', settings: ['middle_earth'], notes: 'The ancient tongue of the ancestors of the Edain.' });
    this._register({ id: 'drûg', name: 'Drûg', family: 'human_middle_earth', script: 'spoken_only', rarity: 'rare', settings: ['middle_earth'], notes: 'The strange, guttural language of the Woses (Wild Men of the Woods).' });
    this._register({ id: 'lossoth', name: 'Lossoth', family: 'human_middle_earth', script: 'spoken_only', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The language of the Snow-men of Forochel.' });
    this._register({ id: 'black_speech', name: 'Black Speech', family: 'monstrous', script: 'tengwar', rarity: 'rare', settings: ['middle_earth'], notes: 'Created by Sauron for his servants; the Ring Verse is its most famous example.' });
    this._register({ id: 'entish', name: 'Entish', family: 'monstrous', script: 'spoken_only', rarity: 'very_rare', settings: ['middle_earth'], notes: 'Extremely slow and sonorous; describes things by their entire history.' });
    this._register({ id: 'khuzdul', name: 'Khuzdûl', family: 'dwarven', script: 'cirth', rarity: 'rare', settings: ['middle_earth'], notes: 'The secret language of the Dwarves; never taught to outsiders.' });
    this._register({ id: 'orkish_middle_earth', name: 'Orkish (Common)', family: 'monstrous', script: 'cirth', rarity: 'common', settings: ['middle_earth'], notes: 'A debased jumble of many tongues; varies wildly between tribes.' });
    this._register({ id: 'valarin', name: 'Valarin', family: 'extraplanar', script: 'spoken_only', rarity: 'artifact', settings: ['middle_earth'], notes: 'The language of the Valar; sounds like thunder or rushing water to mortals.' });
    this._register({ id: 'vales_of_anduin', name: 'Northman', family: 'human_middle_earth', script: 'cirth', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The tongue of the Men of Dale and the Beornings.' });
    this._register({ id: 'warg_speech', name: 'Warg-Talk', family: 'monstrous', script: 'spoken_only', rarity: 'rare', settings: ['middle_earth'], notes: 'A series of snarls and howls understood by Orcs and Wargs.' });
    this._register({ id: 'cant_bree_rogue', name: 'Bree-Patter', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['middle_earth'], notes: 'The underworld jargon of the Prancing Pony and the crossroads.' });
    this._register({ id: 'iglishmek', name: 'Iglishmêk', family: 'dwarven', script: 'spoken_only', rarity: 'rare', settings: ['middle_earth'], notes: 'A complex gestural sign-language used by Dwarves to communicate in silence.' });
    this._register({ id: 'saruman_cipher', name: 'Isengard Code', family: 'secret_guild', script: 'cirth', rarity: 'rare', settings: ['middle_earth'], notes: 'A specialized military code used by Uruk-hai and Saruman\'s spies.' });
    this._register({ id: 'tengwar_logic', name: 'Lore-Hand', family: 'secret_circle', script: 'tengwar', rarity: 'uncommon', settings: ['middle_earth'], notes: 'The system of phonetic markings used by scholars to transcribe any tongue.' });

    // ───────────────────────────────────────────────
    //  GAMMA WORLD LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'ancient_gamma', name: 'Ancient', family: 'human_gamma_world', script: 'common', rarity: 'rare', settings: ['gamma_world'], notes: 'The technical English of the 21st century; used to read manuals for high-tech relics.' });
    this._register({ id: 'bonaparish', name: 'Bonaparish', family: 'human_gamma_world', script: 'spoken_only', rarity: 'uncommon', settings: ['gamma_world'], notes: 'The militaristic language of the Radioactivist and Iron Society human purists.' });
    this._register({ id: 'gamma_common', name: 'Common (Gamma)', family: 'universal', script: 'common', rarity: 'common', settings: ['gamma_world'], notes: 'A heavily eroded version of English; utilizes many pictographs for "Danger" and "Food".' });
    this._register({ id: 'healer_patter', name: 'Healer Argot', family: 'human_gamma_world', script: 'spoken_only', rarity: 'uncommon', settings: ['gamma_world'], notes: 'A medical-based dialect used by the Healers to discuss mutation stabilization.' });
    this._register({ id: 'nomad_slang_gamma', name: 'Wasteland-Skim', family: 'human_gamma_world', script: 'spoken_only', rarity: 'common', settings: ['gamma_world'], notes: 'A fast-paced trade tongue used by road-clans and salvage-skimmers.' });
    this._register({ id: 'animal_hybrid', name: 'Beast-Talk', family: 'mutant_beast', script: 'spoken_only', rarity: 'common', settings: ['gamma_world'], notes: 'A blend of grunts and vocalizations used by humanoid animal mutants (Hoops, Dabbers, etc.).' });
    this._register({ id: 'baba_gon', name: 'Baba-Gon', family: 'mutant_beast', script: 'spoken_only', rarity: 'rare', settings: ['gamma_world'], notes: 'The specialized language of the winged, ape-like Badders.' });
    this._register({ id: 'gallus_cluck', name: 'Gallus', family: 'mutant_beast', script: 'spoken_only', rarity: 'uncommon', settings: ['gamma_world'], notes: 'The clucking, rhythmic language of the mutated avian Gallus Gallus.' });
    this._register({ id: 'pod_whisper', name: 'Plant-Pulse', family: 'mutant_plant', script: 'spoken_only', rarity: 'rare', settings: ['gamma_world'], notes: 'A sub-vocalized frequency used by sentient flora to communicate via root-vibrations.' });
    this._register({ id: 'yexil_chirp', name: 'Yexil', family: 'mutant_beast', script: 'spoken_only', rarity: 'rare', settings: ['gamma_world'], notes: 'The multi-layered chirping language of the lion-headed flyers.' });
    this._register({ id: 'code_cryptic', name: 'Alliance Cipher', family: 'secret_guild', script: 'binary_unified', rarity: 'very_rare', settings: ['gamma_world'], notes: 'Secret codes used by groups like the Knights of Genetic Purity or the Seekers.' });
    this._register({ id: 'data_relic_binary', name: 'Core-Sync', family: 'machine_logic', script: 'binary_unified', rarity: 'rare', settings: ['gamma_world', 'multiverse'], notes: 'The machine-code required to interface with "Thinking Machines" and Cybernetic Overlords.' });
    this._register({ id: 'tech_jargon_gamma', name: 'Artifact-Speak', family: 'secret_guild', script: 'common', rarity: 'uncommon', settings: ['gamma_world'], notes: 'Jargon used by scavengers to describe Power Cells, Duralloy, and Holo-records.' });
    this._register({ id: 'void_broadcast', name: 'Emergency Broadcast', family: 'machine_logic', script: 'spoken_only', rarity: 'artifact', settings: ['gamma_world'], notes: 'Looping automated radio messages from the Pre-Collapse era.' });

    // ───────────────────────────────────────────────
    //  ADMIN / BUILDER LANGUAGES
    // ───────────────────────────────────────────────

    this._register({ id: 'immortal_cant', name: 'Architect\'s Patter', family: 'admin_meta', script: 'spoken_only', rarity: 'artifact', settings: ['multiverse'], notes: 'A high-level jargon used by GMs and Immortals to discuss player-flux and realm-stability.' });


this._register({ id: 'sumerian', name: 'Sumerian', family: 'ancient_human', script: 'cuneiform', rarity: 'rare', settings: ['earth'], notes: 'One of the earliest written languages; essential for pre‑Akkadian tablets.' });
this._register({ id: 'akkadian', name: 'Akkadian', family: 'ancient_human', script: 'cuneiform', rarity: 'rare', settings: ['earth'], notes: 'The Semitic language of ancient Mesopotamia; includes Assyrian and Babylonian variants.' });
this._register({ id: 'old_egyptian', name: 'Old Egyptian', family: 'ancient_human', script: 'hieroglyphs', rarity: 'rare', settings: ['earth'], notes: 'The earliest stage of Egyptian; used in pyramid texts.' });
this._register({ id: 'hittite', name: 'Hittite', family: 'ancient_human', script: 'cuneiform', rarity: 'rare', settings: ['earth'], notes: 'The oldest attested Indo‑European language; found in Anatolian tablets.' });
this._register({ id: 'old_chinese', name: 'Old Chinese', family: 'ancient_human', script: 'hanzi', rarity: 'rare', settings: ['earth'], notes: 'The earliest form of Chinese; reconstructed from oracle bones and bronze inscriptions.' });
this._register({ id: 'classical_latin', name: 'Classical Latin', family: 'classical_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'The formal literary language of Rome; basis for many later dialects.' });
this._register({ id: 'classical_greek', name: 'Classical Greek', family: 'classical_human', script: 'greek', rarity: 'common', settings: ['earth'], notes: 'The language of philosophy, drama, and science in the ancient Mediterranean.' });
this._register({ id: 'classical_sanskrit', name: 'Classical Sanskrit', family: 'classical_human', script: 'devanagari', rarity: 'common', settings: ['earth'], notes: 'The liturgical and scholarly language of India; root of many Indo‑Aryan tongues.' });
this._register({ id: 'classical_hebrew', name: 'Classical Hebrew', family: 'classical_human', script: 'hebrew', rarity: 'uncommon', settings: ['earth'], notes: 'The ancient Semitic language of the Tanakh; distinct from modern Hebrew.' });
this._register({ id: 'classical_chinese', name: 'Classical Chinese', family: 'classical_human', script: 'hanzi', rarity: 'common', settings: ['earth'], notes: 'The literary standard of East Asia for millennia; terse and context‑heavy.' });
this._register({ id: 'old_english', name: 'Old English', family: 'medieval_human', script: 'latin', rarity: 'uncommon', settings: ['earth'], notes: 'The Anglo‑Saxon language; precursor to modern English.' });
this._register({ id: 'middle_english', name: 'Middle English', family: 'medieval_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'The language of Chaucer; transitional between Old and Modern English.' });
this._register({ id: 'old_norse', name: 'Old Norse', family: 'medieval_human', script: 'runic', rarity: 'uncommon', settings: ['earth'], notes: 'The language of the Vikings; ancestor of modern Scandinavian tongues.' });
this._register({ id: 'middle_chinese', name: 'Middle Chinese', family: 'medieval_human', script: 'hanzi', rarity: 'uncommon', settings: ['earth'], notes: 'The Tang‑era standard; basis for Sino‑Xenic pronunciations.' });
this._register({ id: 'classical_arabic', name: 'Classical Arabic', family: 'medieval_human', script: 'arabic', rarity: 'common', settings: ['earth'], notes: 'The Qur’anic language; foundation of Islamic scholarship.' });
this._register({ id: 'early_modern_english', name: 'Early Modern English', family: 'early_modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'The language of Shakespeare and the King James Bible.' });
this._register({ id: 'early_modern_french', name: 'Early Modern French', family: 'early_modern_human', script: 'latin', rarity: 'uncommon', settings: ['earth'], notes: 'The diplomatic language of Europe during the Renaissance.' });
this._register({ id: 'edo_japanese', name: 'Edo Japanese', family: 'early_modern_human', script: 'kana_kanji', rarity: 'uncommon', settings: ['earth'], notes: 'The Japanese of the Tokugawa period; precursor to modern Japanese.' });
this._register({ id: 'modern_english', name: 'Modern English', family: 'modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'The global lingua franca; highly variable across regions.' });
this._register({ id: 'modern_spanish', name: 'Spanish', family: 'modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'A Romance language spoken across Europe and the Americas.' });
this._register({ id: 'modern_french', name: 'French', family: 'modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'A major world language with global diplomatic influence.' });
this._register({ id: 'modern_german', name: 'German', family: 'modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'A West‑Germanic language known for compound words and precision.' });
this._register({ id: 'modern_russian', name: 'Russian', family: 'modern_human', script: 'cyrillic', rarity: 'common', settings: ['earth'], notes: 'The largest Slavic language; uses the Cyrillic alphabet.' });
this._register({ id: 'modern_chinese_mandarin', name: 'Mandarin Chinese', family: 'modern_human', script: 'hanzi', rarity: 'common', settings: ['earth'], notes: 'The most widely spoken language on Earth; tonal and logographic.' });
this._register({ id: 'modern_japanese', name: 'Japanese', family: 'modern_human', script: 'kana_kanji', rarity: 'common', settings: ['earth'], notes: 'Uses a mix of kanji, hiragana, and katakana.' });
this._register({ id: 'modern_korean', name: 'Korean', family: 'modern_human', script: 'hangul', rarity: 'common', settings: ['earth'], notes: 'A featural alphabet designed for ease of learning.' });
this._register({ id: 'modern_thai', name: 'Thai', family: 'modern_human', script: 'thai', rarity: 'common', settings: ['earth'], notes: 'A tonal language using the Thai abugida script.' });
this._register({ id: 'modern_indonesian', name: 'Indonesian', family: 'modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'A standardized Malay; the national language of Indonesia.' });
this._register({ id: 'modern_javanese', name: 'Javanese', family: 'modern_human', script: 'javanese', rarity: 'uncommon', settings: ['earth'], notes: 'A major Austronesian language with its own Brahmic script.' });
this._register({ id: 'modern_burmese', name: 'Burmese', family: 'modern_human', script: 'burmese', rarity: 'uncommon', settings: ['earth'], notes: 'A tonal language using a rounded Brahmic script.' });
this._register({ id: 'modern_tibetan', name: 'Tibetan', family: 'modern_human', script: 'tibetan', rarity: 'uncommon', settings: ['earth'], notes: 'A Sino‑Tibetan language with a unique syllabic script.' });
this._register({ id: 'modern_amharic', name: 'Amharic', family: 'modern_human', script: 'ethiopic', rarity: 'uncommon', settings: ['earth'], notes: 'A Semitic language using the Ge’ez abugida.' });
this._register({ id: 'modern_georgian', name: 'Georgian', family: 'modern_human', script: 'georgian', rarity: 'uncommon', settings: ['earth'], notes: 'Uses the unique Mkhedruli alphabet.' });
this._register({ id: 'modern_turkish', name: 'Turkish', family: 'modern_human', script: 'latin', rarity: 'common', settings: ['earth'], notes: 'A Turkic language that switched from Arabic to Latin script in 1928.' });

// FIREFLY
this._register({ id: 'firefly_sino_anglo', name: 'Sino‑Anglo', family: 'firefly_human', script: 'latin_hanzi', rarity: 'common', settings: ['firefly'], notes: 'The blended English‑Mandarin creole spoken across the Verse.' });
this._register({ id: 'firefly_core_mandarin', name: 'Core Mandarin', family: 'firefly_human', script: 'hanzi', rarity: 'common', settings: ['firefly'], notes: 'The prestige dialect used in Alliance bureaucracy and education.' });
this._register({ id: 'firefly_frontier_patois', name: 'Frontier Patois', family: 'firefly_human', script: 'latin', rarity: 'uncommon', settings: ['firefly'], notes: 'A rough creole of English, Mandarin, and local slang spoken on Rim worlds.' });
this._register({ id: 'firefly_browncoat_code', name: 'Browncoat Cant', family: 'secret_guild', script: 'spoken_only', rarity: 'rare', settings: ['firefly'], notes: 'A coded jargon used by Independent forces during the Unification War.' });

// 13th Age
this._register({
  id: '13a_common',
  name: 'Common (Dragon Empire)',
  family: '13th_age_human',
  script: 'common',
  rarity: 'common',
  settings: ['13th_age'],
  notes: 'The primary trade tongue of the Dragon Empire; mutually intelligible across most regions.'
});

this._register({ id: '13a_dwarvish', name: 'Dwarvish', family: 'dwarven', script: 'dethek', rarity: 'common', settings: ['13th_age'], notes: 'A rune-heavy language carved as often as spoken; used by the Dwarf King’s clans.' });
this._register({ id: '13a_elvish', name: 'Elvish', family: 'elvish', script: 'tengwar', rarity: 'common', settings: ['13th_age'], notes: 'The melodic tongue of the High Elves, Wood Elves, and Dark Elves; dialects differ but remain mutually intelligible.' });

this._register({
  id: '13a_halfling',
  name: 'Halfling',
  family: '13th_age_human',
  script: 'common',
  rarity: 'uncommon',
  settings: ['13th_age'],
  notes: 'A cheerful, idiomatic dialect of Common; rich in agricultural metaphors.'
});
this._register({ id: '13a_draconic', name: 'Draconic', family: 'draconic', script: 'iokharic', rarity: 'uncommon', settings: ['13th_age'], notes: 'The ancient language of dragons; used in spell formulas and Iconic pacts.' });

this._register({
  id: '13a_arcane_script',
  name: 'Arcane Script',
  family: '13th_age_arcane',
  script: 'arcane_runes',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'A symbolic language used by wizards; not spoken, only inscribed or invoked.'
});
this._register({
  id: '13a_goblin',
  name: 'Goblin-Talk',
  family: '13th_age_monstrous',
  script: 'cirth',
  rarity: 'common',
  settings: ['13th_age'],
  notes: 'A harsh, fast-paced language spoken by goblins, hobgoblins, and bugbears.'
});

this._register({
  id: '13a_orcish',
  name: 'Orcish',
  family: '13th_age_monstrous',
  script: 'cirth',
  rarity: 'common',
  settings: ['13th_age'],
  notes: 'A guttural, warlike tongue; varies by tribe but shares a common root.'
});

this._register({
  id: '13a_trollspeech',
  name: 'Trollspeech',
  family: '13th_age_monstrous',
  script: 'spoken_only',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'A slow, booming language; trolls often forget mid-sentence and restart.'
});

this._register({
  id: '13a_ogre',
  name: 'Ogre-Grunt',
  family: '13th_age_monstrous',
  script: 'spoken_only',
  rarity: 'uncommon',
  settings: ['13th_age'],
  notes: 'A crude language of gestures and simple words; ogres rarely write.'
});
this._register({
  id: '13a_undercommon',
  name: 'Undercommon',
  family: '13th_age_monstrous',
  script: 'underdark_runes',
  rarity: 'uncommon',
  settings: ['13th_age'],
  notes: 'A subterranean trade tongue used by drow, duergar, and deep-dwellers.'
});

this._register({
  id: '13a_demon_tongue',
  name: 'Demon-Tongue',
  family: '13th_age_arcane',
  script: 'infernal_glyphs',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'A dangerous, reality-warping language spoken by demons and chaotic entities.'
});

this._register({
  id: '13a_infernal',
  name: 'Infernal',
  family: '13th_age_arcane',
  script: 'infernal_glyphs',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'The structured, contractual language of devils; used in binding pacts.'
});
this._register({
  id: '13a_high_imperial',
  name: 'High Imperial',
  family: '13th_age_human',
  script: 'common',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'A ceremonial language used by the Emperor’s court; archaic but prestigious.'
});

this._register({
  id: '13a_priestly_cant',
  name: 'Priestly Cant',
  family: '13th_age_arcane',
  script: 'celestial',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'A liturgical language used by clerics; shares roots with Celestial.'
});

this._register({
  id: '13a_celestial',
  name: 'Celestial',
  family: '13th_age_arcane',
  script: 'celestial',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'The radiant language of angels and Iconic emissaries.'
});
this._register({
  id: '13a_beastspeech',
  name: 'Beast-Speech',
  family: '13th_age_monstrous',
  script: 'spoken_only',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'A primal language of roars, scents, and gestures; druids can learn it.'
});

this._register({
  id: '13a_spirit_tongue',
  name: 'Spirit-Tongue',
  family: '13th_age_arcane',
  script: 'runic',
  rarity: 'rare',
  settings: ['13th_age'],
  notes: 'Used by shamans and spirits; communicates intent more than grammar.'
});


  }

  getLanguage(id) {
    return this.languages.get(id) || null;
  }

  getAllLanguages() {
    return Array.from(this.languages.values());
  }
}

module.exports = LanguageRegistry;
