import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilService} from '../../../../utils/util.service';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../utils/tc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnDestroy {
  inProgress = false;
  loginForm = this.fb.group({
    username: ['', this.utilService.getUsernameValidators()],
    password: ['', this.utilService.getPasswordValidators()]
  });
  loginSubscription: Subscription;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private utilService: UtilService,
              private toastr: ToastrService) {
  }

  onSubmit() {
    this.inProgress = true;
    this.spinner.show();
    this.utilService.unsubscribe(this.loginSubscription);
    this.loginSubscription = this.authService.attemptAuth(this.loginForm.value).subscribe((data) => {
        this.tokenStorage.saveData(data.token, data.username, data.id);
        this.tokenStorage.saveListId(data.organizationsId);
        this.spinner.hide();
        this.toastr.success(tc.loginSuccess.message, tc.loginSuccess.title, tc.loginSuccess.override);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      },
      error => {
        this.inProgress = false;
        this.spinner.hide();
        this.toastr.error(tc.loginError.message, tc.loginError.title, tc.loginError.override);
      }
    );
  }

  disableLoginButton() {
    return this.inProgress || this.loginForm.invalid;
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.loginSubscription);
  }
}
