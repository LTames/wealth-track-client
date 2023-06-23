import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from '../auth/interfaces/userData.interface';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private readonly http: HttpClient) {}

  updateUser(updateUser: any): Observable<UserData> {
    return this.http
      .put<UserData>(`${environment.serverUrl}/user`, updateUser)
      .pipe(take(1));
  }

  updateUserPassword(newPassword: string): Observable<null> {
    return this.http
      .patch<null>(`${environment.serverUrl}/user/password`, {
        newPassword: newPassword,
      })
      .pipe(take(1));
  }
}
