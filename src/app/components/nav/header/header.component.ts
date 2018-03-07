import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { environment } from '../../../../environments/environment';

import { SessionService } from '../../../utils';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../utils/apiService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private myClientId = environment.GClientId;
  private _user = null;

  @Input() set user(user) {
    console.log(user);
    this._user = user;
  };

  get user() {
    return this._user;
  };

  get activeSession() {
    console.log(this._user !== null);
    return this._user !== null;
  }

  constructor(private api: ApiService, private session: SessionService) {
    console.log(environment)
  }

  ngOnInit() {
  }

  // signIn(event: GoogleSignInSuccess) {
  //   let googleUser: gapi.auth2.GoogleUser = event.googleUser;
  //   let id: string = googleUser.getId();
  //   let id_token = googleUser.getAuthResponse().id_token;
  //
  //   let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
  //   console.log(profile);
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   this.api.signIn(profile.getName(), id_token);
  // }

  signIn(event: any) {
    this.session.signIn(event)
  }

  signOut() {
    console.log('Sign out');
    this.session.signOut();
  }

  // onGoogleSignInSuccess(event: GoogleSignInSuccess) {
  //   let googleUser: gapi.auth2.GoogleUser = event.googleUser;
  //   let id: string = googleUser.getId();
  //   let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
  //   console.log('ID: ' +
  //     profile
  //       .getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  // }
  //
  // signOut() {
  //   let auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(() => {
  //     console.log('Signed out');
  //   })
  // }

}
