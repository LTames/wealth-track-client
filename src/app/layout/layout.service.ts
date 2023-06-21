import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  sidebarActive: boolean;
  anchored: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    sidebarActive: false,
    anchored: false,
  };

  private overlayOpen = new Subject<any>();
  overlayOpen$ = this.overlayOpen.asObservable();

  onOverlaySubmenuOpen() {
    this.overlayOpen.next(null);
  }

  showProfileSidebar() {
    this.state.profileSidebarVisible = true;
  }
}
