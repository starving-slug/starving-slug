import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm  } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
@ViewChild('f') searchFilter: NgForm;
  constructor() { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm){
  //     console.log(form);
  // }

  onSubmit(){
      console.log(this.searchFilter);
  }

}
