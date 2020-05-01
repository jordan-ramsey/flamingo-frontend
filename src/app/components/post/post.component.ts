import { PostService } from './../../services/post.service';
import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  user = null;
  @ViewChild('spotify', { static: true }) spotifyFrame: ElementRef;

  constructor(private postService: PostService) {}

  ngOnInit() {
    let songId = this.post.spotify_uri.slice(this.post.spotify_uri.lastIndexOf(':') + 1);
    this.spotifyFrame.nativeElement.src = `https://open.spotify.com/embed/track/${songId}`

    this.postService.getUserInfo(this.post.user_id) 
      .then(response => {
        this.user = response.user;
      })

  
  }
  
}