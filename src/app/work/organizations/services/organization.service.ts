import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationCreate} from '../models/organization-create';
import {Observable} from 'rxjs';
import {OrganizationView} from '../models/organization-view';
import {OrganizationMember} from '../models/organization-member';
import {OrganizationSettings} from '../models/organization-settings';
import {OrganizationJoin} from '../models/organization-join';
import {environment} from '../../../../environments/environment.prod';
import {OrganizationAnswerOffer} from '../../../utils/models/organization-answer-offer';
import {OrganizationInfo} from '../models/organization-info';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  createOrganization(organizationCreate: OrganizationCreate): Observable<number> {
    return this.http.post<number>(`${environment.serverUrl}/organizations`, organizationCreate);
  }

  getView(organizationId: number): Observable<OrganizationView> {
    return this.http.get<OrganizationView>(`${environment.serverUrl}/organizations/${organizationId}`);
  }

  getMembers(organizationId: number): Observable<OrganizationMember[]> {
    return this.http.get<OrganizationMember[]>(`${environment.serverUrl}/organizations/${organizationId}/members`);
  }

  getOrganizationSettings(organizationId: number): Observable<OrganizationSettings> {
    return this.http.get<OrganizationSettings>(`${environment.serverUrl}/organizations/${organizationId}/settings`);
  }

  updateOrganizationSettings(organizationId: number, organizationSettings: OrganizationSettings): Observable<void> {
    return this.http.put<void>(`${environment.serverUrl}/organizations/${organizationId}/settings`, organizationSettings);
  }

  joinToOrganization(organizationJoin: OrganizationJoin): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations`, organizationJoin);
  }

  answerOffer(answer: OrganizationAnswerOffer): Observable<void> {
    return this.http.put<void>(`${environment.serverUrl}/organizations/offers`, answer);
  }

  getPublicOrganizations(): Observable<OrganizationInfo[]> {
    return this.http.get<OrganizationInfo[]>(`${environment.serverUrl}/organizations/public`);
  }

  createRequest(organizationId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations/${organizationId}/user/${userId}/request`, {});
  }
}
