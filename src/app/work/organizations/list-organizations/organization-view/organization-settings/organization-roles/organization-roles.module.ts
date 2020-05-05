import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRolesRoutingModule } from './organization-roles-routing.module';
import { OrganizationRolesComponent } from './organization-roles/organization-roles.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ErrorMessagesModule} from '../../../../../../utils/error-messages/error-messages.module';


@NgModule({
  declarations: [OrganizationRolesComponent],
  imports: [
    CommonModule,
    OrganizationRolesRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ErrorMessagesModule
  ]
})
export class OrganizationRolesModule { }
