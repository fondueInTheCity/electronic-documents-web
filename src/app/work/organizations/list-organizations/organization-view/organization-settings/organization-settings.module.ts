import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationSettingsRoutingModule } from './organization-settings-routing.module';
import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [OrganizationSettingsComponent],
  imports: [
    CommonModule,
    OrganizationSettingsRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrganizationSettingsModule { }
