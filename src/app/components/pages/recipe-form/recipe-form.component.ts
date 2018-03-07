import { Component, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../utils/apiService';
import { Router } from '@angular/router';

import { Recipe } from '../../../models';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  public recipeForm: FormGroup;

  constructor(private api: ApiService, private _fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.recipeForm = this._fb.group({
      name: ['', Validators.required],
      author: ['theShaGu'],
      description: ['', Validators.required],
      photo: [''],
      price: ['0.00'],
      rating: 0,
      ingredients: this._fb.array([this.initIngredients()]),
      directions: this._fb.array([['', Validators.required]]),
      tags: this._fb.array([['', Validators.required]])
    });
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
      /*let recipe = new Recipe({
        name: body.name,
        author: "theShaGu",
        description: body.description,
        photo: body.photo,
        directions: body.directions,
        ingredients: body.ingredients,
        tags: body.tags
      });*/
      console.log(body);
      var regex  = /^\d+(?:\.\d{0,2})$/;
      console.log(regex.test(body.price));
      if (!regex.test(body.price)) {
        console.log("Invalid price");
        return;
      }
      for (let dir of body.directions) {
          if (dir == "") {
              console.log("Invalid Form");
              return;
          }
      }
      console.log("Succesfully created recipe");
      this.api.createRecipe(body).subscribe((res) => {
        this.router.navigate(['/user/KevLoi']);
      }, (err) => {
        console.log("Error");
        console.error(err.message);
      });
    }else {
      console.log("Invalid form");
    }
  }

}