import { PostService } from './../../services/post.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {ActivatedRoute} from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private user: User;
  public posts: any;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let userId = params['id'];
      if (userId) {
        this.authService.retrieveUser(userId)
        .then(res => {
          this.user = this.authService.getCurrentUser();
        });
      } else {
        this.user = this.authService.getCurrentUser();
        this.postService.getPosts()
          .then((response: any) => {
              if (response.status === 'success') {
                this.posts = response.posts;
              }
          }) 
      }
    });
  }

}
