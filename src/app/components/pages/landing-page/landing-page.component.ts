import { Component, OnInit } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { ApiService } from '../../../utils/apiService';
import { SessionService } from '../../../utils';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  private myClientId = environment.GClientId;
  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  signIn(event: any) {
    this.session.signIn(event)
  }
}
