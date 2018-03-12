import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { SessionService, ApiService } from '../../../utils/';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  username: string;
  description: string;

  body = {
    email: '',
    username: '',
    name: '',
    image: '',
    description: ''
  }

  constructor(private api: ApiService, private session: SessionService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.session.googleUser$.subscribe((user) => {
      console.log(user);
      if(user) {
        this.body = {
          email: user.getEmail(),
          username: '',
          name: user.getName(),
          image: user.getImageUrl(),
          description: '',
        }
      }
    })
  }

  ngOnInit() {
  }

  onSignIn() {
    console.log(this.form);

    let formValues = {
      username: this.form.controls['username'].value;
      description: this.form.controls['description'].value;
    }

    console.log(formValues, event);

    this.body = Object.assign(this.body, formValues);
    console.log(this.body);

    this.api.updateProfile(this.body).subscribe((res) => {
      console.log(res);
      // this.router.navigateByUrl('/profile/' + this.body.username);
    }, (err) => {
      console.log(err.message);
    // })
  }
}
