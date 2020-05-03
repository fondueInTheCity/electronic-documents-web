import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocumentsRoutingModule} from './documents-routing.module';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentViewComponent} from './document-view/document-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [DocumentsComponent, DocumentViewComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule
  ]
})
export class DocumentsModule { }
