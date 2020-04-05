import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateOrganizationComponent} from './create-organization/create-organization.component';


const routes: Routes = [
  {
    path: '',
    component: CreateOrganizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOrganizationRoutingModule { }
