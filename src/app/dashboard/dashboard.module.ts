import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StatsComponent } from './pages/stats/stats.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [DashboardComponent, StatsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputNumberModule,
    ChartModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ToolbarModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ChartModule,
  ],
})
export class DashboardModule {}
