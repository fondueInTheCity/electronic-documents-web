import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../../environments/environment.prod';
import {MyOrganizationDocumentsInfo} from '../models/my-organization-documents-info';
import {OrganizationDocumentView} from '../models/organization-document-view';
import {UserDocumentsInfo} from '../../../../../documents/models/user-documents-info';
import {HeapDocumentView} from '../../../../../../utils/models/heap-document-view';
import {WaitingDocumentView} from '../../../../../../utils/models/waiting-document-view';
import {JoinToMeDocumentView} from '../../../../../../utils/models/join-to-me-document-view';
import {DocumentAnswer} from '../../../../../../utils/models/document-answer';
import {AnsweredDocumentView} from '../../../../../../utils/models/answered-document-view';
import {PendingDocumentView} from '../../../../../../utils/models/pending-document-view';
import {OrganizationDocumentsInfo} from '../../../../../../utils/models/organization-documents-info';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) {
  }

  getMyOrganizationDocumentsInfo(organizationId: number, userId: number): Observable<MyOrganizationDocumentsInfo> {
    return this.http.get<MyOrganizationDocumentsInfo>(`${environment.serverUrl}/documents/organization/${organizationId}/user/${userId}`);
  }

  upload(file: File, organizationId: number, userId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.serverUrl}/documents/organization/${organizationId}/user/${userId}`,
      formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  getDocumentView(documentId: number): Observable<OrganizationDocumentView> {
    return this.http.get<OrganizationDocumentView>(`${environment.serverUrl}/documents/${documentId}`);
  }

  getUserDocumentsInfo(userId: number): Observable<UserDocumentsInfo> {
    return this.http.get<UserDocumentsInfo>(`${environment.serverUrl}/documents/user/${userId}`);
  }

  getHeapDocument(documentId: number): Observable<HeapDocumentView> {
    return this.http.get<HeapDocumentView>(`${environment.serverUrl}/documents/${documentId}/heap`);
  }

  getWaitingDocument(documentId: number): Observable<WaitingDocumentView> {
    return this.http.get<WaitingDocumentView>(`${environment.serverUrl}/documents/${documentId}/waiting`);
  }

  getJoinToMeDocument(documentId: number): Observable<JoinToMeDocumentView> {
    return this.http.get<JoinToMeDocumentView>(`${environment.serverUrl}/documents/${documentId}/join-to-me`);
  }

  downloadDocumentForCheck(documentId: number): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/documents/${documentId}/join-to-me/download`, {},
      {reportProgress: true, responseType: 'blob' as 'json'});
  }

  sendAnswer(documentId: number, answer: DocumentAnswer): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/documents/${documentId}/join-to-me/answer`, answer);
  }

  getAnsweredDocument(documentId: number): Observable<AnsweredDocumentView> {
    return this.http.get<AnsweredDocumentView>(`${environment.serverUrl}/documents/${documentId}/answered`);
  }

  getPendingDocument(documentId: number): Observable<PendingDocumentView> {
    return this.http.get<PendingDocumentView>(`${environment.serverUrl}/documents/${documentId}/progress`);
  }

  getOrganizationDocumentsInfo(organizationId: number): Observable<OrganizationDocumentsInfo> {
    return this.http.get<OrganizationDocumentsInfo>(
      `${environment.serverUrl}/documents/organization/${organizationId}`);
  }

  approveUserHeapDocument(value: HeapDocumentView): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/documents/${value.id}/heap`, value);
  }

  getState(documentId: number): Observable<string> {
    return this.http.get<string>(`${environment.serverUrl}/documents/${documentId}/state`, {responseType: 'text' as 'json'});
  }
}
