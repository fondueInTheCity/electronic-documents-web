import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferOrganizationsRoutingModule } from './offer-organizations-routing.module';
import { OfferOrganizationsComponent } from './offer-organizations/offer-organizations.component';


@NgModule({
  declarations: [OfferOrganizationsComponent],
  imports: [
    CommonModule,
    OfferOrganizationsRoutingModule
  ]
})
export class OfferOrganizationsModule { }
