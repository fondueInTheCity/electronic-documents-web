import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesModule} from '../../../utils/error-messages/error-messages.module';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    ErrorMessagesModule,
    NgxSpinnerModule
  ]
})
export class LoginModule { }
