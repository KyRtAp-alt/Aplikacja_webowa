import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthGuardRreceptionService } from './auth-guard-rreception.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardReception implements CanActivate {
  constructor(
    private authGuardRreceptionService: AuthGuardRreceptionService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authGuardRreceptionService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/recepcja']);
      return false;
    }
  }
}
