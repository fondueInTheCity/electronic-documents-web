import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrganizationsRoutingModule } from './list-organizations-routing.module';
import { ListOrganizationsComponent } from './list-organizations/list-organizations.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [ListOrganizationsComponent],
  imports: [
    CommonModule,
    ListOrganizationsRoutingModule,
    NgxSpinnerModule
  ]
})
export class ListOrganizationsModule { }
