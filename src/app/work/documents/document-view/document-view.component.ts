import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
// tslint:disable-next-line:max-line-length
import {OrganizationService} from '../../organizations/services/organization.service';
// tslint:disable-next-line:max-line-length
import {DocumentsService} from '../../organizations/list-organizations/organization-view/organizations-documents/services/documents.service';
import {UtilService} from '../../../utils/util.service';
import {HeapDocumentView} from '../../../utils/models/heap-document-view';
import {OrganizationRoleInfo} from '../../../utils/models/organization-role-info';
import {WaitingDocumentView} from '../../../utils/models/waiting-document-view';
import {PendingDocumentView} from '../../../utils/models/pending-document-view';
import {JoinToMeDocumentView} from '../../../utils/models/join-to-me-document-view';
import {AnsweredDocumentView} from '../../../utils/models/answered-document-view';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mergeMap, tap} from 'rxjs/operators';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../utils/tc';

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
    name: ['', this.properties.getOrganizationDocumentNameValidators()],
    roles: [null, this.properties.getOrganizationRoleValidators()]
  });
  joinToMeForm = this.fb.group({
    id: [],
    answer: [null, Validators.required]
  });
  downloaded = false;
  fileExists = false;
  progress = 0;
  downloadInProgress = false;
  countAnswered: number;
  show: boolean;
  fileURL: string;
  inProgress = false;


  constructor(private properties: UtilService,
              private fb: FormBuilder,
              private organizationService: OrganizationService,
              private documentService: DocumentsService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    this.spinner.show();
    this.show = false;
    this.properties.unsubscribe(this.getSubscription);
    this.getSubscription = this.activatedRoute.params.pipe(
      tap((params) => this.documentId = params.id),
      mergeMap(_ => this.documentService.getState(this.documentId))
    ).subscribe((state) => {
      this.state = state;
      if (this.state === 'HEAP') {
        this.getSubscription = this.documentService.getHeapDocument(this.documentId).subscribe((data) => {
          this.heapForm.patchValue(data)
          this.allRoles = data.allRoles;
          this.heapDocument = data;
          this.show = true;
          this.spinner.hide();
        });
      } else if (this.state === 'WAITING') {
        this.getSubscription = this.documentService.getWaitingDocument(this.documentId).subscribe((data) => {
          this.waitingDocument = data;
          this.show = true;
          this.spinner.hide();
        });
      } else if (this.state === 'PENDING') {
        this.getSubscription = this.documentService.getPendingDocument(this.documentId).subscribe((data) => {
          this.pendingDocumentView = data;
          this.countAnswered = data.answers.filter(answer => answer.answer).length;
          this.show = true;
          this.spinner.hide();
        });
      } else if (this.state === 'JOIN_TO_ME') {
        this.getSubscription = this.documentService.getJoinToMeDocument(this.documentId).subscribe((data) => {
          this.joinToMeForm.patchValue(data);
          this.joinToMeDocument = data;
          this.show = true;
          this.spinner.hide();
        });
      } else if (this.state === 'ANSWERED') {
        this.getSubscription = this.documentService.getAnsweredDocument(this.documentId).subscribe((data) => {
          this.answeredDocument = data;
          this.countAnswered = data.joins.length;
          this.show = true;
          this.spinner.hide();
        });
      }
    });
  }

  async onSubmitHeap() {
    this.inProgress = true;
    this.spinner.show();
    this.properties.unsubscribe(this.getSubscription);
    const value = this.heapForm.value;
    this.getSubscription = this.documentService.approveUserHeapDocument({id: value.id, organizationId: value.organizationId,
    name: value.name, roles: [+value.roles], allRoles: []}).subscribe(_ => {
      this.state = 'WAITING';
      this.inProgress = false;
      this.spinner.hide();
      this.toast.success(tc.approveHeapSuccess.message);
      this.getData();
    }, error => {
      this.inProgress = false;
      this.spinner.hide();
      this.toast.error(tc.approveHeapError.message);
    });
  }

  async downloadFile() {
    this.inProgress = true;
    this.spinner.show();
    this.downloadInProgress = true;
    this.documentService.downloadDocumentForCheck(this.documentId).subscribe((blob) => {
      this.createFile(blob);
      this.downloaded = true;
      this.downloadInProgress = false;
      this.inProgress = false;
      this.spinner.hide();
    }, error => {
      this.inProgress = false;
      this.spinner.hide();
    });
  }

  onSubmitJoinToMe(answer: boolean) {
    this.inProgress = true;
    this.spinner.show();
    this.documentService.sendAnswer(this.documentId, {answer}).subscribe(_ => {
      this.inProgress = false;
      this.spinner.hide();
      this.router.navigate(['./../']);
    }, error => {
      this.inProgress = false;
      this.spinner.hide();
    });
  }

  createFile(blob: Blob) {
    this.fileURL = URL.createObjectURL(blob);
    this.openFile();
  }

  async openFile() {
    window.open(this.fileURL, '_blank');
  }

  ngOnDestroy(): void {
    this.properties.unsubscribe(this.getSubscription);
  }

  onItemSelect($event: ListItem) {
    console.log($event);
  }

  disableHeapApproveButton() {
    return this.inProgress || this.heapForm.invalid;
  }
}
