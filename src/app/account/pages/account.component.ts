import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ValidationService } from 'src/app/shared/validation.service';
import { AccountService } from '../account.service';
import { MessageService } from 'primeng/api';
import { UserData } from 'src/app/auth/interfaces/userData.interface';

type Severity = 'error' | 'success' | 'warn' | 'info';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [MessageService],
})
export class AccountComponent implements OnInit {
  public accountForm!: FormGroup;
  public passwordChangeForm!: FormGroup;
  public passwordChangeVisible = false;
  public accountFormLoading = false;
  public passwordChangeFormLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly validationService: ValidationService,
    private readonly accountService: AccountService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    const { email, username, name } = this.authService.userDataValue!;

    this.accountForm = this.formBuilder.group({
      name: [name, [Validators.required], []],
      email: [
        email,
        [Validators.required],
        [
          this.validationService.valueIsRegisteredValidator('email', {
            dismissValue: email,
          }),
        ],
      ],
      username: [
        username,
        [Validators.required],
        [
          this.validationService.valueIsRegisteredValidator('username', {
            dismissValue: username,
          }),
        ],
      ],
    });

    this.passwordChangeForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required]],
        newPasswordCopy: ['', [Validators.required]],
      },
      {
        validators: this.validationService.mustMatchValidator(
          'newPassword',
          'newPasswordCopy'
        ),
      }
    );
  }

  public changePassword(): void {
    this.passwordChangeVisible = true;
  }

  public submitPasswordChangeForm(): void {
    if (this.passwordChangeForm.valid) {
      this.passwordChangeFormLoading = true;
      this.accountService
        .updateUserPassword(this.passwordChangeForm.get('newPassword')!.value)
        .subscribe({
          next: (res) => {
            this.addToastMessage(
              'success',
              'Sua senha foi alterada com sucesso'
            );
          },
          error: (err) => {
            this.addToastMessage(
              'error',
              'Houve um erro ao redefinir sua senha'
            );
          },
          complete: () => {
            this.passwordChangeFormLoading = false;
            this.closePasswordDialog();
          },
        });
    }
  }

  public submitAccountForm(): void {
    if (this.accountForm.valid) {
      this.accountFormLoading = true;
      this.accountService.updateUser(this.accountForm.value).subscribe({
        next: (userData) => {
          this.authService.setUserData(userData);
          this.addToastMessage('success', 'Alterações salvas com sucesso');
        },
        error: (err) => {
          this.addToastMessage(
            'error',
            'Houve um erro ao salvar suas alterações'
          );
        },
        complete: () => {
          this.accountFormLoading = false;
        },
      });
    }
  }

  public closePasswordDialog(): void {
    this.passwordChangeVisible = false;
    this.passwordChangeForm.reset();
  }

  private addToastMessage(severity: Severity, summary: string): void {
    this.messageService.add({
      closable: false,
      severity,
      summary,
      life: 3000,
    });
  }
}
