import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrganizationOffer} from '../../models/organization-offer';
import {UserService} from '../../../profile/services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {UtilService} from '../../../../utils/util.service';
import {OrganizationService} from '../../services/organization.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../utils/tc';

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
  inProgress = false;

  constructor(private service: UserService,
              private fb: FormBuilder,
              private utilService: UtilService,
              private tokenStorageService: TokenStorageService,
              private organizationService: OrganizationService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    await this.getRequests();
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }

  async sendAnswer(answer: boolean, offerId: number) {
    this.inProgress = true;
    this.spinner.show();
    this.utilService.unsubscribe(this.answerSubscription);
    this.answerSubscription = this.organizationService.answerOffer({offerId, answer})
      .subscribe(async () => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.success(tc.answerSuccess.message);
        this.current = null;
        this.getRequests();
      }, error => {
        this.inProgress = false;
        this.current = null;
        this.spinner.hide();
        this.toast.error(tc.answerError.message);
      });
  }

  async getRequests() {
    this.spinner.show();
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.service.getOrganizationsOffers(this.tokenStorageService.getUsername())
      .subscribe(async (data) => {
        this.userRequests = data.userRequests;
        this.organizationRequests = data.organizationRequests;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

  disableAnswerButton() {
    return this.inProgress;
  }

  setCurrent(item: OrganizationOffer) {
    this.current = item;
  }
}
