import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/apiService';

import { User } from '../../../models';
import { Recipe } from '../../../models'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    console.log(route.snapshot.data)
    this.user = route.snapshot.data['user'];
    console.log(this.user);
  }

  ngOnInit() {
  }

  editRecipe(id: string) {
    this.router.navigate([`/recipe/edit/${id}`]);
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

}
