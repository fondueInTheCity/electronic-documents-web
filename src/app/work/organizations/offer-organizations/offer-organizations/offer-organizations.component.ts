import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationOffer} from '../../models/organization-offer';
import {UserService} from '../../../profile/services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {UtilService} from '../../../../utils/util.service';
import {OrganizationService} from '../../services/organization.service';

@Component({
  selector: 'app-offer-organizations',
  templateUrl: './offer-organizations.component.html',
  styleUrls: ['./offer-organizations.component.less']
})
export class OfferOrganizationsComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  answerSubscription: Subscription;
  userRequests: OrganizationOffer[];
  organizationRequests: OrganizationOffer[];
  current: OrganizationOffer;

  constructor(private service: UserService,
              private fb: FormBuilder,
              private utilService: UtilService,
              private tokenStorageService: TokenStorageService,
              private organizationService: OrganizationService) {
  }

  async ngOnInit() {
    await this.getRequests();
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }

  async sendAnswer(answer: boolean, offerId: number) {
    this.utilService.unsubscribe(this.answerSubscription);
    this.answerSubscription = this.organizationService.answerOffer({offerId, answer})
      .subscribe(async () => {
          this.getRequests();
        });
  }

  async getRequests() {
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.service.getOrganizationsOffers(this.tokenStorageService.getUsername())
      .subscribe(async (data) => {
          this.userRequests = data.userRequests;
          this.organizationRequests = data.organizationRequests;
        });
  }

  setCurrent(item: OrganizationOffer) {
    this.current = item;
  }
}
