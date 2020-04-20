import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationsDocumentsRoutingModule} from './organizations-documents-routing.module';
import {OrganizationsDocumentsComponent} from './organizations-documents/organizations-documents.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';


@NgModule({
  declarations: [OrganizationsDocumentsComponent],
  imports: [
    CommonModule,
    OrganizationsDocumentsRoutingModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class OrganizationsDocumentsModule { }
