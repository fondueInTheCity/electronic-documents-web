import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesModule} from '../../../utils/error-messages/error-messages.module';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    ErrorMessagesModule,
    NgxSpinnerModule
  ]
})
export class SignupModule { }
