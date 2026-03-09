'use strict';

class RecipeEngine {
  constructor(state) {
    this.state = state;
    this.recipes = new Map();
  }

  register(recipe) {
    this.recipes.set(recipe.id, recipe);
  }

  get(id) {
    return this.recipes.get(id);
  }

  /**
   * Attempt to craft an item.
   */
  craft(player, recipeId) {
    const recipe = this.get(recipeId);
    if (!recipe) {
      return { success: false, message: 'Unknown recipe.' };
    }

    // Check workstation
    if (recipe.workstation && !player.room.hasWorkstation(recipe.workstation)) {
      return { success: false, message: `Requires workstation: ${recipe.workstation}` };
    }

    // Check tools
    if (recipe.tools) {
      for (const tool of recipe.tools) {
        if (!player.hasItem(tool)) {
          return { success: false, message: `Missing tool: ${tool}` };
        }
      }
    }

    // Check materials
    for (const mat of recipe.materials) {
      if (!player.hasItem(mat.id, mat.qty)) {
        return { success: false, message: `Missing material: ${mat.id}` };
      }
    }

    // Skill check
    const skillCheck = this.state.SkillCheck;
    const result = skillCheck.check(
      player,
      recipe.skill.id,
      recipe.skill.specialty,
      recipe.dc
    );

    if (!result.success) {
      return { success: false, message: 'Crafting failed.', roll: result };
    }

    // Consume materials
    for (const mat of recipe.materials) {
      player.removeItem(mat.id, mat.qty);
    }

    // Create output
    const item = this.state.ItemFactory.create(recipe.output);
    player.addItem(item);

    return { success: true, message: 'Crafting successful!', item, roll: result };
  }
}

module.exports = RecipeEngine;
