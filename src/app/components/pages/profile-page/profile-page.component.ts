import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  private name: string;
  private recipes = [
    {
      name: 'Barbeque Bat Eyeball',
      description: 'This tasty dish from Western Fanglovia is a succulent mix of savory and fruity'
    },
    {
      name: 'Shrieking Pancake',
      description: 'Don\'t let the name fool you, this delectible recipe has no equal'
    },
    {
      name: 'Knuckle Sandwich',
      description: 'An old Bungleburg classic, this sandwich was popular during the late 80s'
    }
  ]

  constructor() {
    this.name = 'Test User'
    this.recipes.map((rcp) => {console.log(rcp['name']); })
  }

  ngOnInit() {
  }

}
