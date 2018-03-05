import { Injectable } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { BehaviorSubject } from 'rxjs'

import { ApiService } from './apiService';

@Injectable()
export class SessionService {

  private _signedIn: boolean;
  signedIn$: BehaviorSubject<any>;

  constructor() {
    this.signedIn$ = new BehaviorSubject(null);
  }

  signIn(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;

    // console.log('ID: ' +
    //   profile
    //     .getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    this.signedIn$.next({name: profile.getName, id_token: id_token});
  }

  signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('Signed out');
      this.signedIn$.next(null);
    })
  }
}
