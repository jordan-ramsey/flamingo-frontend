import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {
  public post = {
    spotify_uri: null,
    description: null,
  }
  
  constructor(private postService: PostService, public dialogRef: MatDialogRef<AddPostDialogComponent>, private router: Router) { }

  ngOnInit() {
  }

  createPost() {
    this.postService.createPost(this.post)
      .then((response) => {
       this.dialogRef.close(response.post)
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
