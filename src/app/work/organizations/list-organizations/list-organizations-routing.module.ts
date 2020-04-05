import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListOrganizationsComponent} from './list-organizations/list-organizations.component';


const routes: Routes = [
  {
    path: '',
    component: ListOrganizationsComponent
  },
  {
    path: ':organizationId',
    loadChildren: () => import('./organization-view/organization-view.module').then(m => m.OrganizationViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOrganizationsRoutingModule { }
