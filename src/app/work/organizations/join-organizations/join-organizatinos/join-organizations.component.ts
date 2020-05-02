import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../services/organization.service';
import {OrganizationInfo} from '../../models/organization-info';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';

@Component({
  selector: 'app-join-organizations',
  templateUrl: './join-organizations.component.html',
  styleUrls: ['./join-organizations.component.less']
})
export class JoinOrganizationsComponent implements OnInit, OnDestroy {
  organizationsInfo = Array<OrganizationInfo>();
  getSubscription: Subscription;
  userId: number;
  current: OrganizationInfo;

  constructor(private organizationService: OrganizationService,
              private tokenStorageService: TokenStorageService,
              private properties: UtilService) {
  }

  async ngOnInit() {
    this.userId = this.tokenStorageService.getId();
    this.getOrganizations();
  }

  async getOrganizations() {
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.organizationService.getPublicOrganizations()
      .subscribe(async (organizationsInfo) => {
          this.organizationsInfo = organizationsInfo;
        });
  }

  setCurrent(item: OrganizationInfo) {
    this.current = item;
  }

  createRequest(organizationId: number) {
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.organizationService.createRequest(organizationId, this.userId).subscribe();
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }
}
