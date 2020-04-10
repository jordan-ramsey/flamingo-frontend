import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import {Observable} from 'rxjs';    

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private baseUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) { }

   login(userData: Object): any {
    var promise = new Promise((resolve, reject) => {
      let url = `${this.baseUrl}/login`
      this.http.post(url, userData, {headers: this.header}).toPromise()
      .then((response: any) => {
        if (response.status === 'success') {
          this.decodeToken(response.auth_token)
          resolve();
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  register(userData: Object): any {
    var promise = new Promise((resolve, reject) => {
      let url = `${this.baseUrl}/register`
      this.http.post(url, userData, {headers: this.header}).toPromise()
      .then((response: any) => {
        if (response.status === 'success') {
          this.decodeToken(response.auth_token)
          resolve();
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  // Parse JWT and create user from payload
  decodeToken(token: string) {
    let payload = JSON.parse(window.atob(token.split('.')[1])); 
    let currentUser = new User(payload.public_id, payload.username, payload.first, payload.last, token);
    localStorage.setItem('user', JSON.stringify(currentUser));
    
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  retrieveUser(userId: String) {
    var promise = new Promise((resolve, reject) => {
    let url = `${this.baseUrl}/user/${userId}`
    this.http.get(url).toPromise()
      .then((response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('user', JSON.stringify(response.user));
          resolve();
        } else {
          reject();
        }
      });
    });
    return promise;
  }

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }
}
