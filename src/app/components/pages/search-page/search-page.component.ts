import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';


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

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router) {
        }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.api.getSearch(params['name']).subscribe((res) => {
                console.log(JSON.stringify(res, null, 4));
                for (let i = 0; i < res.length; i++) {
                    this.recipes.push(new Recipe(res[i]));
                }
            }, (err) => {
                console.error(err.message);
            });
        });
    }


    onSubmit() {
        this.recipes = [];
        this.router.navigate(['/search'],
            {
                queryParams: {
                        name: this.searchFilter.value.name,
                        author: this.searchFilter.value.author,
                        tag: this.searchFilter.value.tag
                    }
            });

            this.sub = this.route.queryParams.subscribe(params => {
                this.api.getFilter(params['name'],params['author'],params['tag']).subscribe((res) => {
                    for (let i = 0; i < res.length; i++) {
                        this.recipes.push(new Recipe(res[i]));
                    }
                }, (err) => {
                    console.error(err.message);
                });
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
