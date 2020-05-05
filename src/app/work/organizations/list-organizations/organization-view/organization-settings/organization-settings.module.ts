import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationSettingsRoutingModule } from './organization-settings-routing.module';
import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ErrorMessagesModule} from '../../../../../utils/error-messages/error-messages.module';


@NgModule({
  declarations: [OrganizationSettingsComponent],
  imports: [
    CommonModule,
    OrganizationSettingsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ErrorMessagesModule
  ]
})
export class OrganizationSettingsModule { }
