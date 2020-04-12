import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from '../models/jwt-response';
import {SignUpInfo} from '../models/signup-info';
import {environment} from '../../../environments/environment';
import {AuthLoginInfo} from '../models/login-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `${environment.serverUrl}/auth/signin`;
  private signupUrl = `${environment.serverUrl}/auth/signup`;

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
