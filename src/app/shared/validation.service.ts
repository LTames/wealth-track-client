import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, map, of, switchMap, timer } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface RegisteredValueConfig {
  dismissValue: string;
}

type RegisteredValueProperty = 'email' | 'username';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private readonly authService: AuthService) {}

  public valueIsRegisteredValidator(
    modelProperty: RegisteredValueProperty,
    config?: RegisteredValueConfig
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (config) {
        if (control.value === config.dismissValue) return of(null);
      }

      return timer(300).pipe(
        switchMap(() =>
          this.authService.fieldHasRegister(modelProperty, control.value)
        ),
        map((res) => (res.alreadyRegistered ? res : null))
      );
    };
  }

  public mustMatchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (group: AbstractControl) => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) return null;

      if (matchingControl.errors && !matchingControl.getError('mustMatch'))
        return null;

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
