import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, switchMap, timer } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private readonly authService: AuthService) {}

  public valueIsRegisteredValidator(modelProperty: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        switchMap(() =>
          this.authService.fieldHasRegister(modelProperty, control.value)
        ),
        map((res) => (res.alreadyRegistered ? res : null))
      );
    };
  }
}
