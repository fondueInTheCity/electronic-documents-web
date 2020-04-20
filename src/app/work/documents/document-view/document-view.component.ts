import {Component, OnInit} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
// tslint:disable-next-line:max-line-length
import {DocumentsService} from '../../organizations/list-organizations/organization-view/organizations-documents/services/documents.service';
import {Subscription} from 'rxjs';
// tslint:disable-next-line:max-line-length
import {OrganizationDocumentView} from '../../organizations/list-organizations/organization-view/organizations-documents/models/organization-document-view';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.less']
})
export class DocumentViewComponent implements OnInit {
  getSubscription: Subscription;
  documentViewForm = this.fb.group({
    id: [],
    name: [],
    createDate: [],
    state: []
  });

  constructor(private activatedRoute: ActivatedRoute,
              private documentsService: DocumentsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.params.pipe(
      map((params) => params.id),
      mergeMap((documentId) => this.documentsService.getDocumentView(documentId))
    ).subscribe((data) => this.documentViewForm.reset(data));
  }

  onSubmit() {

  }
}
