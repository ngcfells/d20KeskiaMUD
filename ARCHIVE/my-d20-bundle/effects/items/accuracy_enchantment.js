'use strict';
module.exports = {
  config: {
    name: "Accurate",
    type: "item_buff",
    duration: 6000
  },
  modifiers: {
    itemAttributes: {
      // Logic: Range increment is doubled. In d20, this reduces penalty.
      rangeIncrement: (curr) => curr * 2
    }
  }
};
