import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-webbooking',
  templateUrl: './webbooking.component.html',
  styleUrls: ['./webbooking.component.scss'],
})
export class WebbookingComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Umów wizytę');
  }
}
