import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

export const loggedInAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | Observable<boolean> => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const { userDataValue, token } = auth;

  if (userDataValue && token) {
    router.navigate(['/dashboard']);
    return false;
  }

  if (!userDataValue && token) {
    return auth.getUser().pipe(
      tap(() => router.navigate(['/dashboard'])),
      map((userData) => false),
      catchError((err, caught) => of(true))
    );
  }

  return true;
};
