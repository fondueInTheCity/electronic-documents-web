import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentInfo} from '../models/document-info';
import {environment} from '../../../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) { }

  getMyOrganizationDocumentsInfo(organizationId: number, userId: number): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(`${environment.serverUrl}/documents/organization/${organizationId}/user/${userId}`);
  }
}
