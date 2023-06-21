import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  constructor(public layoutService: LayoutService) {}

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }
}
