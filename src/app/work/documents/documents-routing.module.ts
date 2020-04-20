import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentsComponent} from './documents/documents.component';
import {DocumentViewComponent} from './document-view/document-view.component';


const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent
  },
  {
    path: ':id',
    component: DocumentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
