import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../profile/services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {OrganizationInfo} from '../../models/organization-info';

@Component({
  selector: 'app-list-organizations',
  templateUrl: './list-organizations.component.html',
  styleUrls: ['./list-organizations.component.less']
})
export class ListOrganizationsComponent implements OnInit {
  organizationsInfo = Array<OrganizationInfo>();
  getSubscription: Subscription;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getSubscription = this.userService.getOrganizationsInfo(this.tokenStorageService.getUsername())
      .subscribe(organizationsInfo => this.organizationsInfo = organizationsInfo);
  }
}
