import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrganizationRoutingModule } from './create-organization-routing.module';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ErrorMessagesModule} from '../../../utils/error-messages/error-messages.module';


@NgModule({
  declarations: [CreateOrganizationComponent],
  imports: [
    CommonModule,
    CreateOrganizationRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ErrorMessagesModule
  ]
})
export class CreateOrganizationModule { }
