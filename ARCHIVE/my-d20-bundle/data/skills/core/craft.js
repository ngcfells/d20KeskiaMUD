/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/craft.js
 * PURPOSE: Umbrella skill definition for Craft with nested specialties.
 */

'use strict';

module.exports = {
  id: 'craft',
  name: 'Craft',
  ability: 'intelligence',
  hasSpecialties: true,

  specialties: {
    // --- Weaponsmithing ---
    weaponsmithing: {
      swords: {},
      axes: {},
      polearms: {},
      exotic_weapons: {},
      elven_blades: {},
      vibroblades: {},
      monoblades: {},
      plasma_blades: {}
    },

    // --- Armorsmithing ---
    armorsmithing: {
      light: {},
      medium: {},
      heavy: {},
      shields: {},
      ballistic: {},
      tactical: {},
      powered: {}
    },

    // --- Bowmaking ---
    bowmaking: {
      longbows: {},
      shortbows: {},
      composite_bows: {},
      crossbows: {},
      energy_bows: {}
    },

    // --- Alchemy ---
    alchemy: {
      potions: {},
      poisons: {},
      alchemical_items: {},
      chemical_compounds: {},
      mutagens: {},
      forbidden_reagents: {}
    },

    // --- Trapmaking ---
    trapmaking: {
      mechanical: {},
      magical: {},
      electronic: {},
      cyber_traps: {}
    },

    // --- Jewelry / Art ---
    jewelry: {
      rings: {},
      necklaces: {},
      gemstones: {}
    },
    art: {
      sculpture: {},
      painting: {},
      engraving: {}
    },

    // --- Woodworking / Metalworking ---
    woodworking: {},
    metalworking: {},

    // --- Electronics ---
    electronics: {
      circuits: {},
      sensors: {},
      comms_devices: {},
      hacking_tools: {}
    },

    // --- Robotics ---
    robotics: {
      drones: {},
      androids: {},
      mechs: {},
      droids: {}
    },

    // --- Cybernetics ---
    cybernetics: {
      implants: {},
      neural_jacks: {},
      cyberlimbs: {},
      wetware: {}
    },

    // --- Engineering ---
    engineering: {
      mechanical: {},
      structural: {},
      starship: {},
      hyperdrive_components: {},
      warp_cores: {}
    },

    // --- Nanotech ---
    nanotech: {
      nanobots: {},
      nanofabrication: {},
      nano_weapons: {}
    },

    // --- Improvised / Post-Apoc ---
    improvised: {
      pipe_guns: {},
      zip_guns: {},
      scrap_rifles: {},
      jury_rigged: {},
      survival_gear: {}
    },

    // --- Cthulhu ---
    occult_crafting: {
      ritual_implements: {},
      forbidden_alchemy: {}
    },

    // --- GUNSMITHING (NEW, FULL TREE) ---
    gunsmithing: {
      // Black Powder
      black_powder: {
        matchlock: {},
        wheel_lock: {},
        flintlock: {},
        blunderbuss: {},
        hand_cannon: {},
        arquebus: {},
        musket: {}
      },

      // Western / Frontier
      western: {
        revolvers: {},
        lever_action: {},
        break_action: {},
        derringers: {}
      },

      // Modern Firearms
      modern: {
        handguns: {
          semi_auto: {},
          revolvers: {}
        },
        rifles: {
          bolt_action: {},
          semi_auto: {},
          assault_rifles: {}
        },
        shotguns: {
          pump: {},
          semi_auto: {}
        },
        smgs: {},
        lmgs: {},
        sniper_systems: {}
      },

      // Cyberpunk Firearms
      cyberpunk: {
        smart_guns: {},
        gyrojet: {},
        caseless: {},
        electromagnetic: {},
        smart_ammo: {},
        bio_coded: {}
      },

      // Sci-Fi Energy Weapons
      scifi: {
        plasma_rifles: {},
        ion_carbines: {},
        particle_beam: {},
        gauss_rifles: {},
        coilguns: {},
        laser_pistols: {},
        fusion_lances: {}
      },

      // Star Wars Blasters
      star_wars: {
        blaster_pistols: {},
        heavy_blasters: {},
        blaster_rifles: {},
        carbines: {},
        eweb_repeaters: {},
        bowcasters: {},

        blaster_mods: {
          power_pack_tuning: {},
          gas_cartridge_optimization: {},
          scope_calibration: {},
          cooling_jacket_upgrades: {},
          overcharge_modules: {},
          rapid_fire_regulators: {},
          stabilizer_gyros: {},
          focusing_crystals: {}
        }
      },

      // Post-Apocalyptic
      post_apoc: {
        pipe_guns: {},
        zip_guns: {},
        scrap_rifles: {},
        makeshift_smgs: {},
        mutant_tech: {},
        radiation_cooled_barrels: {}
      },

      // Cthulhu / Pulp
      pulp: {
        revolvers_38: {},
        automatics_45: {},
        thompson_smgs: {},
        bolt_action_rifles: {},
        shotguns: {},
        trench_guns: {}
      },

      // Superhero / Sci-Fantasy
      superhero: {
        energy_gauntlets: {},
        repulsor_weapons: {},
        meta_tech_firearms: {},
        dimensional_disruptors: {},
        anti_mutant_weapons: {}
      }
    }
  }
};
