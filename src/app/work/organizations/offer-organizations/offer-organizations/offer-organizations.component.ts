import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationOffer} from '../../models/organization-offer';
import {UserService} from '../../../profile/services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-offer-organizations',
  templateUrl: './offer-organizations.component.html',
  styleUrls: ['./offer-organizations.component.less']
})
export class OfferOrganizationsComponent implements OnInit, OnDestroy {
  offers: OrganizationOffer[];
  getSubscription: Subscription;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getSubscription = this.userService.getOrganizationsOffers(this.tokenStorageService.getUsername()).subscribe(data =>
      this.offers = data
    );
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
  }
}
