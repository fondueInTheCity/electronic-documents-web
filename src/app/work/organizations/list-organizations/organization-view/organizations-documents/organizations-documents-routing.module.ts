import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationsDocumentsComponent} from './organizations-documents/organizations-documents.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationsDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsDocumentsRoutingModule { }
