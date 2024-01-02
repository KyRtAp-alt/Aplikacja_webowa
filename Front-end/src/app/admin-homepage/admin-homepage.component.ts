import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss'],
})
export class AdminHomepageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  schedule: any[] = [];

  currentTime: Date = new Date();

  ngOnInit() {
    this.updateTime();
  }

  private updateTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }
}
