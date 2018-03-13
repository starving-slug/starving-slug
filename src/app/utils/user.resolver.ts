import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './apiService';

import { User, Recipe } from '../models';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    let username = route.params['username'];
    console.log(`resolve ${username}`);
    return this.api.getUser(username);
  }
}
