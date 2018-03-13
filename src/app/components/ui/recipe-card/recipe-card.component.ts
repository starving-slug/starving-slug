import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../../models';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  private _recipe: Recipe;
  private _show_author: boolean;
  name: string;
  private author: string;
  description: string;

  @Input() set recipe(r: Recipe) {
    console.log(r);
    if (r && this._recipe === null) {
      this._recipe = r;
    }
  }
  
  get recipe() {
    return this._recipe;
  }

  @Input() set show_author(show: boolean) {
    if (show != this._show_author)
    this._show_author = show;
  }
  get show_author() {
    return this._show_author;
  }

  constructor() {
    this._recipe = null;
    this._show_author = true;
  }

  ngOnInit() {
  }
}
