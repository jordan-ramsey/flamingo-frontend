import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import {Observable} from 'rxjs';    




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: User;
  private header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private baseUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) { }

   login(userData: Object): any {
    var promise = new Promise((resolve, reject) => {
      let url = `${this.baseUrl}/login`
      this.http.post(url, userData, {headers: this.header}).toPromise()
      .then((response: any) => {
      this.decodeToken(response.auth_token)
      resolve();
      });
    });
    return promise;
  }

  // Parse JWT and create user from payload
  decodeToken(token: String) {
    let payload = JSON.parse(window.atob(token.split('.')[1])); 
    this.currentUser = new User(payload.public_id, payload.username, payload.first, payload.last)
    console.log(this.currentUser)
    
  }
}
