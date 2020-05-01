import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private userData = {
    username: null,
    first: null,
    last: null,
    password: null
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(): any {
    this.authService.register(this.userData)
    .then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

}
