import {Routes, RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';

import { UserResolver } from './utils';

// Import page components
import { LandingPageComponent, LoginComponent, SignupComponent, ProfilePageComponent, RecipePageComponent } from './components/pages/';

export const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'signup',
				component: SignupComponent
			},
			{
				path: 'user/:username',
				component: ProfilePageComponent,
				resolve: {
					user: UserResolver
				}
			},
			{
				path: 'recipe',
				component: RecipePageComponent
			},
			{
				path: '',
				component: LandingPageComponent
			}
		]
	}
]
