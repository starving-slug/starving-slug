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
    // let user = new User({
    //   email: 'angelica@food.site',
    //   name: 'AngelHairFoods',
    //   description: 'Like, whatever',
    //   photo: '../../../../assets/photos/dog.png',
    //   recipes: [
    //     new Recipe ({
    //       name: 'Barbeque Bat Eyeball',
    //       author: 'AngelHairFoods',
    //       description: 'This tasty dish from Western Fanglovia is a succulent mix of savory and fruity'
    //     }),
    //     new Recipe ({
    //       name: 'Shrieking Pancake',
    //       author: 'AngelHairFoods',
    //       description: 'Don\'t let the name fool you, this delectible recipe has no equal'
    //     }),
    //     new Recipe ({
    //       name: 'Knuckle Sandwich',
    //       author: 'AngelHairFoods',
    //        description: 'An old Bungleburg classic, this sandwich was popular during the late 80s'
    //     })
    //   ],
    //   likes: [
    //     {
    //       text: 'Braised Ork Shoulder',
    //       path: '/recipe/11223344'
    //     },
    //     {
    //       text: 'Raised Quark Holder',
    //       path: '/recipe/22334455'
    //     }
    //   ],
    //   friends: [
    //     'GroateDairy',
    //     'ArthurBrassicaCabal',
    //     'EnriqueBallyhoo'
    //   ]
    //
    // });
    // return user;
  }
}
