import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, StyleClassModule, ButtonModule],
})
export class HomeModule {}
