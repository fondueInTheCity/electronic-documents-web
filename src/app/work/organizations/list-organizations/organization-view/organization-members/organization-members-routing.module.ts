import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationMembersComponent} from './organization-members/organization-members.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationMembersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationMembersRoutingModule { }
