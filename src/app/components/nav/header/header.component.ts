import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../utils/apiService';
import { SearchPageComponent } from '../../pages/search-page/search-page.component'
import { Recipe } from '../../../models/recipe.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  testlogin: boolean = false;
  private sub: any;

  private myClientId = environment.GClientId;

  search = '';

  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
       console.log(environment)
  }

  ngOnInit() {
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
  }

  onSubmit(form: NgForm) {
      this.search = JSON.stringify(form.value);
      let searchField = JSON.parse(this.search);
      this.router.navigate(['/search'], {queryParams: {name: searchField.name}});
  }
}
