import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm  } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models'
import{ ApiService } from '../../../utils/apiService'

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

  onSubmit(commentForm: NgForm) {
    let body = commentForm.value;
    this.api.createComment(body).subscribe((res) => {
        console.log("Success!");
    }, (err) => {
      console.log("Error");
      console.error(err.message);
    });
}

}

