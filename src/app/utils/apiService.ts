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
    return this.http.get(`${apiurl}/getUser/${username}`);
  }

}
