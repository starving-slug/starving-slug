import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { SessionService } from '../../../utils';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../utils/apiService';
import { SearchPageComponent } from '../../pages/search-page/search-page.component';
import { Recipe } from '../../../models/recipe.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  testlogin: boolean = false;

  private sub: any;

  private myClientId = environment.GClientId;
  private _user = null;
  private _path = '';

  get onSearch() {
    const regx = /search/;

    console.log(regx.test(this._path));
      return /search/.test(this._path);
  }
  // @Input() set user(user) {
  //   console.log(user);
  //   this._user = user;
  // };

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
       this.session.signedIn$.subscribe((user) => {
         this._user = user;
       })
       router.events.subscribe((nav) => {
         if (nav instanceof NavigationEnd) {
           this._path = nav.urlAfterRedirects;
         }
       })
  }

  ngOnInit() {
  }

  signIn(event: any) {
    this.session.signIn(event)
  }

  signOut() {
    console.log('Sign out');
    this.session.signOut();
  }

  onSubmit(form: NgForm) {
      console.log('onSubmit() called');
      this.search = JSON.stringify(form.value);
      let searchField = JSON.parse(this.search);
      this.router.navigate(['/search'], {queryParams: {name: searchField.name}});
  }
}
