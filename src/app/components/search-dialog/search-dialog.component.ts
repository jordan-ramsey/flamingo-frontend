import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
  username: string = null;
  users = []
  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  onKeyUp(event) {
    let username = event.target.value;
    if (username === '') {
      this.users = []
    } else {
      this.postService.searchUsers(username)
      .then((response: any) => {
        this.users = response.users;
      });
    }
  }

  handleClick(id: string) {
    this.cancel();
    this.router.navigate(['/profile', id]);
  }

  cancel() {
    this.dialogRef.close();
  }
}
