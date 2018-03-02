import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GoogleSignInSuccess } from 'angular-google-signin';
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

  constructor(private api: ApiService) {
    console.log(environment)
  }

  ngOnInit() {
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let id_token = googleUser.getAuthResponse().id_token;

    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log(profile);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    this.api.signIn(profile.getName(), id_token);
  }

}
