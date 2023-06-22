import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from '../auth/interfaces/userData.interface';
import { Observable, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  updateUserData(userData: UserData): Observable<UserData> {
    const { id, ...result } = userData;
    return this.http
      .post<UserData>(`${environment.serverUrl}/user/${id}`, result)
      .pipe(take(1));
  }

  updateUserPassword(newUserPassword: string): Observable<null> {
    const { id } = this.authService.userDataValue!;
    return this.http
      .post<null>(`${environment.serverUrl}/user/${id}/password`, {
        newUserPassword,
      })
      .pipe(take(1));
  }
}
