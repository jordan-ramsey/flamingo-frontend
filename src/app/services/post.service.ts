import { AuthService } from './auth.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:5000';
  private header: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'x-access-token': this.authService.getCurrentUser().token});

  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPosts(): any {
      let url = `${this.baseUrl}/posts`;
      return this.http.get(url, {headers: this.header}).toPromise();
  }
}
