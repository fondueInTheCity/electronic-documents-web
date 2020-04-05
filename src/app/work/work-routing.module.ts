import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GeneralComponent} from './general/general.component';


const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        loadChildren: () =>  import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'profile/:username',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'organizations',
        loadChildren: () => import('./organizations/organizations.module').then(m => m.OrganizationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
