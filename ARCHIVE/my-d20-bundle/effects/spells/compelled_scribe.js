'use strict';

/**
 * Compelled Scribe Effect
 * ----------------------
 * Forces the target to generate 'Knowledge Scrolls'.
 * While active, the target is 'Entranced' (Stage 1 Charm family).
 */
module.exports = {
  config: {
    name: "Compelled Indexing",
    description: "You are compelled to transcribe your knowledge for the Liang archive.",
    type: "condition",
    family: "charm",
    tier: 1, // Entranced
    isMagical: true
  },
  state: {
      casterId: null,
      subject: '',
      pagesWritten: 0
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      target.addBehavior('immobilized');
      target.say("<white>You feel a clinical hand guiding your movements. You must write.</white>");
    },

    /**
     * Heartbeat: Every 1 minute, the target "transcribes" a page.
     */
    onTick: state => function () {
        this.state.pagesWritten++;
        const target = this.target;

        if (this.state.pagesWritten % 10 === 0) {
            // Generate a Knowledge Scroll every 10 ticks
            const scroll = state.ItemFactory.create(
                state.ItemManager.get('knowledge_scroll'),
                { metadata: { subject: this.state.subject, author: target.name } }
            );
            target.room.addItem(scroll);

            target.say("<grey>Your hand cramps as you finalize another scroll of " + this.state.subject + ".</grey>");
            target.room.broadcastExcept(target, `<grey>${target.name}'s quill scratches furiously against the parchment, their eyes never blinking.</grey>`);
        }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeBehavior('immobilized');
      target.say("<cyan>The silver fog in your mind clears. You drop the quill, your hand shaking from the forced labor.</cyan>");
    },

    /**
     * If the target is attacked, the compulsion breaks (standard Charm rule).
     */
    onDamage: state => function () {
        this.target.say("<yellow>The shock of pain shatters the indexing trance!</yellow>");
        this.remove();
    }
  }
};
