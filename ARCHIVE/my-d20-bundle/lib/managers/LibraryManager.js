'use strict';

class LibraryManager {
  constructor(state) {
    this.state = state;

    this.globalObjects = new Map();
    this.personalLibraries = new Map();

    // playerId:objectId -> decipher state
    this.decipherState = new Map();
  }

  _stateKey(player, objectId) {
    return `${player.id}:${objectId}`;
  }

  _initState(player, objectId) {
    const key = this._stateKey(player, objectId);
    if (!this.decipherState.has(key)) {
      this.decipherState.set(key, {
        recognized: false,
        deciphered: false,
        usable: false,
        progress: 0,
        misinterpretations: []
      });
    }
    return this.decipherState.get(key);
  }

  getState(player, objectId) {
    return this._initState(player, objectId);
  }

  isDeciphered(player, objectId) {
    return this._initState(player, objectId).deciphered === true;
  }

  markDeciphered(player, objectId, usable = false) {
    const state = this._initState(player, objectId);
    state.deciphered = true;
    state.recognized = true;
    if (usable) state.usable = true;
  }

  // ───────────────────────────────────────────────
  //  LANGUAGE EXPOSURE HOOK
  // ───────────────────────────────────────────────
  _gainLanguageExposure(player, languageId, amount) {
    if (!this.state.LanguageManager) return;
    if (!languageId) return;
    this.state.LanguageManager.gainExposure(player, languageId, amount);
  }

  // ───────────────────────────────────────────────
  //  DECIPHER ATTEMPT
  // ───────────────────────────────────────────────
  attemptDecipher(player, objectId, options = {}) {
    const obj = this.getObject(objectId);
    if (!obj) {
      player.say('You cannot find that text.');
      return false;
    }

    const state = this._initState(player, objectId);

    const isMagical = obj.magical ||
      ['spellbook', 'grimoire', 'scroll'].includes(obj.type);

    const dc = this._getDC(obj, options);
    let roll = 0;
    let total = 0;

    // ───────────────────────────────────────────────
    //  MAGICAL TEXT → SPELLCRAFT
    // ───────────────────────────────────────────────
    if (isMagical) {
      const spellcraft = player.getSkill && player.getSkill('Spellcraft');
      if (!spellcraft) {
        player.say('You lack the Spellcraft skill.');
        return false;
      }

      const result = spellcraft.check(dc);
      roll = result.roll || 0;
      total = result.total || roll;
    }

    // ───────────────────────────────────────────────
    //  NON-MAGICAL TEXT → LINGUISTICS
    // ───────────────────────────────────────────────
    else {
      if (!this.state.SkillManager) {
        player.say('Linguistic analysis is not available.');
        return false;
      }

      const languageId = obj.languageId || obj.language || null;
      const scriptId = obj.script || null;

      const result = this.state.SkillManager.executeSkillCheck(
        'linguistics',
        player,
        dc,
        languageId,
        scriptId
      );

      roll = result.roll;
      total = result.total;
    }

    // ───────────────────────────────────────────────
    //  LANGUAGE EXPOSURE
    // ───────────────────────────────────────────────
    if (obj.languageId || obj.language) {
      this._gainLanguageExposure(player, obj.languageId || obj.language, 2);
    }

    if (obj.languagesContained) {
      for (const lang of obj.languagesContained) {
        const id = lang.id || lang.name;
        const mod = 1 / (lang.difficulty || 1);
        this._gainLanguageExposure(player, id, 2 * mod);
      }
    }

    // ───────────────────────────────────────────────
    //  PARTIAL SUCCESS
    // ───────────────────────────────────────────────
    if (total >= dc - 3 && total < dc) {
      state.progress += 50;
      state.recognized = true;

      if (state.progress >= 100) {
        state.deciphered = true;
        player.say(`<green>You fully decipher ${obj.title}.</green>`);
      } else {
        player.say(`<yellow>You make partial progress deciphering ${obj.title}.</yellow>`);
      }

      return true;
    }

    // ───────────────────────────────────────────────
    //  SUCCESS
    // ───────────────────────────────────────────────
    if (total >= dc) {
      state.progress = 100;
      state.deciphered = true;
      state.recognized = true;

      player.say(`<green>You decipher ${obj.title}.</green>`);
      return true;
    }

    // ───────────────────────────────────────────────
    //  MISINTERPRETATION
    // ───────────────────────────────────────────────
    if (total <= dc - 5) {
      state.misinterpretations.push(Date.now());
      state.progress = Math.max(0, state.progress - 25);

      player.say(`<red>You misinterpret the text. Your understanding becomes muddled.</red>`);
      return false;
    }

    // ───────────────────────────────────────────────
    //  FAILURE
    // ───────────────────────────────────────────────
    player.say(`<red>You fail to decipher ${obj.title}.</red>`);
    return false;
  }

  // ───────────────────────────────────────────────
  //  TIME-BASED STUDY
  // ───────────────────────────────────────────────
  timeStudy(player, objectId, hours) {
    const obj = this.getObject(objectId);
    if (!obj) {
      player.say('You cannot find that text.');
      return;
    }

    const state = this._initState(player, objectId);
    const required = this._studyHours(obj);

    state.progress += (hours / required) * 100;

    if (obj.languageId || obj.language) {
      this._gainLanguageExposure(player, obj.languageId || obj.language, hours);
    }

    if (obj.languagesContained) {
      for (const lang of obj.languagesContained) {
        const id = lang.id || lang.name;
        const mod = 1 / (lang.difficulty || 1);
        this._gainLanguageExposure(player, id, hours * mod);
      }
    }

    if (state.progress >= 100) {
      state.deciphered = true;
      state.recognized = true;
      player.say(`<green>You decipher ${obj.title} through extended study.</green>`);
    } else {
      player.say(`<yellow>You make progress studying ${obj.title}.</yellow>`);
    }
  }

  // ───────────────────────────────────────────────
  //  MISINTERPRETATION CORRECTION
  // ───────────────────────────────────────────────
  correctMisinterpretation(player, objectId, strength = 1) {
    const state = this._initState(player, objectId);

    for (let i = 0; i < strength; i++) {
      if (state.misinterpretations.length > 0) {
        state.misinterpretations.pop();
      }
    }
  }

  // ───────────────────────────────────────────────
  //  DC + TIME CALCULATION
  // ───────────────────────────────────────────────
  _getDC(obj, options) {
    if (obj.type === 'spellbook' || obj.type === 'grimoire') {
      return 20 + (options.spellLevel || 0);
    }
    if (obj.type === 'scroll') {
      return 20 + (options.spellLevel || 0);
    }

    switch (options.difficulty) {
      case 'simple': return 10;
      case 'obscure': return 15;
      case 'ancient': return 20;
      case 'dead_language': return 25;
      case 'ciphered': return 28;
    }

    return 20;
  }

  _studyHours(obj) {
    if (obj.type === 'spellbook' || obj.type === 'grimoire') return 8;
    if (obj.type === 'tablet') return 6;
    if (obj.type === 'encyclopedia') return 12;
    return 4;
  }

  // ───────────────────────────────────────────────
  //  OBJECT MANAGEMENT
  // ───────────────────────────────────────────────
  addGlobalObject(obj) {
    this.globalObjects.set(obj.id, obj);
  }

  getObject(id) {
    return this.globalObjects.get(id) || null;
  }
}

module.exports = LibraryManager;
