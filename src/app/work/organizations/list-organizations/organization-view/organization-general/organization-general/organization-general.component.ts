import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {OrganizationView} from '../../../../models/organization-view';
import {OrganizationService} from '../../../../services/organization.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-organization-general',
  templateUrl: './organization-general.component.html',
  styleUrls: ['./organization-general.component.less']
})
export class OrganizationGeneralComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  organizationView: OrganizationView;

  constructor(private activatedRoute: ActivatedRoute,
              private service: OrganizationService) {
  }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params) => params.organizationId),
      mergeMap((organizationId) => this.service.getView(organizationId))
    ).subscribe((data) => {
      this.organizationView = data;
    });
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
  }
}
