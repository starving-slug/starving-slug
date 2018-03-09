import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

let apiurl = 'http://localhost:3000'

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {

  }

  getUser(username: string): Observable<any> {
    console.log(`Fetching user ${username}`)
    return this.http.get(`${apiurl}/profile/${username}`);
  }

  getRecipe(id: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/recipe/${id}`);
  }

  getSearch(name: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/search?name=${name}`);
  }

  getFilter(name: string, author: string, tag: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/search?name=${name}&author=${author}&tag=${tag}`);
  }

}
