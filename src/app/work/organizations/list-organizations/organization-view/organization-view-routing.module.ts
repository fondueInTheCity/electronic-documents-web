import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationViewComponent} from './organization-view/organization-view.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationViewComponent,
    children: [
      {
        path: 'general',
        loadChildren: () => import('./organization-general/organization-general.module').then(m => m.OrganizationGeneralModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./organization-members/organization-members.module').then(m => m.OrganizationMembersModule)
      },
      {
        path: 'my-documents',
        loadChildren: () => import('./organizations-documents/organizations-documents.module').then(m => m.OrganizationsDocumentsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./organization-settings/organization-settings.module').then(m => m.OrganizationSettingsModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./organization-requests/organization-requests.module').then(m => m.OrganizationRequestsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationViewRoutingModule { }
