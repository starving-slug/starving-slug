import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { SessionService } from '../../../utils';
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
  onHome: boolean = true;
  private sub: any;

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
    return this._user !== null;
  }

  search = '';

  constructor(private api: ApiService,
              private router: Router,
              private session: SessionService,
              private route: ActivatedRoute) {
       console.log(environment)
  }

  ngOnInit() {
  }

  homePage(){
      this.onHome = true;
  }

  signOut() {
    console.log('Sign out');
    this.session.signOut();
  }

  onSubmit(form: NgForm) {
      this.onHome = false;
      this.search = JSON.stringify(form.value);
      let searchField = JSON.parse(this.search);
      this.router.navigate(['/search'], {queryParams: {name: searchField.name}});
  }
}
