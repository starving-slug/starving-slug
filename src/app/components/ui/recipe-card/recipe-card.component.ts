import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  name: string;
  description: string;

  @Input() set recipe(r: object) {
    if (!!r) {
      this.name = r['name'] || '';
      this.description = r['description'] || '';
    }
  }

  constructor() {
    this.name = '';
    this.description = '';
  }

  ngOnInit() {
  }
}


//foo
