import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrganizationSettings} from '../../../../models/organization-settings';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.less']
})
export class OrganizationSettingsComponent implements OnInit {
  getSubscription: Subscription;
  organizationSettings: OrganizationSettings;

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params: Params) => params.organizationId),
      mergeMap((organizationId: number) => this.organizationService.getOrganizationSettings(organizationId))
    ).subscribe((data: OrganizationSettings) => {
      this.organizationSettings = data;
    });
  }

}
