import { AuthService } from './../../services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PostComponent } from './../post/post.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  posts = []
  user = null;

  isFollowing = null;

  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProfileInfo();
      this.postService.getProfilePosts(this.id) 
        .then(response => {
          this.posts = response.posts;
        })
  });
  }

  getProfileInfo() {
    this.postService.getUserInfo(this.id)
      .then(response => {
        this.user = response.user
      });
  }

  followUser() {
    this.isFollowing = true;
  }

  unfollowUser() {
    this.isFollowing = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '450px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

}
