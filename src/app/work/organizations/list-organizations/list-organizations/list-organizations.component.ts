import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../profile/services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {OrganizationInfo} from '../../models/organization-info';
import {UtilService} from '../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-list-organizations',
  templateUrl: './list-organizations.component.html',
  styleUrls: ['./list-organizations.component.less']
})
export class ListOrganizationsComponent implements OnInit, OnDestroy {
  organizationsInfo = Array<OrganizationInfo>();
  getSubscription: Subscription;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private properties: UtilService,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.getOrganizations();
  }

  async getOrganizations() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.userService.getOrganizationsInfo(this.tokenStorageService.getUsername())
      .subscribe(async (organizationsInfo) => {
          this.organizationsInfo = organizationsInfo;
          this.spinner.hide();
        });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }

  saveOrganizationId(id: number) {
    this.properties.setCurrentOrganizationId(id);
  }
}
