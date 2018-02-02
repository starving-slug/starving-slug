import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../models'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) { // this is all currently filler junk
    this.user = new User();

    let routeData = route.data.subscribe((data) => { // pulls bogus user out of the user resolver
      this.user = data['user'];
      console.log(this.user);
    });
  }

  ngOnInit() {
  }

}
