import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDashboard} from '../dashboard/models/UserDashboard';
import {OrganizationInfo} from '../../organizations/models/organization-info';
import {OrganizationOffer} from '../../organizations/models/organization-offer';
import {environment} from '../../../../environments/environment.prod';
import {UserRequestsView} from '../../../utils/models/user-requests-view';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getDashboard(username: string): Observable<UserDashboard> {
    return this.http.get<UserDashboard>(`${environment.serverUrl}/users/${username}/dashboard`);
  }

  updateDashboard(username: string, userDashboard: UserDashboard): Observable<string> {
    return this.http.put<string>(`${environment.serverUrl}/users/${username}/dashboard`, userDashboard);
  }

  getOrganizationsInfo(username: string): Observable<OrganizationInfo[]> {
    return this.http.get<OrganizationInfo[]>(`${environment.serverUrl}/users/${username}/organizations`);
  }

  getOrganizationsOffers(username: string): Observable<UserRequestsView> {
    return this.http.get<UserRequestsView>(`${environment.serverUrl}/users/${username}/offers`);
  }
}
