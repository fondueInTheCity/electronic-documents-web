import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationRequestsRoutingModule} from './organization-requests-routing.module';
import {OrganizationRequestsComponent} from './organization-requests/organization-requests.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [OrganizationRequestsComponent],
  imports: [
    CommonModule,
    OrganizationRequestsRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ]
})
export class OrganizationRequestsModule { }
