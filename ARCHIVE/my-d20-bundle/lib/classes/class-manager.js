'use strict';

class ClassManager {
  constructor() {
    this.classes = new Map();
  }

  add(id, config) {
    this.classes.set(id, config);
  }

  get(id) {
    return this.classes.get(id);
  }

  all() {
    return Array.from(this.classes.values());
  }
}

module.exports = ClassManager;
