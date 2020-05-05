import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationInfo} from '../../../utils/models/notification-info';
import {environment} from '../../../../environments/environment.prod';
import {UserNotifications} from '../../../utils/models/user-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getUserNotifications(userId: number): Observable<UserNotifications> {
    return this.http.get<UserNotifications>(`${environment.serverUrl}/notifications/users/${userId}`);
  }
}
