import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SessionService } from '../../../utils';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../../models';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  public recipeForm: FormGroup;
  private _username: string;
  recipe: Recipe;

  constructor(private api: ApiService, private _fb: FormBuilder, private router: Router, private session: SessionService, private route: ActivatedRoute) {
    this.recipe = new Recipe();
    
    let routeData = route.data.subscribe((data) => {
      this.recipe = data['recipe'];
    });
    console.log(this.recipe);
  }

  ngOnInit() {

    this.session.signedIn$.subscribe((user) => {
      console.log(user);
      if (user) {
        this._username = user.username;
      } else {
        this._username = '';
        this.router.navigate([`/`]);
        alert("Sign in to create or edit a recipe");
      }
    })

    this.recipeForm = this._fb.group({
      name: ['', Validators.required],
      author: [this._username],
      description: ['', Validators.required],
      photo: [''],
      price: ['0.00'],
      rating: { average: 0, quantity: 0 },
      ingredients: this._fb.array([this.initIngredients()]),
      directions: this._fb.array([['', Validators.required]]),
      tags: this._fb.array([['', Validators.required]])
    });
    if (this.recipe) {
      if (this._username != this.recipe.author) {
        this.router.navigate([`/`]);
        alert("You are not allowed to edit this recipe!");
      }
      let body = this.recipe;
      if (body.photo == "../../../../assets/photos/logo.png") body.photo = "";
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

  removeField(i: number, key: string) {
    const control = <FormArray>this.recipeForm.controls[key];
    control.removeAt(i);
  }

  testField(field: string[]) {
    for (let entry of field) {
      if (entry == "") {
        console.log("Invalid Form");
        alert("Invalid Form");
        return false;
      }
    }
    return true;
  }

  imageUrl(url) {
    let img = new Image();
    img.src = url;
    if (!img.complete) return false;
    return true;
  }

  onSubmit(recipeForm: NgForm) {
    if (recipeForm.valid) {
      let body = recipeForm.value;
      if (body.photo == "") { body.photo = "../../../../assets/photos/logo.png"; }
      else {
        let imgExists = this.imageUrl(body.photo);
        if (!imgExists) {
          alert("Invalid image URL. Leave field blank for the default image.");
          return;
        }
      }
      console.log(body);

      var regex  = /^\d+((\.\d{0,2})?)$/;
      if (!regex.test(body.price)) {
        console.log("Invalid price");
        alert("Invalid price");
        return;
      }
      if (!this.testField(body.directions)) return;
      if (!this.testField(body.tags)) return;
      body.price = "$" + body.price;

      if (!this.recipe) {
        this.api.createRecipe(body).subscribe((res) => {
          console.log("Succesfully created recipe");
          this.router.navigate([`/user/${this._username}`]);
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
