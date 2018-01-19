import {Routes, RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';

import { LandingPageComponent } from './components/pages/'

export const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent
	}
]