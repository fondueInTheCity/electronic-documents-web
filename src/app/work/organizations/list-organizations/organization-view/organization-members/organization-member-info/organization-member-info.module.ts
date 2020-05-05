import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationMemberInfoRoutingModule} from './organization-member-info-routing.module';
import {OrganizationMemberInfoComponent} from './organization-member-info/organization-member-info.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesModule} from '../../../../../../utils/error-messages/error-messages.module';


@NgModule({
  declarations: [OrganizationMemberInfoComponent],
  imports: [
    CommonModule,
    OrganizationMemberInfoRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ErrorMessagesModule
  ]
})
export class OrganizationMemberInfoModule { }
