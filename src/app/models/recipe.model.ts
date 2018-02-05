
export interface RecipeItem {
  name: string,
  author: string,
  description: string,
  photo: string,
  ingredients: Object[],
  tags: Object[],
  directions: string[],
  recipe_id: number;
}

export class Recipe implements RecipeItem {
  public name: string;
  public author: string;
  public description: string;
  public photo: string;
  public recipe_id: number;

  public ingredients: Object[];
  public directions: string[];
  public tags: Object[];

  constructor(recipe?) {
    if(recipe) {
      this.name = recipe.name;
      this.author = recipe.author;
      this.description = recipe.description;
    this.photo = recipe.photo;
      this.recipe_id = recipe.recipe_id;
      this.ingredients = recipe.ingredients;
      this.directions = recipe.directions;
      this.tags = recipe.tags;
    }
  }
}
