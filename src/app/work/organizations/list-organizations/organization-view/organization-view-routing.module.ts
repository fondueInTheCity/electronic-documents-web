import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationViewComponent} from './organization-view/organization-view.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'general'
      },
      {
        path: 'general',
        loadChildren: () => import('./organization-general/organization-general.module').then(m => m.OrganizationGeneralModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./organization-members/organization-members.module').then(m => m.OrganizationMembersModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./organizations-documents/organizations-documents.module').then(m => m.OrganizationsDocumentsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./organization-settings/organization-settings.module').then(m => m.OrganizationSettingsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationViewRoutingModule { }
