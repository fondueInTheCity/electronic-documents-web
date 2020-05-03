import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentsRoutingModule} from './documents-routing.module';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    NgxSpinnerModule
  ]
})
export class DocumentsModule { }
