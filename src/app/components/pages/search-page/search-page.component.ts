import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

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
        console.log("init");
        console.log(this.route.queryParams);
        this.recipes = [];
        this.sub = this.route.queryParams.subscribe(params => {
            this.api.getFilter(params['name'], params['author'], params['tag']).subscribe((res) => {
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

      this.api.getFilter(this.searchFilter.value.name, this.searchFilter.value.author, this.searchFilter.value.tag).subscribe((res) => {
         res.forEach((recipe) => {
           this.recipes.push(new Recipe(recipe));
         });
       });       
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
