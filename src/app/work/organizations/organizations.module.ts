import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationsRoutingModule} from './organizations-routing.module';
import {OrganizationsComponent} from './organizations/organizations.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [OrganizationsComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    HttpClientModule
  ]
})
export class OrganizationsModule { }
