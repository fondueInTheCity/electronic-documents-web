import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DocumentInfo} from '../../organizations-documents/models/document-info';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DocumentsService} from '../../organizations-documents/services/documents.service';
import {TokenStorageService} from '../../../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  organizationId: number;
  getSubscription: Subscription;
  documents: DocumentInfo[];

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private documentsService: DocumentsService,
              private tokenStorageService: TokenStorageService,
              private properties: UtilService,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.getDocuments();
  }

  async getDocuments() {
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.parent.parent.parent.params
      .pipe(
        map((params: Params) => params.organizationId),
        tap((organizationId) => this.organizationId = organizationId),
        mergeMap((organizationId: number) => this.organizationService.getOrganizationDocumentsInfo(organizationId))
      ).subscribe(async (data) => {
        this.documents = data.documents;
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }
}
