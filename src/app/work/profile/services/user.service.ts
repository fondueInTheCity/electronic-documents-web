import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDashboard} from '../dashboard/models/UserDashboard';
import {SERVER} from '../../../utils/endpoints';
import {OrganizationInfo} from '../../organizations/models/organization-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDashboard(username: string): Observable<UserDashboard> {
    return this.http.get<UserDashboard>(`${SERVER}/users/${username}/dashboard`);
  }

  updateDashboard(username: string, userDashboard: UserDashboard): Observable<void> {
    return this.http.put<void>(`${SERVER}/users/${username}/dashboard`, userDashboard);
  }

  getOrganizationsInfo(username: string): Observable<OrganizationInfo[]> {
    return this.http.get<OrganizationInfo[]>(`${SERVER}/users/${username}/organizations`);
  }
}
