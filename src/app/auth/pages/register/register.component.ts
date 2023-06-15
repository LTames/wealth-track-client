import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  Observable,
  debounceTime,
  delay,
  map,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  registerFormLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required]],
      username: [
        '',
        [Validators.required],
        [this.valueIsRegisteredValidator('username')],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.valueIsRegisteredValidator('email')],
      ],
    });
  }

  public submitRegisterForm() {
    if (this.registerForm.valid) {
      this.registerFormLoading = true;
      this.authService.userRegister(this.registerForm.value).subscribe({
        next: (res) => {
          this.registerForm.reset();
          this.messageService.add({
            severity: 'success',
            closable: false,
            life: 3000,
            summary: 'Cadastro realizado com sucesso',
          });
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3500);
        },
        error: (err) => {
          this.registerFormLoading = false;
          this.messageService.add({
            severity: 'error',
            closable: false,
            life: 3000,
            summary: 'Houve um erro ao realizar seu cadastro',
          });
        },
      });
    }
  }

  private valueIsRegisteredValidator(modelProperty: string): AsyncValidatorFn {
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
