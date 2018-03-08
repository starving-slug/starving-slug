import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log(`Fetching recipe ${id}`);
    return this.http.get(`${apiurl}/recipe/${id}`);
  }

  createRecipe(res: Object[]): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${apiurl}/recipe`, res, {headers: headers, responseType: 'text'});
  }
  createComment(res: Object[]): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(`${apiurl}/profile-comment/${username}`, res, {headers: headers, responseType: 'text'});
  }
}
