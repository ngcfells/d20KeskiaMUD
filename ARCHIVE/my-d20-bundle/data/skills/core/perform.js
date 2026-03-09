/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/perform.js
 * PURPOSE: Umbrella skill definition for Perform with nested specialties.
 */

'use strict';

module.exports = {
  id: 'perform',
  name: 'Perform',
  ability: 'charisma',
  hasSpecialties: true,

  specialties: {
    // --- CLASSIC D20 PERFORM SKILLS ---
    string_instruments: {
      lute: {},
      violin: {},
      harp: {},
      guitar: {},
      bass: {}
    },

    wind_instruments: {
      flute: {},
      horn: {},
      clarinet: {},
      saxophone: {}
    },

    percussion: {
      drums: {},
      hand_drums: {},
      timpani: {},
      electronic_drums: {}
    },

    dance: {
      classical: {},
      folk: {},
      modern: {},
      acrobatic: {}
    },

    oratory: {
      storytelling: {},
      rhetoric: {},
      debate: {}
    },

    acting: {
      stage: {},
      film: {},
      improv: {}
    },

    comedy: {
      standup: {},
      slapstick: {},
      satire: {}
    },

    singing: {
      classical: {},
      choral: {},
      folk: {},
      rock: {},
      operatic: {}
    },

    // --- CYBERPUNK PERFORM SPECIALTIES ---
    cyberdance: {
      augmented: {},
      holo_dance: {},
      neural_synced: {}
    },

    synth_music: {
      synthwave: {},
      industrial: {},
      glitch: {},
      cyberpop: {}
    },

    street_performance: {
      busking: {},
      spoken_word: {},
      neon_juggling: {}
    },

    // --- SCI-FI PERFORM SPECIALTIES ---
    holo_performance: {
      holographic_theater: {},
      immersive_concerts: {},
      projection_art: {}
    },

    alien_music: {
      xenoinstruments: {},
      harmonic_resonance: {},
      telepathic_chant: {}
    },

    // --- STAR WARS PERFORM SPECIALTIES ---
    cantina_music: {
      jizz: {},          // Canon Star Wars music genre
      jatz: {},
      nalargon: {}
    },

    ceremonial_chant: {
      jedi_chant: {},
      sith_chant: {}
    },

    // --- CTHULHU / MYTHOS PERFORM SPECIALTIES ---
    ritual_chanting: {
      summoning: {},
      banishment: {},
      dream_rituals: {}
    },

    occult_performance: {
      esoteric_poetry: {},
      forbidden_recitals: {}
    },

    // --- NOIR PERFORM SPECIALTIES ---
    jazz: {
      trumpet: {},
      piano: {},
      sax: {},
      upright_bass: {}
    },

    lounge_act: {
      crooner: {},
      torch_singer: {}
    },

    // --- SUPERHERO PERFORM SPECIALTIES ---
    heroic_speeches: {
      rallying: {},
      intimidating: {},
      inspiring: {}
    },

    powered_performance: {
      pyrotechnic_display: {},
      sonic_projection: {},
      holographic_show: {}
    },

    // --- POST-APOC PERFORM SPECIALTIES ---
    wasteland_music: {
      scrap_instruments: {},
      drum_circles: {},
      raider_chants: {}
    },

    survival_storytelling: {
      campfire_tales: {},
      tribal_legends: {}
    }
  }
};
