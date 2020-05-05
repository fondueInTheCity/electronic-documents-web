import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';
import {OrganizationType} from '../../models/organization-type';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../utils/tc';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.less']
})
export class CreateOrganizationComponent implements OnInit, OnDestroy {
  organizationForm = this.fb.group({
    name: ['', this.utilService.getOrganizationNameValidators()],
    type: [null, this.utilService.getOrganizationTypeValidators()],
    ownerUsername: [this.tokenService.getUsername()]
  });
  getSubscription: Subscription;
  inProgress = false;

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService,
              private fb: FormBuilder,
              private router: Router,
              private utilService: UtilService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.inProgress = true;
    this.spinner.show();
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.organizationService.createOrganization(this.organizationForm.value).subscribe(async (id) => {
        this.tokenService.addNewOrganizationId(id);
        this.toast.success(tc.createOrganizationSuccess.message, tc.createOrganizationSuccess.title);
        this.spinner.hide();
        setTimeout(() => {
          this.router.navigate([`./../organizations/list/${id}/general`]);
        }, 3000);
      },
      error => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.error(tc.createOrganizationError.message, tc.createOrganizationError.title);
      });
  }

  getTypes(): string[] {
    return this.utilService.getKeys(OrganizationType);
  }

  disableCreateButton() {
    return this.inProgress || this.organizationForm.invalid;
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }
}
