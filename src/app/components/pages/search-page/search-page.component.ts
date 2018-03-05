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

    constructor(private api: ApiService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        // subscribe to route and pull from the search q
        // console.log(this.route);
        this.sub = this.route.params.subscribe(params => {
            console.log("THIS IS THE PARAM!" + params['name']);
            //make api q
            //sub to api call
            //inside that update the list
            //angular subscriptions
            this.api.getUser(params['name']).subscribe((res) => {
                console.log(res);
                // (parse the response?) depending on format it might need to be constructed into recipe objects
                // assign the parsed response to this.recipes
            }, (err) => {
                console.error(err.message);
            });


            // this.recipes.push(new Recipe({
            //     name: "Test Title",
            //     author: "Mock Author",
            //     description: "Mock Description",
            //     photo: "https://images.encyclopediadramatica.rs/a/a0/Doritopods.jpg",
            //     ingredients: [
            //         {
            //             "amount": "2",
            //             "text": "slices of bread",
            //         },
            //         {
            //             "amount": "1.5",
            //             "text": "tablespoons of barbeque sauce",
            //         },
            //         {
            //             "amount": "5",
            //             "text": "knuckles",
            //         },
            //         {
            //             "amount": "1",
            //             "text": "cup of cheese",
            //         },
            //         {
            //             "amount": "1",
            //             "text": "Pinch of salt",
            //         }
            //     ],
            //     tags: [],
            //     directions: ["Make it", "You fool"],
            //     recipe_id: 6,
            //     rating: 5,
            // }));
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
