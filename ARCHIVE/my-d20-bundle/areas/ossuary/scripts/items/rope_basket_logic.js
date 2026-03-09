// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\rope_basket_logic.js

module.exports = {
  listeners: {
    use: state => function (args, player) {
      if (target.includes('ball')) {
        player.say("<cyan>You secure the glass ball within the rope basket. It's now a sturdy lantern.</cyan>");
      
        // Remove both and give the new item
        state.ItemManager.remove(sphere);
        state.ItemManager.remove(this);
        const lantern = state.ItemManager.create(player.room.area, 'ossuary:rope_lantern');
        lantern.moveTo(player);
      }
    }
  }
};
