import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationCreate} from '../models/organization-create';
import {Observable} from 'rxjs';
import {SERVER} from '../../../utils/endpoints';
import {OrganizationView} from '../models/organization-view';
import {OrganizationMember} from '../models/organization-member';
import {OrganizationSettings} from '../models/organization-settings';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  createOrganization(organizationCreate: OrganizationCreate): Observable<void> {
    return this.http.post<void>(`${SERVER}/organizations`, organizationCreate);
  }

  getView(organizationId: number): Observable<OrganizationView> {
    return this.http.get<OrganizationView>(`${SERVER}/organizations/${organizationId}`);
  }

  getMembers(organizationId: number): Observable<OrganizationMember[]> {
    return this.http.get<OrganizationMember[]>(`${SERVER}/organizations/${organizationId}/members`);
  }

  getOrganizationSettings(organizationId: number): Observable<OrganizationSettings> {
    return this.http.get<OrganizationSettings>(`${SERVER}/organizations/${organizationId}/settings`);
  }
}

