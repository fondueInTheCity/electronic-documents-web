import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {OrganizationSettings} from '../../../../models/organization-settings';
import {OrganizationType} from '../../../../models/organization-type';
import {UtilService} from '../../../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.less']
})
export class OrganizationSettingsComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  updateSubscription: Subscription;
  organizationSettings: OrganizationSettings;
  organizationId: number;
  generalForm = this.fb.group({
    id: [],
    name: [],
    organizationType: []
  });

  constructor(private activatedRoute: ActivatedRoute,
              private service: OrganizationService,
              private fb: FormBuilder,
              private properties: UtilService,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    this.properties.unsubscribe(this.getSubscription);
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.params
      .pipe(
        map((params: Params) => params.organizationId),
        tap((organizationId) => this.organizationId = organizationId),
        mergeMap((organizationId: number) => this.service.getOrganizationSettings(organizationId))
      ).subscribe(async (data) => {
        this.organizationSettings = data;
        this.generalForm.reset(data);
        this.spinner.hide();
      });
  }

  async onSubmit() {
    this.spinner.show();
    this.properties.unsubscribe(this.updateSubscription);
    this.updateSubscription = this.service.updateOrganizationSettings(this.organizationId, this.generalForm.value)
      .subscribe(async () => {
        this.spinner.hide();
        this.getData();
      });
  }

  getTypes(): string[] {
    return this.properties.getKeys(OrganizationType);
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.updateSubscription);
    this.properties.unsubscribe(this.getSubscription);
  }
}
