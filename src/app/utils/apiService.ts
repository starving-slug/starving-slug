import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

let apiurl = 'http://localhost:3000'

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {

  }

  signIn(profile: gapi.auth2.BasicProfile, id_token: string) {
    console.log(profile, id_token);
    let body = {
      id_token: id_token,
      username: profile.getName(),
      // image: profile.given_name
    }
    return this.http.post(`${apiurl}/users`, body);
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

}
