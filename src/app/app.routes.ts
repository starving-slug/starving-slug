import {Routes, RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';

import { LandingPageComponent, LoginComponent } from './components/pages/'

export const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: '',
				component: LandingPageComponent
			}
		]
	}
]