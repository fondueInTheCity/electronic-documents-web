import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsDocumentsRoutingModule } from './organizations-documents-routing.module';
import { OrganizationsDocumentsComponent } from './organizations-documents/organizations-documents.component';


@NgModule({
  declarations: [OrganizationsDocumentsComponent],
  imports: [
    CommonModule,
    OrganizationsDocumentsRoutingModule
  ]
})
export class OrganizationsDocumentsModule { }
