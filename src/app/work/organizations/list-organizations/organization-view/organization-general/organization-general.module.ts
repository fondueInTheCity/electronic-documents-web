import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationGeneralRoutingModule} from './organization-general-routing.module';
import {OrganizationGeneralComponent} from './organization-general/organization-general.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [OrganizationGeneralComponent],
  imports: [
    CommonModule,
    OrganizationGeneralRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrganizationGeneralModule { }
