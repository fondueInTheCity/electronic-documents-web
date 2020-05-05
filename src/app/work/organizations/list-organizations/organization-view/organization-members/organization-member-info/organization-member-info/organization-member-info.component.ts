import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OrganizationMember} from '../../../../../models/organization-member';
import {OrganizationRoleInfo} from '../../../../../../../utils/models/organization-role-info';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../../../../services/organization.service';
import {UtilService} from '../../../../../../../utils/util.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../../../../utils/tc';

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
  addRolesForm: FormGroup;
  inProgress = false;


  constructor(private organizationService: OrganizationService,
              private properties: UtilService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.spinner.show();
    this.addRolesForm = this.fb.group({
      role: [null, this.properties.getOrganizationRoleValidators()]
    });
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
      }, error => {
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }

  onSubmit() {
    this.inProgress = true;
    this.spinner.show();
    this.organizationService.addRole(this.organizationId, this.memberId, this.addRolesForm.value).subscribe(() => {
        this.spinner.hide();
        this.inProgress = false;
        this.toast.success(tc.addRoleSuccess.message);
        this.getData();
      }, error => {
        this.spinner.hide();
        this.inProgress = false;
        this.toast.error(tc.addRoleError.message);
      }
    );
  }

  disableAddRole() {
    return this.inProgress && this.addRolesForm.invalid;
  }

  removeRole(roleId: number) {
    this.inProgress = true;
    this.spinner.show();
    this.organizationService.deleteRole(this.organizationId, this.memberId, roleId).subscribe(() => {
        this.spinner.hide();
        this.inProgress = false;
        this.toast.success(tc.denyRoleSuccess.message);
        this.getData();
      }, error => {
        this.spinner.hide();
        this.inProgress = false;
        this.toast.error(tc.denyRoleError.message);
      }
    );
  }

  getAnotherRoles() {
    return this.allRoles.filter(role => !this.organizationMember.roles.map(role1 => role1.id).includes(role.id));
  }
}
