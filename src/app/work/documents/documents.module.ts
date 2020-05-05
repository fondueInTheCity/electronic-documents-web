import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocumentsRoutingModule} from './documents-routing.module';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentViewComponent} from './document-view/document-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ErrorMessagesModule} from '../../utils/error-messages/error-messages.module';


@NgModule({
  declarations: [DocumentsComponent, DocumentViewComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    ErrorMessagesModule
  ]
})
export class DocumentsModule { }
