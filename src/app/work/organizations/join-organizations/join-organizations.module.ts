import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinOrganizationsRoutingModule } from './join-organizations-routing.module';
import { JoinOrganizationsComponent } from './join-organizatinos/join-organizations.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [JoinOrganizationsComponent],
  imports: [
    CommonModule,
    JoinOrganizationsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class JoinOrganizationsModule { }
