'use strict';

/**
 * LanguageRelations
 * -----------------
 * Static metadata about:
 *  - language families
 *  - dialect intelligibility
 *  - difficulty ratings
 *  - skill synergies
 *
 * This does not own languages; it references them by id.
 */

class LanguageRelations {
  constructor() {
    this.familyTree = new Map();
    this.difficulty = new Map();
    this.intelligibility = new Map();
    this.synergies = new Map();

    this._bootstrapFamilies();
    this._bootstrapDifficulty();
    this._bootstrapIntelligibility();
    this._bootstrapSynergies();
  }

  // ───────────────────────────────────────────────
  //  FAMILY TREE (MULTIVERSAL, NORMALIZED)
  // ───────────────────────────────────────────────
  _bootstrapFamilies() {

    this.familyTree.set('forgotten_realms', {
      parent: null,
      members: [ 'human_chult', 'human_faerunian', 'human_imaskari', 'human_kara_tur', 'human_katashakan', 'human_maztica', 'human_zakharan' ]
    });
      this.familyTree.set('human_chult', {
        parent: 'forgotten_realms',
        members: [ 'akalan', 'akurian', 'chultan_creole', 'eshowan', 'nxala', 'samman', 'tabaxi_human', 'tashalan' ]
      });
        this.familyTree.set('chultan_creole', {
          parent: 'human_chult',
          members: [ 'kouroo', 'nyanzarun' ]
        });
      this.familyTree.set('human_faerunian', {
        parent: 'forgotten_realms',
        members: [ 'boreal_steppe', 'central_faerunian', 'faerunian_arcana', 'faerunian_creole', 'rauric', 'shaaran_nomadic', 'southern_faerunian' ]
      });
        this.familyTree.set('boreal_steppe', {
          parent: 'human_faerunian',
          members: [ 'arkaiun', 'narfelli', 'rashemi', 'sossic', 'tuigan', 'uluik', 'ulutiun' ]
        });
        this.familyTree.set('central_faerunian', {
          parent: 'human_faerunian',
          members: [ 'chondathan', 'illuskan', 'tethyrian', 'damaran', 'aglarondan', 'altumbic', 'alambit', 'sespechian', 'turmic', 'thorass', 'loross', 'reghedjic', 'uthgardt' ]
        });
        this.familyTree.set('faerunian_arcana', {
          parent: 'human_faerunian',
          members: [ 'netherese_modern', 'ruathlek', 'maiden_tongue', 'lantanese', 'dtarig', 'old_ulanthi', 'ulanthi' ]
        });
        this.familyTree.set('faerunian_creole', {
          parent: 'human_faerunian',
          members: [ 'thorasta', 'merchant_pidgin', 'uloushinn', 'shaan_patois', 'hlondethan', 'swagdar', 'telpi' ]
        });
        this.familyTree.set('shaaran_nomadic', {
          parent: 'human_faerunian',
          members: [ 'dambrathan', 'durpari', 'shaaran' ]
        });
        this.familyTree.set('southern_faerunian', {
          parent: 'human_faerunian',
          members: [ 'alzhedo', 'calishite_high', 'calishite_low', 'muhjuri', 'tashalan', 'halruaan' ]
        });
        this.familyTree.set('tribal_faerunian', {
          parent: 'human_faerunian',
          members: [ 'alessian', 'argalun', 'bothii', 'chardic', 'cosh', 'daelic', 'darum', 'eanul', 'elpran', 'hodian', 'maran', 'tuelhalan', 'waelan' ]
        });
    this.familyTree.set('human_imaskari', {
        parent: 'forgotten_realms',
        members: [ 'amaese_languages', 'deep_imaskari', 'eastern_imaskari', 'imaskari_creole', 'northern_imaskari', 'precursor_imaskari', 'southern_imaskari' ]
      });
      this.familyTree.set('amaese_languages', {
        parent: 'human_imaskari',
        members: [ 'issacortae', 'pazruki', 'wu_haltai' ]
      });
      this.familyTree.set('deep_imaskari', {
        parent: 'human_imaskari',
        members: [ 'roushoum' /* The "living" ancient tongue of the Deep Imaskari */ ]
      });
      this.familyTree.set('eastern_imaskari', {
        parent: 'human_imaskari',
        members: [ 'chuchian', 'zamogedi' ]
      });
      this.familyTree.set('imaskari_creole', {
        parent: 'human_imaskari',
        members: [ 'gurri' ]
      });
      this.familyTree.set('precursor_imaskari', {
        parent: 'human_imaskari',
        members: [ 'ancient_imask' /* The dead root of the Raurin/Hordeland tongues*/ ]
      });
      this.familyTree.set('northern_imaskari', {
        parent: 'human_imaskari',
        members: [ 'commani', 'khassidi', 'naican', 'raumvira' ]
      });
      this.familyTree.set('southern_imaskari', {
        parent: 'human_imaskari',
        members: [ 'oigur', 'quirish' ]
      });
    this.familyTree.set('human_kara_tur', {
      parent: 'forgotten_realms',
      members: ['shou_lung_empire', 'island_kingdoms', 'kara_tur_nomadic']
    });
      this.familyTree.set('island_kingdoms', {
        parent: 'human_kara_tur',
        members: [ 'koryoan', 'kozaku', 'kozuran', 'wa_an' ]
      });
      this.familyTree.set('kara_tur_nomadic', {
        parent: 'human_kara_tur',
        members: [ 'alan', 'tabotan' ]
      });
      this.familyTree.set('shou_lung_empire', {
        parent: 'human_kara_tur',
        members: [ 'kao_te_shou', 'kuong', 'laothan', 'shou', 'tu_lung' ]
      });
    this.familyTree.set('human_katashakan', {
      parent: 'forgotten_realms',
      members: [ 'ancient_tabaxi', 'thinguth', 'maru_patois', 'taerloonian' ]
    });
    this.familyTree.set('human_maztica', {
      parent: 'forgotten_realms',
      members: [ 'maztican_creole','maztican_high', 'maztican_regional' ]
    });
      this.familyTree.set('maztican_creole', {
        parent: 'human_maztica',
        members: ['amnian_nexalan']
      });
      this.familyTree.set('maztican_high', {
        parent: 'human_maztica',
        members: ['nexalan']
      }); 
      this.familyTree.set('maztican_regional', {
        parent: 'human_maztica',
        members: ['azuposi', 'huacli', 'kultakan', 'payit']
      });
    this.familyTree.set('human_zakharan', {
      parent: 'forgotten_realms',
      members: ['midani_dialects', 'zakharan_tribal']
    });
      this.familyTree.set('midani_dialects', {
        parent: 'human_zakharan',
        members: ['midani_common', 'midani_high', 'midani_low']
      });
      this.familyTree.set('zakharan_creole', {
        parent: 'human_zakharan',
        members: [
          'shang_chou',        // Kara-Tur Trade Tongue in Zakhara
          'thieves_cant_midani' // Rogue's lingo
        ]
      });
      this.familyTree.set('zakharan_tribal', {
        parent: 'human_zakharan',
        members: ['akotan', 'astok']
      });

    
    this.familyTree.set('draconic', {
      parent: null,
      members: [
        '13a_draconic', 'bakali', 'darastrix', 'draconic', 'draconic_common', 'draconic_ancient', 'draconic_arcane', 'draconic_chromatic', 'draconic_gem', 'draconic_high', 'draconic_metallic', 'draconic_voyager', 'glav', 'kobold_wyrm', 'pateran_dragon', 'wyrm_roar', 'wyrmspeak'
      ]
    });
    
    this.familyTree.set('dwarven', {
      parent: null,
      members: [ '13a_dwarvish', 'arcane_dwarf', 'derrosh', 'dethek', 'duergan', 'dwarf_io_blood', 'dwarf_manifest', 'dwarven_athas', 'dwarven_blackmoor', 'dwarven_daergar', 'dwarven_hylar', 'dwarven_ironforge', 'dwarven_neidar', 'dwarven_palladium', 'dwarven_tellene', 'gulley_slang',  'iglishmek', 'karamhul', 'khazalid', 'khuzdul', 'kurit' ]
    });

    this.familyTree.set('eberron_planar', {
      parent: 'extraplanar',
      members: [
        'daan', 'daelkyr', 'irial', 'mabran', 'quori', 'risian', 'syranian'
      ]
    });

    this.familyTree.set('eldritch', {
      parent: 'extraplanar',
      members: [
        'aklo', 'drift_whisper', 'shadowtongue', 'void_whisper'
      ]
    });
    
    this.familyTree.set('elvish', {
      parent: null,
      members: [ '13a_elvish', 'arcane_elf', 'avarin', 'cumasti', 'darnassian', 'deep_drow', 'druhir', 'elf_io_blood', 'elf_manifest', 'eltharin', 'elven_athas', 'elven_dargoi', 'elven_imperial', 'elven_palladium', 'elven_qualinesti', 'elven_silvanesti', 'elvish', 'elvish_blackmoor', 'elvish_tellene', 'espruar', 'falathrin', 'goldogrin', 'high_drow', 'ilkorin', 'lendorian_elvish', 'nandorin', 'nazja', 'noldorin', 'olve', 'quenya', 'seldruin', 'sidhelien', 'sindarin', 'sithican', 'sperethiel_modern', 'telerin',  'telquessan', 'thalassian', 'westryn', 'xulaye' ]
    });
    
    this.familyTree.set('extraplanar', {
      parent: null,
      members: [
        'empyrean', 'khezu', 'medusan', 'spirit_tongue', 'thalosian', 'valarin'
      ]
    });

    
    // FEY
    this.familyTree.set('fey', {
      parent: null,
      members: [ 'elemental_fey_sub', 'faerie_high_court', 'sidhe_noble_sub', 'sylvan_forest_sub' ]
    });
      // ELEMENTAL FEY_SUB
      this.familyTree.set('elemental_fey_sub', {
        parent: 'fey',
        members: [ 'knocker_echo', 'nixie', 'sylph' ]
      });
      // FAERIE HIGH COURT
      this.familyTree.set('faerie_high_court', {
        parent: 'fey',
        members: [ 'faerie_speak', 'senzar', 'hamadryad_ancient' ]
      });
      // SIDHE NOBLE SUB (The Courtly/Noble Fey)
      this.familyTree.set('sidhe_noble_sub', {
        parent: 'fey',
        members: [ 'sidhe_high_court', 'sidhe_low_court' ]
      });
      // SYLVAN FOREST SUB (The Wild/Primal Fey)
      this.familyTree.set('sylvan_forest_sub', {
        parent: 'fey',
        members: [ 'arboreal', 'pooka_argot', 'sylvan', 'leprechaun' ]
      });

    this.familyTree.set('fiendish', {
      parent: null,
      members: [
        'abyssal', 'abyssal_taladas', 'baatorian', 'chthonian', 'daemonic', 'dark_tongue', 'demongogian', 'eredun', 'infernal', 'splugorthian', 'yagnoloth'
      ]
    });
    
    this.familyTree.set('gnomish', {
      parent: null,
      members: [
        'denwarf_gnomish', 'gnim'
      ]
    });

    this.familyTree.set('goblinoid', {
      parent: null,
      members: [
        'bugbear', 'bugbear_grunt', 'ghukliak', 'goblin', 'goblin_common', 'hobgoblin_high'
      ]
    });

    this.familyTree.set('great_wheel', {
      parent: 'extraplanar',
      members: [
        'celestial', 'formian', 'gith', 'modron', 'sharn_planar', 'slaad', 'rilmani', 'gehreleth', 'tunyreth', 'zerth'
      ]
    });

    this.familyTree.set('halfling', {
      parent: null,
      members: [
        'halfling_manifest', 'highshire', 'hin', 'hinspeak'
      ]
    });


    /////
    /////
    // MYSTARA
    /////
    /////
    this.familyTree.set('mystara', {
      parent: null,
      members: [ 'mystaran_ancestral', 'mystaran_functional_secrets', 'mystaran_geographic' ]
    });
      // MYSTARAN ANCESTRAL (BIOLOGICAL/LINGUISTIC ORIGINS)
      this.familyTree.set('mystaran_ancestral', {
        parent: 'mystara',
        members: [ 'dwarven_macro', 'elvish_macro', 'hin_halfling', 'human_macros' ]
      });
        // ABOREAL MACRO
        this.familyTree.set('arboreal_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'phana_root', 'uee_branch' ]
        });
          // PHANA ROOT
          this.familyTree.set('phana_root', {
            parent: 'arboreal_macro',
            members: [ 'archaic_phana', 'phana_common' ]
          });
          // UEE BRANCH
            this.familyTree.set('uee_branch', {
              parent: 'arboreal_macro',
              members: [ 'uee_tongue' ]
            });
        // ANOMALY MACRO
        this.familyTree.set('mystaran_anomaly_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'mystaran_aberration_alien_sub', 'mystaran_construct_elemental_sub' ]
        });
          // ABERRATION ALIEN SUB
          this.familyTree.set('mystaran_aberration_alien_sub', {
            parent: 'mystaran_anomaly_macro',
            members: [ 'mystaran_beholder', 'mystaran_cloaker_infrasound', 'mystaran_decapus_click', 'mystaran_neh_thalggu_void_whisper'  ]
          });
          // CONSTRUCT ELEMENTAL SUB
          this.familyTree.set('mystaran_construct_elemental_sub', {
            parent: 'mystaran_anomaly_macro',
            members: [ 'mystaran_gargoyle_grind' ]
          });
        // AQUATIC KIN MACRO
        this.familyTree.set('aquatic_kin_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'mystaran_aquatic_aberration_sub', 'ichthyan_root', 'shark_kin_sub', 'triton_planar_sub' ]
        });
          // AQUATIC ABERRATION SUB
          this.familyTree.set('mystaran_aquatic_aberration_sub', {
            parent: 'aquatic_kin_macro',
            members: [ 'aboleth_telepathic_slime', 'chuul_mandibular' ]
          });
          // ICHTHYAN ROOT
          this.familyTree.set('ichthyan_root', {
            parent: 'aquatic_kin_macro',
            members: [ 'kna_ichthyan', 'merfolk_sub', 'sea_giant_hrok' ]
          });
            // MERFOLK SUB
            this.familyTree.set('merfolk_sub', {
              parent: 'ichthyan_root',
              members: [ 'merrow_imperial_branch', 'merfolk_common_tongue' ]
            });
              // MERROW IMPERIAL BRANCH
              this.familyTree.set('merrow_imperial_branch', {
                parent: 'merfolk_sub',
                members: [ 'twaelar', 'mermish_archaic' ]
              });
          // SHARK KIN SUB
          this.familyTree.set('shark_kin_sub', {
            parent: 'aquatic_kin_macro',
            members: [ 'shark_kin_tongue', 'ixitxachitl_branch' ]
          });
            // IXITXACHITL BRANCH
            this.familyTree.set('ixitxachitl_branch', {
              parent: 'shark_kin_sub',
              members: [ 'ixitxan_high', 'ixitxachitl_corrupted' ]
            });
          // TRITON PLANAR SUB
          this.familyTree.set('triton_planar_sub', {
            parent: 'aquatic_kin_macro',
            members: [ 'triton_high_aquan' ]
          });
        // AVIAN MACRO
        this.familyTree.set('avian_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'avian_progenitor_root' ]
        });
          // AVIAN PROGENITOR ROOT
          this.familyTree.set('avian_progenitor_root', {
            parent: 'avian_macro',
            members: [ 'baak_predatory_sub', 'faenare_sub', 'nagpa_branch', 'nimmush_enduk' ]
          });
            // BAAK PREDATORY SUB
            this.familyTree.set('baak_predatory_sub', {
              parent: 'avian_progenitor_root',
              members: [ 'baak_ra' ]
            });
            // FAENARE SUB
            this.familyTree.set('faenare_sub', {
              parent: 'avian_progenitor_root',
              members: [ 'aura_high_song', 'faenare' ]
            });
            // NAGPA BRANCH
            this.familyTree.set('nagpa_branch', {
              parent: 'avian_progenitor_root',
              members: [ 'nagpa_cursed', 'vulture_patois' ]
            });
            // NIMMUSH ENDUK
            this.familyTree.set('nimmush_enduk', {
              parent: 'avian_progenitor_root',
              members: [ 'nimmush' ]
            });
        // BEASTMAN MACRO
        this.familyTree.set('beastman_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'archaic_beastman', 'tharian_archaic' ]
        });
          // ARCHAIC BEASTMAN ROOT
          this.familyTree.set('archaic_beastman_root', {
            parent: 'beastman_macro',
            members: [ 'garl_archaic', 'ghrak_orcish_sub', 'gnollistani_sub', 'mog_goblinoid_sub', 'trolletic_sub' ]
          });
            // GNOLLISTANIAN SUB
            this.familyTree.set('gnollistani_sub', {
              parent: 'archaic_beastman_root',
              members: [ 'gnollistani_common', 'archaic_gnollistani' ]
            });
            // GRAHK ORCISH SUB (The Ghrak/Yellow-Skin Lineage)
            this.familyTree.set('ghrak_orcish_sub', {
              parent: 'beastman_macro',
              members: [ 'oenkmarian', 'tharian' ]
            });
            // MOG GOBLINOID SUB (The Mog/Red-Skin Lineage)
            this.familyTree.set('mog_goblinoid_branch', {
              parent: 'beastman_macro',
              members: [ 'bugburbian', 'high_mog_hobgoblin', 'low_mog_goblin' ]
            });
            // TROLLETIC SUB (The Heavy/Ancient Lineage)
            this.familyTree.set('trolletic_sub', {
              parent: 'beastman_macro',
              members: [ 'hrok_giant_common', 'jotun_frost_dialect', 'oga_ogre_patois', 'trollhattanese' ]
            });
        // DRACONIC MACRO
        this.familyTree.set('mystaran_draconic_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'draconic_common_sub','high_draconic_sub', 'lunar_draconic_sub' ]
        });
          // DRACONIC COMMON SUB
          this.familyTree.set('mystaran_draconic_common_sub', {
            parent: 'mystaran_draconic_macro',
            members: [ 'draconic_common', 'draconic_diminutive_sub', 'nightdragon_archaic', 'wyrmspeak' ]
          });
            // DRACONIC DIMINUTIVE SUB
            this.familyTree.set('mystaran_draconic_diminutive_sub', {
              parent: 'draconic_common_sub',
              members: [ 'pocket_dragon_chirp' ]
            });
          // DRACONIC FERAL SUB
          this.familyTree.set('mystaran_draconic_feral_sub', {
            parent: 'draconic_macro',
            members: [ 'drake_hiss' ]
          });
          // HIGH DRACONIC SUB
          this.familyTree.set('mystaran_draconic_high_sub', {
            parent: 'mystaran_draconic_macro',
            members: [ 'aragrakh', 'draconic_ancient', 'draconic_arcane'  ]
          });
          // LUNAR DRACONIC SUB
          this.familyTree.set('mystaran_draconic_lunar_sub', {
            parent: 'mystaran_draconic_macro',
            members: [ 'pateran_dragon' ]
          });
        // DWARVEN MACRO
        this.familyTree.set('dwarven_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'denwarf_root', 'modrigswerg_sub', 'rock_dwarf_sub' ]
        });
          // DENWARF ROOT (The Biological/Spiritual Progenitor)
          this.familyTree.set('denwarf_root', {
            parent: 'dwarven_macro',
            members: [ 'dwarven_rockhome_dialects', 'koglor', 'hurgon' ]
          });
            // DWARVEN ROCKHOME DIALECTS
            this.familyTree.set('dwarven_rockhome_dialects', {
              parent: 'denwarf_root',
              members: [ 'dengar', 'everast_high', 'skarrad_tech', 'wyrwarf_vernacular' ]
            });
            // HEPHAESTIAN SUB
            this.familyTree.set('hephaestian_sub', {
              parent: 'skarrad_tech', // Inherits from technical Rockhome
              members: [ 'hephaestian_common' ]
            });
          // MODRIGSWERG SUB (The Cursed/Northern Reaches Branch)
          this.familyTree.set('modrigswerg_sub', {
            parent: 'dwarven_macro',
            members: [ 'modrigswerg_dark', 'mimir_cant' ]
          });
          // ROCK DWARF SUB (General categorization for non-Rockhome surface dwarves)
          this.familyTree.set('rock_dwarf_sub', {
            parent: 'dwarven_macro',
            members: [ 'overland_dwarven', 'miner_pidgin' ]
          });
        // ELVISH MACRO
        this.familyTree.set('elvish_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'aquariendi_sub', 'sperethiel', 'surface_elf_sub', 'shadow_elf_sub' ]
        });
          // AQUARIENDI SUB
          this.familyTree.set('aquariendi_sub', {
            parent: 'elvish_macro',
            members: [ 'aquariendi', 'meditor' ]
          });
          // SPERETHIEL_HIGH
          this.familyTree.set('sperethiel', {
            parent: 'elvish_macro',
            members: [ 'sperethiel_high' ]
          });
          // SURFACE ELF SUB
          this.familyTree.set('surface_elf_sub', {
            parent: 'elvish_macro',
            members: [ 'aeshtyn', 'alfheim', 'belcadiz', 'eusdrian_elf', 'gentle_folk', 'icevale', 'sheyallia', 'shiye_lawr', 'vyalia', 'wendarian' ]
          });
          // SHADOW ELF SUB
          this.familyTree.set('shadow_elf_sub', {
            parent: 'elvish_macro',
            members: [ 'cant_shadowelf', 'schattenalfen', 'shadow_elf' ]
          });
        // GNOMISH MACRO
        this.familyTree.set('gnomish_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'highforge_sub', 'lost_valley_sub', 'sky_gnome_sub' ]
        });
          // HIGHFORGE SUB
          this.familyTree.set('highforge_sub', {
            parent: 'gnomish_macro',
            members: [ 'gnomish_highforge', 'gnomish_rockhome' ]
          });
          // LOST VALLEY SUB
          this.familyTree.set('lost_valley_sub', {
            parent: 'gnomish_macro',
            members: [ 'oostdok_gnomish', 'archaic_gnomish_root' ]
          });
          // SKY GNOME SUB
          this.familyTree.set('sky_gnome_sub', {
            parent: 'gnomish_macro',
            members: [ 'skycommon' ]
          });
        // HIN MACRO
        this.familyTree.set('hin_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'ahah_root' ]
        });
          // AHAH ROOT
          this.familyTree.set('ahah_root', {
            parent: 'hin_macro',
            members: [ 'anah_ancient', 'hinspeak_sub' ]
          });
            // HINSPEAK SUB
            this.familyTree.set('hinspeak_sub', {
              parent: 'ahah_root',
              members: [ 'highshire_dialect', 'hinspeak', 'lalor' ]
            });
        // HUMAN MACRO
        this.familyTree.set('human_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'human_creoles', 'immigrant_mystaran_human_branch', 'native_mystaran_human_branch', 'pre_cataclysmic_human_sub' ]
        });
          // HUMAN CREOLES
          this.familyTree.set('human_creoles', {
            parent: 'human_macro',
            members: [ 'blackmoor_creoles', 'glantrian_common', 'milos_patois', 'neathar_creoles' ]
          });
            // BLACKMOOR CREOLES
            this.familyTree.set('blackmoor_creoles', {
              parent: 'human_creoles',
              members: [ 'peshwah_sub', 'skandaharian_patois', 'west_march_pidgin' ]
            });
              // PESHWAH SUB
              this.familyTree.set('peshwah_sub', {
                parent: 'blackmoor_creoles', // They are Neathar-adjacent natives
                members: [ 'peshwah_archaic', 'peshwah_trade_argot' ]
              });
            // NEATHAR CREOLES
            this.familyTree.set('neathar_creoles', {
              parent: 'human_creoles',
              members: [ 'darokinian', 'minrothad_patois', 'slag_patois' ]
            });
          // IMMIGRANT MYSTARAN HUMAN BRANCH
          this.familyTree.set('immigrant_mystaran_human_branch', {
            parent: 'human_macro',
            members: [ 'earth_transplant_sub', 'human_alien_sub', 'human_alphatian' ]
          });
            // EARTH TRANPLANT SUB
            this.familyTree.set('earth_transplant_sub', {
              parent: 'lanterran_sub',
              members: [ 'anglaise', 'averoignian', 'ispan', 'kaelic' ]
            });
            // HUMAN ALIEN SUB
            this.familyTree.set('human_alien_sub', {
              parent: 'immigrant_mystaran_human_branch',
              members: [ 'emerondian', 'oard_binary' ]
            });
            // HUMAN ALPHATIAN
            this.familyTree.set('human_alphatian', {
              parent: 'immigrant_mystaran_human_branch',
              members: [ 'alphatian_high_speech', 'alphatian_vernaculars' ]
            });
              // ALPHATIAN HIGH SPEECH
              this.familyTree.set('alphatian_high_speech', {
                parent: 'human_alphatian',
                members: [ 'alphatian_imperial', 'flaemish' ]
              });
              // ALPHATIAN VERNACULARS
              this.familyTree.set('alphatian_vernaculars', {
                parent: 'human_alphatian',
                members: [ 'cypri', 'ochalean', 'vertilian' ]
              }); 
          // NATIVE MYSTARAN HUMAN BRANCH
          this.familyTree.set('native_mystaran_human_branch', {
            parent: 'human_macro',
            members: [ 'human_neathar', 'human_oltec', 'human_tanagoro' ]
          });
            // HUMAN NEATHAR
            this.familyTree.set('human_neather', {
              parent: 'native_mystaran_human_branch',
              members: [ 'archaic_neathar', 'milienian_branch', 'nithian_branch', 'taymoran_branch', 'varellyian_branch' ]
            });
              // ARCHAIC NEATHER 
              this.familyTree.set('archaic_neathar', {
                parent: 'human_neather',
                members: [ 'dunael', 'makai', 'urduk' ]
              });
              // MILIENIAN BRANCH
              this.familyTree.set('milienian_branch', {
                parent: 'human_neather',
                members: [ 'antalian_sub', 'thaytian_sub', 'traladaran_sub' ]
              });
                // ANTALIAN SUB
                this.familyTree.set('antalian_sub', {
                  parent: 'milienian_branch',
                  members: [ 'antalian', 'dengothoian', 'freeholder', 'ghyric', 'icereach_antalian', 'kaarjalic', 'norwoldic', 'ostlandic', 'qeodharic', 'soderfjordic', 'vestlandic' ]
                });
                // THAYTIAN SUB
                this.familyTree.set('thaytian_sub', {
                  parent: 'milienian_branch',
                  members: [ 'heldannic', 'milennian', 'thyatian' ]
                });
                // TRALADARAN SUB
                this.familyTree.set('traladaran_sub', {
                  parent: 'milienian_branch',
                  members: [ 'traldaran' ]
                });
              // NITHIAN BRANCH
              this.familyTree.set('nithian_branch', {
                parent: 'human_neather',
                members: [ 'hutaakan', 'nithian_core', 'ylara_alasiyan' ]
              });
                // NITHIAN CORE
                this.familyTree.set('nithian_core', {
                  parent: 'nithian_branch',
                  members: [ 'ninthian', 'thothian' ]
                });
                // YLARA ALASIYAN CONTINUUM
                this.familyTree.set('ylara_alasiyan', {
                  parent: 'nithian_branch',
                  members: [ 'alasiyan', 'ylari' ]
                });
              // TAYMORAN BRANCH
              this.familyTree.set('taymoran_branch', {
                parent: 'human_neathar',
                members: [ 'taymoran', 'makai_archaic' ]
              });
              // VARELLYIAN BRANCH
              this.familyTree.set('varellyian_branch', {
                parent: 'human_neathar',
                members: [ 'varellyian', 'modern_varellyian' ]
              });
            // HUMAN OLTEC
            this.familyTree.set('human_oltec', {
              parent: 'native_mystaran_human_branch',
              members: [ 'ethengar_steppe', 'oltec', 'oltec_core' ]
            });
              // ETHENGAR STEPPES
              this.familyTree.set('ethengar_steppe', {
                parent: 'human_oltec',
                members: [ 'ethengar_archaic', 'ethengarian', 'hulean' ]
              });
              // OLTEC CORE
              this.familyTree.set('oltec_core', {
                parent: 'human_oltec',
                members: [ 'azcan', 'atruaghin_clans', 'minaean', 'sindhi', 'jennite', 'varellyian' ]
              });
            // HUMAN TANAGORO
            this.familyTree.set('human_tanagoro', {
              parent: 'native_mystaran_human_branch',
              members: [ 'savage_coast_tanagoro', 'tanagoro_core' ]  
            });
              // SAVAGE COAST TANAGORO
              this.familyTree.set('savage_coast_tanagoro', {
                parent: 'human_tanagoro',
                members: [ 'shura', 'yawari' ]
              });
              // TANAGORO CORE
              this.familyTree.set('tanagoro_core', {
                parent: 'human_tanagoro',
                members: [ 'gombar', 'nuar', 'proto_tanagoro', 'yavi' ]
              });
          // PRE-CATACLYSMIC HUMAN SUB
          this.familyTree.set('pre_cataclysmic_human_sub', {
            parent: 'human_macro',
            members: [ 'afridhi_branch', 'thonian_sub', 'vanyan_sub' ]
          });
            // AFRIDHI BRANCH
              this.familyTree.set('afridhi_branch', {
                parent: 'pre_cataclysmic_human_sub',
                members: [ 'afridhi_archaic' ]
              });
            // THONIAN SUB 
            this.familyTree.set('thonian_sub', {
              parent: 'pre_cataclysmic_human_sub',
              members: [ 'blackmoorian', 'high_thonian', 'lanterran_sub', 'thonian' ]
            });
              // LANTERRAN SUB
              this.familyTree.set('lanterran_sub', {
                parent: 'thonian_sub',
                members: [ 'lanterran', 'proto_lupin' ] 
              });
            // VAYNAN SUB
            this.familyTree.set('vaynan_sub', {
              parent: 'pre_cataclysmic_human_sub',
              members: [ 'high_vaynan' ] 
            });
        // INSECTOID MACRO
        this.familyTree.set('insectoid_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'arachnidan_root', 'hivebrood_macro', 'vermin_sub' ]
        });
          // ARACHNIDAN ROOT
          this.familyTree.set('arachnidan_root', {
            parent: 'insectoid_macro',
            members: [ 'herathian_high', 'aranea_common', 'web_cant' ]
          });
          // HIVEBROOD MACRO  
          this.familyTree.set('hivebrood_macro', {
            parent: 'insectoid_macro',
            members: [ 'hive_pheromonal', 'brood_clicks' ]
          });
        // INTERSPECIES CREOLES MACRO
        this.familyTree.set('inter_species_creoles_macro', {
          parent: 'mystaran_ancestral', 
          members: [ 'glantrian_arcane_cant', 'ghazz', 'kol', 'krugel', 'mimir_cant', 'old_cogur' ]
        });
        // LUPIN MACRO
        this.familyTree.set('lupin', {
          parent: 'proto_lupin',
          members: [ 'haze_sub', 'heldann_sub', 'lupin_common', 'renardian', 'wolven' ]
        });
          // HAZE SUB
          this.familyTree.set('haze_sub', {
            parent: 'lupin_family',
            members: [ 'haze_lupin' ]
          });
          // HELDANN SUB
          this.familyTree.set('heldann_sub', {
            parent: 'lupin_family',
            members: [ 'heldann_lupin' ]
          });
        // MONSTROUS MACRO
        this.familyTree.set('mystaran_monstrous_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'mystaran_blink_dog', 'mystaran_snow_ape', 'mystaran_worgish' ]
        });
        // RAKASTA MACRO       
        this.familyTree.set('rakasta_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'ancient_rakastan' ]
        });
          // RAKASTA FAMILY
          this.familyTree.set('rakasta', {
            parent: 'rakasta_macro', // The progenitor root
            members: [ 'bellaynish', 'fasteth', 'myoshiman', 'pateran', 'rakasta_common', 'sherkasta', 'simban', 'snow_rakasta' ]
          });
        // REPTILLIAN MACRO
        this.familyTree.set('mystaran_reptilian_macro', {
          parent: 'mystaran_ancestral',
          members: [ 'chelone_sub', 'lizardkin_sub', 'kopru_ancient', 'ophidian_sub', 'wallara_sub' ]
        });
          // CHELONE SUB
          this.familyTree.set('mystaran_humanoid_chelone', {
            parent: 'mystaran_reptilian_macro', 
            members: [ 'proto_chelone', 'snapper', 'tortle' ]
          });
          // HYBRID SUB
          this.familyTree.set('mystaran_reptilian_hybrid_sub', {
            parent: 'mystaran_reptilian_macro', 
            members: [ 'mogrethian' ]
          });
          // KOPRU ANCIENT SUB
          this.familyTree.set('kopru_ancient_sub', {
            parent: 'mystaran_reptilian_macro', 
            members: [ 'abyssal_bubble_cant', 'kopru_ancient' ]
          });
          // LIZARD-KIN (The Shazak/Sis'thik Lineage)
          this.familyTree.set('lizardkin_sub', {
            parent: 'mystaran_reptilian_macro',
            members: [ 'cayman', 'gurrash', 'malpheggi_archaic', 'shazak', 'sisthik' ]
          });
          // OPHIDIAN (The Serpentine/Naga Lineage)
          this.familyTree.set('ophidian_sub', {
            parent: 'mystaran_reptilian_macro',
            members: [ 'nagane_high', 'ssshur_common' ]
          });
          // WALLARA SUB
          this.familyTree.set('wallara_sub', {
            parent: 'mystaran_reptilian_macro',
            members: [ 'risil' ]
          });
      // MYSTARAN FUNCTIONAL SECRETS
      this.familyTree.set('mystaran_functional_secrets', {
        parent: 'mystara',
        members: [ 'druidic_circle_macro', 'secret_guild_macro' ]
      });
        // DRUIDIC CIRCLE MACRO
        this.familyTree.set('mystaran_druidic_circle_macro', {
          parent: 'mystaran_functional_secrets',
          members: [ 'druidic_atruaghin', 'druidic_known_world', 'druidic_robrenn' ]
        });
        // SECRET GUILD MACRO
        this.familyTree.set('mystaran_secret_guild_macro', {
          parent: 'mystaran_functional_secrets',
          members: [ 
            'cant_darokinian', 'cant_glantrian', 'cant_heldannic', 'cant_hulean', 
            'cant_ierendi', 'cant_minrothad', 'cant_slags', 'cant_thyatian', 
            'cant_traladaran', 'cinnabryl_thrum', 'vila_thieve' 
          ]
        });
      // MYSTARAN GEOGRAPHICAL (GEOGRAPHIC/REGIONAL CONTAINERS)
      this.familyTree.set('mystaran_geographic', {
        parent: 'mystara',
        members: [ 'brun', 'skothar', 'davania', 'alphatia_continent', 'hollow_world', 'extraplanar_nodes' ]
      });
        // EXTRAPLANAR NODES
        this.familyTree.set('extraplanar_nodes', {
          parent: 'mystaran_geographic',
          members: [ 'patera', 'aasla', 'serraine' ] // Serraine is a flying city, geographically fluid
        });
        // BRUN (The Primary Northern Continent)
        this.familyTree.set('brun', {
          parent: 'mystaran_geographic',
          members: [ 'known_world', 'savage_coast', 'great_waste', 'hule', 'norwold', 'arm_of_the_immortals' ]
        });
          // KNOWN WORLD
          this.familyTree.set('known_world', {
            parent: 'mystaran_geographic',
            members: [ 'glantri', 'karameikos', 'rockhome', 'five_shires', 'northern_reaches', 'ylarurand', 'serraine' ]
          });
          // SAVAGE COAST
          this.familyTree.set('savage_coast', {
            parent: 'mystaran_geographic',
            members: [ 'herath' ]
          });
          // GREAT WASTE
          this.familyTree.set('great_waste', {
            parent: 'brun',
            members: [ 'sind_desert', 'serpent_peninsula' ]
          });
        // THE SEA OF DAWN (The Central Bridge)
        this.familyTree.set('oceanic_regions', {
          parent: 'mystaran_geographic',
          members: [ 'sea_of_dread', 'sea_of_dawn' ]
        });
          // SEA OF DAWN
          this.familyTree.set('sea_of_dawn', {
            parent: 'oceanic_regions',
            members: [ 'isle_of_dawn', 'alatian_islands', 'ochalea', 'pearl_islands' ]
          });
            // ISLE OF DAWN
            this.familyTree.set('isle_of_dawn', {
              parent: 'sea_of_dawn',
              members: [ 'helskir', 'thothia', 'dunadale', 'westrourke', 'redstone' ]
            });
          // SEA OF DREAD
          this.familyTree.set('sea_of_dread', {
            parent: 'mystaran_geographic',
            members: [ 'isle_of_dread', 'thanegioth' ]
          });
        // SKOTHAR (The Ancient Eastern Continent)
        this.familyTree.set('skothar', {
          parent: 'mystaran_geographic',
          members: [ 'blackmoor_legacy', 'jennite_lands', 'nentsun_peninsula', 'thonian_wastes', 'esterhold' ]
        });
        // DAVANIA (The Deep Southern Continent)
      this.familyTree.set('davania', {
        parent: 'mystaran_geographic',
        members: [ 'meghala_kastel', 'vulcania', 'jungle_coast', 'adakkia' ]
      });
        
        
        
        
        

        

        


                  
              


                // GREYHAWK
                  this.familyTree.set('human_baklunish', {
                    parent: null,
                    members: [
                      'ancient_baklunish', 'baklunish', 'ordai', 'ulagha'
                    ]
                  });
                  this.familyTree.set('human_flan', {
                    parent: null,
                    members: [
                      'flan'
                    ]
                  });
                  this.familyTree.set('human_hepmoni', {
                    parent: null,
                    members: [
                      'ralat'
                    ]
                  });
                  this.familyTree.set('human_oeridian', {
                    parent: null,
                    members: [
                      'ferral', 'keolandish', 'nyrondese', 'oeridian', 'velondi'
                    ]
                  });
                  this.familyTree.set('human_olman', {
                    parent: null,
                    members: [
                      'olman'
                    ]
                  });
                  this.familyTree.set('human_rhennee', {
                    parent: null,
                    members: [
                      'rhopan'
                    ]
                  });
                  this.familyTree.set('human_suel', {
                    parent: null,
                    members: [
                      'amedi', 'cold_tongue', 'lendorian',  'rasol', 'suloise'
                    ]
                  });
              
                  
              
                  this.familyTree.set('human_touv', {
                    parent: null,
                    members: [
                      'touv', 'yeku'
                    ]
                  });

                  







              
                  this.familyTree.set('human_manifest', {
                    parent: null,
                    members: [
                      'bazarese', 'thurian', 'untheric_ghost', 'nexalan', 'payit'
                    ]
                  });
              
                  
              
                  
              
                 
              
                  
              



                  
              
                  
              
                  this.familyTree.set('humanoid_avian', {
                    parent: null,
                    members: [
                      'arakkoa'
                    ]
                  });
              
                  
              
                  this.familyTree.set('humanoid_canine', {
                    parent: null,
                    members: [
                      'gaurwaith', 'gnoll', 'gnoll_manifest', 'wolfen'
                    ]
                  });
              
                  
              
                  this.familyTree.set('humanoid_feline', {
                    parent: null,
                    members: [
                      'saberon'
                    ]
                  });
              
                  this.familyTree.set('humanoid_reptilian', {
                    parent: null,
                    members: [
                      'gatorman', 'saurial', 'saurial_athas', 'ssissylk', 'yipyak'
                    ]
                  });
              

              
                  this.familyTree.set('jotun', {
                    parent: null,
                    members: [
                      'fomorian', 'giant', 'jogishk', 'jotun', 'jotun_cloud', 'jotun_storm', 'jotunhaug', 'sea_giant'
                    ]
                  });
              

              
                  this.familyTree.set('monstrous', {
                    parent: null,
                    members: [
                      'beholder', 'hook_horror', 'thri_kreen', 'yikaria'
                    ]
                  });
              
              
              
                  this.familyTree.set('monstrous_feline', {
                    parent: 'monstrous',
                    members: [
                      'lerrrone'
                    ]
                  });
              
                  
              
              
                  this.familyTree.set('primordial', {
                    parent: null,
                    members: [
                      'aquan', 'auran', 'elamxin', 'ignan', 'kalimag', 'primordial', 'terran'
                    ]
                  });
              
                  this.familyTree.set('planar_trade', {
                    parent: null,
                    members: [
                      'arcane_pidgin', 'ethereal_trade', 'ethereal_whisper', 'jannti', 'marut_code', 'mercane_trade', 'planar_cant', 'rift_speak', 'sigil_cant'
                    ]
                  });
              
                  this.familyTree.set('polyglot', {
                    parent: null,
                    members: [
                      'ghazz', , 'herathian', 'manifest_common', 'patois'
                    ]
                  });
              

              
                  this.familyTree.set('rauric', {
                    parent: 'human_faerunian',
                    members: [
                      'mulhorandi', 'untheric', 'chessentan', 'thayan', 'rauraric', 'nozuran', 'iteprou'
                    ]
                  });
              
                  this.familyTree.set('secret_arcane', {
                    parent: null,
                    members: [
                      'necro_code'
                    ]
                  });
              
                  this.familyTree.set('secret_circle', {
                    parent: null,
                    members: [
                      'druidic_atruaghin', 'druidic_chult', 'druidic_gulthandor', 'druidic_hylar', 'druidic_known_world', 'druidic_moonshae', 'druidic_old_faith', 'druidic_robrenn', 'druidic_sheldomar', 'druidic_spirit_wood', 'druidic_tall_trees', 'druidic_vesve'
                    ]
                  });
                  
                  this.familyTree.set('secret_guild', {
                    parent: null,
                    members: [
                      'cant_baldurian', 'cant_darokinian', 'cant_dyvers', 'cant_glantrian', 'cant_greyhawk', 'cant_heldannic', 'cant_hulean', 'cant_ierendi', 'cant_iuz', 'cant_minrothad', 'cant_scarlet', 'cant_shadowelf', 'cant_shadow_thief', 'cant_slags', 'cant_tel_tekiira', 'cant_thyatian', 'cant_traladaran', 'cant_vault_thief', 'cant_waterdhavian', 'cant_westgate', 'cinnabryl_thrum', 'ghost_cant', 'spider_cant', 'vila_thieve', 'warden_signal_ghost'
                    ]
                  });
              
                  this.familyTree.set('serpentine', {
                    parent: null,
                    members: [
                      'serpentes', 'yuan_ti_manifest'
                    ]
                  });
              
                  
                  
              
                  //
                  // Middle‑earth
                  //
                  this.familyTree.set('human_middle_earth', {
                    parent: null,
                    members: [
                      'adunaic', 'dunlending', 'easterling', 'haladin',
                      'haradrim', 'hobbitish', 'rohirric', 'talaska',
                      'drûg', 'lossoth', 'vales_of_anduin'
                    ]
                  });
              
                  this.familyTree.set('monstrous_middle_earth', {
                    parent: null,
                    members: [
                      'black_speech', 'entish', 'orkish_middle_earth',
                      'warg_speech'
                    ]
                  });
              
                  //
                  // Traveller
                  //
                  this.familyTree.set('alien_traveller', {
                    parent: null,
                    members: [
                      'droyne_o_lo_ka', 'hivers_manipulation', 'k_kree',
                      'vargr_arrgh'
                    ]
                  });
              
                  this.familyTree.set('human_traveller', {
                    parent: null,
                    members: [
                      'cant_spacer', 'battle_signal_imperial'
                    ]
                  });
              
                  //
                  // Cthulhu / Mythos
                  //
                  this.familyTree.set('mythos_alien', {
                    parent: null,
                    members: [
                      'aklo_coc', 'elder_sign_logic', 'mi_go_vibration',
                      'rlyehian', 'yithian_mental', 'tsathogguan',
                      'ghroth_resonance', 'l_gh_he_logic', 'yog_sothoth_key',
                      'elder_god_harmony'
                    ]
                  });
              
                  this.familyTree.set('mythos_human', {
                    parent: null,
                    members: [
                      'cipher_tcho_tcho', 'leng_dialect'
                    ]
                  });
              
                  this.familyTree.set('dreamlands_human', {
                    parent: null,
                    members: [
                      'celephaisean', 'inqua', 'larkar', 'thranish'
                    ]
                  });
              
                  this.familyTree.set('monstrous_mythos', {
                    parent: null,
                    members: [
                      'cat_ulthar', 'ghoul_dream', 'gug_mumble',
                      'night_gaunt_sign', 'zoog_chatter'
                    ]
                  });
              
                  //
                  // Shadowrun / Cyberpunk
                  //
                  this.familyTree.set('urban_modern', {
                    parent: null,
                    members: [
                      'city_speak', 'streetslang', 'corporate_high'
                    ]
                  });
              
                  this.familyTree.set('secret_guild', {
                    parent: null,
                    members: [
                      'cant_sprawl_rogue', 'nomad_sign', 'military_dead_drop',
                      'merchant_cant_bt', 'cant_bree_rogue'
                    ]
                  });
              
                  this.familyTree.set('machine_logic', {
                    parent: null,
                    members: [
                      'matrix_jargon', 'binary_asist', 'jump_code_binary',
                      'replicator_binary', 'data_relic_binary',
                      'net_protocol_v12', 'void_beacon_code'
                    ]
                  });
              
                  //
                  // Stargate
                  //
                  this.familyTree.set('alteran_ancient', {
                    parent: null,
                    members: [
                      'alteran_ancient', 'ori_st'
                    ]
                  });
              
                  this.familyTree.set('stargate_alien', {
                    parent: null,
                    members: [
                      'asgard', 'furling', 'nox', 'unas', 'wraith_st'
                    ]
                  });
              
                  //
                  // Battletech
                  //
                  this.familyTree.set('human_battletech', {
                    parent: null,
                    members: [
                      'davion_english', 'kurita_japanese', 'liao_mandarin',
                      'steiner_german', 'marik_italian', 'star_league_standard',
                      'outworlds_patois', 'clan_speak', 'farstar_patois',
                      'interstellar_islat', 'jarnfolk_norse', 'niopsian_high',
                      'oberon_slang'
                    ]
                  });
              
                  this.familyTree.set('alien_battletech', {
                    parent: null,
                    members: [
                      'tetrae_vocal', 'swamp_people_hum', 'neopithecan_sign'
                    ]
                  });
              
                  //
                  // Gamma World
                  //
                  this.familyTree.set('human_gamma_world', {
                    parent: null,
                    members: [
                      'ancient_gamma', 'bonaparish', 'gamma_common',
                      'healer_patter', 'nomad_slang_gamma'
                    ]
                  });
              
                  this.familyTree.set('mutant_beast', {
                    parent: null,
                    members: [
                      'animal_hybrid', 'baba_gon', 'gallus_cluck', 'yexil_chirp'
                    ]
                  });
              
                  this.familyTree.set('mutant_plant', {
                    parent: null,
                    members: [
                      'pod_whisper'
                    ]
                  });
              
                  //
                  // Modern Earth (Era‑based)
                  //
                  this.familyTree.set('historical_human', {
                    parent: null,
                    members: [
                      'ancient_greek_coc', 'arabic_classical', 'latin_medieval',
                      'sanskrit_mythos', 'egyptian_hieroglyphs'
                    ]
                  });
              
                  this.familyTree.set('real_world_earth', {
                    parent: null,
                    members: ['uighur', /* other real world languages */]
                  });
              
                  //
                  // Admin / Meta
                  //
                  this.familyTree.set('admin_meta', {
                    parent: null,
                    members: [
                      'immortal_cant'
                    ]
                  });
                }
              
                getFamilyByLanguage(languageId) {
                  for (const [familyId, data] of this.familyTree.entries()) {
                    if (data.members.includes(languageId)) {
                      return { familyId, ...data };
                    }
                  }
                  return null;
                }
              
                  // ───────────────────────────────────────────────
                //  DIFFICULTY RATINGS (MULTIVERSAL, NORMALIZED)
                // ───────────────────────────────────────────────
                _bootstrapDifficulty() {
                  // 1 = trivial, 2 = easy, 3 = moderate, 4 = hard, 5 = extreme
                  const set = (id, rating) => this.difficulty.set(id, rating);
              
                  //
                  // Core fantasy / D&D baseline
                  //
                  set('common', 1);
                  set('halfling', 1);
                  set('gnomish', 2);
              
                  set('elvish', 2);
                  set('dwarven', 2);
                  set('orcish_middle_earth', 2);
                  set('goblin', 2); // generic goblin cluster (mapped to oghyr family)
              
                  set('draconic', 4);
                  set('darastrix', 5);
              
                  set('abyssal', 4);
                  set('infernal', 4);
                  set('celestial', 4);
                  set('deep_speech', 5);
                  set('qualith', 5);
                  set('daelkyr', 5);
                  set('quori', 5);
              
                  //
                  // Mystaran Languages
                  //
                  // Alphatian
                  set('alphatian', 4);
                  set('cypri', 3);
                  set('flaemish', 4);
                  set('ochalean', 3);
                  // Dengothian
                  set('dengothian', 3);
                  // Laterran
                  set('anglaise', 3);
                  set('averoignian', 4);
                  set('ispan', 3);
                  set('kaelic', 4);
                  // Neather
                  set('alasiyan', 3);
                  set('antalian', 2);
                  set('darokinian', 2);
                  set('heldannic', 3);
                  set('makai', 2);
                  set('milennian', 3);
                  set('nithian', 4);
                  set('old_cogur', 3);
                  set('thyatian', 2);
                  set('traldaran', 2);
                  // Nithian
                  set('thothian', 3);
                  set('traldaran', 3);
                  set('ylari', 3);
                  // Oltec
                  set('atruaghin', 2);
                  set('azcan', 4);
                  set('ethengarian', 2);
                  set('hulean', 3);
                  set('jennite', 3);
                  set('makai', 2);
                  set('sindhi', 3);
                  set('varellyian', 4);
                  // Tanagoro
                  set('gombar', 3);
                  set('nuar', 2);
                  set('tanagoro', 3);
                  set('taymoran', 4);
                  set('yavi', 3);
              
              
              
              
              
              
              
                  //
                  // Middle‑earth
                  //
                  set('quenya', 4);
                  set('sindarin', 3);
                  set('telerin', 3);
                  set('adunaic', 3);
                  set('rohirric', 2);
                  set('hobbitish', 1);
                  set('black_speech', 4);
                  set('entish', 5);
                  set('warg_speech', 2);
              
                  //
                  // Traveller
                  //
                  set('droyne_o_lo_ka', 4);
                  set('hivers_manipulation', 5); // gesture/tentacle complexity
                  set('k_kree', 3);
                  set('vargr_arrgh', 3);
                  set('cant_spacer', 2);
                  set('battle_signal_imperial', 3);
              
                  //
                  // Cthulhu / Mythos
                  //
                  set('aklo_coc', 5);
                  set('elder_sign_logic', 5);
                  set('mi_go_vibration', 5);
                  set('rlyehian', 5);
                  set('yithian_mental', 5);
                  set('tsathogguan', 5);
                  set('ghroth_resonance', 5);
                  set('l_gh_he_logic', 5);
                  set('yog_sothoth_key', 5);
                  set('elder_god_harmony', 5);
              
                  set('cipher_tcho_tcho', 4);
                  set('leng_dialect', 4);
              
                  set('celephaisean', 2);
                  set('inqua', 3);
                  set('larkar', 2);
                  set('thranish', 2);
              
                  set('cat_ulthar', 2);
                  set('ghoul_dream', 3);
                  set('gug_mumble', 4);
                  set('night_gaunt_sign', 4);
                  set('zoog_chatter', 2);
              
                  //
                  // Shadowrun / Cyberpunk
                  //
                  set('city_speak', 1);
                  set('streetslang', 1);
                  set('corporate_high', 2);
                  set('cant_sprawl_rogue', 3);
                  set('nomad_sign', 3);
                  set('military_dead_drop', 3);
              
                  // Machine logic (all binary → binary_unified)
                  set('binary_unified', 2);
                  set('matrix_jargon', 3);
                  set('binary_asist', 3);
                  set('jump_code_binary', 4);
                  set('replicator_binary', 4);
                  set('data_relic_binary', 4);
                  set('net_protocol_v12', 5);
                  set('void_beacon_code', 5);
              
                  //
                  // Stargate
                  //
                  set('alteran_ancient', 4);
                  set('ori_st', 4);
                  set('asgard', 3);
                  set('furling', 5);
                  set('nox', 3);
                  set('goauld', 3);
                  set('unas', 3);
                  set('wraith_st', 4);
              
                  //
                  // Battletech
                  //
                  set('davion_english', 1);
                  set('kurita_japanese', 3);
                  set('liao_mandarin', 3);
                  set('steiner_german', 2);
                  set('marik_italian', 2);
                  set('star_league_standard', 1);
                  set('outworlds_patois', 2);
                  set('clan_speak', 3);
                  set('farstar_patois', 2);
                  set('interstellar_islat', 2);
                  set('jarnfolk_norse', 2);
                  set('niopsian_high', 3);
                  set('oberon_slang', 2);
              
                  set('tetrae_vocal', 4);
                  set('swamp_people_hum', 3);
                  set('neopithecan_sign', 3);
              
                  //
                  // Gamma World
                  //
                  set('ancient_gamma', 2);
                  set('bonaparish', 3);
                  set('gamma_common', 1);
                  set('healer_patter', 3);
                  set('nomad_slang_gamma', 2);
              
                  set('animal_hybrid', 2);
                  set('baba_gon', 3);
                  set('gallus_cluck', 2);
                  set('yexil_chirp', 3);
              
                  set('pod_whisper', 4);
              
                  //
                  // Historical / Real‑world (era‑based)
                  //
                  set('ancient_greek_coc', 3);
                  set('arabic_classical', 4);
                  set('latin_medieval', 3);
                  set('sanskrit_mythos', 4);
                  set('egyptian_hieroglyphs', 5);
              
                  //
                  // Admin / Meta
                  //
                  set('immortal_cant', 5);
                }
              
                getDifficulty(languageId) {
                  return this.difficulty.get(languageId) || 3;
                }
              
                // ───────────────────────────────────────────────
                //  DIALECT INTELLIGIBILITY MATRIX (MULTIVERSAL)
                // ───────────────────────────────────────────────
                _bootstrapIntelligibility() {
                  // Values: 0–1 (0 = none, 1 = fully mutually intelligible)
                  const pair = (a, b, score) => {
                    const key = this._pairKey(a, b);
                    this.intelligibility.set(key, score);
                  };
              
                  //
                  // Forgotten Realms / D&D Prime
                  //
                  pair('chondathan', 'damaran', 0.8);
                  pair('chondathan', 'turmic', 0.7);
                  pair('damaran', 'rashemi', 0.6);
                  pair('alzhedo', 'mulhorandi', 0.7);
                  pair('aglarondan', 'ulanthi', 0.7);
                  
                  //
                  // Mystara
                  pair('alasiyan', 'alphatian', 0.05);
                  pair('alasiyan', 'anglaise', 0.05);
                  pair('alasiyan', 'antalian', 0.10);
                  pair('alasiyan', 'atruaghin', 0.10);
                  pair('alasiyan', 'averoignian', 0.05);
                  pair('alasiyan', 'azcan', 0.05);
                  pair('alasiyan', 'cypri', 0.05);
                  pair('alasiyan', 'darokinian', 0.15);
                  pair('alasiyan', 'denagothian', 0.10);
                  pair('alasiyan', 'ethengarian', 0.15);
                  pair('alasiyan', 'flaemish', 0.05);
                  pair('alasiyan', 'gombar', 0.20);
                  pair('alasiyan', 'heldannic', 0.10);
                  pair('alasiyan', 'hulean', 0.25);
                  pair('alasiyan', 'ispan', 0.20);
                  pair('alasiyan', 'jennite', 0.15);
                  pair('alasiyan', 'kaelic', 0.05);
                  pair('alasiyan', 'makai', 0.05);
                  pair('alasiyan', 'milennian', 0.15);
                  pair('alasiyan', 'nithian', 0.30);
                  pair('alasiyan', 'nuar', 0.15);
                  pair('alasiyan', 'ochalean', 0.05);
                  pair('alasiyan', 'old_cogur', 0.05);
                  pair('alasiyan', 'sindhi', 0.35);
                  pair('alasiyan', 'tanagoro', 0.10);
                  pair('alasiyan', 'taymoran', 0.20);
                  pair('alasiyan', 'thothian', 0.30);
                  pair('alasiyan', 'traldaran', 0.25);
                  pair('alasiyan', 'varellyian', 0.15);
                  pair('alasiyan', 'yavi', 0.10);
                  pair('alasiyan', 'ylari', 0.70);   // Ylari is a direct descendant
                  
              
                  pair('alphatian', 'anglaise', 0.05);
                  pair('alphatian', 'antalian', 0.10);
                  pair('alphatian', 'atruaghin', 0.05);
                  pair('alphatian', 'averoignian', 0.05);
                  pair('alphatian', 'azcan', 0.05);
                  pair('alphatian', 'cypri', 0.85);       // High Alphatian ↔ vernacular
                  pair('alphatian', 'darokinian', 0.10);
                  pair('alphatian', 'denagothian', 0.05);
                  pair('alphatian', 'ethengarian', 0.10);
                  pair('alphatian', 'flaemish', 0.70);    // Archaic, elemental influences
                  pair('alphatian', 'gombar', 0.05);
                  pair('alphatian', 'heldannic', 0.15);
                  pair('alphatian', 'hulean', 0.10);
                  pair('alphatian', 'ispan', 0.10);
                  pair('alphatian', 'kaelic', 0.05);
                  pair('alphatian', 'milennian', 0.05);
                  pair('alphatian', 'nithian', 0.15);
                  pair('alphatian', 'nuar', 0.05);
                  pair('alphatian', 'ochalean', 0.60);    // Philosophical hybrid, shared roots
                  pair('alphatian', 'old_cogur', 0.05);
                  pair('alphatian', 'sindhi', 0.10);
                  pair('alphatian', 'taymoran', 0.05);
                  pair('alphatian', 'thothian', 0.05);
                  pair('alphatian', 'thyatian', 0.10);
                  pair('alphatian', 'traldaran', 0.05);
                  pair('alphatian', 'varellyian', 0.50);
                  pair('alphatian', 'yavi', 0.05);
                  pair('alphatian', 'ylari', 0.05);
                   
                  
                  pair('anglaise', 'antalian', 0.15);
                  pair('anglaise', 'atruaghin', 0.05);
                  pair('anglaise', 'azcan', 0.05);
                  pair('anglaise', 'averoignian', 0.65);
                  pair('anglaise', 'cypri', 0.10);
                  pair('anglaise', 'darokinian', 0.25);
                  pair('anglaise', 'denagothian', 0.10);
                  pair('anglaise', 'ethengarian', 0.05);
                  pair('anglaise', 'flaemish', 0.05);
                  pair('anglaise', 'gombar', 0.05);
                  pair('anglaise', 'heldannic', 0.15);
                  pair('anglaise', 'hulean', 0.10);
                  pair('anglaise', 'ispan', 0.75);
                  pair('anglaise', 'jennite', 0.15);
                  pair('anglaise', 'kaelic', 0.60);
                  pair('anglaise', 'makai', 0.05);
                  pair('anglaise', 'milennian', 0.20);
                  pair('anglaise', 'nithian', 0.05);
                  pair('anglaise', 'nuar', 0.10);
                  pair('anglaise', 'ochalean', 0.10);
                  pair('anglaise', 'old_cogur', 0.05);
                  pair('anglaise', 'sindhi', 0.10);
                  pair('anglaise', 'tanagoro', 0.05);
                  pair('anglaise', 'taymoran', 0.05);
                  pair('anglaise', 'thothian', 0.05);
                  pair('anglaise', 'thyatian', 0.20);
                  pair('anglaise', 'traldaran', 0.15);
                  pair('anglaise', 'varellyian', 0.10);
                  pair('anglaise', 'yavi', 0.05);
                  pair('anglaise', 'ylari', 0.15);
              
              
                  pair('antalian', 'atruaghin', 0.10);
                  pair('antalian', 'averoignian', 0.10);
                  pair('antalian', 'azcan', 0.05);
                  pair('antalian', 'cypri', 0.10);
                  pair('antalian', 'darokinian', 0.45);
                  pair('antalian', 'denagothian', 0.40);
                  pair('antalian', 'ethengarian', 0.20);
                  pair('antalian', 'flaemish', 0.05);
                  pair('antalian', 'gombar', 0.05);
                  pair('antalian', 'heldannic', 0.80);
                  pair('antalian', 'hulean', 0.10);
                  pair('antalian', 'ispan', 0.15);
                  pair('antalian', 'jennite', 0.20);
                  pair('antalian', 'kaelic', 0.10);
                  pair('antalian', 'makai', 0.25);
                  pair('antalian', 'milennian', 0.20);
                  pair('antalian', 'nithian', 0.10);
                  pair('antalian', 'nuar', 0.05);
                  pair('antalian', 'ochalean', 0.05);
                  pair('antalian', 'old_cogur', 0.10);
                  pair('antalian', 'sindhi', 0.15);
                  pair('antalian', 'tanagoro', 0.10);
                  pair('antalian', 'taymoran', 0.05);
                  pair('antalian', 'thothian', 0.05);
                  pair('antalian', 'thyatian', 0.40);      // distant cousin
                  pair('antalian', 'traldaran', 0.10);
                  pair('antalian', 'varellyian', 0.15);
                  pair('antalian', 'yavi', 0.05);
                  pair('antalian', 'ylari', 0.10);
                  
              
                  pair('atruaghin', 'averoignian', 0.10);
                  pair('atruaghin', 'azcan', 0.35);
                  pair('atruaghin', 'cypri', 0.05);
                  pair('atruaghin', 'darokinian', 0.40);
                  pair('atruaghin', 'denagothian', 0.10);
                  pair('atruaghin', 'ethengarian', 0.40);
                  pair('atruaghin', 'flaemish', 0.05);
                  pair('atruaghin', 'gombar', 0.10);
                  pair('atruaghin', 'heldannic', 0.10);
                  pair('atruaghin', 'hulean', 0.15);
                  pair('atruaghin', 'ispan', 0.25);
                  pair('atruaghin', 'jennite', 0.50);
                  pair('atruaghin', 'kaelic', 0.10);
                  pair('atruaghin', 'makai', 0.60);
                  pair('atruaghin', 'milennian', 0.10);
                  pair('atruaghin', 'nithian', 0.10);
                  pair('atruaghin', 'nuar', 0.15);
                  pair('atruaghin', 'ochalean', 0.10);
                  pair('atruaghin', 'old_cogur', 0.15);
                  pair('atruaghin', 'sindhi', 0.20);
                  pair('atruaghin', 'tanagoro', 0.15);
                  pair('atruaghin', 'taymoran', 0.15);
                  pair('atruaghin', 'thothian', 0.10);
                  pair('atruaghin', 'thyatian', 0.15);
                  pair('atruaghin', 'traldaran', 0.15);
                  pair('atruaghin', 'varellyian', 0.20);
                  pair('atruaghin', 'yavi', 0.15);
                  pair('atruaghin', 'ylari', 0.10);
              
              
                  pair('averoignian', 'azcan', 0.05);
                  pair('averoignian', 'cypri', 0.05);
                  pair('averoignian', 'darokinian', 0.15);
                  pair('averoignian', 'denagothian', 0.05);
                  pair('averoignian', 'ethengarian', 0.05);
                  pair('averoignian', 'flaemish', 0.05);
                  pair('averoignian', 'gombar', 0.05);
                  pair('averoignian', 'heldannic', 0.15);
                  pair('averoignian', 'hulean', 0.10);
                  pair('averoignian', 'ispan', 0.55);
                  pair('averoignian', 'jennite', 0.10);
                  pair('averoignian', 'kaelic', 0.65);
                  pair('averoignian', 'makai', 0.15);
                  pair('averoignian', 'milennian', 0.10);
                  pair('averoignian', 'nithian', 0.05);
                  pair('averoignian', 'nuar', 0.10);
                  pair('averoignian', 'ochalean', 0.05);
                  pair('averoignian', 'old_cogur', 0.05);
                  pair('averoignian', 'sindhi', 0.10);
                  pair('averoignian', 'tanagoro', 0.10);
                  pair('averoignian', 'taymoran', 0.05);
                  pair('averoignian', 'thothian', 0.05);
                  pair('averoignian', 'thyatian', 0.15);
                  pair('averoignian', 'traldaran', 0.20);
                  pair('averoignian', 'varellyian', 0.15);
                  pair('averoignian', 'yavi', 0.10);
                  pair('averoignian', 'ylari', 0.10);
              
              
                  pair('azcan', 'cypri', 0.05);
                  pair('azcan', 'darokinian', 0.10);
                  pair('azcan', 'denagothian', 0.15);
                  pair('azcan', 'ethengarian', 0.10);
                  pair('azcan', 'flaemish', 0.05);
                  pair('azcan', 'gombar', 0.10);
                  pair('azcan', 'heldannic', 0.05);
                  pair('azcan', 'hulean', 0.20);
                  pair('azcan', 'ispan', 0.15);
                  pair('azcan', 'jennite', 0.25);
                  pair('azcan', 'kaelic', 0.05);
                  pair('azcan', 'makai', 0.65);
                  pair('azcan', 'milennian', 0.10);
                  pair('azcan', 'nithian', 0.20);
                  pair('azcan', 'nuar', 0.15);
                  pair('azcan', 'ochalean', 0.10);
                  pair('azcan', 'old_cogur', 0.30);
                  pair('azcan', 'sindhi', 0.50);
                  pair('azcan', 'tanagoro', 0.10);
                  pair('azcan', 'taymoran', 0.10);
                  pair('azcan', 'thothian', 0.25);
                  pair('azcan', 'thyatian', 0.10);
                  pair('azcan', 'traldaran', 0.15);
                  pair('azcan', 'varellyian', 0.75);
                  pair('azcan', 'yavi', 0.10);
                  pair('azcan', 'ylari', 0.10);
              
              
                  pair('cypri', 'darokinian', 0.15);
                  pair('cypri', 'denagothian', 0.10);
                  pair('cypri', 'ethengarian', 0.05);
                  pair('cypri', 'flaemish', 0.65);        // Vernacular ↔ archaic
                  pair('cypri', 'gombar', 0.20);
                  pair('cypri', 'heldannic', 0.15);
                  pair('cypri', 'hulean', 0.10);
                  pair('cypri', 'ispan', 0.10);
                  pair('cypri', 'jennite', 0.10);
                  pair('cypri', 'kaelic', 0.05);
                  pair('cypri', 'makai', 0.15);
                  pair('cypri', 'milennian', 0.10);
                  pair('cypri', 'nithian', 0.10);
                  pair('cypri', 'nuar', 0.05);
                  pair('cypri', 'ochalean', 0.75);        // Vernacular ↔ hybrid (simpler grammar)
                  pair('cypri', 'old_cogur', 0.05);
                  pair('cypri', 'sindhi', 0.15);
                  pair('cypri', 'tanagoro', 0.15);
                  pair('cypri', 'taymoran', 0.10);
                  pair('cypri', 'thothian', 0.15);
                  pair('cypri', 'thyatian', 0.10);
                  pair('cypri', 'traldaran', 0.10);
                  pair('cypri', 'varellyian', 0.40);
                  pair('cypri', 'yavi', 0.25);
                  pair('cypri', 'ylari', 0.15);
              
              
                  pair('darokinian', 'denagothian', 0.20);
                  pair('darokinian', 'ethengarian', 0.25);
                  pair('darokinian', 'flaemish', 0.10);
                  pair('darokinian', 'gombar', 0.15);
                  pair('darokinian', 'heldannic', 0.30);
                  pair('darokinian', 'hulean', 0.20);
                  pair('darokinian', 'ispan', 0.20);
                  pair('darokinian', 'jennite', 0.15);
                  pair('darokinian', 'kaelic', 0.10);
                  pair('darokinian', 'makai', 0.15);
                  pair('darokinian', 'milennian', 0.25);
                  pair('darokinian', 'nithian', 0.10);
                  pair('darokinian', 'nuar', 0.15);
                  pair('darokinian', 'ochalean', 0.15);
                  pair('darokinian', 'old_cogur', 0.10);
                  pair('darokinian', 'sindhi', 0.40);
                  pair('darokinian', 'tanagoro', 0.15);
                  pair('darokinian', 'taymoran', 0.10);
                  pair('darokinian', 'thothian', 0.15);
                  pair('darokinian', 'thyatian', 0.75);
                  pair('darokinian', 'traldaran', 0.70);
                  pair('darokinian', 'varellyian', 0.15);
                  pair('darokinian', 'yavi', 0.20);
                  pair('darokinian', 'ylari', 0.45);    
                  
              
                  pair('denagothian', 'ethengarian', 0.25);
                  pair('denagothian', 'flaemish', 0.05);
                  pair('denagothian', 'gombar', 0.05);
                  pair('denagothian', 'heldannic', 0.35);
                  pair('denagothian', 'hulean', 0.15);
                  pair('denagothian', 'ispan', 0.10);
                  pair('denagothian', 'jennite', 0.10);
                  pair('denagothian', 'kaelic', 0.10);
                  pair('denagothian', 'makai', 0.15);
                  pair('denagothian', 'milennian', 0.15);
                  pair('denagothian', 'nithian', 0.15);
                  pair('denagothian', 'nuar', 0.05);
                  pair('denagothian', 'ochalean', 0.05);
                  pair('denagothian', 'old_cogur', 0.20);
                  pair('denagothian', 'sindhi', 0.05);
                  pair('denagothian', 'tanagoro', 0.05);
                  pair('denagothian', 'taymoran', 0.05);
                  pair('denagothian', 'traldaran', 0.25);
                  pair('denagothian', 'thothian', 0.10);
                  pair('denagothian', 'thyatian', 0.20);
                  pair('denagothian', 'varellyian', 0.10);
                  pair('denagothian', 'yavi', 0.05);
                  pair('denagothian', 'ylari', 0.15);
                  
                  
                  pair('ethengarian', 'flaemish', 0.10);
                  pair('ethengarian', 'gombar', 0.05);
                  pair('ethengarian', 'heldannic', 0.25);
                  pair('ethengarian', 'hulean', 0.30);
                  pair('ethengarian', 'ispan', 0.05);
                  pair('ethengarian', 'jennite', 0.35);
                  pair('ethengarian', 'kaelic', 0.05);
                  pair('ethengarian', 'makai', 0.05);
                  pair('ethengarian', 'milennian', 0.10);
                  pair('ethengarian', 'nithian', 0.10);
                  pair('ethengarian', 'nuar', 0.10);
                  pair('ethengarian', 'ochalean', 0.20);
                  pair('ethengarian', 'old_cogur', 0.15);
                  pair('ethengarian', 'sindhi', 0.35);
                  pair('ethengarian', 'tanagoro', 0.10);
                  pair('ethengarian', 'taymoran', 0.10);
                  pair('ethengarian', 'thothian', 0.10);
                  pair('ethengarian', 'thyatian', 0.15);
                  pair('ethengarian', 'traldaran', 0.20);
                  pair('ethengarian', 'varellyian', 0.15);
                  pair('ethengarian', 'yavi', 0.15);
                  pair('ethengarian', 'ylari', 0.30);
              
              
                  pair('flaemish', 'gombar', 0.05);
                  pair('flaemish', 'heldannic', 0.05);
                  pair('flaemish', 'hulean', 0.10);
                  pair('flaemish', 'ispan', 0.05);
                  pair('flaemish', 'jennite', 0.05)
                  pair('flaemish', 'kaelic', 0.05);
                  pair('flaemish', 'makai', 0.05);
                  pair('flaemish', 'milennian', 0.05);
                  pair('flaemish', 'nithian', 0.10);
                  pair('flaemish', 'nuar', 0.05);
                  pair('flaemish', 'ochalean', 0.55);     // Least overlap: elemental vs philosophical
                  pair('flaemish', 'old_cogur', 0.05);
                  pair('flaemish', 'sindhi', 0.10);
                  pair('flaemish', 'tanagoro', 0.05);
                  pair('flaemish', 'taymoran', 0.15); // Shared focus on ancient, high-magic syntax
                  pair('flaemish', 'thothian', 0.10);
                  pair('flaemish', 'thyatian', 0.05);
                  pair('flaemish', 'traldaran', 0.10);
                  pair('flaemish', 'varellyian', 0.25); // Ancient elemental root overlaps
                  pair('flaemish', 'yavi', 0.05);
                  pair('flaemish', 'ylari', 0.10);
              
              
                  pair('gombar', 'heldannic', 0.15);
                  pair('gombar', 'hulean', 0.10);
                  pair('gombar', 'ispan', 0.15);
                  pair('gombar', 'jennite', 0.10);
                  pair('gombar', 'kaelic', 0.10);
                  pair('gombar', 'makai', 0.40);
                  pair('gombar', 'milennian', 0.15);
                  pair('gombar', 'nithian', 0.20);
                  pair('gombar', 'nuar', 0.60);
                  pair('gombar', 'ochalean', 0.15);
                  pair('gombar', 'old_cogur', 0.05);
                  pair('gombar', 'sindhi', 0.25);
                  pair('gombar', 'tanagoro', 0.70);
                  pair('gombar', 'taymoran', 0.20);
                  pair('gombar', 'thothian', 0.10);
                  pair('gombar', 'thyatian', 0.10);
                  pair('gombar', 'traldaran', 0.10);
                  pair('gombar', 'varellyian', 0.20);
                  pair('gombar', 'yavi', 0.55);
                  pair('gombar', 'ylari', 0.15);
              
              
                  pair('heldannic', 'hulean', 0.15);
                  pair('heldannic', 'ispan', 0.20);
                  pair('heldannic', 'jennite', 0.10);
                  pair('heldannic', 'kaelic', 0.10);
                  pair('heldannic', 'makai', 0.15);
                  pair('heldannic', 'milennian', 0.15);
                  pair('heldannic', 'nithian', 0.10);
                  pair('heldannic', 'nuar', 0.15);
                  pair('heldannic', 'ochalean', 0.10);
                  pair('heldannic', 'old_cogur', 0.10);
                  pair('heldannic', 'sindhi', 0.15);
                  pair('heldannic', 'tanagoro', 0.15);
                  pair('heldannic', 'taymoran', 0.10);
                  pair('heldannic', 'thothian', 0.10);
                  pair('heldannic', 'thyatian', 0.35);
                  pair('heldannic', 'traldaran', 0.25);
                  pair('heldannic', 'varellyian', 0.15);
                  pair('heldannic', 'yavi', 0.15);
                  pair('heldannic', 'ylari', 0.20);
              
              
                  pair('hulean', 'ispan', 0.10);
                  pair('hulean', 'jennite', 0.25);
                  pair('hulean', 'kaelic', 0.05);
                  pair('hulean', 'makai', 0.05);
                  pair('hulean', 'milennian', 0.10);
                  pair('hulean', 'nithian', 0.20);
                  pair('hulean', 'nuar', 0.10);
                  pair('hulean', 'ochalean', 0.15);
                  pair('hulean', 'old_cogur', 0.10);
                  pair('hulean', 'sindhi', 0.40);
                  pair('hulean', 'tanagoro', 0.10);
                  pair('hulean', 'taymoran', 0.15);
                  pair('hulean', 'thothian', 0.15);
                  pair('hulean', 'thyatian', 0.15);
                  pair('hulean', 'traldaran', 0.20);
                  pair('hulean', 'varellyian', 0.20);
                  pair('hulean', 'yavi', 0.10);
                  pair('hulean', 'ylari', 0.40);
              
                  
                  pair('ispan', 'jennite', 0.15);
                  pair('ispan', 'kaelic', 0.60);
                  pair('ispan', 'makai', 0.25);
                  pair('ispan', 'milennian', 0.60); // The "Latin" root
                  pair('ispan', 'nithian', 0.05);
                  pair('ispan', 'nuar', 0.15);
                  pair('ispan', 'ochalean', 0.10);
                  pair('ispan', 'old_cogur', 0.05);
                  pair('ispan', 'sindhi', 0.20);
                  pair('ispan', 'tanagoro', 0.15);
                  pair('ispan', 'taymoran', 0.10);
                  pair('ispan', 'thothian', 0.10);
                  pair('ispan', 'thyatian', 0.25);
                  pair('ispan', 'traldaran', 0.20);
                  pair('ispan', 'varellyian', 0.25);
                  pair('ispan', 'yavi', 0.20);
                  pair('ispan', 'ylari', 0.25);
                  
              
                  pair('jennite', 'kaelic', 0.15);
                  pair('jennite', 'makai', 0.35);
                  pair('jennite', 'milennian', 0.10);
                  pair('jennite', 'nithian', 0.15);
                  pair('jennite', 'nuar', 0.15);
                  pair('jennite', 'ochalean', 0.10);
                  pair('jennite', 'old_cogur', 0.55); // Strong Neathar-root overlap
                  pair('jennite', 'sindhi', 0.45);
                  pair('jennite', 'tanagoro', 0.20);
                  pair('jennite', 'taymoran', 0.10);
                  pair('jennite', 'thothian', 0.15);
                  pair('jennite', 'thyatian', 0.15);
                  pair('jennite', 'traldaran', 0.25);
                  pair('jennite', 'varellyian', 0.30);
                  pair('jennite', 'yavi', 0.20);
                  pair('jennite', 'ylari', 0.20);
              
              
                  pair('kaelic', 'makai', 0.20);
                  pair('kaelic', 'milennian', 0.15);
                  pair('kaelic', 'nithian', 0.05);
                  pair('kaelic', 'nuar', 0.15);
                  pair('kaelic', 'ochalean', 0.05);
                  pair('kaelic', 'old_cogur', 0.25);
                  pair('kaelic', 'sindhi', 0.10);
                  pair('kaelic', 'tanagoro', 0.10);
                  pair('kaelic', 'taymoran', 0.10);
                  pair('kaelic', 'thothian', 0.05);
                  pair('kaelic', 'thyatian', 0.15);
                  pair('kaelic', 'traldaran', 0.25);
                  pair('kaelic', 'varellyian', 0.15);
                  pair('kaelic', 'yavi', 0.10);
                  pair('kaelic', 'ylari', 0.10);
              
              
                  pair('makai', 'darokinian', 0.10);
                  pair('makai', 'gombar', 0.40);
                  pair('makai', 'ispan', 0.25);
                  pair('makai', 'milennian', 0.10);
                  pair('makai', 'nithian', 0.10);
                  pair('makai', 'nuar', 0.35);
                  pair('makai', 'ochalean', 0.15);
                  pair('makai', 'old_cogur', 0.20);
                  pair('makai', 'sindhi', 0.10);
                  pair('makai', 'tanagoro', 0.30);
                  pair('makai', 'taymoran', 0.05);
                  pair('makai', 'thothian', 0.10);
                  pair('makai', 'thyatian', 0.10);
                  pair('makai', 'traldaran', 0.15);
                  pair('makai', 'varellyian', 0.25);
                  pair('makai', 'yavi', 0.30);
                  pair('makai', 'ylari', 0.10);
                  
              
                  pair('milennian', 'nithian', 0.15);
                  pair('milennian', 'nuar', 0.10);
                  pair('milennian', 'ochalean', 0.15);
                  pair('milennian', 'old_cogur', 0.05);
                  pair('milennian', 'sindhi', 0.15);
                  pair('milennian', 'tanagoro', 0.10);
                  pair('milennian', 'taymoran', 0.30); // Mutual respect for high-arcane structure
                  pair('milennian', 'thothian', 0.20);
                  pair('milennian', 'thyatian', 0.35);
                  pair('milennian', 'traldaran', 0.40);
                  pair('milennian', 'varellyian', 0.25);
                  pair('milennian', 'yavi', 0.10);
                  pair('milennian', 'ylari', 0.20);
                  
               
                  pair('nithian', 'nuar', 0.15);
                  pair('nithian', 'ochalean', 0.10);
                  pair('nithian', 'old_cogur', 0.15);
                  pair('nithian', 'sindhi', 0.15);
                  pair('nithian', 'tanagoro', 0.10);
                  pair('nithian', 'taymoran', 0.25); // shared funerary magic
                  pair('nithian', 'thothian', 0.85);
                  pair('nithian', 'thyatian', 0.10);
                  pair('nithian', 'traldaran', 0.15);
                  pair('nithian', 'varellyian', 0.25);
                  pair('nithian', 'yavi', 0.20);
                  pair('nithian', 'ylari', 0.25);
              
              
                  pair('nuar', 'ochalean', 0.15);
                  pair('nuar', 'old_cogur', 0.05);
                  pair('nuar', 'sindhi', 0.20);  
                  pair('nuar', 'tanagoro', 0.75);
                  pair('nuar', 'taymoran', 0.15);
                  pair('nuar', 'thothian', 0.10);
                  pair('nuar', 'thyatian', 0.10);
                  pair('nuar', 'traldaran', 0.10);
                  pair('nuar', 'varellyian', 0.15);
                  pair('nuar', 'yavi', 0.65);
                  pair('nuar', 'ylari', 0.15);
              
              
                  pair('ochalean', 'old_cogur', 0.05);
                  pair('ochalean', 'sindhi', 0.30);
                  pair('ochalean', 'tanagoro', 0.15);
                  pair('ochalean', 'taymoran', 0.10);
                  pair('ochalean', 'thothian', 0.05);
                  pair('ochalean', 'thyatian', 0.10);
                  pair('ochalean', 'traldaran', 0.10);
                  pair('ochalean', 'varellyian', 0.20);
                  pair('ochalean', 'yavi', 0.15);
                  pair('ochalean', 'ylari', 0.15);
                  
              
                  pair('old_cogur', 'sindhi', 0.15);
                  pair('old_cogur', 'tanagoro', 0.10);
                  pair('old_cogur', 'taymoran', 0.05);
                  pair('old_cogur', 'thothian', 0.05);
                  pair('old_cogur', 'thyatian', 0.05);
                  pair('old_cogur', 'traldaran', 0.05);
                  pair('old_cogur', 'varellyian', 0.20);
                  pair('old_cogur', 'yavi', 0.10);
                  pair('old_cogur', 'ylari', 0.10);
                  
              
                  pair('sindhi', 'tanagoro', 0.15);
                  pair('sindhi', 'taymoran', 0.10);
                  pair('sindhi', 'thothian', 0.15);
                  pair('sindhi', 'thyatian', 0.20);
                  pair('sindhi', 'traldaran', 0.20);
                  pair('sindhi', 'varellyian', 0.60);
                  pair('sindhi', 'yavi', 0.20);
                  pair('sindhi', 'ylari', 0.20);
              
                  pair('tanagoro', 'taymoran', 0.30);
                  pair('tanagoro', 'thothian', 0.10);
                  pair('tanagoro', 'thyatian', 0.10);
                  pair('tanagoro', 'traldaran', 0.10);
                  pair('tanagoro', 'varellyian', 0.15);
                  pair('tanagoro', 'yavi', 0.65);
                  pair('tanagoro', 'ylari', 0.15);
              
              
                  pair('taymoran', 'thothian', 0.25);
                  pair('taymoran', 'thyatian', 0.10);
                  pair('taymoran', 'traldaran', 0.15);
                  pair('taymoran', 'varellyian', 0.35);
                  pair('taymoran', 'yavi', 0.20);
                  pair('taymoran', 'ylari', 0.10);
              
              
                  pair('thothian', 'thyatian', 0.20);
                  pair('thothian', 'traldaran', 0.40);
                  pair('thothian', 'varellyian', 0.10);
                  pair('thothian', 'yavi', 0.15);
                  pair('thothian', 'ylari', 0.50);
              
              
              
                  pair('thyatian', 'traldaran', 0.65);
                  pair('thyatian', 'varellyian', 0.20);
                  pair('thyatian', 'yavi', 0.10);
                  pair('thyatian', 'ylari', 0.25);
              
              
                  pair('traldaran', 'varellyian', 0.25);
                  pair('traldaran', 'yavi', 0.15);
                  pair('traldaran', 'ylari', 0.35);
              
              
                  pair('varellyian', 'yavi', 0.25);
                  pair('varellyian', 'ylari', 0.15);
              
              
                  pair('yavi', 'ylari', 0.40);
                  
              
                  // Elvish dialects (Tolkien + FR merged cluster)
                  pair('quenya', 'sindarin', 0.6);
                  pair('quenya', 'telerin', 0.7);
                  pair('sindarin', 'telerin', 0.5);
                  pair('elvish', 'sindarin', 0.7);
                  pair('elvish', 'quenya', 0.6);
              
                  // Dwarven
                  pair('khuzdul', 'iglishmek', 0.4); // gesture-based variant
              
                  //
                  // Middle‑earth
                  //
                  pair('rohirric', 'dunlending', 0.4);
                  pair('hobbitish', 'westron', 0.9);
                  pair('adunaic', 'numenorean', 0.7);
              
                  // Orkish dialects
                  pair('orkish_middle_earth', 'black_speech', 0.3);
              
                  //
                  // Traveller
                  //
                  pair('vargr_arrgh', 'vargr_high', 0.8); // if vargr_high exists in your registry
                  pair('droyne_o_lo_ka', 'droyne_chirps', 0.5);
                  pair('cant_spacer', 'battle_signal_imperial', 0.6);
              
                  //
                  // Cthulhu / Mythos
                  //
                  // Mythos languages are intentionally low-intelligibility
                  pair('aklo_coc', 'tsathogguan', 0.2);
                  pair('aklo_coc', 'rlyehian', 0.1);
                  pair('rlyehian', 'yithian_mental', 0.1);
                  pair('elder_sign_logic', 'yog_sothoth_key', 0.3);
                  pair('ghroth_resonance', 'elder_god_harmony', 0.2);
              
                  // Dreamlands human dialects
                  pair('celephaisean', 'inqua', 0.6);
                  pair('celephaisean', 'larkar', 0.5);
                  pair('larkar', 'thranish', 0.5);
              
                  // Mythos monstrous
                  pair('ghoul_dream', 'gug_mumble', 0.2);
                  pair('zoog_chatter', 'cat_ulthar', 0.3);
              
                  //
                  // Shadowrun / Cyberpunk
                  //
                  pair('city_speak', 'streetslang', 0.8);
                  pair('streetslang', 'corporate_high', 0.5);
                  pair('cant_sprawl_rogue', 'nomad_sign', 0.4);
              
                  //
                  // Machine Logic (binary_unified cluster)
                  //
                  pair('binary_unified', 'matrix_jargon', 0.7);
                  pair('binary_unified', 'binary_asist', 0.8);
                  pair('binary_unified', 'jump_code_binary', 0.6);
                  pair('binary_unified', 'replicator_binary', 0.6);
                  pair('binary_unified', 'data_relic_binary', 0.5);
                  pair('binary_unified', 'net_protocol_v12', 0.4);
                  pair('binary_unified', 'void_beacon_code', 0.3);
              
                  //
                  // Stargate
                  //
                  pair('alteran_ancient', 'ori_st', 0.6);
                  pair('alteran_ancient', 'goauld', 0.3);
                  pair('asgard', 'nox', 0.4);
              
                  //
                  // Battletech
                  //
                  pair('davion_english', 'star_league_standard', 0.9);
                  pair('kurita_japanese', 'liao_mandarin', 0.3);
                  pair('liao_mandarin', 'marik_italian', 0.2);
                  pair('steiner_german', 'davion_english', 0.4);
                  pair('outworlds_patois', 'farstar_patois', 0.7);
                  pair('clan_speak', 'interstellar_islat', 0.4);
              
                  //
                  // Gamma World
                  //
                  pair('gamma_common', 'ancient_gamma', 0.7);
                  pair('bonaparish', 'gamma_common', 0.5);
                  pair('nomad_slang_gamma', 'gamma_common', 0.6);
              
                  // Mutant beast/plant intelligibility
                  pair('animal_hybrid', 'gallus_cluck', 0.3);
                  pair('animal_hybrid', 'yexil_chirp', 0.2);
                  pair('pod_whisper', 'animal_hybrid', 0.1);
              
                  //
                  // Historical / Real‑world (era‑based)
                  //
                  pair('latin_medieval', 'ancient_greek_coc', 0.4);
                  pair('arabic_classical', 'egyptian_hieroglyphs', 0.2);
                  pair('sanskrit_mythos', 'ancient_greek_coc', 0.3);
                }
              
                _pairKey(a, b) {
                  return a < b ? `${a}|${b}` : `${b}|${a}`;
                }
              
                getIntelligibility(a, b) {
                  if (a === b) return 1;
                  const key = this._pairKey(a, b);
                  return this.intelligibility.get(key) || 0;
                }
              
  // ───────────────────────────────────────────────
  //  LANGUAGE-BASED SKILL SYNERGIES (MULTIVERSAL)
  // ───────────────────────────────────────────────
  _bootstrapSynergies() {
  
    /**
     * Each entry:
     *   languageId or familyId -> [
     *     { skill: 'Linguistics', bonus: +2, reason: '...' },
     *     { skill: 'Knowledge (Arcana)', bonus: +1, reason: '...' }
     *   ]
     *
     * Supports:
     *   - bonus
     *   - bonusPerLanguage
     *   - maxBonus
     */
  
    const set = (id, list) => this.synergies.set(id, list);
  
    //
    // Universal rule: knowing many languages improves Linguistics
    //
    set('any', [
      {
        skill: 'Linguistics',
        bonusPerLanguage: 0.5,
        maxBonus: 5,
        reason: 'Broad exposure to diverse tongues.'
      }
    ]);
  
    //
    // D&D / Fantasy Prime
    //
    set('draconic', [
      { skill: 'Spellcraft', bonus: 2, reason: 'Arcane formulae and dragon magic treatises.' },
      { skill: 'Knowledge (Arcana)', bonus: 2, reason: 'Many arcane texts are written in Draconic.' }
    ]);
  
    set('abyssal', [
      { skill: 'Knowledge (Planes)', bonus: 2, reason: 'Language of demons and lower planes.' },
      { skill: 'Knowledge (Religion)', bonus: 1, reason: 'Cult texts and forbidden scriptures.' }
    ]);
  
    set('infernal', [
      { skill: 'Knowledge (Planes)', bonus: 2, reason: 'Language of devils and Baator.' },
      { skill: 'Knowledge (Law)', bonus: 2, reason: 'Contractual and legalistic infernal pacts.' }
    ]);
  
    set('celestial', [
      { skill: 'Knowledge (Religion)', bonus: 2, reason: 'Holy texts and celestial doctrine.' },
      { skill: 'Knowledge (Planes)', bonus: 1, reason: 'Upper planes lore.' }
    ]);
  
    set('undercommon', [
      { skill: 'Knowledge (Dungeoneering)', bonus: 2, reason: 'Underdark cultures and hazards.' },
      { skill: 'Gather Information', bonus: 2, reason: 'Black markets and shadow networks.' }
    ]);
  
    //
    // Middle‑earth
    //
    set('quenya', [
      { skill: 'Knowledge (History)', bonus: 2, reason: 'Ancient lore of the Eldar.' },
      { skill: 'Knowledge (Arcana)', bonus: 1, reason: 'Elven ritual magic and high lore.' }
    ]);
  
    set('sindarin', [
      { skill: 'Diplomacy', bonus: 1, reason: 'Lingua franca among many Free Peoples.' },
      { skill: 'Knowledge (Geography)', bonus: 1, reason: 'Widespread use across Middle-earth.' }
    ]);
  
    set('khuzdul', [
      { skill: 'Craft', bonus: 2, reason: 'Dwarven engineering and stonecraft terminology.' }
    ]);
  
    set('black_speech', [
      { skill: 'Intimidate', bonus: 2, reason: 'Harsh, commanding structure of the Dark Tongue.' }
    ]);
  
    //
    // Traveller
    //
    set('cant_spacer', [
      { skill: 'Pilot (Space)', bonus: 1, reason: 'Docking, EVA, and spacer jargon.' },
      { skill: 'Profession (Spacer)', bonus: 2, reason: 'Shared technical vocabulary.' }
    ]);
  
    set('battle_signal_imperial', [
      { skill: 'Tactics (Space)', bonus: 2, reason: 'Imperial fleet command signals.' }
    ]);
  
    set('droyne_o_lo_ka', [
      { skill: 'Knowledge (Xenobiology)', bonus: 2, reason: 'Understanding Droyne caste structures.' }
    ]);
  
    set('hivers_manipulation', [
      { skill: 'Sense Motive', bonus: 2, reason: 'Decoding subtle manipulator cues.' }
    ]);
  
    //
    // Cthulhu / Mythos
    //
    set('aklo_coc', [
      { skill: 'Knowledge (Occult)', bonus: 3, reason: 'Primary language of eldritch lore.' },
      { attribute: 'sanity', bonus: -1, reason: 'Exposure to non-Euclidean concepts.' }
    ]);
  
    set('rlyehian', [
      { skill: 'Knowledge (Forbidden Lore)', bonus: 3, reason: 'Deep lore of sunken civilizations.' },
      { attribute: 'sanity', bonus: -2, reason: 'Warping grammar and impossible phonemes.' }
    ]);
  
    set('yithian_mental', [
      { skill: 'Knowledge (History)', bonus: 3, reason: 'Chronicles spanning aeons.' },
      { skill: 'Concentration', bonus: 2, reason: 'Mental discipline required for telepathic syntax.' }
    ]);
  
    set('elder_sign_logic', [
      { skill: 'Spellcraft', bonus: 2, reason: 'Protective sigils and anti-eldritch geometry.' }
    ]);
  
    //
    // Dreamlands
    //
    set('celephaisean', [
      { skill: 'Perform (Oratory)', bonus: 2, reason: 'Poetic and ceremonial structure.' }
    ]);
  
    set('ghoul_dream', [
      { skill: 'Survival', bonus: 2, reason: 'Navigating Dreamlands tunnels and warrens.' }
    ]);
  
    //
    // Shadowrun / Cyberpunk
    //
    set('city_speak', [
      { skill: 'Streetwise', bonus: 2, reason: 'Urban slang and multicultural code-switching.' }
    ]);
  
    set('streetslang', [
      { skill: 'Gather Information', bonus: 2, reason: 'Black market and gang intel.' }
    ]);
  
    set('corporate_high', [
      { skill: 'Diplomacy', bonus: 2, reason: 'Corporate negotiation and etiquette.' }
    ]);
  
    set('cant_sprawl_rogue', [
      { skill: 'Bluff', bonus: 2, reason: 'Hidden meanings in casual speech.' },
      { skill: 'Sense Motive', bonus: 1, reason: 'Reading coded subtext.' }
    ]);
  
    //
    // Machine Logic (binary_unified cluster)
    //
    set('binary_unified', [
      { skill: 'Computers', bonus: 2, reason: 'Universal digital encoding.' },
      { skill: 'Engineering', bonus: 1, reason: 'Machine-level diagnostics and protocols.' }
    ]);
  
    set('matrix_jargon', [
      { skill: 'Hacking', bonus: 2, reason: 'Matrix architecture and exploit terminology.' }
    ]);
  
    set('jump_code_binary', [
      { skill: 'Astrogation', bonus: 2, reason: 'Jump-drive coordinate encoding.' }
    ]);
  
    //
    // Stargate
    //
    set('alteran_ancient', [
      { skill: 'Knowledge (Archaeology)', bonus: 2, reason: 'Ancient ruins and Alteran inscriptions.' },
      { skill: 'Use Magic Device', bonus: 1, reason: 'Interface with Ancient technology.' }
    ]);
  
    set('goauld', [
      { skill: 'Knowledge (Religion)', bonus: 2, reason: 'System Lord theology and iconography.' }
    ]);
  
    set('asgard', [
      { skill: 'Knowledge (Engineering)', bonus: 2, reason: 'Advanced holographic and cloning tech.' }
    ]);
  
    //
    // Battletech
    //
    set('davion_english', [
      { skill: 'Knowledge (Tactics)', bonus: 1, reason: 'Federated Suns doctrine.' }
    ]);
  
    set('kurita_japanese', [
      { skill: 'Knowledge (History)', bonus: 1, reason: 'Samurai tradition and Combine culture.' }
    ]);
  
    set('clan_speak', [
      { skill: 'Intimidate', bonus: 1, reason: 'Harsh, honor-bound phrasing.' },
      { skill: 'Knowledge (Tactics)', bonus: 1, reason: 'Clan battlefield terminology.' }
    ]);
  
    //
    // Gamma World
    //
    set('gamma_common', [
      { skill: 'Survival', bonus: 1, reason: 'Post-apocalyptic scavenging and barter terms.' }
    ]);
  
    set('healer_patter', [
      { skill: 'Heal', bonus: 2, reason: 'Medical slang and improvised triage vocabulary.' }
    ]);
  
    //
    // Historical / Real‑world (era‑based)
    //
    set('latin_medieval', [
      { skill: 'Knowledge (Religion)', bonus: 2, reason: 'Ecclesiastical texts and doctrine.' },
      { skill: 'Knowledge (History)', bonus: 1, reason: 'Medieval scholarship.' }
    ]);
  
    set('arabic_classical', [
      { skill: 'Knowledge (Religion)', bonus: 2, reason: 'Classical Islamic scholarship.' },
      { skill: 'Knowledge (Geography)', bonus: 1, reason: 'Medieval trade routes and cartography.' }
    ]);
  
    set('ancient_greek_coc', [
      { skill: 'Knowledge (Philosophy)', bonus: 2, reason: 'Classical philosophical texts.' }
    ]);
  
    //
    // Admin / Meta
    //
    set('immortal_cant', [
      { skill: 'Knowledge (Planes)', bonus: 3, reason: 'Trans-planar communication.' },
      { skill: 'Spellcraft', bonus: 2, reason: 'Reality-binding syntax.' }
    ]);
  }
              
  getSynergies(languageId) {
    const results = [];

    // Direct language
    if (this.synergies.has(languageId)) {
      results.push(...this.synergies.get(languageId));
    }

    // Family-level
    const family = this.getFamilyByLanguage(languageId);
    if (family && this.synergies.has(family.familyId)) {
      results.push(...this.synergies.get(family.familyId));
    }

    // Global "any language" rule
    if (this.synergies.has('any')) {
      results.push(...this.synergies.get('any'));
    }

    return results;
  }

  // ───────────────────────────────────────────────
  //  INTERNAL UTILITIES
  // ───────────────────────────────────────────────

  _pairKey(a, b) {
    return a < b ? `${a}|${b}` : `${b}|${a}`;
  }

  // ───────────────────────────────────────────────
  //  PUBLIC API
  // ───────────────────────────────────────────────

  getFamilyByLanguage(languageId) {
    for (const [familyId, data] of this.familyTree.entries()) {
      if (data.members.includes(languageId)) {
        return { familyId, ...data };
      }
    }
    return null;
  }

  getDifficulty(languageId) {
    return this.difficulty.get(languageId) || 3;
  }

  getIntelligibility(a, b) {
    if (a === b) return 1;
    const key = this._pairKey(a, b);
    return this.intelligibility.get(key) || 0;
  }

  getSynergies(languageId) {
    const results = [];

    // Direct language
    if (this.synergies.has(languageId)) {
      results.push(...this.synergies.get(languageId));
    }

    // Family-level
    const family = this.getFamilyByLanguage(languageId);
    if (family && this.synergies.has(family.familyId)) {
      results.push(...this.synergies.get(family.familyId));
    }

    // Global "any language" rule
    if (this.synergies.has('any')) {
      results.push(...this.synergies.get('any'));
    }

    return results;
  }
}
              
module.exports = LanguageRelations;
