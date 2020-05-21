import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {UtilService} from '../../../../../../utils/util.service';
import {FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {mergeMap, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {OrganizationGeneral} from '../../../../../../utils/models/organization-general';

@Component({
  selector: 'app-organization-general',
  templateUrl: './organization-general.component.html',
  styleUrls: ['./organization-general.component.less']
})
export class OrganizationGeneralComponent implements OnInit {
  getSubscription: Subscription;
  organizationId: number;
  organizationGeneral: OrganizationGeneral;

  constructor(private organizationService: OrganizationService,
              private properties: UtilService,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.params
      .pipe(
        tap((params: Params) => this.organizationId = params.organizationId),
        mergeMap(_ => this.organizationService.getOrganizationGeneral(this.organizationId)))
      .subscribe(async (data) => {
        this.organizationGeneral = data;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }
}
