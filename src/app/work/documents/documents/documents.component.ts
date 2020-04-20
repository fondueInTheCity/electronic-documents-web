import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {DocumentInfo} from '../../organizations/list-organizations/organization-view/organizations-documents/models/document-info';
// tslint:disable-next-line:max-line-length
import {DocumentsService} from '../../organizations/list-organizations/organization-view/organizations-documents/services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less']
})
export class DocumentsComponent implements OnInit {
  getSubscription: Subscription;
  documentsInfo: DocumentInfo[];

  constructor(private documentsService: DocumentsService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getSubscription = this.documentsService.getUserDocumentsInfo(this.tokenStorageService.getId())
      .subscribe((data) => this.documentsInfo = data.documentsInfo);
  }
}
