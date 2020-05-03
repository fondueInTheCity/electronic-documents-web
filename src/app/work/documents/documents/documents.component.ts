import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
// tslint:disable-next-line:max-line-length
import {DocumentsService} from '../../organizations/list-organizations/organization-view/organizations-documents/services/documents.service';
import {UserDocumentsInfo} from '../models/user-documents-info';
import {UtilService} from '../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  documents: UserDocumentsInfo;

  constructor(private documentsService: DocumentsService,
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
    this.getSubscription = this.documentsService.getUserDocumentsInfo(this.tokenStorageService.getId())
      .subscribe(async (data) => {
          this.documents = data;
          this.spinner.hide();
        });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }
}
