'use strict';

module.exports = {
  config: {
    name: "Cryptic Transcription",
    description: "You are currently drafting a phantasmal cipher.",
    type: "buff",
    hidden: true,
    duration: 3600000
  },
  state: { wordLimit: 12, creatorUuid: null },
  listeners: {
    // Triggered by your MUD's 'write' or 'note' system
    onTextEntry(item, text) {
      item.setMeta('isCryptic', true);
      item.setMeta('originalText', text);
      item.setMeta('crypticCreator', this.state.creatorUuid);
      
      // The visual description for everyone else
      item.description = "A chaotic jumble of overlapping runes and nonsensical glyphs.";
      this.target.say("<green>The ink shimmers, then locks into a cryptic phantasm.</green>");
      this.remove();
    }
  }
};
