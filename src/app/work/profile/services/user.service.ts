import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDashboard} from '../dashboard/models/UserDashboard';
import {OrganizationInfo} from '../../organizations/models/organization-info';
import {OrganizationOffer} from '../../organizations/models/organization-offer';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDashboard(username: string): Observable<UserDashboard> {
    return this.http.get<UserDashboard>(`${environment.serverUrl}/users/${username}/dashboard`);
  }

  updateDashboard(username: string, userDashboard: UserDashboard): Observable<void> {
    return this.http.put<void>(`${environment.serverUrl}/users/${username}/dashboard`, userDashboard);
  }

  getOrganizationsInfo(username: string): Observable<OrganizationInfo[]> {
    return this.http.get<OrganizationInfo[]>(`${environment.serverUrl}/users/${username}/organizations`);
  }

  getOrganizationsOffers(username: string): Observable<OrganizationOffer[]> {
    return this.http.get<OrganizationOffer[]>(`${environment.serverUrl}/users/${username}/offers`);
  }
}
