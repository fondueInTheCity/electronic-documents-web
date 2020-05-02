import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
// tslint:disable-next-line:max-line-length
import {OrganizationService} from '../../organizations/services/organization.service';
import {DocumentsService} from '../../organizations/list-organizations/organization-view/organizations-documents/services/documents.service';
import {UtilService} from '../../../utils/util.service';
import {HeapDocumentView} from '../../../utils/models/heap-document-view';
import {OrganizationRoleInfo} from '../../../utils/models/organization-role-info';
import {WaitingDocumentView} from '../../../utils/models/waiting-document-view';
import {PendingDocumentView} from '../../../utils/models/pending-document-view';
import {JoinToMeDocumentView} from '../../../utils/models/join-to-me-document-view';
import {AnsweredDocumentView} from '../../../utils/models/answered-document-view';
import {FormBuilder} from '@angular/forms';
import {mergeMap, tap} from 'rxjs/operators';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.less']
})
export class DocumentViewComponent implements OnInit, OnDestroy {
  documentId: number;
  state: string;
  getSubscription: Subscription;
  heapDocument: HeapDocumentView;
  waitingDocument: WaitingDocumentView;
  pendingDocumentView: PendingDocumentView;
  joinToMeDocument: JoinToMeDocumentView;
  answeredDocument: AnsweredDocumentView;
  allRoles: OrganizationRoleInfo[];
  selectedItems = [];
  heapForm = this.fb.group({
    id: [],
    organizationId: [],
    name: [],
    roles: [this.selectedItems]
  });
  waitingForm = this.fb.group({
    id: [],
    organizationId: [],
    organizationName: [],
    name: [],
    count: []
  });
  joinToMeForm = this.fb.group({
    id: [],
    answer: []
  });
  downloaded = false;
  fileExists = false;
  progress = 0;
  downloadInProgress = false;
  countAnswered: number;
  show: boolean;
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
    limitSelection: null
  };


  constructor(private properties: UtilService,
              private fb: FormBuilder,
              private organizationService: OrganizationService,
              private documentService: DocumentsService,
              private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    this.show = false;
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.params.pipe(
      tap((params) => this.documentId = params.id),
      mergeMap(_ => this.documentService.getState(this.documentId))
    ).subscribe((state) => {
      this.state = state;
      if (this.state === 'HEAP') {
        this.getSubscription = this.documentService.getHeapDocument(this.documentId).subscribe((data) => {
          this.heapForm.patchValue(data);
          this.allRoles = data.allRoles;
          this.heapDocument = data;
          this.show = true;
        });
      } else if (this.state === 'WAITING') {
        this.getSubscription = this.documentService.getWaitingDocument(this.documentId).subscribe((data) => {
          this.waitingForm.patchValue(data);
          this.waitingDocument = data;
          this.show = true;
        });
      } else if (this.state === 'PENDING') {
        this.getSubscription = this.documentService.getPendingDocument(this.documentId).subscribe((data) => {
          this.pendingDocumentView = data;
          this.countAnswered = data.answers.filter(answer => answer.answer).length;
          this.show = true;
        });
      } else if (this.state === 'JOIN_TO_ME') {
        this.getSubscription = this.documentService.getJoinToMeDocument(this.documentId).subscribe((data) => {
          this.joinToMeForm.patchValue(data);
          this.joinToMeDocument = data;
          this.show = true;
        });
      } else if (this.state === 'ANSWERED') {
        this.getSubscription = this.documentService.getAnsweredDocument(this.documentId).subscribe((data) => {
          this.answeredDocument = data;
          this.countAnswered = data.joins.length;
          this.show = true;
        });
      }
    });
  }

  async onSubmitHeap() {
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.documentService.approveUserHeapDocument(this.heapForm.value).subscribe(_ => {
      this.state = 'WAITING';
      this.getData();
    });
  }

  async downloadFile() {
    this.downloadInProgress = true;
    this.documentService.downloadDocumentForCheck(this.documentId).subscribe((blob) => {
      this.createFile(blob);
      this.downloaded = true;
      this.downloadInProgress = false;
    });
  }

  onSubmitJoinToMe(answer: boolean) {
    this.documentService.sendAnswer(this.documentId, {answer}).subscribe();
  }

  createFile(blob: Blob) {
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }

  async openFile() {
    // const filePath = `${this.file.dataDirectory}${this.joinToMeDocument.name}`;
    // await this.fileOpener.open(filePath, 'text/plain').catch(async error =>
    //   await this.properties.startAlert(this.properties.getErrorAlertOpts(error.message)));
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }

  onItemSelect($event: ListItem) {
    console.log($event);
  }
}
