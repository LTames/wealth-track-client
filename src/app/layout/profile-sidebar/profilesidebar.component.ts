import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilesidebar',
  templateUrl: './profilesidebar.component.html',
  styleUrls: ['./profilesidebar.component.scss'],
})
export class ProfileSidebarComponent {
  constructor(
    private readonly layoutService: LayoutService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  get userName() {
    return this.authService.userDataValue?.username;
  }

  public signOut() {
    this.authService.userLogout();
    this.router.navigate(['/home']);
  }
}
