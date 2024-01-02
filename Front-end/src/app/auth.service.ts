import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === 'true';

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username === 'admin' && password === '123') {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/admin-homepage']);
    } else {
      console.log('Błędne dane logowania');
    }
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/admin']);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
