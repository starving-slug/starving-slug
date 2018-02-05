import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';


import { Recipe } from '../models';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe {
    let recipe = new Recipe({
      name: 'Knuckle Sandwich',
      author: 'AngelHairFoods',
      description: 'An old Bungleburg classic, this sandwich was popular during the late 80s',
      photo: '../../../../assets/photos/logo.png',
      recipe_id: '12345',
      ingredients: [
        {
          amount: '2',
          text: 'slices of bread'
        },
        {
          amount: '1.5',
          text: 'tablespoons of barbeque sauce'
        },
        {
          amount: '5',
          text: 'knuckles'
        },
        {
          amount: '1',
          text: 'cup of cheese'
        },
        {
          amount: '',
          text: 'Pinch of salt'
        }
      ],
      directions: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Cook',
        'Eat'
      ],    
      tags: [
        {
          text: 'Sandwich',
          path: '/search/sandwich'
        },
        {
          text: 'Meat',
          path: '/search/meat'
        }
      ]

    });
    return recipe;
  }
}
