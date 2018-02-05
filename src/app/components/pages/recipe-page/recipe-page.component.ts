import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../../../models'

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: Recipe

  constructor(private route: ActivatedRoute) {
    this.recipe = new Recipe();
    
    let routeData = route.data.subscribe((data) => {
        this.recipe = data['recipe'];
    });
  }

  ngOnInit() {
  }

}
