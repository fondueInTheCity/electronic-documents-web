import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationMemberInfoComponent} from './organization-member-info/organization-member-info.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationMemberInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationMemberInfoRoutingModule { }
