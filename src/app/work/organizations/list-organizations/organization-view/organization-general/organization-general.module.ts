import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationGeneralRoutingModule} from './organization-general-routing.module';
import {OrganizationGeneralComponent} from './organization-general/organization-general.component';


@NgModule({
  declarations: [OrganizationGeneralComponent],
  imports: [
    CommonModule,
    OrganizationGeneralRoutingModule
  ]
})
export class OrganizationGeneralModule { }
