import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../services/organization.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../../../auth/services/token-storage.service';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.less']
})
export class OrganizationViewComponent implements OnInit {
  organizationName: string;
  organizationId: number;

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params
      .pipe(
        map((params) => +params.organizationId),
        tap((organizationId) => this.organizationId = organizationId),
        mergeMap((organizationId) => this.organizationService.getOrganizationNameById(organizationId))
      ).subscribe(async (data) => {
        this.organizationName = data;
      });
  }

  admin(): boolean {
    return this.tokenStorageService.hasPermissions(this.organizationId);
  }
}
