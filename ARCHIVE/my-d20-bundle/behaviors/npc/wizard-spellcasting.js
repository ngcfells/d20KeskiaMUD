'use strict';

const { validateSpellForWizard } = require('../../data/rules/wizard_spell_validator');

function getAvailableSlots(player, level, spell, state) {
  const klassId = player.getMeta('class');
  const klass = state.ClassManager.get(klassId);
  if (!klass || !klass.config || !klass.config.spellcasting) return 0;

  const table = klass.config.spellcasting.spellSlots;
  const charLevel = player.getMeta('level') || 1;

  let slots = (table[charLevel] && table[charLevel][level]) || 0;

  const school = player.getMeta('wizardSchool');
  if (school && spell && spell.school === school) {
    slots += 1;
  }

  return slots;
}

module.exports = {
  listeners: {
    playerEnter: state => function () {
      if (this.getMeta('class') !== 'wizard') return;

      if (!this.getMeta('spellbook')) this.setMeta('spellbook', {});
      if (!this.getMeta('preparedSpells')) this.setMeta('preparedSpells', {});
    },

    /**
     * LIANG CHOU INTEGRATION: Spell Parrying
     * Intercepts targeted spells if the wizard has the Jian and Martial Training.
     */
    onSpellTargeted: state => function (incomingSpell, result) {
      const feats = this.getMeta('feats') || [];
      const hasJian = this.isEquipped('liang_jian');
      const isMartial = feats.includes('martial_training_jian');

      if (hasJian && isMartial && Math.random() > 0.6) {
        this.say("<blue>With a fluid, circular flourish of your jian, you slice through the incoming threads of magic.</blue>");
        this.room.broadcastExcept(this, `<blue>${this.name} carves a shimmering arc with their blade, severing the energy of ${incomingSpell.name} before it can take hold.</blue>`);
        
        // This flag informs the spellcasting engine to abort
        result.cancel = true; 
      }
    },

    command: state => function (commandName, args) {
      if (this.getMeta('class') !== 'wizard') return;

      if (commandName === 'addspell') {
        const [levelStr, spellIdRaw] = args.split(' ');
        const level = parseInt(levelStr, 10);
        const spellId = (spellIdRaw || '').trim();

        if (Number.isNaN(level) || !spellId) {
          return this.say('Usage: addspell <level> <spell_id>');
        }

        const spell = state.SpellManager.get(spellId);
        if (!spell) return this.say('No such spell exists.');

        if (!validateSpellForWizard(this, spell)) {
          return this.say('<red>You cannot learn that spell.</red>');
        }

        const spellbook = this.getMeta('spellbook');
        if (!spellbook[level]) spellbook[level] = [];

        if (!spellbook[level].includes(spellId)) {
          spellbook[level].push(spellId);
          this.say(`<green>Added ${spellId} to your spellbook.</green>`);
        } else {
          this.say('You already know that spell.');
        }

        this.setMeta('spellbook', spellbook);
      }

      if (commandName === 'prepare') {
        const [levelStr, spellIdRaw] = args.split(' ');
        const level = parseInt(levelStr, 10);
        const spellId = (spellIdRaw || '').trim();

        if (Number.isNaN(level) || !spellId) {
          return this.say('Usage: prepare <level> <spell_id>');
        }

        const spellbook = this.getMeta('spellbook');
        if (!spellbook[level] || !spellbook[level].includes(spellId)) {
          return this.say('You do not know that spell.');
        }

        const spell = state.SpellManager.get(spellId);
        if (!spell) return this.say('No such spell exists.');

        if (!validateSpellForWizard(this, spell)) {
          return this.say('<red>You cannot prepare that spell.</red>');
        }

        const prepared = this.getMeta('preparedSpells');
        if (!prepared[level]) prepared[level] = [];

        const available = getAvailableSlots(this, level, spell, state);
        const alreadyPrepared = prepared[level].length;

        if (alreadyPrepared >= available) {
          return this.say(`You cannot prepare more level ${level} spells.`);
        }

        prepared[level].push(spellId);
        this.setMeta('preparedSpells', prepared);

        this.say(`<cyan>You prepare ${spellId}.</cyan>`);
      }

      if (commandName === 'cast') {
        const spellId = args.trim();
        if (!spellId) return this.say('Usage: cast <spell_id>');

        const prepared = this.getMeta('preparedSpells');
        let foundLevel = null;

        for (const lvl in prepared) {
          if (prepared[lvl].includes(spellId)) {
            foundLevel = parseInt(lvl, 10);
            break;
          }
        }

        if (foundLevel === null) {
          return this.say('You have not prepared that spell.');
        }

        const spell = state.SpellManager.get(spellId);
        if (!spell) return this.say('No such spell exists.');

        if (!validateSpellForWizard(this, spell)) {
          return this.say('<red>You cannot cast that spell.</red>');
        }

        // --- LIANG CHOU INTEGRATION: NETHERESE QUICKENING ---
        const feats = this.getMeta('feats') || [];
        const isNetherese = feats.includes('netherese_arcanist_tradition');
        const charLevel = this.getMeta('level') || 1;

        if (isNetherese && charLevel >= 20 && foundLevel <= 3) {
           this.say("<white>[Netherese Quickening] The weave bends to your haste.</white>");
           // Swift action logic: In a MUD, this allows casting without interrupting the combat swing timer
           this.emit('swiftActionUsed'); 
        }

        prepared[foundLevel] = prepared[foundLevel].filter(s => s !== spellId);
        this.setMeta('preparedSpells', prepared);

        this.say(`<magenta>You cast ${spell.name}!</magenta>`);
        spell.run(state, this);
      }

      if (commandName === 'spellbook') {
        const spellbook = this.getMeta('spellbook');
        this.say('<cyan>Your spellbook:</cyan>');
        for (const lvl of Object.keys(spellbook).sort((a, b) => a - b)) {
          this.say(`  Level ${lvl}: ${spellbook[lvl].join(', ')}`);
        }
      }

      if (commandName === 'prepared') {
        const prepared = this.getMeta('preparedSpells');
        this.say('<cyan>Your prepared spells:</cyan>');
        for (const lvl of Object.keys(prepared).sort((a, b) => a - b)) {
          this.say(`  Level ${lvl}: ${prepared[lvl].join(', ')}`);
        }
      }
    },

    rest: state => function () {
      if (this.getMeta('class') !== 'wizard') return;

      this.setMeta('preparedSpells', {});
      this.say('<yellow>You rest and clear your mind of prepared spells.</yellow>');
    }
  }
};
