import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrganizationRoutingModule } from './create-organization-routing.module';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CreateOrganizationComponent],
  imports: [
    CommonModule,
    CreateOrganizationRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateOrganizationModule { }
