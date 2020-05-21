import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationGeneralRoutingModule} from './organization-general-routing.module';
import {OrganizationGeneralComponent} from './organization-general/organization-general.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ErrorMessagesModule} from '../../../../../utils/error-messages/error-messages.module';


@NgModule({
  declarations: [OrganizationGeneralComponent],
  imports: [
    CommonModule,
    OrganizationGeneralRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ErrorMessagesModule
  ]
})
export class OrganizationGeneralModule { }
