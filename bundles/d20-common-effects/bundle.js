'use strict';

module.exports = {
  name: 'd20-common-effects',

  requires: [
    // Optional dependencies — modular design
    'd20-traits',
    'lifecycle',
    'decay'
  ],

  init: state => {
    console.log('d20-common-effects bundle loaded.');
  }
};
