'use strict';

module.exports = {
  config: {
    name: "Stolen Vitality",
    type: "buff",
    hidden: false,
    unique: false // Multiple hits can stack temp HP per d20 rules? 
                  // Note: Usually, only the highest applies, but we'll stick to a simple stack for now.
  },
  modifiers: {
    attributes: {
      // Mapping to 'shielding' or a custom 'tempHealth' attribute in your engine
      health: (current) => current + (this.state.amount || 0)
    }
  }
};
