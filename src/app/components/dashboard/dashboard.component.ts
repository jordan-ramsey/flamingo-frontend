import { AddPostDialogComponent } from './../add-post-dialog/add-post-dialog.component';
import { PostService } from './../../services/post.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {ActivatedRoute} from '@angular/router';
import { Post } from 'src/app/models/post';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private user: User;
  public posts: any;

  constructor(public dialog: MatDialog, private authService: AuthService, private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.postService.getPosts()
      .then((response: any) => {
          if (response.status === 'success') {
            this.posts = response.posts;
          }
      })
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
