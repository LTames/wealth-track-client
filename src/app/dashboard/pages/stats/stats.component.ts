import { Component, Input } from '@angular/core';
import { Stats } from '../../interfaces/stats.interface';

@Component({
  selector: 'dashboard-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() stats!: Stats;
}
