import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './apiService';

import { Recipe } from '../models';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> {
    let id = route.params['id'];
    return this.api.getRecipe(id);
  }
}
