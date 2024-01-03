import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardRreceptionService {
  private isLoggedInR: boolean = localStorage.getItem('isLoggedInR') === 'true';

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username === 'admin' && password === '321') {
      this.isLoggedInR = true;
      localStorage.setItem('isLoggedInR', 'true');
      this.router.navigate(['/recepcja-stronaglowna']);
    } else {
      console.log('Błędne dane logowania');
    }
  }

  logout() {
    this.isLoggedInR = false;
    localStorage.removeItem('isLoggedInR');
    this.router.navigate(['/recepcja']);
  }

  isAuthenticated() {
    return this.isLoggedInR;
  }
}
