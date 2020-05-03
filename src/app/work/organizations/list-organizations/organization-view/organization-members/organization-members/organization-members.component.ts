import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrganizationMember} from '../../../../models/organization-member';
import {UtilService} from '../../../../../../utils/util.service';
import {TokenStorageService} from '../../../../../../auth/services/token-storage.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.less']
})
export class OrganizationMembersComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  members: OrganizationMember[];
  organizationId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationService,
              private properties: UtilService,
              private tokenStorageService: TokenStorageService,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.getMembers();
  }

  async getMembers() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params: Params) => params.organizationId),
      tap((organizationId) => this.organizationId = organizationId),
      mergeMap((organizationId: number) => this.organizationService.getMembers(organizationId))
    ).subscribe((data: OrganizationMember[]) => {
      this.members = data;
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }

  admin(): boolean {
    return this.tokenStorageService.hasPermissions(+this.organizationId);
  }
}
