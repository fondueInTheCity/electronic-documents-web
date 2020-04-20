import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute} from '@angular/router';
import {DocumentsService} from '../services/documents.service';
import {Observable, Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../../../auth/services/token-storage.service';
import {DocumentInfo} from '../models/document-info';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {OrganizationDocumentsInfo} from '../models/organization-documents-info';

@Component({
  selector: 'app-organizations-documents',
  templateUrl: './organizations-documents.component.html',
  styleUrls: ['./organizations-documents.component.less']
})
export class OrganizationsDocumentsComponent implements OnInit, OnDestroy {
  organizationId: number;
  userId: number;
  documents: DocumentInfo[];
  getSubscription: Subscription;
  uploadSubscription: Subscription;
  getFilesSubscription: Subscription;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  filesInfo: OrganizationDocumentsInfo;


  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private documentsService: DocumentsService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getId();
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.subscribe((params) => {
      this.organizationId = params.organizationId;
      this.getFiles();
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.documentsService.upload(this.currentFile, this.organizationId, this.userId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  private getFiles(): void {
    this.getFilesSubscription = this.documentsService.getMyOrganizationDocumentsInfo(this.organizationId, this.userId)
      .subscribe((data) =>
        this.filesInfo = data
      );
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
    this.getFilesSubscription.unsubscribe();
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }
}
