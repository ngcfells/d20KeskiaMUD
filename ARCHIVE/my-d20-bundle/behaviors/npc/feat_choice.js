// bundles/my-d20-bundle/behaviors/npc/feat_choice.js
'use strict';

const { wizardBonusFeats } = require('../../data/feats/wizard_bonus_feats');
const { canLearnFeat } = require('../../data/rules/feat_prereqs');

module.exports = {
  listeners: {
    levelUp: state => function (newLevel) {
      if (this.getMeta('class') !== 'wizard') return;

      const bonusLevels = [5, 10, 15, 20];
      if (!bonusLevels.includes(newLevel)) return;

      if (this.getMeta(`wizard_bonus_feat_${newLevel}`)) return;

      this.say('<cyan>You have earned a Wizard Bonus Feat!</cyan>');
      this.say(`Available feats: ${wizardBonusFeats.join(', ')}`);

      this.setMeta('awaitingWizardBonusFeat', newLevel);
    },

    command: state => function (commandName, args) {
      if (commandName !== 'choosefeat') return;

      const pending = this.getMeta('awaitingWizardBonusFeat');
      if (!pending) {
        return this.say('You are not currently choosing a bonus feat.');
      }

      const choice = args.trim().toLowerCase();
      if (!wizardBonusFeats.includes(choice)) {
        return this.say(`Invalid feat. Valid options: ${wizardBonusFeats.join(', ')}`);
      }

      const feat = state.FeatManager.get(choice);
      if (!feat) {
        return this.say('That feat is not implemented.');
      }

      if (!canLearnFeat(state, this, feat)) {
        return this.say('<red>You do not meet the prerequisites for that feat.</red>');
      }

      this.setMeta(`wizard_bonus_feat_${pending}`, choice);
      this.unsetMeta('awaitingWizardBonusFeat');

      this.addFeat(choice);

      this.say(`<green>You have selected the bonus feat: ${choice}</green>`);
    }
  }
};
