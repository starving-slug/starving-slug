import {Routes, RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';

// Import page components
import { LandingPageComponent, LoginComponent, SignupComponent, ProfilePageComponent } from './components/pages/'

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
				path: 'user',
				component: ProfilePageComponent
			},
			{
				path: '',
				component: LandingPageComponent
			}
		]
	}
]