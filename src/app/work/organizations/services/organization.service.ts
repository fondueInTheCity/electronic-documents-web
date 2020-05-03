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
import {OrganizationRoleInfo} from '../../../utils/models/organization-role-info';
import {AddRole} from '../../../utils/models/add-role';
import {OrganizationDocumentsInfo} from '../../../utils/models/organization-documents-info';
import {OrganizationRequestsView} from '../../../utils/models/organization-requests-view';
import {CreateOrganizationRequest} from '../../../utils/models/create-organization-request';
import {RenameOrganizationRole} from '../../../utils/models/rename-organization-role';
import {CreateOrganizationRole} from '../../../utils/models/create-organization-role';

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

  getOrganizationMember(organizationId: number, userId: number): Observable<OrganizationMember> {
    return this.http.get<OrganizationMember>(`${environment.serverUrl}/organizations/${organizationId}/members/${userId}`);
  }

  getOrganizationRoles(organizationId: number): Observable<OrganizationRoleInfo[]> {
    return this.http.get<OrganizationRoleInfo[]>(`${environment.serverUrl}/organizations/${organizationId}/roles`);
  }

  addRole(organizationId: number, memberId: number, value: AddRole): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations/${organizationId}/members/${memberId}/roles`, value);
  }

  deleteRole(organizationId: number, memberId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}/organizations/${organizationId}/members/${memberId}/roles/${id}`);
  }
  getOrganizationDocumentsInfo(organizationId: number): Observable<OrganizationDocumentsInfo> {
    return this.http.get<OrganizationDocumentsInfo>(
      `${environment.serverUrl}/documents/organization/${organizationId}`);
  }

  getOrganizationOffers(organizationId: number): Observable<OrganizationRequestsView> {
    return this.http.get<OrganizationRequestsView>(`${environment.serverUrl}/organizations/${organizationId}/offers`);
  }

  createOrganizationRequest(createOrganizationRequest: CreateOrganizationRequest): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations/organization-request/create`, createOrganizationRequest);
  }

  deleteOrganizationRole(organizationRoleId: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}/organizations/roles/${organizationRoleId}`);
  }

  renameOrganizationRole(renameOrganizationRole: RenameOrganizationRole): Observable<void> {
    return this.http.put<void>(`${environment.serverUrl}/organizations/roles/rename`, renameOrganizationRole);
  }

  createOrganizationRole(createOrganizationRole: CreateOrganizationRole): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations/roles/create`, createOrganizationRole);
  }
}
