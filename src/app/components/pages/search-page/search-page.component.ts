import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

import { ApiService } from '../../../utils/apiService'
import { Recipe } from '../../../models/recipe.model'
import { HeaderComponent } from '../../nav/header/header.component'

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})


export class SearchPageComponent implements OnInit, OnDestroy {
    @ViewChild('f') searchFilter: NgForm;
    recipes: Recipe[] = [];
    private sub: any;
    name: string;

    constructor(private api: ApiService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        // subscribe to route and pull from the search q
        // console.log(this.route);
        this.sub = this.route.queryParams.subscribe(params => {
            this.api.getSearch(params['name']).subscribe((res) => {
                console.log(res);
            }, (err) => {
                console.error(err.message);
            });

        });
    }


    onSubmit() {
        this.api.getUser("shashank_odyssey").subscribe((res) => {
            console.log(res);
            // (parse the response?) depending on format it might need to be constructed into recipe objects
            // assign the parsed response to this.recipes
        }, (err) => {
            console.error(err.message);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
