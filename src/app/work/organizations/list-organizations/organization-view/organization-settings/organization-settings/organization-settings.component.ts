import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {OrganizationSettings} from '../../../../models/organization-settings';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.less']
})
export class OrganizationSettingsComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  updateSubscription: Subscription;
  organizationSettings: OrganizationSettings;
  generalForm = this.fb.group({
    id: [],
    name: [],
    organizationType: []
  });
  organizationId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private service: OrganizationService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params) => params.organizationId),
      tap((organizationId) => this.organizationId = organizationId),
      mergeMap((organizationId) => this.service.getOrganizationSettings(organizationId))
    ).subscribe((data) => {
      this.organizationSettings = data;
      this.generalForm.reset(data);
    });
  }

  onSubmit(): void {
    this.updateSubscription = this.service.updateOrganizationSettings(this.organizationId, this.generalForm.value).subscribe();
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
