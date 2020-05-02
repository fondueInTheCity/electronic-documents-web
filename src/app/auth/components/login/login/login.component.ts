import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Pattern} from '../../../../utils/pattern';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnDestroy {
  pattern = new Pattern();
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.pattern.usernamePattern)]],
    password: ['', [Validators.required, Validators.pattern(this.pattern.passwordPattern)]]
  });
  loginFailed = false;
  loginSubscription: Subscription;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private fb: FormBuilder) {
  }

  onSubmit() {
    this.loginSubscription = this.authService.attemptAuth(this.loginForm.value).subscribe(
      (data) => {
        this.tokenStorage.saveData(data.token, data.username, data.id);
        this.tokenStorage.saveListId(data.organizationsId);
        this.router.navigate(['/']);
      },
      error => {
        this.loginFailed = true;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
