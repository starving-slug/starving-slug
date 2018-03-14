import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storageService';

let apiurl = 'https://starving-slug.appspot.com'
// let apiurl = 'http://localhost:3000';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient,
              private storage: StorageService) {

  }

  signIn(profile: gapi.auth2.BasicProfile, id_token: string) {
    console.log(profile, id_token);
    let body = {
      id_token: id_token,
      email: profile.getEmail(),
      // image: profile.given_name
    }
    return this.http.post(`${apiurl}/users`, body);
  }

  updateProfile(profile: Object) {
    let permissions = this.storage.getTokenString();
    console.log(profile, permissions);
    let headers = {token: permissions}
    return this.http.post(`${apiurl}/setProfile`, profile, {headers: headers});
  }

  getUser(username: string): Observable<any> {
    console.log(`Fetching user ${username}`)
    return this.http.get(`${apiurl}/profile/${username}`);
  }

  getRecipe(id: string): Observable<any> {
    console.log(`Fetching recipe ${name}`);
    return this.http.get(`${apiurl}/recipe/${id}`);
  }

  createRecipe(recipe: Object[]): Observable<any> {
      let permissions = this.storage.getTokenString()
      const headers = {token: permissions};
      return this.http.post(`${apiurl}/recipe`, recipe, { headers: headers });
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
    let permissions = this.storage.getTokenString()
    const headers = {token: permissions};
    return this.http.delete(`${apiurl}/recipe/delete/${id}`, {headers: headers});
  }

  createRating(res: Object, id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${apiurl}/rating/${id}`, res, { headers: headers, responseType: 'text' });
  }

  createComment(comment: Object[], user: string): Observable<any> {
    let permissions = this.storage.getTokenString()
    const headers = {token: permissions};
    console.log(comment);
    return this.http.patch(`${apiurl}/profile-comment/${user}`, comment, {headers: headers});
  }
}
