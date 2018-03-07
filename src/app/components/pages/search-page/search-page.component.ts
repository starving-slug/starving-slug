import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { ApiService } from '../../../utils/apiService'
import { Recipe } from '../../../models/recipe.model'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})


export class SearchPageComponent implements OnInit {
  @ViewChild('f') searchFilter: NgForm;
  recipes: Recipe[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.recipes.push(new Recipe({
      name: "Test Title",
      author: "Mock Author",
      description: "Mock Description",
      photo: "https://images.encyclopediadramatica.rs/a/a0/Doritopods.jpg",
      ingredients: [
        {
            "amount": "2",
            "text": "slices of bread",
        },
        {
            "amount": "1.5",
            "text": "tablespoons of barbeque sauce",
        },
        {
            "amount": "5",
            "text": "knuckles",
        },
        {
            "amount": "1",
            "text": "cup of cheese",
        },
        {
            "amount": "1",
            "text": "Pinch of salt",
        }
    ],
      tags: [],
      directions: ["Make it", "You fool"],
      recipe_id: 6,
      rating: 5,
    }))
    console.log(this.recipes);
  }


  onSubmit() {
      // console.log(this.searchFilter);
      // console.log(this.searchFilter.value);
    this.api.getUser("shashank_oddessey").subscribe((res) => {
      console.log(res);
      // (parse the response?) depending on format it might need to be constructed into recipe objects
      // assign the parsed response to this.recipes
    }, (err) => {
      console.error(err.message);
    })
  }

}
