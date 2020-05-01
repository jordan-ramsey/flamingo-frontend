import { AuthService } from './auth.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts(): any {
    let header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json',    'x-access-token': this.authService.getCurrentUser().token});

      let url = `${this.baseUrl}/posts`;
      return this.http.get(url, {headers: header}).toPromise();
  }

  createPost(post): any {
    let header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'x-access-token': this.authService.getCurrentUser().token});

    let url = `${this.baseUrl}/posts`;
    return this.http.post(url, post, {headers: header}).toPromise();
  }

  getProfilePosts(id: string): any {
    let header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'x-access-token': this.authService.getCurrentUser().token});

    let url = `${this.baseUrl}/profile/${id}`;
    return this.http.get(url, {headers: header}).toPromise();
  }

  getUserInfo(id: string): any {
    let header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'x-access-token': this.authService.getCurrentUser().token});

    let url = `${this.baseUrl}/user/${id}`;
    return this.http.get(url, {headers: header}).toPromise();
  }

  searchUsers(username: string) {
    let header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'x-access-token': this.authService.getCurrentUser().token});

    let url = `${this.baseUrl}/search/${username}`;
    return this.http.get(url, {headers: header}).toPromise();
  }
}
