import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Observable, catchError, isEmpty, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

export const authGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | Observable<boolean> => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const { userDataValue, token } = auth;

  if (!userDataValue && !token) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (!userDataValue && token) {
    return auth.getUser().pipe(
      map((userData) => true),
      catchError((err, caught) => of(false))
    );
  }

  return true;
};
