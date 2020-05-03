import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationRequestsComponent} from './organization-requests/organization-requests.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRequestsRoutingModule { }
