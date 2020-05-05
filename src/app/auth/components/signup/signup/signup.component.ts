import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {UtilService} from '../../../../utils/util.service';
import {Subscription} from 'rxjs';
import {tc} from '../../../../utils/tc';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnDestroy {
  signupForm = new FormGroup({
    firstName: new FormControl('', this.util.getFirstNameValidators()),
    middleName: new FormControl('', this.util.getMiddleNameValidators()),
    lastName: new FormControl('', this.util.getLastNameValidators()),
    email: new FormControl('', this.util.getEmailValidators()),
    username: new FormControl('', this.util.getUsernameValidators()),
    password: new FormControl('', this.util.getPasswordValidators())
  });
  signUPSubscription: Subscription;
  inProgress = false;

  constructor(private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService,
              private util: UtilService) {
  }

  onSubmit() {
    this.spinner.show();
    this.inProgress = true;
    this.util.unsubscribe(this.signUPSubscription);
    this.signUPSubscription = this.authService.signUp(this.signupForm.value).subscribe((data) => {
        this.spinner.hide();
        this.toast.success(tc.signUpSuccess.message, tc.signUpSuccess.title, tc.signUpSuccess.override);
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 5000);
      },
      error => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.error(tc.signUpError.message, tc.signUpError.title, tc.signUpError.override);
      }
    );
  }

  disableSignUpButton() {
    return this.inProgress || this.signupForm.invalid;
  }

  ngOnDestroy(): void {
    this.util.unsubscribe(this.signUPSubscription);
  }
}
