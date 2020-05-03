import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationRolesComponent} from './organization-roles/organization-roles.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRolesRoutingModule { }
