import {Component, OnInit} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {OrganizationView} from '../../../../models/organization-view';
import {OrganizationService} from '../../../../services/organization.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-organization-general',
  templateUrl: './organization-general.component.html',
  styleUrls: ['./organization-general.component.less']
})
export class OrganizationGeneralComponent implements OnInit {
  getSubscription: Subscription;
  generalForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    ownerUsername: new FormControl()
  });

  constructor(private activatedRoute: ActivatedRoute,
              private service: OrganizationService) {
  }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params: Params) => params.organizationId),
      mergeMap((organizationId: number) => this.service.getView(organizationId))
    ).subscribe((data: OrganizationView) => {
      this.generalForm.reset(data);
    });
  }

  onSubmit(): void {

  }
}
