import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationMembersRoutingModule } from './organization-members-routing.module';
import { OrganizationMembersComponent } from './organization-members/organization-members.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [OrganizationMembersComponent],
  imports: [
    CommonModule,
    OrganizationMembersRoutingModule,
    NgxSpinnerModule
  ]
})
export class OrganizationMembersModule { }
