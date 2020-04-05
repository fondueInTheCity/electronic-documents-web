import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  loggedIn = false;
  loginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.loggedIn = true;
    }
  }

  onSubmit() {
    this.authService.attemptAuth(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);

        this.loginFailed = false;
        this.loggedIn = true;
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.loginFailed = true;
      }
    );
  }
}
