import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ValidationService } from 'src/app/shared/validation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public accountForm!: FormGroup;
  public passwordForm!: FormGroup;
  public passowrdChangeVisible = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly validationService: ValidationService
  ) {}

  ngOnInit(): void {
    const { email, username, name } = this.authService.userDataValue!;

    this.accountForm = this.formBuilder.group({
      name: [name, [Validators.required], []],
      email: [
        email,
        [Validators.required],
        [this.validationService.valueIsRegisteredValidator('email')],
      ],
      username: [
        username,
        [Validators.required],
        [this.validationService.valueIsRegisteredValidator('username')],
      ],
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', []],
      currentPassword: ['', []],
    });
  }

  changePassword() {
    this.passowrdChangeVisible = true;
  }

  submitChanges() {}
}
