import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationCreate} from '../models/organization-create';
import {Observable} from 'rxjs';
import {OrganizationView} from '../models/organization-view';
import {OrganizationMember} from '../models/organization-member';
import {OrganizationSettings} from '../models/organization-settings';
import {OrganizationJoin} from '../models/organization-join';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  createOrganization(organizationCreate: OrganizationCreate): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations`, organizationCreate);
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

  joinToOrganization(organizationJoin: OrganizationJoin): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/organizations`, organizationJoin);
  }
}
