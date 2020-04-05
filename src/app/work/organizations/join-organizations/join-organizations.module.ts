import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinOrganizationsRoutingModule } from './join-organizations-routing.module';
import { JoinOrganizationsComponent } from './join-organizatinos/join-organizations.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [JoinOrganizationsComponent],
  imports: [
    CommonModule,
    JoinOrganizationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class JoinOrganizationsModule { }
