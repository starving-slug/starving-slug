import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { GoogleSignInComponent } from 'angular-google-signin';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/nav';
import { LandingPageComponent } from './components/pages';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { RecipePageComponent } from './components/pages/recipe-page/recipe-page.component';
import { RecipeCardComponent } from './components/ui/recipe-card/recipe-card.component';

import { Recipe } from './models/recipe.model';
import { User } from './models/user.model';
import { UserResolver } from './utils';
import { RecipeResolver } from './utils';

@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInComponent,
    HeaderComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    ProfilePageComponent,
    RecipeCardComponent,
    RecipePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [
    UserResolver,
    RecipeResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
