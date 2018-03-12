import {Routes, RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';

import { UserResolver } from './utils';
import { RecipeResolver } from './utils';

// Import page components
import { LandingPageComponent, LoginComponent, SignupComponent, ProfilePageComponent, RecipePageComponent, RecipeFormComponent, SearchPageComponent, AboutPageComponent } from './components/pages/';

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
				path: 'search',
				component: SearchPageComponent
			},
			{
				path: 'about',
				component: AboutPageComponent
			},
			{
				path: 'user/:username',
				component: ProfilePageComponent,
				resolve: {
					user: UserResolver
				}
			},
			{
				path: 'recipe/create',
				component: RecipeFormComponent
			},
			{
				path: 'recipe/:id',
				component: RecipePageComponent,
				resolve: {
					recipe: RecipeResolver
				}
			},
			{
				path: '',
				component: LandingPageComponent
			}
		]
	}
]
