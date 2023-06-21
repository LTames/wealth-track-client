import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from './interfaces/userLogin.interface';
import { UserRegister } from './interfaces/userRegister.interface';
import { AuthToken } from './interfaces/authToken.interface';
import { FieldRegisteredRes } from './interfaces/fieldRegisteredRes.interface';
import { UserData } from './interfaces/userData.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = new BehaviorSubject<null | UserData>(null);
  private _token = localStorage.getItem('token');

  constructor(private readonly http: HttpClient) {}

  get userDataValue() {
    return this._userData.getValue();
  }

  get userData() {
    return this._userData.asObservable();
  }

  get token() {
    return this._token;
  }

  public userLogin(userLogin: UserLogin): Observable<any> {
    return this.http
      .post<AuthToken>(`${environment.serverUrl}/auth/login`, userLogin)
      .pipe(
        take(1),
        tap(({ accessToken }) => {
          if (userLogin.rememberMe) localStorage.setItem('token', accessToken);
          this._token = accessToken;
        }),
        switchMap(({ accessToken }) => this.getUserData(accessToken))
      );
  }

  public userRegister(userRegister: UserRegister): Observable<any> {
    return this.http
      .post<null>(`${environment.serverUrl}/auth/register`, userRegister)
      .pipe(take(1));
  }

  public userLogout() {
    localStorage.removeItem('token');
    this._token = null;
    this._userData.next(null);
  }

  public fieldHasRegister(field: string, value: string | number | boolean) {
    const params = new HttpParams().set(field, value);
    return this.http
      .get<FieldRegisteredRes>(`${environment.serverUrl}/auth/register`, {
        params,
      })
      .pipe(take(1));
  }

  public getUserData(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<UserData>(`${environment.serverUrl}/user`, { headers })
      .pipe(
        take(1),
        tap((userData) => {
          this._userData.next(userData);
        })
      );
  }
}
