'use strict';

/**
 * Cleric Domain Spell Lists
 * MU‑D20 Unified Hybrid List
 * Sources: SRD 3.5, Spell Compendium, AEG, Rite, Purple Duck, Malhavoc, Mongoose
 */
module.exports = {
  const domains = {
    air: {
      name: "Air",
      grantedPowers: {
        turnTypes: ['earth_elemental'], 
        rebukeTypes: ['air_elemental'],
        description: "Turn earth creatures or rebuke air creatures."
      },
      spells: {
        1: 'obscuring_mist',
        2: 'wind_wall',
        3: 'gaseous_form',
        4: 'air_walk',
        5: 'control_winds',
        6: 'chain_lightning',
        7: 'control_weather',
        8: 'whirlwind',
        9: 'elemental_swarm_air'
      }
    },
    ancestry: {
      name: "Ancestry",
      grantedPowers: {
        // Lore of the Ancestors: Bonus to History and heavy armor access
        classSkills: ['history'],
        skillBonuses: { history: 2 }, 
        bonusProficiencies: ['heavy_armor', 'martial_weapons'],
        
        // Spirit Speaker: Once per day, gain a temporary proficiency
        slas: [
          { 
            id: 'spirit_speaker', 
            name: "Spirit Speaker",
            uses: 1, 
            type: 'daily',
            description: "Commune with an ancestor to gain proficiency in one skill or tool until your next rest."
          }
        ],
        description: "Commune with your ancestors for martial prowess and ancient lore. You gain a +2 bonus on History checks."
      },
    spells: {
        1: 'guidance',
        2: 'augury',
        3: 'ancestral_vengeance',
        4: 'divination',
        5: 'commune',
        6: 'find_the_path',
        7: 'legend_lore',
        8: 'vision',
        9: 'foresight'
      }
    },
    animal: {
      name: "Animal",
      grantedPowers: {
        classSkills: ['knowledge_nature'],
        slas: [{ id: 'speak_with_animals', uses: 1 }]
      },
      spells: {
        1: 'calm_animals',
        2: 'hold_animal',
        3: 'dominate_animal',
        4: 'summon_nature_s_ally_iv',
        5: 'commune_with_nature',
        6: 'antilife_shell',
        7: 'animal_shapes',
        8: 'summon_nature_s_ally_viii',
        9: 'shapechange'
      }
    },
    artifice: {
      1: 'animate_rope',
      2: 'wood_shape',
      3: 'stone_shape',
      4: 'minor_creation',
      5: 'fabricate',
      6: 'major_creation',
      7: 'hardening',
      8: 'true_creation',
      9: 'prismatic_sphere'
    },
    chaos: {
      1: 'protection_from_law',
      2: 'shatter',
      3: 'magic_circle_against_law',
      4: 'chaos_hammer',
      5: 'dispel_law',
      6: 'animate_objects',
      7: 'word_of_chaos',
      8: 'cloak_of_chaos',
      9: 'summon_monster_ix'
    },
    charm: {
      1: 'charm_person',
      2: 'calm_emotions',
      3: 'suggestion',
      4: 'heroism',
      5: 'charm_monster',
      6: 'geas_quest',
      7: 'insanity',
      8: 'demand',
      9: 'dominate_monster'
    },
    city: {
      1: 'rooftop_strider',
      2: 'city_lights',
      3: 'winding_alleys',
      4: 'commune_with_city',
      5: 'skyline_runner',
      6: 'city_stride',
      7: 'urban_shield',
      8: 'city_s_might',
      9: 'animate_city'
    },
    community: {
      name: "Community",
      grantedPowers: {
        skillBonuses: { diplomacy: 2 }, // Competence bonus
        slas: [{ id: 'calm_emotions', uses: 1 }]
      },
      spells: {
        1: 'bless',
        2: 'status',
        3: 'prayer',
        4: 'greater_status',
        5: 'telepathic_bond',
        6: 'heroes_feast',
        7: 'refuge',
        8: 'sympathy',
        9: 'mass_heal'
      }
    },
    corruption: {
      1: 'doom',
      2: 'blindness_deafness',
      3: 'contagion',
      4: 'morality_undone',
      5: 'feeblemind',
      6: 'pox',
      7: [
        'aberrate', 'insanity'
      ],
      8: 'befoul',
      9: 'despoil'
    },
    darkness: {
      1: 'obscuring_mist',
      2: 'blindness_deafness',
      3: 'blacklight',
      4: 'armor_of_darkness',
      5: 'darkbolt',
      6: 'greater_prying_eyes',
      7: 'nightmare',
      8: 'power_word_blind',
      9: 'power_word_kill'
    },
    death: {
      1: 'cause_fear',
      2: 'death_knell',
      3: 'animate_dead',
      4: 'death_ward',
      5: 'slay_living',
      6: 'create_undead',
      7: 'destruction',
      8: 'create_greater_undead',
      9: 'wail_of_the_banshee'
    },
    destruction: {
      1: 'inflict_light_wounds',
      2: 'shatter',
      3: 'contagion',
      4: 'inflict_critical_wounds',
      5: 'flame_strike',
      6: 'harm',
      7: 'disintegrate',
      8: 'earthquake',
      9: 'implosion'
    },
    dragon: {
      1: 'magic_fang',
      2: 'resist_energy',
      3: 'greater_magic_fang',
      4: 'voice_of_the_dragon',
      5: 'dragon_breath',
      6: 'form_of_the_dragon_i',
      7: 'form_of_the_dragon_ii',
      8: 'form_of_the_dragon_iii',
      9: 'shapechange'
    },
    earth: {
      1: 'magic_stone',
      2: 'soften_earth_and_stone',
      3: 'stone_shape',
      4: 'spike_stones',
      5: 'wall_of_stone',
      6: 'stoneskin',
      7: 'earthquake',
      8: 'iron_body',
      9: 'elemental_swarm_earth'
    },
    evil: {
      1: 'protection_from_good',
      2: 'desecrate',
      3: 'magic_circle_against_good',
      4: 'unholy_blight',
      5: 'dispel_good',
      6: 'create_undead',
      7: 'blasphemy',
      8: 'unholy_aura',
      9: 'summon_monster_ix'
    },
    fire: {
      1: 'burning_hands',
      2: 'produce_flame',
      3: 'resist_energy',
      4: 'wall_of_fire',
      5: 'fire_shield',
      6: 'fire_seeds',
      7: 'fire_storm',
      8: 'incendiary_cloud',
      9: 'elemental_swarm_fire'
    },
    good: {
      1: 'protection_from_evil',
      2: 'consecrate',
      3: 'magic_circle_against_evil',
      4: 'holy_smite',
      5: 'dispel_evil',
      6: 'blade_barrier',
      7: 'holy_word',
      8: 'holy_aura',
      9: 'summon_monster_ix'
    },
    healing: {
      1: 'cure_light_wounds',
      2: 'cure_moderate_wounds',
      3: 'cure_serious_wounds',
      4: 'cure_critical_wounds',
      5: 'lesser_heal_mass',
      6: 'heal',
      7: 'regenerate',
      8: 'mass_heal',
      9: 'true_resurrection'
    },
    hunt: {
      1: 'longstrider',
      2: 'snare',
      3: 'haste',
      4: 'freedom_of_movement',
      5: 'commune_with_nature',
      6: 'find_the_path',
      7: 'true_seeing',
      8: 'discern_location',
      9: 'foresight'
    },
    knowledge: {
      1: 'detect_secret_doors',
      2: 'detect_thoughts',
      3: 'clairaudience_clairvoyance',
      4: 'divination',
      5: 'true_seeing',
      6: 'find_the_path',
      7: 'legend_lore',
      8: 'discern_location',
      9: 'foresight'
    },
    law: {
      1: 'protection_from_chaos',
      2: 'calm_emotions',
      3: 'magic_circle_against_chaos',
      4: 'order_s_wrath',
      5: 'dispel_chaos',
      6: 'hold_monster',
      7: 'dictum',
      8: 'shield_of_law',
      9: 'summon_monster_ix'
    },
    luck: {
      1: 'entropic_shield',
      2: 'aid',
      3: 'protection_from_energy',
      4: 'freedom_of_movement',
      5: 'break_enchantment',
      6: 'mislead',
      7: 'spell_turning',
      8: 'moment_of_prescience',
      9: 'miracle'
    },
    magic: {
      1: 'nystul_s_magic_aura',
      2: 'identify',
      3: 'dispel_magic',
      4: 'imbue_with_spell_ability',
      5: 'spell_resistance',
      6: 'antimagic_field',
      7: 'spell_turning',
      8: 'protection_from_spells',
      9: 'mage_s_disjunction'
    },
    protection: {
      1: 'sanctuary',
      2: 'shield_other',
      3: 'protection_from_energy',
      4: 'spell_immunity',
      5: 'spell_resistance',
      6: 'antimagic_field',
      7: 'repulsion',
      8: 'mind_blank',
      9: 'prismatic_sphere'
    },
    serpent: {
      7: 'ability_rip'
    },
    strength: {
      1: 'enlarge_person',
      2: 'bull_s_strength',
      3: 'magic_vestment',
      4: 'spell_immunity',
      5: 'righteous_might',
      6: 'stoneskin',
      7: 'grasping_hand',
      8: 'clenched_fist',
      9: 'crushing_hand'
    },
    sun: {
      1: 'endure_elements',
      2: 'heat_metal',
      3: 'searing_light',
      4: 'fire_shield',
      5: 'flame_strike',
      6: 'fire_seeds',
      7: 'sunbeam',
      8: 'sunburst',
      9: 'prismatic_sphere'
    },
    time: {
      1: 'true_strike',
      2: 'gentle_repose',
      3: 'haste',
      4: 'freedom_of_movement',
      5: 'permanency',
      6: 'contingency',
      7: 'moment_of_prescience',
      8: 'temporal_stasis',
      9: 'time_stop'
    },
    travel: {
      1: 'longstrider',
      2: 'locate_object',
      3: 'fly',
      4: 'dimension_door',
      5: 'teleport',
      6: 'find_the_path',
      7: 'greater_teleport',
      8: 'phase_door',
      9: 'astral_projection'
    },
    trickery: {
      1: 'disguise_self',
      2: 'invisibility',
      3: 'nondetection',
      4: 'confusion',
      5: 'false_vision',
      6: 'mislead',
      7: 'screen',
      8: 'polymorph_any_object',
      9: 'time_stop'
    },
    war: {
      1: 'magic_weapon',
      2: 'spiritual_weapon',
      3: 'magic_vestment',
      4: 'divine_power',
      5: 'flame_strike',
      6: 'blade_barrier',
      7: 'power_word_blind',
      8: 'power_word_stun',
      9: 'power_word_kill'
    },
    water: {
      1: 'obscuring_mist',
      2: 'fog_cloud',
      3: 'water_breathing',
      4: 'control_water',
      5: 'ice_storm',
      6: 'cone_of_cold',
      7: 'acid_fog',
      8: 'horrid_wilting',
      9: 'elemental_swarm_water'
    }
  }
};




