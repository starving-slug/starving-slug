import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SessionService } from '../../../utils/';

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

  constructor(private session: SessionService, private fb: FormBuilder) {
    this.session.googleUser$.subscribe((user) => {
      if(user) {
        console.log(user);
        this.body = {
          email: user.getEmail(),
          name: user.getName(),
          image: user.getImageUrl(),
          username: '',
          description: '',
        }
      }
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: '',
      description: ''
    })
  }

  onSignIn(formValues) {
    // console.log(formValues);

    this.body = Object.assign(this.body, formValues);
    console.log(this.body);
    /* From here, send the formvalues {username, description} along with the
       post the username, the description, the two IDs to the endpoint.
       redirect back to the saved url
    */

    console.log(formValues);
  }
}
