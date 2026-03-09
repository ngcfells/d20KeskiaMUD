/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/computer_use.js
 * PURPOSE: Umbrella skill definition for Computer Use with nested specialties.
 */

'use strict';

module.exports = {
  id: 'computer_use',
  name: 'Computer Use',
  ability: 'intelligence',
  hasSpecialties: true,

  specialties: {
    // --- MODERN COMPUTER USE ---
    basic_computing: {
      operating_systems: {},
      office_software: {},
      file_management: {}
    },

    networking: {
      lan: {},
      wan: {},
      wireless: {},
      routing: {},
      firewalls: {}
    },

    security_systems: {
      intrusion_detection: {},
      access_control: {},
      encryption_breaking: {},
      vulnerability_scanning: {}
    },

    encryption: {
      symmetric: {},
      asymmetric: {},
      hashing: {},
      cryptanalysis: {}
    },

    forensics: {
      data_recovery: {},
      log_analysis: {},
      malware_analysis: {}
    },

    // --- CYBERPUNK COMPUTER USE ---
    hacking: {
      brute_force: {},
      social_engineering: {},
      exploit_development: {},
      stealth_intrusion: {}
    },

    netrunning: {
      ice_bypass: {},
      system_infiltration: {},
      data_extraction: {},
      cybercombat: {},
      avatar_control: {}
    },

    black_ice_interaction: {
      evasion: {},
      counter_intrusion: {},
      trace_avoidance: {}
    },

    neural_interface: {
      direct_jack_in: {},
      sensory_overlay: {},
      neural_feedback_control: {}
    },

    // --- SCI-FI COMPUTER USE ---
    ai_interaction: {
      logic_protocols: {},
      personality_modules: {},
      override_commands: {}
    },

    starship_systems: {
      navigation_computers: {},
      targeting_systems: {},
      power_management: {},
      shield_control: {}
    },

    robotics_interface: {
      drone_control: {},
      android_programming: {},
      mech_ai: {}
    },

    quantum_computing: {
      qbit_manipulation: {},
      entanglement_networks: {},
      quantum_decryption: {}
    },

    // --- STAR WARS COMPUTER USE ---
    slicing: {
      imperial_systems: {},
      rebel_systems: {},
      corporate_systems: {},
      encrypted_holonet: {}
    },

    droid_programming: {
      behavior_modules: {},
      restraining_bolt_override: {},
      memory_core_access: {}
    },

    shipboard_systems: {
      astromech_interface: {},
      hyperdrive_control: {},
      targeting_matrix: {}
    },

    // --- POST-APOC COMPUTER USE ---
    scavenged_terminals: {
      prewar_os: {},
      corrupted_data: {},
      jury_rigged_interfaces: {}
    },

    radiation_damaged_systems: {
      data_salvage: {},
      hardware_repair: {},
      shielding_protocols: {}
    },

    wasteland_networks: {
      improvised_mesh: {},
      pirate_radio: {},
      bunker_comms: {}
    },

    // --- SUPERHERO COMPUTER USE ---
    technopathy: {
      remote_system_control: {},
      digital_sensing: {},
      machine_communication: {}
    },

    super_science_systems: {
      dimensional_computers: {},
      cosmic_databases: {},
      exotic_algorithms: {}
    },

    // --- NOIR COMPUTER USE ---
    cyber_forensics: {
      crime_scene_data: {},
      surveillance_systems: {},
      dark_web_tracking: {}
    },

    // --- CTHULHU / MYTHOS COMPUTER USE ---
    digital_occult: {
      anomalous_signals: {},
      forbidden_data: {},
      memetic_corruption: {}
    },

    mythos_system_interaction: {
      non_euclidean_code: {},
      eldritch_encryption: {},
      sanity_damaging_protocols: {}
    }
  }
};
