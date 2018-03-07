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
                for (let i = 0; i < res.length; i++) {
                    this.recipes.push(new Recipe(res[i]));
                }
            }, (err) => {
                console.error(err.message);
            });
        });
    }


    onSubmit() {
        // this.api.getUser("shashank_odyssey").subscribe((res) => {
        //     console.log(res);
        // }, (err) => {
        //     console.error(err.message);
        // });
        console.log(this.searchFilter.value.author);
        console.log(this.searchFilter.value.name);
        console.log(this.searchFilter.value.tag);

        this.router.navigate(['/search'],
            {
                queryParams: {
                        name: this.searchFilter.value.name,
                        author: this.searchFilter.value.author,
                        tag: this.searchFilter.value.tag
                    }
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    myFunction() {

}
}
