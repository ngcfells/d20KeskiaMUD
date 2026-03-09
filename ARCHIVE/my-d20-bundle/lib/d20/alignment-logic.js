'use strict';

/**
 * D20 Alignment Grid (0-100 scale)
 * 0-30: Evil / Chaos
 * 31-69: Neutral
 * 70-100: Good / Law
 */
module.exports = {
  getAlignmentString(order, morality) {
    let o = 'neutral';
    if (order >= 70) o = 'lawful';
    else if (order <= 30) o = 'chaotic';

    let m = 'neutral';
    if (morality >= 70) m = 'good';
    else if (morality <= 30) m = 'evil';

    if (o === 'neutral' && m === 'neutral') return 'true_neutral';
    return `${o}_${m}`;
  },

  /**
   * Helper to shift values and check for class "fall"
   */
  shift(player, orderChange, moralityChange, state) {
    const currentOrder = player.getMeta('alignment_order') || 50;
    const currentMorality = player.getMeta('alignment_morality') || 50;

    const newOrder = Math.min(100, Math.max(0, currentOrder + orderChange));
    const newMorality = Math.min(100, Math.max(0, currentMorality + moralityChange));

    player.setMeta('alignment_order', newOrder);
    player.setMeta('alignment_morality', newMorality);

    const newAlign = this.getAlignmentString(newOrder, newMorality);
    const oldAlign = player.getMeta('alignment');

    if (newAlign !== oldAlign) {
      player.setMeta('alignment', newAlign);
      player.say(`\r\n<yellow>Your soul shifts. Your new alignment is: ${newAlign.replace('_', ' ')}.</yellow>`);
      
      // Trigger purity check for Monks/Paladins
      const Atonement = require('./atonement');
      Atonement.checkPurity(player, state);
    }
  }
};
