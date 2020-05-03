import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    firstName: new FormControl(),
    middleName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;

        this.router.navigate(['/auth/login']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.router.navigate(['/auth/login']);
      }
    );
  }
}
