import { Recipe } from "./";

export interface UserItem {
  email: string,
  name: string,
  description: string,
  photo: string, // url
  recipes: Recipe[],
  likes: Object[],
  friends: string[],
  comments: Object[]
}

export class User {
  public email: string;
  public name: string;
  public description: string;
  public photo: string;
  public recipes: Recipe[];
  public likes: Object[];
  public friends: string[];
  public comments: Object[];

  constructor (user?) {
    if (user) {
      this.email = user.email;
      this.name = user.name;
      this.description = user.description;
      this.photo = user.photo;
      this.recipes = user.recipes;
      this.likes = user.likes;
      this.friends = user.friends;
      this.comments = user.comments;
    }
  }
}
