import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SessionService } from '../../../utils';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../utils/apiService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  testlogin: boolean = false;
  private myClientId = environment.GClientId;
  private _status: boolean = false;

  constructor(private api: ApiService, private session: SessionService) {
    console.log(environment)
    this.session.signIn$.subscribe((user) => {
      if(user) {
        // this.api.signIn(user.username, user.id_token)
        this._status = true;
      } else {
        this._status = false;
      }
    })
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
