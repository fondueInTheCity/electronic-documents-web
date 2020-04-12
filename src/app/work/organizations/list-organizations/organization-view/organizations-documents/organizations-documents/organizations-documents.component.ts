import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder} from '@angular/forms';
import {DocumentsService} from '../services/documents.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {OrganizationMember} from '../../../../models/organization-member';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../../../../auth/services/token-storage.service';
import {DocumentInfo} from '../models/document-info';
import {environment} from '../../../../../../../environments/environment.prod';
import {TOKEN_HEADER_KEY} from '../../../../../../auth/services/auth-interceptor';

@Component({
  selector: 'app-organizations-documents',
  templateUrl: './organizations-documents.component.html',
  styleUrls: ['./organizations-documents.component.less']
})
export class OrganizationsDocumentsComponent implements OnInit {
  public uploader: FileUploader;
  organizationId: number;
  uploadingForm = this.fb.group({
    file: []
  });
  documents: DocumentInfo[];
  getSubscription: Subscription;


  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private documentsService: DocumentsService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    const userId = this.tokenStorageService.getId();
    this.getSubscription = this.activatedRoute.parent.parent.parent.params.pipe(
      map((params: Params) => params.organizationId),
      tap(organizationId => this.organizationId = organizationId),
      mergeMap((organizationId: number) => this.documentsService.getMyOrganizationDocumentsInfo(organizationId, userId))
    ).subscribe((data) => {
      this.documents = data;
      this.uploader = new FileUploader({
        url: `${environment.serverUrl}/documents/organization/${this.organizationId}/user/${userId}`,
        itemAlias: 'file',
        authTokenHeader: TOKEN_HEADER_KEY,
        authToken: `Bearer ${this.tokenStorageService.getToken()}`
      });
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        console.log('FileUpload:uploaded successfully:', item, status, response);
        alert('Your file has been uploaded successfully');
      };
    });
  }
}
