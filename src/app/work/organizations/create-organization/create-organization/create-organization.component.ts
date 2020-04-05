import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.less']
})
export class CreateOrganizationComponent implements OnInit {
  organizationForm = new FormGroup({
    name: new FormControl(),
    ownerUsername: new FormControl(this.tokenService.getUsername())
  });
  getSubscription: Subscription;

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.getSubscription = this.organizationService.createOrganization(this.organizationForm.value).subscribe();
  }
}
