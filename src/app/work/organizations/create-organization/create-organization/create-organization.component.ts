import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';
import {OrganizationType} from '../../models/organization-type';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.less']
})
export class CreateOrganizationComponent implements OnInit, OnDestroy {
  organizationForm = this.fb.group({
    name: [],
    type: [],
    ownerUsername: [this.tokenService.getUsername()]
  });
  getSubscription: Subscription;

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private fb: FormBuilder,
              private router: Router,
              private utilService: UtilService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.organizationService.createOrganization(this.organizationForm.value).subscribe(async (id) => {
      this.tokenService.addNewOrganizationId(id);
      this.router.navigate(['./../organizations']);
    });
  }

  getTypes(): string[] {
    return this.utilService.getKeys(OrganizationType);
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }
}
