import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../utils/apiService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  testlogin: boolean = false;
  search = '';

  constructor(private api: ApiService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
      this.search = JSON.stringify(form.value);
      let searchField = JSON.parse(this.search);
      this.router.navigate(['/search'], {queryParams: {name: searchField.name}});
  }
}
