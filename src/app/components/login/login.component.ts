import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userData = {
    username: null,
    password: null
  }
  constructor(private authService: AuthService, private router: Router) { }

  login(): any {
    this.authService.login(this.userData)
    .then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
  }

}
