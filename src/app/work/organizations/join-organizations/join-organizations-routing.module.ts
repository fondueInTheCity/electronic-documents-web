import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JoinOrganizationsComponent} from './join-organizatinos/join-organizations.component';


const routes: Routes = [
  {
    path: '',
    component: JoinOrganizationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinOrganizationsRoutingModule { }
