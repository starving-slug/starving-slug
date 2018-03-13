import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './apiService';
import { StorageService } from './storageService';

@Injectable()
export class SessionService {

  private _signedIn: boolean;
  signedIn$: BehaviorSubject<any>;
  googleUser$: BehaviorSubject<any>;

  constructor(private api: ApiService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService) {
    this.signedIn$ = new BehaviorSubject(null);
    this.googleUser$ = new BehaviorSubject(null);
  }

  signIn(event: GoogleSignInSuccess) {
    console.log('Signing In');
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;

    this.api.signIn(profile, id_token).subscribe((res) => {
      let jwt = res['token'];
      console.log(jwt);

      if (jwt) {
        this.storage.saveToken(jwt);
        if (res['newLogin']) {
          console.log(this.route.snapshot);
          let prevRoute = this.route.snapshot;
          console.log('This is a first-time login!');
          this.ngZone.run(() => {this.router.navigate(['./signup']);};

          // save the current url
          // redirect to the signup page, pass the old url as a query or something
        }
        // save the returned JWT to localstorage
        let session = {
          username: profile.getName(),
          image: profile.getImageUrl(),
        }
        this.ngZone.run(() => {
          this.googleUser$.next(profile);
          this.signedIn$.next(session);
        });
      }


    }, (error) => {
      console.log(error.message);
    });

    // console.log('ID: ' +
    //   profile
    //     .getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
  }

  signOut() {
    console.log('Clicked sign out button')
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('Signed out');
      this.ngZone.run(() => {
        this.googleUser$.next(null);
        this.signedIn$.next(null);
      });
    })
  }
}
