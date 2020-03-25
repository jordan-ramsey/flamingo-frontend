import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let uri = 'spotify:track:2eAZfqOm4EnOF9VvN50Tyc';
    let songId = uri.slice(uri.lastIndexOf(':') + 1);
    document.getElementById('spotify').setAttribute('src', `https://open.spotify.com/embed/track/${songId}`);
  }

}
