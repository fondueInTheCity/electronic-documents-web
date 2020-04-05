import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OfferOrganizationsComponent} from './offer-organizations/offer-organizations.component';


const routes: Routes = [
  {
    path: '',
    component: OfferOrganizationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferOrganizationsRoutingModule { }
