import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private user: User;
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

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
      }
    });
  }

}
