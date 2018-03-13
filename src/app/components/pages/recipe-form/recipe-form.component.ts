import { Component, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../utils/apiService';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../../models';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  public recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private api: ApiService, private _fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.recipe = new Recipe();
    
    let routeData = route.data.subscribe((data) => {
        this.recipe = data['recipe'];
    });
    console.log(this.recipe);
  }

  ngOnInit() {
    this.recipeForm = this._fb.group({
      name: ['', Validators.required],
      author: ['theShaGu'],
      description: ['', Validators.required],
      photo: [''],
      price: ['0.00'],
      rating: { average: 0, quantity: 0 },
      ingredients: this._fb.array([this.initIngredients()]),
      directions: this._fb.array([['', Validators.required]]),
      tags: this._fb.array([['', Validators.required]])
    });
    if (this.recipe) {
      let body = this.recipe;
      for (let i = 1; i < this.recipe.ingredients.length; i++) this.addIngredient();
      for (let i = 1; i < this.recipe.directions.length; i++) this.addStep();
      for (let i = 1; i < this.recipe.tags.length; i++) this.addTag();
      const ingredients = this.recipe.ingredients.map(ingredient => this._fb.group({ amount: ingredient['amount'], text: ingredient['text']}));
      const ingredientsFormArray = this._fb.array(ingredients);
      this.recipeForm.setControl('ingredients', ingredientsFormArray);
      const dir = this.recipe.directions.map(dir => this._fb.control(dir));
      const directionsFormArray = this._fb.array(dir);
      this.recipeForm.setControl('directions', directionsFormArray);
      const tags = this.recipe.tags.map(tag => this._fb.control(tag));
      const tagsFormArray = this._fb.array(tags);
      this.recipeForm.setControl('tags', tagsFormArray);

      this.recipeForm.patchValue({
        name: [body.name],
        author: [body.author],
        description: [body.description],
        photo: [body.photo],
        price: [body.price.substring(1)],
        rating: { average: body.rating['average'], quantity: body.rating['quantity'] }
      });
    }
  }

  initIngredients() {
    return this._fb.group({
      amount: [''],
      text: ['', Validators.required]
    });
  }

  addIngredient() {
    const control = <FormArray>this.recipeForm.controls['ingredients'];
    control.push(this.initIngredients());
  }

  addStep() {
    const control = <FormArray>this.recipeForm.controls['directions'];
    control.push(this._fb.control(['']));
  }

  addTag() {
    const control = <FormArray>this.recipeForm.controls['tags'];
    control.push(this._fb.control(['']));
  }

  removeIngredient(i: number) {
    const control = <FormArray>this.recipeForm.controls['ingredients'];
    control.removeAt(i);
  }

  removeStep(i: number) {
    const control = <FormArray>this.recipeForm.controls['directions'];
    control.removeAt(i);
  }

  removeTag(i: number) {
    const control = <FormArray>this.recipeForm.controls['tags'];
    control.removeAt(i);
  }

  onSubmit(recipeForm: NgForm) {
    if (recipeForm.valid) {
      let body = recipeForm.value;
      console.log(body);
      var regex  = /^\d+((\.\d{0,2})?)$/;
      console.log(regex.test(body.price));
      if (!regex.test(body.price)) {
        console.log("Invalid price");
        alert("Invalid price");
        return;
      }
      for (let dir of body.directions) {
          if (dir == "") {
              console.log("Invalid Form");
              alert("Invalid Form");
              return;
          }
      }
      body.price = "$" + body.price;
      if (!this.recipe) {
        this.api.createRecipe(body).subscribe((res) => {
          console.log("Succesfully created recipe");
          this.router.navigate([`/user/${body['author']}`]);
        }, (err) => {
          console.log("Error");
          console.error(err.message);
        });
      }else {
        this.api.updateRecipe(this.route.snapshot.url[2].path, body).subscribe((res) => {
          console.log("Succesfully updated recipe");
          this.router.navigate([`/user/${this.recipe['author']}`]);
        }, (err) => {
          console.log("Error");
          console.error(err.message);
        });
      }
    }else {
      console.log("Invalid form");
      alert("Invalid Form");
    }
  }

}
