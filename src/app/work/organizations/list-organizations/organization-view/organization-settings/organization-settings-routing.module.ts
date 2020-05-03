import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationSettingsComponent} from './organization-settings/organization-settings.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationSettingsComponent
  },
  {
    path: 'roles',
    loadChildren: () => import('./organization-roles/organization-roles.module').then(m => m.OrganizationRolesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationSettingsRoutingModule { }
