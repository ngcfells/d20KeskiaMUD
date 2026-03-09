'use strict';

/**
 * LanguageManager
 * ---------------
 * Canonical registry + per-player fluency tracking.
 * Supports: exposure, fluency, progress decay, and multi-setting language sets.
 */

class LanguageManager {
  constructor(state) {
    this.state = state;

    // languageId -> { id, name, family, script, rarity, settings }
    this.languages = new Map();

    // playerId:languageId -> { progress: 0–100, fluent: bool }
    this.progress = new Map();
  }

  // ───────────────────────────────────────────────
  //  REGISTRATION
  // ───────────────────────────────────────────────
  registerLanguage(lang) {
    if (!lang.id) throw new Error('Language must have an id');
    this.languages.set(lang.id, {
      family: null,
      script: null,
      rarity: 'common',
      settings: [],
      ...lang
    });
  }

  getLanguage(id) {
    return this.languages.get(id) || null;
  }

  getAllLanguages() {
    return Array.from(this.languages.values());
  }

  // ───────────────────────────────────────────────
  //  PLAYER PROGRESS
  // ───────────────────────────────────────────────
  _key(player, languageId) {
    return `${player.id}:${languageId}`;
  }

  getProgress(player, languageId) {
    const key = this._key(player, languageId);
    return this.progress.get(key) || { progress: 0, fluent: false };
  }

  isFluent(player, languageId) {
    return this.getProgress(player, languageId).fluent === true;
  }

  // ───────────────────────────────────────────────
  //  EXPOSURE + FLUENCY
  // ───────────────────────────────────────────────
  gainExposure(player, languageId, amount) {
    if (!languageId) return;
    const lang = this.getLanguage(languageId);
    if (!lang) return;

    const key = this._key(player, languageId);
    const entry = this.progress.get(key) || { progress: 0, fluent: false };
    if (entry.fluent) return;

    entry.progress += amount;

    if (entry.progress >= 100) {
      entry.progress = 100;
      entry.fluent = true;

      player.say(`<green>You have learned the ${lang.name} language.</green>`);

      if (player.learnLanguage) {
        player.learnLanguage(languageId);
      }
    }

    this.progress.set(key, entry);
  }

  loseProgress(player, languageId, amount) {
    const key = this._key(player, languageId);
    const entry = this.progress.get(key) || { progress: 0, fluent: false };
    entry.progress = Math.max(0, entry.progress - amount);
    this.progress.set(key, entry);
  }
}

module.exports = LanguageManager;
