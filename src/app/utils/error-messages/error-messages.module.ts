import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorMessagesRoutingModule } from './error-messages-routing.module';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';


@NgModule({
  declarations: [ErrorMessagesComponent],
  imports: [
    CommonModule,
    ErrorMessagesRoutingModule
  ],
  exports: [ErrorMessagesComponent]
})
export class ErrorMessagesModule { }
