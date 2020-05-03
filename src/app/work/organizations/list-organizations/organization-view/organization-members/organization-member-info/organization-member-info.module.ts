import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationMemberInfoRoutingModule} from './organization-member-info-routing.module';
import {OrganizationMemberInfoComponent} from './organization-member-info/organization-member-info.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [OrganizationMemberInfoComponent],
  imports: [
    CommonModule,
    OrganizationMemberInfoRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class OrganizationMemberInfoModule { }
