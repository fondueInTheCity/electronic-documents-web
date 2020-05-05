import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrganizationOffer} from '../../../../models/organization-offer';
import {OrganizationService} from '../../../../services/organization.service';
import {UtilService} from '../../../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../../../utils/tc';

@Component({
  selector: 'app-organization-requests',
  templateUrl: './organization-requests.component.html',
  styleUrls: ['./organization-requests.component.less']
})
export class OrganizationRequestsComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  answerSubscription: Subscription;
  createSubscription: Subscription;
  organizationId: number;
  userRequests: OrganizationOffer[];
  organizationRequests: OrganizationOffer[];
  current: OrganizationOffer;
  createForm = this.fb.group({
    username: []
  });
  inProgress = false;

  constructor(private organizationService: OrganizationService,
              private properties: UtilService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    this.getRequests();
  }

  async sendAnswer(answer: boolean, offerId: number) {
    this.spinner.show();
    this.properties.unsubscribe(this.answerSubscription);
    this.answerSubscription = this.organizationService.answerOffer({offerId, answer})
      .subscribe(async () => {
        this.toast.success(tc.answerSuccess.message);
        this.spinner.hide();
        this.inProgress = false;
        this.getRequests();
      }, error => {
        this.inProgress = false;
        this.toast.error(tc.answerError.message);
        this.spinner.hide();
      });
  }

  async getRequests() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.params
      .pipe(
        map((params: Params) => params.organizationId),
        tap((organizationId) => this.organizationId = organizationId),
        mergeMap((organizationId: number) => this.organizationService.getOrganizationOffers(organizationId))
      ).subscribe(async (data) => {
        this.userRequests = data.userRequests;
        this.organizationRequests = data.organizationRequests;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

  setCurrent(param: OrganizationOffer) {
    this.current = param;
  }

  onSubmit() {
    this.inProgress = true;
    this.properties.unsubscribe(this.createSubscription);
    this.spinner.show();
    this.createSubscription = this.organizationService.createOrganizationRequest({
      username: this.createForm.value.username,
      organizationId: this.organizationId
    }).subscribe(_ => {
        this.inProgress = false;
        this.spinner.hide();
        this.getRequests();
      }, error => {
        this.inProgress = false;
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.createSubscription);
    this.properties.unsubscribe(this.getSubscription);
    this.properties.unsubscribe(this.answerSubscription);
  }
}
