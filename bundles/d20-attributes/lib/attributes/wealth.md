But if I buy 100 DC 10 items in a single go, is that not going to drop my welath even at Wealth 20?
In a standard d20 Modern Wealth system, no—and that’s exactly where it can feel "broken" or "gamey" in a MUD. By the book, if your Wealth is 20, any item with a DC of 10 or lower is considered "negligible cost." You could technically buy an infinite amount of them.
To make this work for a Multiversal MUD, we need to add Volume Scaling and Market Exhaustion.
1. The "Lot" Rule (Bulk Buying)
If you buy items in bulk, the Purchase DC increases based on the quantity.
1 Item: DC 10
A "Large Perk" (10 items): DC 10 + 2
A "Commercial Quantity" (100 items): DC 10 + 10 (Total DC 20)
Once the DC hits 15 or higher, any successful purchase reduces your Wealth by 1 point. If you buy 100 swords (DC 20), your Wealth will drop, even if you are a millionaire.
2. The "Wealth Drain" Threshold
We can automate the "Wealth Drop" in your engine logic. In the d20 framework:
If Purchase DC > Current Wealth: Wealth drops by 1d6. (You went into debt/liquidation).
If Purchase DC is 15+: Wealth drops by 1. (Significant expense).
If Purchase DC < Current Wealth: No drop. (Pocket change).
3. Market Fatigue (The MUD "Sponge")
In a MUD, players love to exploit systems. You can implement Regional Market Exhaustion:
If a player buys 100 DC 10 items in a single "Zone," the Purchase DC for that item in that zone ticks up by +1 for every 10 bought.
This represents Supply and Demand. You aren't just spending money; you are literally emptying the local market's stock, driving prices up until it's no longer "pocket change."
4. How "Assets" Protect You
If your Wealth drops because you bought a fleet of 100 speeders, your Liquidity is gone, but your Total Net Worth is technically the same.
In the MUD, these 100 speeders are Physical Assets.
You can "Liquidate" or sell them later to restore your Wealth attribute.
The "Shopping Spree" Logic for your Engine:
javascript
function processPurchase(character, itemDC, quantity) {
  let finalDC = itemDC + Math.floor(Math.sqrt(quantity)); // Scale DC by volume
  let currentWealth = character.getAttribute('wealth');

  if (finalDC >= 15 || finalDC > currentWealth) {
     // Trigger Wealth Reduction logic
     character.setAttribute('wealth', currentWealth - 1);
     return "Purchase successful, but your credit takes a hit.";
  }
  
  return "Purchase successful. Negligible cost.";
}
Use code with caution.

This way, being "Rich" (High Wealth) means you don't have to micromanage copper pieces for a meal or a night at the inn, but you cannot buy out an entire armory without becoming "Cash Poor."
