import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute, Params} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {OrganizationMember} from '../../../../models/organization-member';

@Component({
  selector: 'app-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.less']
})
export class OrganizationMembersComponent implements OnInit {
  getSubscription: Subscription;
  members: OrganizationMember[];

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params: Params) => params.organizationId),
      mergeMap((organizationId: number) => this.organizationService.getMembers(organizationId))
    ).subscribe((data: OrganizationMember[]) => {
      this.members = data;
    });
  }
}
