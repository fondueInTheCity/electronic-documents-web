import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationMemberInfoRoutingModule } from './organization-member-info-routing.module';
import { OrganizationMemberInfoComponent } from './organization-member-info/organization-member-info.component';


@NgModule({
  declarations: [OrganizationMemberInfoComponent],
  imports: [
    CommonModule,
    OrganizationMemberInfoRoutingModule
  ]
})
export class OrganizationMemberInfoModule { }
