import { Component } from '@angular/core';
import { AuthGuardRreceptionService } from '../auth-guard-rreception.service';

@Component({
  selector: 'app-header-reception',
  templateUrl: './header-reception.component.html',
  styleUrls: ['./header-reception.component.scss'],
})
export class HeaderReceptionComponent {
  constructor(private authGuardRreceptionService: AuthGuardRreceptionService) {}

  logout() {
    this.authGuardRreceptionService.logout();
  }
}
