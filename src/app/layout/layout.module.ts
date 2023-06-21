import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileSidebarComponent } from './profile-sidebar/profilesidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LayoutComponent, ProfileSidebarComponent, TopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    BadgeModule,
    AvatarModule,
    ButtonModule,
  ],
})
export class LayoutModule {}
