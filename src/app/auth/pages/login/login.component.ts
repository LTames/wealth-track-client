import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageHelper } from 'src/app/shared/helper/messageHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFormLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) return;

    this.loginFormLoading = true;
    this.authService.userLogin(this.loginForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginFormLoading = false;
        this.loginForm.get('password')?.reset();
        this.messageService.clear();
        this.messageService.add(
          MessageHelper.createMessage('Usuário ou senha incorretos', 'error')
        );
      },
    });
  }
}
