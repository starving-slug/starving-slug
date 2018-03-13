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

  updateProfile(profile: Object, permissions: string) {
    console.log(profile, permissions);
    return this.http.post(`${apiurl}/profile`, profile, {headers: {authorization: `Bearer ${permissions}`}});
  }

  getUser(username: string): Observable<any> {
    console.log(`Fetching user ${username}`)
    return this.http.get(`${apiurl}/profile/${username}`);
  }

  getRecipe(id: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/recipe/${id}`);
  }

  createRecipe(res: Object[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${apiurl}/recipe`, res, { headers: headers, responseType: 'text' });
  }

  getSearch(name: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/search?name=${name}`);
  }

  getFilter(name: string, author: string, tag: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/search?name=${name}&author=${author}&tag=${tag}`);
  }

  updateRecipe(id: string, res: Object): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${apiurl}/recipe/edit/${id}`, res, { headers: headers, responseType: 'text' });
  }

  deleteRecipe(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`${apiurl}/recipe/delete/${id}`);
  }

  createRating(res: Object, id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${apiurl}/rating/${id}`, res, { headers: headers, responseType: 'text' });
  }

}
