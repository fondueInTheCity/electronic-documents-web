import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationMembersComponent} from './organization-members/organization-members.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationMembersComponent,
  },
  {
    path: ':memberId',
    loadChildren: () => import('./organization-member-info/organization-member-info.module').then(m => m.OrganizationMemberInfoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationMembersRoutingModule { }
