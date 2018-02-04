
export interface RecipeItem {
  name: string,
  author: string,
  description: string,
  ingredients: string[],
  tags: string[],
  directions: string[],
  recipe_id: number;
}

export class Recipe implements RecipeItem {
  public name: string;
  public author: string;
  public description: string;
  public recipe_id: number;

  public ingredients: string[];
  public directions: string[];
  public tags: string[];

  constructor(recipe?) {
    if(recipe) {
      this.name = recipe.name;
      this.author = recipe.author;
      this.description = recipe.description;
      this.recipe_id = recipe.recipe_id;
      this.ingredients = recipe.ingredients;
      this.directions = recipe.directions;
      this.tags = recipe.tags;
    }
  }
}
