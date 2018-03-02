import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../../utils/apiService'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  testlogin: boolean = false;
  searchField = '!';

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
