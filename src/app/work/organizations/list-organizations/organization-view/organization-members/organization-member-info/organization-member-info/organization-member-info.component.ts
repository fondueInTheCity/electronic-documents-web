import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OrganizationMember} from '../../../../../models/organization-member';
import {OrganizationRoleInfo} from '../../../../../../../utils/models/organization-role-info';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../../../../services/organization.service';
import {UtilService} from '../../../../../../../utils/util.service';
import {FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-organization-member-info',
  templateUrl: './organization-member-info.component.html',
  styleUrls: ['./organization-member-info.component.less']
})
export class OrganizationMemberInfoComponent implements OnInit, OnDestroy {
  memberId: number;
  organizationId: number;
  organizationMember: OrganizationMember;
  allRoles: OrganizationRoleInfo[];
  getSubscription: Subscription;
  addRolesForm = this.fb.group({
    role: []
  });


  constructor(private organizationService: OrganizationService,
              private properties: UtilService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.parent.params
      .pipe(
        tap((params: Params) => this.organizationId = params.organizationId),
        mergeMap(_ => this.activatedRoute.params))
      .pipe(
        tap((params) => this.memberId = params.memberId),
        mergeMap(_ => this.organizationService.getOrganizationMember(this.organizationId, this.memberId))
      ).pipe(
        tap((data) => this.organizationMember = data),
        mergeMap(_ => this.organizationService.getOrganizationRoles(this.organizationId))
      ).subscribe(async (roles) => {
        this.allRoles = roles;
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }

  onSubmit() {
    this.organizationService.addRole(this.organizationId, this.memberId, this.addRolesForm.value).subscribe(() =>
      this.getData()
    );
  }

  removeRole(roleId: number) {
    this.organizationService.deleteRole(this.organizationId, this.memberId, roleId).subscribe(() =>
      this.getData()
    );
  }
}
