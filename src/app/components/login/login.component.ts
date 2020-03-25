import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar,   MatSnackBarConfig} from '@angular/material/snack-bar';



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

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  login(): any {
    this.authService.login(this.userData)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch(() => {
      let config: MatSnackBarConfig = new MatSnackBarConfig();
      config.duration = 4000;
      this.snackBar.open("Incorrect username or password", "close", config);
    });
  }

  ngOnInit() {
  }

}
