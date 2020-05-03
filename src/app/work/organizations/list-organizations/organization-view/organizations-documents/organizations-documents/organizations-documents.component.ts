import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DocumentsService} from '../services/documents.service';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../../../auth/services/token-storage.service';
import {DocumentInfo} from '../models/document-info';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MyOrganizationDocumentsInfo} from '../models/my-organization-documents-info';
import {DocumentListInfo} from '../../../../../../utils/models/document-list-info';
import {UtilService} from '../../../../../../utils/util.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {OrganizationMember} from '../../../../models/organization-member';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-organizations-documents',
  templateUrl: './organizations-documents.component.html',
  styleUrls: ['./organizations-documents.component.less']
})
export class OrganizationsDocumentsComponent implements OnInit, OnDestroy {
  userId: number;
  documents: DocumentInfo[];
  uploadSubscription: Subscription;
  getFilesSubscription: Subscription;
  changeSubscription: Subscription;
  approveDenySubscription: Subscription;
  organizationId: number;
  client: any;
  uploadInProgress = false;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  filesInfo: MyOrganizationDocumentsInfo;

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private documentsService: DocumentsService,
              private tokenStorageService: TokenStorageService,
              private properties: UtilService,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.userId = this.tokenStorageService.getId();
    this.getFiles();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  async upload() {
    this.spinner.show();
    this.progress = 0;
    this.uploadInProgress = true;
    this.currentFile = this.selectedFiles.item(0);
    this.properties.unsubscribe(this.uploadSubscription);
    this.uploadSubscription = this.documentsService.upload(this.currentFile, this.organizationId, this.userId).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded * 100 / event.total);
        } else if (event instanceof HttpResponse) {
          this.progress = 0;
          this.uploadInProgress = false;
          this.spinner.hide();
          this.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.uploadInProgress = false;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
        this.spinner.hide();
      });

    this.selectedFiles = undefined;
  }

  private async getFiles() {
    this.spinner.show();
    this.properties.unsubscribe(this.getFilesSubscription);
    this.getFilesSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params: Params) => params.organizationId),
      tap((organizationId: number) => this.organizationId = organizationId),
      mergeMap((organizationId: number) => this.documentsService.getMyOrganizationDocumentsInfo(organizationId, this.userId))
    ).subscribe((data) => {
      this.filesInfo = data;
      this.spinner.hide();
    });
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.changeSubscription);
    this.properties.unsubscribe(this.getFilesSubscription);
    this.properties.unsubscribe(this.uploadSubscription);
    this.properties.unsubscribe(this.approveDenySubscription);
  }
}
