import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationsComponent} from './organizations/organizations.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./create-organization/create-organization.module').then(m => m.CreateOrganizationModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list-organizations/list-organizations.module').then(m => m.ListOrganizationsModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./join-organizations/join-organizations.module').then(m => m.JoinOrganizationsModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./offer-organizations/offer-organizations.module').then(m => m.OfferOrganizationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
