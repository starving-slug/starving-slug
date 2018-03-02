import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { ApiService } from '../../../utils/apiService'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})


export class SearchPageComponent implements OnInit {
@ViewChild('f') searchFilter: NgForm;

  constructor(private api: ApiService) { }

  ngOnInit() {

  }


  onSubmit(){
      // console.log(this.searchFilter);
      // console.log(this.searchFilter.value);
      console.log(this.api.getUser("shashank_oddessey"))
  }

}
