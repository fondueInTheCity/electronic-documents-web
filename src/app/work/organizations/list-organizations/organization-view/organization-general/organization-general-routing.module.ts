import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationGeneralComponent} from './organization-general/organization-general.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationGeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationGeneralRoutingModule { }
