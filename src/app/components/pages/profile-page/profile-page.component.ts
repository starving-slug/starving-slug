import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../../../models'
import { NgForm  } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models';
import { ApiService } from '../../../utils/apiService';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private api: ApiService) { // this is all currently filler junk
    console.log(route.snapshot.data)
    this.user = route.snapshot.data['user'];
    console.log(this.user);
  }
  ngOnInit() {
  }

  deleteRecipe(name: string, id: string) {
    console.log(`Deleting "${name}"`);
    if (prompt(`You are now deleting "${name}". Type in the exact same name as the recipe to continue.`) == name) {
      console.log("Continuing");
      this.api.deleteRecipe(id).subscribe((res) => {
        console.log("Recipe successfully deleted");
        window.location.reload();
      }, (err) => {
        console.log("Error deleting");
        console.error(err.message);
      });
    }else {
      console.log("Cancel");
    }
  }
  onSubmit(commentForm: NgForm) {
    let body = commentForm.value;
    let time = new Date();
    let date = (((time.getMonth()+1) < 10) ? "0" : "") + (time.getMonth()+1) + "/" + ((time.getDate() < 10) ? "0" : "") + time.getDate() + "/" + time.getFullYear();
    body['author'] = this.route.snapshot.url[1].path; // This needs to change to the signed-in user once user sessions are done
    body['post'] = date;
    for (let i = 0; i < this.user.comments.length; i++) {
      delete this.user.comments[i]['_id'];
    }
    this.user.comments.push(body);
    console.log(this.user.comments);
    this.api.createComment(this.user.comments).subscribe((res) => {
        console.log("Success!");
    }, (err) => {
      console.log("Error");
      console.error(err.message);
    });
}

}

