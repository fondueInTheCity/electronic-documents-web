import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationViewRoutingModule } from './organization-view-routing.module';
import { OrganizationViewComponent } from './organization-view/organization-view.component';


@NgModule({
  declarations: [OrganizationViewComponent],
  imports: [
    CommonModule,
    OrganizationViewRoutingModule
  ]
})
export class OrganizationViewModule { }
