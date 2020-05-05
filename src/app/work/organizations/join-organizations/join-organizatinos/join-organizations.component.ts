import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationInfo} from '../../models/organization-info';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../utils/tc';

@Component({
  selector: 'app-join-organizations',
  templateUrl: './join-organizations.component.html',
  styleUrls: ['./join-organizations.component.less']
})
export class JoinOrganizationsComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  organizationsInfo = Array<OrganizationInfo>();
  getSubscription: Subscription;
  userId: number;
  current: OrganizationInfo;
  inProgress = false;

  constructor(private organizationService: OrganizationService,
              private tokenStorageService: TokenStorageService,
              private properties: UtilService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    this.userId = this.tokenStorageService.getId();
    this.getOrganizations();
  }

  async getOrganizations() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.organizationService.getPublicOrganizations()
      .subscribe(async (organizationsInfo) => {
        this.organizationsInfo = organizationsInfo;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

  setCurrent(item: OrganizationInfo) {
    this.current = item;
  }

  createRequest(organizationId: number) {
    this.closeBtn.nativeElement.click();
    this.inProgress = true;
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.organizationService.createRequest(organizationId, this.userId).subscribe(_ => {
      this.inProgress = false;
      this.spinner.hide();
      this.toast.success(tc.createOrganizationRequestSuccess.message);
      this.getOrganizations();
      }, error => {
      this.inProgress = false;
      this.spinner.hide();
      this.toast.error(tc.createOrganizationRequestError.message);
    });
  }

  disableCreateRequestButton() {
    return this.inProgress;
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }
}
