import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationRoleInfo} from '../../../../../../../utils/models/organization-role-info';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../../../../services/organization.service';
import {UtilService} from '../../../../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(private organizationService: OrganizationService,
              private properties: UtilService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
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
      });
  }

  async deleteOrganizationRole(roleId: number) {
    this.spinner.show();
    this.properties.unsubscribe(this.deleteSubscription);
    this.deleteSubscription = this.organizationService.deleteOrganizationRole(roleId).subscribe(async () => {
      this.loadOrganizationRoles();
      this.spinner.hide();
    });
  }

  async renameOrganizationRole() {
    this.spinner.show();
    this.properties.unsubscribe(this.renameSubscription);
    this.renameSubscription = this.organizationService.renameOrganizationRole(this.renameRoleForm.value)
      .subscribe(async () => {
        this.loadOrganizationRoles();
        this.spinner.hide();
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
      newName: [item.name]
    });
  }

  createNewRole() {
    this.spinner.show();
    this.properties.unsubscribe(this.createSubscription);
    this.createSubscription = this.organizationService.createOrganizationRole(
      this.createNewRoleForm.value)
      .subscribe(() => {
        this.spinner.hide();
        this.loadOrganizationRoles();
      });
  }
}
