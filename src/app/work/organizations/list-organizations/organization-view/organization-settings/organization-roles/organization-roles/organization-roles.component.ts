import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationRoleInfo} from '../../../../../../../utils/models/organization-role-info';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../../../../services/organization.service';
import {UtilService} from '../../../../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../../../../utils/tc';

@Component({
  selector: 'app-organization-roles',
  templateUrl: './organization-roles.component.html',
  styleUrls: ['./organization-roles.component.less']
})
export class OrganizationRolesComponent implements OnInit, OnDestroy {
  organizationId: number;
  organizationRoles: OrganizationRoleInfo[];
  getSubscription: Subscription;
  createSubscription: Subscription;
  deleteSubscription: Subscription;
  renameSubscription: Subscription;
  current: OrganizationRoleInfo;
  renameRoleForm: FormGroup;
  createNewRoleForm: FormGroup;
  inProgress = false;

  constructor(private organizationService: OrganizationService,
              private properties: UtilService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    this.loadOrganizationRoles();
  }

  async loadOrganizationRoles() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.parent.params
      .pipe(
        map((params: Params) => params.organizationId),
        tap((organizationId) => this.organizationId = organizationId),
        mergeMap((organizationId: number) => this.organizationService.getOrganizationRoles(organizationId))
      ).subscribe(async (data) => {
        this.organizationRoles = data;
        this.createNewRoleForm = this.fb.group({
          organizationId: [this.organizationId],
          name: []
        });
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

  async deleteOrganizationRole(roleId: number) {
    this.inProgress = true;
    this.spinner.show();
    this.properties.unsubscribe(this.deleteSubscription);
    this.deleteSubscription = this.organizationService.deleteOrganizationRole(roleId).subscribe(async () => {
      this.current = null;
      this.inProgress = false;
      this.toast.success(tc.deleteRoleSuccess.message);
      this.spinner.hide();
      this.loadOrganizationRoles();
    }, error => {
      this.current = null;
      this.inProgress = false;
      this.spinner.hide();
      this.toast.error(tc.deleteRoleError.message);
    });
  }

  async renameOrganizationRole() {
    this.inProgress = true;
    this.spinner.show();
    this.properties.unsubscribe(this.renameSubscription);
    this.renameSubscription = this.organizationService.renameOrganizationRole(this.renameRoleForm.value)
      .subscribe(async () => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.success(tc.renameRoleSuccess.message);
        this.loadOrganizationRoles();
      }, error => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.error(tc.renameRoleError.message);
      });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
    this.properties.unsubscribe(this.createSubscription);
    this.properties.unsubscribe(this.deleteSubscription);
    this.properties.unsubscribe(this.renameSubscription);
  }

  setCurrent(item: OrganizationRoleInfo) {
    this.current = item;
  }

  setCurrentRename(item: OrganizationRoleInfo) {
    this.current = item;
    this.renameRoleForm = this.fb.group({
      id: [item.id],
      newName: [item.name, this.properties.getOrganizationRoleNameValidators()]
    });
  }

  createNewRole() {
    this.inProgress = true;
    this.spinner.show();
    this.properties.unsubscribe(this.createSubscription);
    this.createSubscription = this.organizationService.createOrganizationRole(
      this.createNewRoleForm.value)
      .subscribe(() => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.success(tc.createRoleSuccess.message);
        this.loadOrganizationRoles();
      }, error => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.error(tc.createRoleError.message);
      });
  }

  disableRenameButton() {
    return this.inProgress && this.renameRoleForm.invalid;
  }

  disableCreateButton() {
    return this.inProgress && this.createNewRoleForm.invalid;
  }
}
