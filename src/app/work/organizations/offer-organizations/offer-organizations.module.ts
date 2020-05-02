import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferOrganizationsRoutingModule } from './offer-organizations-routing.module';
import { OfferOrganizationsComponent } from './offer-organizations/offer-organizations.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [OfferOrganizationsComponent],
  imports: [
    CommonModule,
    OfferOrganizationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class OfferOrganizationsModule { }
