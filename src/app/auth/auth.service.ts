import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from './interfaces/userLogin.interface';
import { UserRegister } from './interfaces/userRegister.interface';
import { AuthToken } from './interfaces/authToken.interface';
import { FieldRegisteredRes } from './interfaces/fieldRegisteredRes.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = new BehaviorSubject(null);
  private _token = localStorage.getItem('token');

  constructor(private readonly http: HttpClient) {}

  get userData() {
    return this._userData.asObservable();
  }

  public userLogin(userLogin: UserLogin): Observable<any> {
    return this.http
      .post<AuthToken>(`${environment.serverUrl}/auth/login`, userLogin)
      .pipe(
        take(1),
        tap(({ accessToken }) => {
          localStorage.setItem('token', accessToken);
          this._token = accessToken;
        }),
        switchMap(({ accessToken }) => this.getUserData(accessToken))
      );
  }

  public userRegister(userRegister: UserRegister): Observable<any> {
    return this.http
      .post(`${environment.serverUrl}/auth/register`, userRegister)
      .pipe(take(1));
  }

  public userLogout() {
    localStorage.removeItem('token');
    this._token = null;
    this._userData.next(null);
  }

  public getUserData(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get(`${environment.serverUrl}/user`, { headers })
      .pipe(take(1));
  }

  public fieldHasRegister(field: string, value: string | number | boolean) {
    const params = new HttpParams().set(field, value);
    return this.http
      .get<FieldRegisteredRes>(`${environment.serverUrl}/auth/register`, {
        params,
      })
      .pipe(take(1));
  }
}
